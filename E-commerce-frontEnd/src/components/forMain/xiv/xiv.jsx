import { useState } from "react";
import style from "./style.module.css";
import Images from "../line__images/images.jsx";
import Line from "../line/line.jsx";

function Xiv({ content }) {
    const [category, setCategory] = useState("All"); // Default category
    const [visibleCount, setVisibleCount] = useState(3); // Show 3 items by default
    const [isExpanded, setIsExpanded] = useState(false); // Track "See More"/"Hide" toggle

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setVisibleCount(3); // Reset visible count to 3 when category changes
        setIsExpanded(false); // Reset toggle state
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5); // Simple random shuffle
    };

    const handleToggleExpand = () => {
        if (isExpanded) {
            setVisibleCount(3); // Collapse to 3 items
        } else {
            setVisibleCount(9); // Expand to 9 items
        }
        setIsExpanded(!isExpanded); // Toggle the state
    };

    // Filter content based on selected category (gender filter)
    const filteredContent =
        category === "All"
            ? content
            : content.filter((item) =>
                category === "Men" ? item.category.gender === "MALE" : item.category.gender === "FEMALE"
            );

    // Shuffle filtered content
    const randomContent = shuffleArray([...filteredContent]);

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.collections}>
                    <p>XIV <br /> COLLECTIONS <br /> 23-24</p>
                </div>
                <div className={style.options}>
                    <div className={style.choose}>
                        <ul>
                            <li
                                onClick={() => handleCategoryChange("All")}
                                className={category === "All" ? style.active : ""}
                            >
                                All
                            </li>
                            <li
                                onClick={() => handleCategoryChange("Men")}
                                className={category === "Men" ? style.active : ""}
                            >
                                Men
                            </li>
                            <li
                                onClick={() => handleCategoryChange("Women")}
                                className={category === "Women" ? style.active : ""}
                            >
                                Women
                            </li>
                        </ul>
                    </div>
                    <div className={style.sort}>
                        <p>Sorts(+)</p>
                    </div>
                </div>
                <Line />
                <div className={style.moreImage}>
                    <Images category="other" content={randomContent.slice(0, visibleCount)} />
                </div>

                <div className={style.more} onClick={handleToggleExpand}>
                    <p>{isExpanded ? "Hide" : "See More"}</p>
                    <img
                        src="/src/assets/arraw.svg"
                        alt="arrow"
                        style={{
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Xiv;
