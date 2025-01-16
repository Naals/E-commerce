import './next.css';

function Next({ onNext, onPrev }) {
    return (
        <div className="nextButton">
            <button className="next" onClick={onPrev}>
                <img src="/src/assets/next.svg" alt="" id="prev" />
            </button>
            <button className="next" onClick={onNext}>
                <img src="/src/assets/next.svg" alt="" />
            </button>
        </div>
    );
}

export default Next;
