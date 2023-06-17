import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { ImBin } from "react-icons/im";

const URL = "https://openlibrary.org/works/";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      const promises = cartItems.map((item) => {
        const url = `${URL}${item.bookId}.json`;
        return fetch(url).then((response) => response.json());
      });

      try {
        const bookResponses = await Promise.all(promises);
        const books = bookResponses.map((data, index) => {
          const { title, covers } = data;
          return {
            bookId: cartItems[index].bookId,
            title: title ? title : "Title not found",
            coverImg: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : "",
            quantity: cartItems[index].quantity,
          };
        });
        setBookData(books);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookData();
  }, [cartItems]);

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Cart</h1>

        <div className={styles.cartItems} style={{marginTop: 0}}>
          {bookData.length > 0 ? (
            <ul>
              {bookData.map((item) => (
                <li key={item.bookId}>
                  <div className={styles.bookDetails} style={{display: "flex", flexDirection: "row"}}>
                    <div className={styles.bookImage}>
                      {item.coverImg ? (
                        <img src={item.coverImg} alt="Book cover" style={{width: "40px", marginRight: "8px"}} />
                      ) : (
                        <span>No cover image available</span>
                      )}
                    </div>
                    <div className={styles.bookInfo} style={{display: "flex", flexDirection: "column"}}>
                      <span>{item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <button
                    className="add-to-cart-button"
                    style={{
                      backgroundColor: "darkred",
                      fontSize: "12px",
                      padding: "8px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      marginBottom: "12px",
                      marginTop: "12px",
                    }}
                    onClick={() => removeFromCart(item.bookId)}
                  >
                    <ImBin size={12} />
                    <span>Remove from Cart</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>

        <div className={styles.footer}>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
