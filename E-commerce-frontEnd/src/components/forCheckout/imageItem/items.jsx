import style from './items.module.css';
import { useEffect, useState } from "react";
import UserService from "../../../redux/services/user.service.jsx";

function Items() {
    const [cartItems, setCartItems] = useState([]); // State to store fetched cart data
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Fetch cart data from API
        UserService.getUserCart()
            .then((response) => {
                setCartItems(response.data); // Assuming response.data is the array of items
            })
            .catch((error) => {
                console.error("Failed to fetch cart data:", error);
                setError("Failed to load cart items. Please try again.");
            });
    }, []);

    if (error) {
        return <p className={style.error}>{error}</p>;
    }

    if (cartItems.length === 0) {
        return <p className={style.empty}>Your cart is empty.</p>;
    }

    return (
        <div className={style.arrayOfItem}>
            {cartItems.map((item, index) => (
                <div className={style.items} key={index}>
                    <div className={style.image}>
                        <img src={item.imageList[0]?.image} alt={item.name} /> {/* Assuming `image` and `name` exist */}
                    </div>
                    <div className={style.text}>
                        <div className={style.desc}>
                            <p>{item.name}</p>
                            <u>Change</u>
                        </div>
                        <div className={style.bottom}>
                            <p className={style.quantity}>({item.quantity})</p> {/* Assuming `quantity` exists */}
                            <p className={style.price}>${item.price}</p> {/* Assuming `price` exists */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Items;
