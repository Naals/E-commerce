import style from './wish.module.css'
import Images from "../forFavourite/images.jsx";
import {useEffect, useState} from "react";
import UserService from "../../redux/services/user.service.jsx";

function WishList() {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserFavourites().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                    error.toString();

                setContent(content);
            }
        );
    }, []);

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.text}>
                    <p className={style.title}>Favourites</p>
                </div>
                <div className={style.images}>
                    <Images content={content} />
                </div>
            </div>
        </div>
    )
}

export default WishList;
