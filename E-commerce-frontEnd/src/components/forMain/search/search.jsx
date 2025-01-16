import './style.css';

function Search() {
    return (
        <div className="search-container">
            <div className="categories">
                <p>MEN</p><p>WOMEN</p><p>KIDS</p>
            </div>
            <div className="search">
                <input type="text" className="search-bar" placeholder="Search"/>
                <img src="/src/assets/search__logo.svg" alt="" className="search__logo"/>
            </div>
        </div>
    )
}

export default Search;