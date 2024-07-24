import React from "react";
import {useNavigate} from "react-router-dom"
import style from "./style.module.css";
import Iimg from "./image/introImg.png";
const Intro = () => {
  const nav = useNavigate();
  const SignIn = () => {
    nav("/signIn");
  };

  return (
    <div className={style.mainWindow}>
      <div className={style.IntroMainFlex}>
        <div className={style.IntroMainChild1}>
          <p className={style.IntroTitle}>Aggregation Pipeline</p>
          <p className={style.IntroDescription}>Ace MongoDB Problems</p>
          <button className={style.IntroButton1} onClick={SignIn}>
            Let's go
          </button>
        </div>
        <div>
          <img className={style.IntroImageStyle} src={Iimg} alt="#" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
