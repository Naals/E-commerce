import './images.module.css';

const SnakeScroll = () => {
    const handleScroll = () => {
        const wrappers = document.querySelectorAll(".wrapper");

        wrappers.forEach((wrapper, index) => {
            const speed = parseFloat(wrapper.getAttribute("data-speed"));
            const offset = window.scrollY * speed * 0.1;

            const direction = index % 2 === 0 ? 1 : -1;

            wrapper.style.transform = `translateY(${offset * direction}px)`;
        });
    };
    window.addEventListener("scroll", handleScroll);

    return(
        <div className="containers">
            
        </div>
    )
}

export default SnakeScroll;