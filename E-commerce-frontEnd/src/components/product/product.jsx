import './product.css';
import { useState, useEffect } from 'react';
import Button from '/src/components/ui/button/button.jsx';
import { useLocation, useParams } from 'react-router-dom';
import UserService from "../../redux/services/user.service.jsx";

function Product() {
    const { id } = useParams();
    const location = useLocation();
    const product = location.state; // Access the product data passed from Collection

    const [mainImage, setMainImage] = useState(product?.imageList[0] || null); // Current main image
    const [selectedSize, setSelectedSize] = useState(null); // Selected size
    const [isLiked, setIsLiked] = useState(false); // Track if the heart is liked
    const [isInCart, setIsInCart] = useState(false); // Track cart status

    useEffect(() => {
        if (product) {
            // Fetch user cart to check if the product is already in the cart
            const fetchCartStatus = async () => {
                try {
                    const response = await UserService.getUserCart();
                    const cartItems = response.data || [];
                    // Check if the product's ID matches any item in the cart
                    setIsInCart(cartItems.some(cartItem => cartItem.id === parseInt(id)));
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            };

            fetchCartStatus();
        }
    }, [id, product]);

    const toggleCartAction = async () => {
        try {
            if (isInCart) {
                await UserService.deleteUserCart({ productId: id });
                setIsInCart(false);
            } else {
                await UserService.patchUserCart({ productId: id });
                setIsInCart(true);
            }
        } catch (error) {
            console.error(`Error toggling cart action:`, error);
        }
    };

    const toggleLike = () => {
        const newLikeState = !isLiked;
        setIsLiked(newLikeState); // Toggle the like state
        UserService.patchUserCart({ id: parseInt(id), liked: newLikeState });
    };

    const sendDataToServerFavourites = async (data) => {
        try {
            const payload = {
                productId: id,
                ...data,
            };
            console.log(id)

            const response = await UserService.patchUserFavourites(payload);
            console.log('Data added successfully:', response.data);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };

    const sendDataToDelFavourites = async (data) => {
        try {
            const payload = {
                productId: id,
                ...data,
            };
            console.log(id)

            const response = await UserService.deleteUserFavourites(payload);
            console.log('Data removed successfully:', response.data);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    };


    const toggleFavorite = async () => {
        try {

            if (isLiked) {
                await sendDataToDelFavourites({});
            } else {
                await sendDataToServerFavourites({});
            }

            setIsLiked(!isLiked); // Toggle like state on success
        } catch (error) {
            if (error.response?.status === 401) {
                console.error('Unauthorized. Please check your token or login again.');
                // Optionally handle token refresh or logout
            } else {
                console.error('Error toggling favorite:', error);
            }
        }
    };

    const handleImageClick = (index) => {
        setMainImage(product.imageList[index]); // Set clicked image as the main image
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size); // Set the clicked size as selected
    };

    if (!product) {
        return <p>Product not found!</p>;
    }

    return (
        <div className="product">
            <div className="container">
                <div className="images">
                    <div className="mainImage">
                        <img src={mainImage?.image} alt={product.name} />
                    </div>
                    <div className="secondaryImage">
                        {product.imageList.map((image, index) => (
                            <img
                                key={index}
                                src={image.image}
                                alt={`${product.name} ${index + 1}`}
                                onClick={() => handleImageClick(index)} // Set clicked image as the main image
                                className={mainImage === image ? 'active' : 'blurred'} // Conditional styling
                            />
                        ))}
                    </div>
                </div>
                <div className="description">
                    <div className="wishlistIcon" onClick={toggleFavorite}>
                        <img
                            src="/src/assets/product__like.svg"
                            alt="heart"
                            className={isLiked ? 'Unlike' : 'Like'}
                        />
                    </div>
                    <div className="desc__wrapper">
                        <div className="text">
                            <p className="title">{product.name}</p>
                            <p className="price">${product.price}</p>
                            <p className="company">MRP incl. of all taxes</p>
                            <p className="textDesc">{product.description}</p>
                        </div>
                        <div className="other">
                            <p className="size__text">Size</p>
                            <div className="sizes">
                                {['XS', 'S', 'M', 'L', 'XL', '2X'].map((size) => (
                                    <div
                                        key={size}
                                        className={`sizes__items ${selectedSize === size ? 'selected' : ''}`} // Conditional class
                                        onClick={() => handleSizeClick(size)} // Set selected size
                                    >
                                        <p>{size}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text__add">FIND YOUR SIZE | MEASUREMENT GUIDE</p>
                            <Button
                                value={isInCart ? "DELETE" : "ADD"} // Dynamic button text
                                onClick={toggleCartAction} // Dynamic action handler
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;

