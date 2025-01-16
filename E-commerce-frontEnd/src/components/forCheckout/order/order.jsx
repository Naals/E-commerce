import style from './order.module.css';
import Line from "../../forMain/line/line.jsx";
import Total from "../../ui/subtotal/total.jsx";
import Items from "/src/components/forCheckout/imageItem/items.jsx"

function Order({subtotal, shipping}) {

    return (
        <div className={style.container}>
            <div className={style.title}>
                <p>YOUR ORDER</p>
            </div>
            <div className={style.items}>
                <Items />
            </div>
            <Line/>
            <div className={style.total}>
                <Total subtotal={subtotal} shipping={shipping}/>
            </div>
        </div>
    )
}

export default Order;