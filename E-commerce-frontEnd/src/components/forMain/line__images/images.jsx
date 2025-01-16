import { useNavigate } from 'react-router-dom'; // Import the navigation hook
import style from './images.module.css';

function Images({ content }) {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleImageClick = (item) => {
        navigate(`/product/${item.id}`, { state: item }); // Navigate to product details with state
    };

    return (
        <div className={style.thisweek__images}>
            <div className={style.thisweek_wrapper}>
                {content && content.length > 0 ? (
                    content.map((item, index) => (
                        <div
                            key={index}
                            className={style.image__item}
                            onClick={() => handleImageClick(item)} // Attach the click handler
                        >
                            <img
                                src={item.imageList[0]?.image}
                                alt={item.name}
                                className={style.productImage}
                            />
                            <div className="image__title">
                                <div className={style.image__text}>
                                    <p className={style.productWeek} id="nameProduct">{item.name}</p>
                                    <p className={style.productWeek} id="priceProduct">${item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="noContent">No products available</p>
                )}
            </div>
        </div>
    );
}

export default Images;