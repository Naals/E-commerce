import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Next from '/src/components/forMain/nextPrev/next.jsx';

// eslint-disable-next-line react/prop-types
function Collection({ content }) {
    const [currentIndex, setCurrentIndex] = useState(0); // Start index for current items
    const [shownIndices, setShownIndices] = useState([]); // Tracks indices of already shown items
    const [history, setHistory] = useState([]); // Tracks navigation history for Prev functionality
    const navigate = useNavigate();

    const handleImageClick = (item) => {
        navigate(`/product/${item.id}`, { state: item });
    };

    const handleToCollections = () => {
        navigate(`/collections`);
    }


    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex;

            // Find the next index that hasn't been shown
            for (let i = 0; i < content.length; i++) {
                const candidateIndex = (prevIndex + 2 + i) % content.length;
                if (!shownIndices.includes(candidateIndex)) {
                    nextIndex = candidateIndex;
                    break;
                }
            }

            // Update shownIndices and history
            setShownIndices((prevShown) => {
                const newShown = [...prevShown, nextIndex];
                if (newShown.length >= content.length) {
                    return []; // Reset after showing all items
                }
                return newShown;
            });

            setHistory((prevHistory) => [...prevHistory, nextIndex]); // Save to history
            return nextIndex;
        });
    };

    const handlePrev = () => {
        setHistory((prevHistory) => {
            if (prevHistory.length > 1) {
                prevHistory.pop(); // Remove the current step
                const prevIndex = prevHistory[prevHistory.length - 1]; // Get the last step
                setCurrentIndex(prevIndex); // Set the index to the previous step
                return [...prevHistory];
            }
            return prevHistory; // No-op if no history to reverse to
        });
    };

    // Determine the two items to display
    const visibleItems = [
        content[currentIndex],
        content[(currentIndex + 1) % content.length], // Ensure wrap-around for the second item
    ].filter(Boolean); // Handle cases where content is less than 2 items

    return (
        <div className="collections">
            <div className="container">
                <div className="collections__wrapper">
                    <div className="collections__text">
                        <div className="title">
                            <p className="new">NEW <br /> COLLECTIONS</p>
                            <p className="summer">Summer <br />2024</p>
                        </div>
                        <div className="collection__buttons">
                            <div className="goToShop">
                                <button className="shopp" onClick={handleToCollections}>Go To Shop</button>
                                <img src="/src/assets/vectorRight.svg" alt="" className="shop__image" />
                            </div>
                            <Next onNext={handleNext} onPrev={handlePrev} />
                        </div>
                    </div>
                    <div className="collections__image">
                        {visibleItems.map((item) => (
                            <div
                                className="image__item"
                                key={item.id}
                                onClick={() => handleImageClick(item)}
                            >
                                <img src={item.imageList[0]?.image} alt={item.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;
