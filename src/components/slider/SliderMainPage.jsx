import React from "react";
import styles from "./sliderMainPage.module.scss";
import { Link } from "react-router-dom";

const SliderMainPage = ({ data }) => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
  const delay = 3500;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  const handleSlideNext = (e) => {
    if (e === 1) {
      index < data.length - 1 ? setIndex(index + 1) : setIndex(0);
    } else {
      index > 0 ? setIndex(index - 1) : setIndex(data.length - 1);
    }
  };

  return (
    <div className={styles.slideshow}>
      <button className={styles.prevButton} onClick={() => handleSlideNext(0)}>
        <span>◀</span>
      </button>
      <button className={styles.nextButton} onClick={() => handleSlideNext(1)}>
        <span>▶</span>
      </button>
      <div
        className={styles.slideshowSlider}
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {data.map((el, index) => (
          <>
            <Link to={`game/${data[index].id}`} key={el.id}>
              <div
                className={styles.slide}
                key={el.id}
                style={{
                  backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9) ),url(${el.background_image}) `,
                  // opacity: "0.5",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <h1 className={styles.title}>{el.name}</h1>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default SliderMainPage;
