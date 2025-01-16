import style from './total.module.css';
import Line from '../../forMain/line/line.jsx';

function Total({ subtotal, shipping }) {
    // Ensure subtotal and shipping are numbers
    const validatedSubtotal = typeof subtotal === "number" ? subtotal : parseFloat(subtotal) || 0;
    const validatedShipping = typeof shipping === "number" ? shipping : parseFloat(shipping) || 0;

    const total = validatedSubtotal + validatedShipping;

    return (
        <div className={style.container}>
            <div className={style.orderPrice}>
                <div>
                    <p>Subtotal</p>
                    <p>${validatedSubtotal.toFixed(2)}</p>
                </div>
                <div>
                    <p>Shipping</p>
                    <p>${validatedShipping.toFixed(2)}</p>
                </div>
            </div>
            <Line />
            <div className={style.orderTotal}>
                <p>TOTAL (Tax incl.)</p>
                <p>${total.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default Total;
