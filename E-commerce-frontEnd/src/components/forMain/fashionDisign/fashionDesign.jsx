import style from './style.module.css';
import Images from "../snakeImage/images.jsx";
function Fashion(){
    return(
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.par}>
                    <p className={style.title}>
                        Our Approach to fashion design
                    </p>
                    <p className={style.text}>
                        at elegant vogue , we blend creativity with craftsmanship to create <br/>
                        fashion that transcends trends and stands the test of time each <br/>
                        design is meticulously crafted, ensuring the highest quelity <br/>
                        exqulsite finish
                    </p>
                </div>
                <Images />
            </div>
        </div>
    )
}

export default Fashion;