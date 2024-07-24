import React from "react";
import style from "./style.module.css";
const ProblemComponent = ({ task, onNext }) => {
  return (
    <div className={style.MainProblemBorder}>
      <div className={style.InsideBox}>
        <h2 className={style.mongoProblemHeader}>Mongo Problem</h2>
        <div className={style.v_text}>
          <p className={style.problemText}>{task}</p>
        </div>
        <div className={style.v_text}>
          <p className={style.helperText}>
            Use MongoDb Aggregation Pipeline to retriece the data and submit the
            resulting collection.
          </p>
        </div>
        <div className={style.SubmitDataButton}>
          <button onClick={()=> {onNext()}} className={style.dataButton}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ProblemComponent;
