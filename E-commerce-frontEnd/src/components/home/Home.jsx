import { useState, useEffect } from "react";
import './main.css';
import Search from '/src/components/forMain/search/search.jsx';
import Collection from '/src/components/forMain/newCollection/collection.jsx';
import Thisweek from '/src/components/forMain/thisWeek/thisweek.jsx';
import Xiv from '/src/components/forMain/xiv/xiv.jsx';
import Fashion from '/src/components/forMain/fashionDisign/fashionDesign.jsx';

import UserService from "../../redux/services/user.service.jsx";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);
    console.log(content)

    return(
        <div className="mainPage">
            <div className="container">
                <div className="main__wrapper">
                    <Search />
                    <Collection content={content} />
                    <Thisweek content={content} />
                    <Xiv content={content} />
                    <Fashion />
                </div>
            </div>
        </div>
    )
};

export default Home;