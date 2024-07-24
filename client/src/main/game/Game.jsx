import React, { useEffect } from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux"
import { useState } from "react";
import ProblemComponent from "./gameNavComponent/problem/ProblemComponent";
import MongoDBComponent from "./gameNavComponent/mongo/MongoDbComponent";
import ResultComponent from "./gameNavComponent/result/ResultComponent";
import ProfileComponent from "./gameNavComponent/profile/ProfileComponent";
import { setDStore } from "../../state/contnentStoreSlice";
const Game = () => {
  const data = useSelector((state) => state.fetch.data);
  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState("problem");

  useEffect(()=> {
    dispatch(setDStore("cursor"))
  }, [])
  const moveToNextSection = () => {
    const nextSection = "mongodb";
    setCurrentSection(nextSection);
  };
  const moveToResultSeccion = () => {
    const nextSeccion = "result";
    setCurrentSection(nextSeccion);
  }
  const moveToStart = () => {
    const nextSection = "problem";
    setCurrentSection(nextSection);
  }

  const setSection = (atributeName) => {
    setCurrentSection(atributeName);
  };
  const getButtonStyle = (section) => {
    return currentSection === section
      ? style.NavigationButtonsActive
      : style.NavigationButtons;
  };

  const renderComponent = () => {
    switch (currentSection) {
      case "problem":
        return <ProblemComponent task={data.task} onNext={moveToNextSection} />;
      case "mongodb":
        return <MongoDBComponent onNext={moveToResultSeccion} />;
      case "result":
        return <ResultComponent onNext={moveToNextSection} onStart={moveToStart}/>;
      case "profile":
        return <ProfileComponent />;
      default:
        return (
          <ProblemComponent
            task={data.task}
            onNext={moveToNextSection}
          />
        );
    }
  }; 

  return (
    <div className={style.MainGame}>
      <div className={style.limitGame}>
        <div className={style.GameHeader}>
          <button
            className={getButtonStyle("problem")}
            onClick={() => setSection("problem")}
          >
            Problem
          </button>
          <div className={style.line}></div>
          <button
            className={getButtonStyle("mongodb")}
            onClick={() => setSection("mongodb")}
          >
            MongoDB
          </button>
          <div className={style.line}></div>
          <button
            className={getButtonStyle("result")}
            onClick={() => setSection("result")}
          >
            Result
          </button>
          <div className={style.line}></div>
          <button
            className={getButtonStyle("profile")}
            onClick={() => setSection("profile")}
          >
            Profile
          </button>
        </div>

        <div className={style.GameBorderLine}>{renderComponent()}</div>
      </div>
    </div>
  );
};

export default Game;
