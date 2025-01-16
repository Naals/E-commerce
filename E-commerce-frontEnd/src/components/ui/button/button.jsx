import style from './button.module.css';

function Button({ value, onClick, type = "button" }) {
    return (
        <button className={style.btn} onClick={onClick} type={type}>
            {value}
        </button>
    );
}

export default Button;
