import style from './button.module.css'


function Button(props) {
    return (
        <div className={style.goToShop}>
            <button className={style.shopp}>{props.value}</button>
            <img src="/src/assets/vectorRight.svg" alt="" className={style.shop__image}/>
        </div>

    )
}

export default Button;