import style from './images.module.css';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

function Images({ content }) {
    const navigate = useNavigate();
    const handleImageClick = (item) => {
        navigate(`/product/${item.id}`, { state: item });
    };

    return (
        <div className={style.thisweek__images}>
            <div className={style.thisweek_wrapper}>
                {Array.isArray(content) && content.length > 0 ? (
                    content.map((item) => (
                        <div className={style.image__item}
                             key={item.id}
                             onClick={() => handleImageClick(item)}>
                            <img
                                src={item.imageList?.[0]?.image || '/placeholder.jpg'}
                                alt={item.name || 'Product'}
                                className={style.productImage}
                            />
                            <div className={style.image__title}>
                                <div className={style.image__text}>
                                    <p className={style.productWeek}>{item.name}</p>
                                    <p className={style.productWeek}>${item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={style.noContent}>No products available</p>
                )}
            </div>
        </div>
    );
}

Images.propTypes = {
    content: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            imageList: PropTypes.arrayOf(
                PropTypes.shape({
                    image: PropTypes.string
                })
            ),
            name: PropTypes.string,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ).isRequired,
};

export default Images;