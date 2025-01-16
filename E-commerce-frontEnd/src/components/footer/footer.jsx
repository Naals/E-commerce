import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="wrapper">
                    <div className="left">
                        <div className="leftTop">
                            <div className="info">
                                <p>INFO</p>
                            </div>
                            <div>
                                <button className="text" id="pricing">PRICING</button>
                                <button className="text" id="about">ABOUT</button>
                                <button className="text" id="contacts">CONTACTS</button>
                            </div>
                        </div>
                        <div className="leftBottom">
                            <div className="info">
                                <p>LANGUAGES</p>
                            </div>
                            <div className="languages">
                                <button className="text">ENG /</button>
                                <button className="text">ESP /</button>
                                <button className="text">SVO /</button>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="rightTop">
                            <p className="info">TECHNOLOGIES</p>
                        </div>
                        <div className="rightBottom">
                            <img src="/src/assets/footer__logo.svg" alt="logo" className="footer__logo"/>
                            <img src="/src/assets/technologies.svg" alt="technologies" className="footer__image"/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;