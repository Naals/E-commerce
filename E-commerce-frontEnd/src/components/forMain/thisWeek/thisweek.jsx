import { useState } from 'react';
import style from './style.module.css';
import Images from '/src/components/forMain/line__images/images.jsx';

// eslint-disable-next-line react/prop-types
function Thisweek({ content }) {
    const [limit, setLimit] = useState(3); // State to manage the number of items displayed

    const toggleLimit = () => {
        setLimit(limit === 3 ? 6 : 3); // Toggle between showing 3 and 6 items
    };

    return (
        <div className={style.thisweek}>
            <div className={style.container}>
                <div className={style.thisweek__title}>
                    <p className={style.new}>NEW <br /> THIS WEEK</p>
                    <button className={style.see} onClick={toggleLimit}>
                        {limit === 3 ? 'See All' : 'Hide'}
                    </button>
                </div>
                {/* eslint-disable-next-line react/prop-types */}
                <Images category="other" content={content.slice(0, limit)} /> {/* Pass limited content */}
            </div>
        </div>
    );
}

export default Thisweek;
