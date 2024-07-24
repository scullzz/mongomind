import React from "react";
import style from "./deny.module.css";
const Denied = ({onNext}) => {
  return (
    <div className={style.mainDenyBlock}>
      <div className={style.stamp}>
        <span>Denied</span>
      </div>
      <p className={style.text}>Wrong Pipeline :&#10088;</p>
      <button onClick={()=> onNext()} className={style.button}>Try Again</button>
    </div>
  );
};

export default Denied;
