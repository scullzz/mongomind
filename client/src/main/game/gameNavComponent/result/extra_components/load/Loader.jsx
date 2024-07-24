import React from "react";
import style from "./loader.module.css";
const Loader = () => {
  return (
    <div className={style.MainLoader}>
        <div>
            <p className={style.text}>Sending Problem...</p>
        </div>
      <div className={style.loader}>
        <div className={style.loader_bar}></div>
      </div>
    </div>
  );
};

export default Loader;
