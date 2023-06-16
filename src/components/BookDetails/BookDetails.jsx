import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loader/Loader';
import coverImg from '../../images/cover_not_found.jpg';
import './BookDetails.css';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const URL = 'https://openlibrary.org/works/';

const BookDetails = () => {
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
          const { description, title, covers, subject_places, subject_times, subjects } = data;
          const newBook = {
            description: description ? description.value : 'No description found',
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(', ') : 'No subject places found',
            subject_times: subject_times ? subject_times.join(', ') : 'No subject times found',
            subjects: subjects ? subjects.join(', ') : 'No subjects found',
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
      // Add your logic for adding the book to the cart here
      console.log('Book added to cart!');
      setAvailability(availability - 1); // Decrease availability by 1 after adding to cart
    } else {
      console.log('Book out of stock!');
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="book-details">
      <div className="container">
        <button type="button" className="flex flex-c back-btn" onClick={() => navigate('/book')}>
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
            {/* <div className="book-details-item">
              <span className="fw-6">Subject Places: </span>
              <span className="text-italic">{book?.subject_places}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Subject Times: </span>
              <span className="text-italic">{book?.subject_times}</span>
            </div> */}
            <div className="book-details-item">
              <span className="fw-6">Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
            <div className="book-details-item">
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                <FaShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
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

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Loading from '../Loader/Loader';
// import coverImg from '../../images/cover_not_found.jpg';
// import './BookDetails.css';
// import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const URL = 'https://openlibrary.org/works/';

// const BookDetails = () => {
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [book, setBook] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     async function getBookDetails() {
//       try {
//         const response = await fetch(`${URL}${id}.json`);
//         const data = await response.json();
//         console.log(data);
  
//         if (data) {
//           const { description, title, covers, publish_date, authors, subjects } = data;
//           const newBook = {
//             description: description ? description.value : 'No description found',
//             title: title,
//             cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
//             publish_date: publish_date ? publish_date[0] : 'No publish date found',
//             author: authors ? authors[0].name : 'No author found',
//             subjects: subjects ? subjects.join(', ') : 'No subjects found',
//           };
//           setBook(newBook);
//         } else {
//           setBook(null);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     }
//     getBookDetails();
//   }, [id]);
  

//   const handleAddToCart = () => {
//     // Add your logic for adding the book to the cart here
//     console.log('Book added to cart!');
//   };

//   if (loading) return <Loading />;

//   return (
//     <section className="book-details">
//       <div className="container">
//         <button type="button" className="flex flex-c back-btn" onClick={() => navigate('/book')}>
//           <FaArrowLeft size={22} />
//           <span className="fs-18 fw-6">Go Back</span>
//         </button>

//         <div className="book-details-content grid">
//           <div className="book-details-img">
//             <img src={book?.cover_img} alt="cover img" />
//           </div>
//           <div className="book-details-info">
//             <div className="book-details-item title">
//               <span className="fw-6 fs-24">{book?.title}</span>
//             </div>
//             <div className="book-details-item description">
//               <span>{book?.description}</span>
//             </div>
//             <div className="book-details-item">
//               <span className="fw-6">Author: </span>
//               <span className="text-italic">{book?.author}</span>
//             </div>
//             <div className="book-details-item">
//               <span className="fw-6">Publish date: </span>
//               <span className="text-italic">{book?.publish_date}</span>
//             </div>
//             <div className="book-details-item">
//               <span className="fw-6">Subjects: </span>
//               <span>{book?.subjects}</span>
//             </div>
//             <div className="book-details-item">
//               <button className="add-to-cart-button" onClick={handleAddToCart}>
//                 <FaShoppingCart size={18} />
//                 <span>Add to Cart</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BookDetails;

