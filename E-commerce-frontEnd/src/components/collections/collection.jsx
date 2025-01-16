import React, { useState, useEffect } from "react";
import style from "./category.module.css";
import "./style.css";
import Line from "../../components/forMain/line/line.jsx";
import Images from "../../components/forMain/line__images/images.jsx";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Collection({ content }) {
    const [isAvailabilityOpen, setAvailabilityOpen] = useState(false);
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [isPriceRangeOpen, setPriceRangeOpen] = useState(false);
    const [isCollectionsOpen, setCollectionsOpen] = useState(false);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        availability: { inStock: false, outOfStock: false },
        categories: [],
        priceRanges: [],
        collections: [],
    });

    const [filteredProducts, setFilteredProducts] = useState(content);

    const getToggleIcon = (isOpen) => (isOpen ? "/src/assets/openV.svg" : "/src/assets/closeV.svg");

    useEffect(() => {
        let filtered = content;

        // Apply filters dynamically
        if (filters.availability.inStock) {
            filtered = filtered.filter(product => product.inStock);
        } else if (filters.availability.outOfStock) {
            filtered = filtered.filter(product => !product.inStock);
        }

        if (filters.categories.length > 0) {
            filtered = filtered.filter(product =>
                filters.categories.includes(product.category.name)
            );
        }

        if (filters.priceRanges.length > 0) {
            filtered = filtered.filter(product => {
                return filters.priceRanges.some(([min, max]) =>
                    max ? product.price >= min && product.price <= max : product.price >= min
                );
            });
        }

        if (filters.collections.length > 0) {
            filtered = filtered.filter(product =>
                filters.collections.some(collection =>
                    product.description.includes(collection)
                )
            );
        }

        setFilteredProducts(filtered);
    }, [filters, content]);

    const handleAvailabilityChange = (type) => {
        setFilters((prev) => ({
            ...prev,
            availability: {
                inStock: type === "inStock" ? !prev.availability.inStock : false,
                outOfStock: type === "outOfStock" ? !prev.availability.outOfStock : false,
            },
        }));
    };

    const handleCategoryChange = (category) => {
        setFilters((prev) => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter((cat) => cat !== category)
                : [...prev.categories, category],
        }));
    };

    const handlePriceRangeChange = (range) => {
        setFilters((prev) => ({
            ...prev,
            priceRanges: prev.priceRanges.some((r) => r[0] === range[0] && r[1] === range[1])
                ? prev.priceRanges.filter((r) => r[0] !== range[0] || r[1] !== range[1])
                : [...prev.priceRanges, range],
        }));
    };

    const handleCollectionChange = (collection) => {
        setFilters((prev) => ({
            ...prev,
            collections: prev.collections.includes(collection)
                ? prev.collections.filter((col) => col !== collection)
                : [...prev.collections, collection],
        }));
    };

    const handleOnClick = () => {
        navigate(`/home`);
    };

    return (
        <div className={style.container}>
            <div className={style.filter}>
                <div className={style.text}>
                    <div className={style.filter__text}>
                        <p>Filters</p>
                    </div>
                </div>

                {/* Availability Section */}
                <div className={style.avility}>
                    <Line />
                    <div
                        className={style.option}
                        onClick={() => setAvailabilityOpen(!isAvailabilityOpen)}
                    >
                        <p>Availability</p>
                        <img src={getToggleIcon(isAvailabilityOpen)} alt="" />
                    </div>
                    {isAvailabilityOpen && (
                        <div className={style.filter__choose}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.availability.inStock}
                                    onChange={() => handleAvailabilityChange("inStock")}
                                />
                                In Stock
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={filters.availability.outOfStock}
                                    onChange={() => handleAvailabilityChange("outOfStock")}
                                />
                                Out of Stock
                            </label>
                        </div>
                    )}
                </div>

                {/* Category Section */}
                <div className={style.category}>
                    <Line />
                    <div
                        className={style.option}
                        onClick={() => setCategoryOpen(!isCategoryOpen)}
                    >
                        <p>Category</p>
                        <img src={getToggleIcon(isCategoryOpen)} alt="" />
                    </div>
                    {isCategoryOpen && (
                        <div className={style.filter__choose}>
                            {Array.from(new Set(content.map(product => product.category.name)))
                                .map(category => (
                                    <label key={category}>
                                        <input
                                            type="checkbox"
                                            checked={filters.categories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        {category}
                                    </label>
                                ))}
                        </div>
                    )}
                </div>

                {/* Price Range Section */}
                <div className={style.price__range}>
                    <Line />
                    <div
                        className={style.option}
                        onClick={() => setPriceRangeOpen(!isPriceRangeOpen)}
                    >
                        <p>Price Range</p>
                        <img src={getToggleIcon(isPriceRangeOpen)} alt="" />
                    </div>
                    {isPriceRangeOpen && (
                        <div className={style.filter__choose}>
                            {[ [0, 100], [101, 200], [200, 500], [500, null] ].map(range => (
                                <label key={`${range[0]}-${range[1] || '...'}`}>
                                    <input
                                        type="checkbox"
                                        checked={filters.priceRanges.some(
                                            r => r[0] === range[0] && r[1] === range[1]
                                        )}
                                        onChange={() => handlePriceRangeChange(range)}
                                    />
                                    {range[0]} - {range[1] ? `$${range[1]}` : "..."}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Collections Section */}
                <div className={style.collections}>
                    <Line />
                    <div
                        className={style.option}
                        onClick={() => setCollectionsOpen(!isCollectionsOpen)}
                    >
                        <p>Collections</p>
                        <img src={getToggleIcon(isCollectionsOpen)} alt="" />
                    </div>
                    {isCollectionsOpen && (
                        <div className={style.filter__choose}>
                            {["Squid Game", "PUMATECH"].map(collection => (
                                <label key={collection}>
                                    <input
                                        type="checkbox"
                                        checked={filters.collections.includes(collection)}
                                        onChange={() => handleCollectionChange(collection)}
                                    />
                                    {collection}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                <Line />
            </div>

            {/* Product Section */}
            <div className={style.product}>
                <div className={style.text}>
                    <p className={style.title} onClick={handleOnClick}>Home / Products</p>
                    <p className={style.name}>PRODUCTS</p>
                </div>
                <div className={style.images}>
                    <Images content={filteredProducts} />
                </div>
            </div>
        </div>
    );
}

export default Collection;




