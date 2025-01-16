import { useState } from "react";
import style from "./info.module.css";
import Button from "/src/components/ui/button/buttonArrow.jsx";
import Line from "../../forMain/line/line.jsx";

function Order() {
    const [formValues, setFormValues] = useState({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        country: "",
        state: "",
        address: "",
        city: "",
        postalCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        const errors = {};

        Object.entries(formValues).forEach(([key, value]) => {
            if (!value.trim()) {
                errors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
            }
        });

        if (formValues.cardNumber && !/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formValues.cardNumber)) {
            errors.cardNumber = "Card number must be in the format 1234 5678 9012 3456";
        }

        if (formValues.expiryDate && !/^\d{2}\/\d{2}$/.test(formValues.expiryDate)) {
            errors.expiryDate = "Expiry date must be in the format MM/YY";
        }

        if (formValues.cvv && !/^\d{3}$/.test(formValues.cvv)) {
            errors.cvv = "CVV must be 3 digits";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSuccess(true);

            // Optionally clear the form fields after submission
            setFormValues({
                email: "",
                phone: "",
                firstName: "",
                lastName: "",
                country: "",
                state: "",
                address: "",
                city: "",
                postalCode: "",
                cardNumber: "",
                expiryDate: "",
                cvv: "",
            });

            // Hide success alert after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        }
    };

    return (
        <div className={style.form__container}>
            {success && (
                <div className={style.successAlert}>
                    <div className={style.successCircle}>
                        <span className={style.successCheck}>&#10003;</span>
                    </div>
                    <p className={style.successMessage}>Order successfully placed!</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <p>Contact Info</p>
                <div className={style.form__group}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? style.invalid : ""}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                        className={formErrors.phone ? style.invalid : ""}
                    />
                </div>
                <Line />
                <p>Shipping Address</p>
                <div className={style.form__row}>
                    <div className={style.form__group__column}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formValues.firstName}
                            onChange={handleInputChange}
                            className={formErrors.firstName ? style.invalid : ""}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formValues.lastName}
                            onChange={handleInputChange}
                            className={formErrors.lastName ? style.invalid : ""}
                        />
                    </div>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formValues.country}
                        onChange={handleInputChange}
                        className={formErrors.country ? style.invalid : ""}
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State / Region"
                        value={formValues.state}
                        onChange={handleInputChange}
                        className={formErrors.state ? style.invalid : ""}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formValues.address}
                        onChange={handleInputChange}
                        className={formErrors.address ? style.invalid : ""}
                    />
                    <div className={style.form__group__column}>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formValues.city}
                            onChange={handleInputChange}
                            className={formErrors.city ? style.invalid : ""}
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={formValues.postalCode}
                            onChange={handleInputChange}
                            className={formErrors.postalCode ? style.invalid : ""}
                        />
                    </div>
                </div>
                <Line />
                <p>Payment Information</p>
                <div className={style.form__row}>
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number (1234 5678 9012 3456)"
                        maxLength="19"
                        value={formValues.cardNumber}
                        onChange={handleInputChange}
                        className={formErrors.cardNumber ? style.invalid : ""}
                    />
                    <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        maxLength="5"
                        value={formValues.expiryDate}
                        onChange={handleInputChange}
                        className={formErrors.expiryDate ? style.invalid : ""}
                    />
                    <input
                        type="password"
                        name="cvv"
                        placeholder="CVV"
                        maxLength="3"
                        value={formValues.cvv}
                        onChange={handleInputChange}
                        className={formErrors.cvv ? style.invalid : ""}
                    />
                </div>
                <div className={style.form__button}>
                    <Button value="Buy Now" type="submit" />
                </div>
            </form>
        </div>
    );
}

export default Order;
