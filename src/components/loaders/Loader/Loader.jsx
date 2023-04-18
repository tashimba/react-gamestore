import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.block}>
      <svg className={styles.svgLoader} viewBox="25 25 50 50">
        <circle className={styles.circleLoader} r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Loader;
