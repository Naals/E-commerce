import style from './order.module.css';
import Line from '/src/components/forMain/line/line.jsx';
import { useEffect, useState } from "react";
import UserService from "../../redux/services/user.service.jsx";
import Total from "../ui/subtotal/total.jsx";
import { Link } from "react-router-dom";

function Order() {
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const shippingCost = 10;
    const sizes = ["XS", "S", "M", "L", "XL", "2X"]; // Predefined sizes

    useEffect(() => {
        UserService.getUserCart()
            .then((response) => {
                const updatedProducts = response.data.map((product) => ({
                    ...product,
                    size: "M", // Default size
                    quantity: 1, // Default quantity
                }));
                setProducts(updatedProducts);
                calculateSubtotal(updatedProducts);
            })
            .catch((error) => {
                console.error("Failed to fetch cart data:", error);
            });
    }, []);

    const calculateSubtotal = (products) => {
        const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        setSubtotal(total);
    };

    const handleRemoveProduct = async (productId) => {
        // Filter out the product with the specified ID
        const updatedProducts = products.filter((product) => product.id !== productId);
        await UserService.deleteUserCart({productId: productId});
        setProducts(updatedProducts);
        calculateSubtotal(updatedProducts);

        // Optional: Make API call to update the backend cart
        UserService.deleteUserCart({id: productId})
            .then(() => {
                console.log(`Product with ID ${productId} removed from the cart.`);
            })
            .catch((error) => {
                console.error("Failed to remove product from the cart:", error);
            });
    };

    const handleQuantityChange = (productId, delta) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product) => {
                if (product.id === productId) {
                    const newQuantity = product.quantity + delta;
                    return {
                        ...product,
                        quantity: Math.min(Math.max(1, newQuantity), 7), // Limit between 1 and 7
                    };
                }
                return product;
            });
            calculateSubtotal(updatedProducts);
            return updatedProducts;
        });
    };

    const handleSizeChange = (productId, direction) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id === productId) {
                    const currentIndex = sizes.indexOf(product.size);
                    let newIndex = currentIndex;

                    if (direction === "next" && currentIndex < sizes.length - 1) {
                        newIndex += 1; // Increment size
                    } else if (direction === "prev" && currentIndex > 0) {
                        newIndex -= 1; // Decrement size
                    }

                    return { ...product, size: sizes[newIndex] };
                }
                return product;
            })
        );
    };

    return (
        <div className={style.container}>
            <div className={style.title}>
                <p className={style.shopping}>SHOPPING BAG</p>
                <p className={style.favourite}>FAVOURITES</p>
            </div>

            <div className={style.order}>
                <div className={style.orderLeft}>
                    <Line />
                    <div className={style.orderProduct}>
                        {products.map((product) => (
                            <div key={product.id} className={style.orderItem}>
                                <img
                                    src={product.imageList[0]?.image}
                                    alt={product.name}
                                    className={style.productImage}
                                />
                                <div className={style.manage}>
                                    <img
                                        src="/src/assets/x.svg"
                                        alt="Remove"
                                        className={style.exit}
                                        onClick={() => handleRemoveProduct(product.id)} // Attach remove handler
                                    />
                                    <div className={style.sizeSelector}>
                                        <div className={style.sizeButtons}>
                                            <button
                                                className={style.btn}
                                                onClick={() => handleSizeChange(product.id, "next")}
                                                disabled={sizes.indexOf(product.size) === sizes.length - 1} // Disable if size is maximum
                                            >
                                                +
                                            </button>
                                            <button className={style.btn}>{product.size}</button>
                                            <button
                                                className={style.btn}
                                                onClick={() => handleSizeChange(product.id, "prev")}
                                                disabled={sizes.indexOf(product.size) === 0} // Disable if size is minimum
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                    <div className={style.buttons}>
                                        <button
                                            className={style.btn}
                                            onClick={() => handleQuantityChange(product.id, 1)}
                                            disabled={product.quantity >= 7} // Disable if quantity is at max
                                        >
                                            +
                                        </button>
                                        <button className={style.btn}>{product.quantity}</button>
                                        <button
                                            className={style.btn}
                                            onClick={() => handleQuantityChange(product.id, -1)}
                                            disabled={product.quantity <= 1} // Disable if quantity is at minimum
                                        >
                                            -
                                        </button>
                                    </div>
                                    <img src="/src/assets/change.svg" alt="Change" className={style.change} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Line />
                </div>
                <div className={style.orderRight}>
                    <div className={style.rightWrapper}>
                        <div className={style.rightTitle}>
                            <p className={style.title}>ORDER SUMMARY</p>
                        </div>
                        <Total subtotal={subtotal} shipping={shippingCost} />
                        <div className={style.orderAgree}>
                            <input
                                type="checkbox"
                                onChange={(e) => setCheckboxChecked(e.target.checked)}
                            />
                            <p>I agree to the Terms and Conditions</p>
                        </div>
                        <Link
                            to="/checkout"
                            state={{ subtotal, shipping: shippingCost }}
                            className={`${style.continue} ${!checkboxChecked ? style.disabled : ""}`}
                            onClick={(e) => {
                                if (!checkboxChecked) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            CONTINUE
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;







