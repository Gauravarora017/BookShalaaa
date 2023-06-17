import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../Context/CartContext";

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const { addToCart, cartItems, removeFromCart } = useContext(CartContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [availability, setAvailability] = useState(10); // Initial availability set to 10
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data);

        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;
          const newBook = {
            description: description
              ? description.value
              : "No description found",
            title: title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : coverImg,
            subject_places: subject_places
              ? subject_places.join(", ")
              : "No subject places found",
            subject_times: subject_times
              ? subject_times.join(", ")
              : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (availability > 0) {
      addToCart(id); // Add the book to the cart using the book ID
      setAvailability(availability - 1); // Decrease availability by 1 after adding to cart
    } else {
      console.log("Book out of stock!");
    }
  };

  if (loading) return <Loading />;

  const cartItemCount = cartItems.reduce((count, item) => {
    if (item.bookId === id) {
      return count + item.quantity;
    }
    return count;
  }, 0);
  

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/home1/book")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book?.title}</span>
            </div>
            <div className="book-details-item description">
              <span>{book?.description}</span>
            </div>
            <div className="book-details-item" style={{marginBottom: '20px'}}>
              <span className="fw-6">Subjects: </span>
              <span>{book?.subjects}</span>
            </div>

            <div className="book-details-item">
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                <FaShoppingCart size={18} />
                <span>
                  Add to Cart {`(${cartItemCount})`}
                </span>
              </button>
              {cartItemCount>0 ? <button
                className="add-to-cart-button"
                style={{ backgroundColor: "darkred" }}
                onClick={() => removeFromCart(id)}
              >
                <ImBin size={18} />
                <span>Remove from Cart</span>
              </button> : ''}
            </div>
            <div className="book-details-item">
              <span className="fw-6">Availability: </span>
              <span>{availability}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
