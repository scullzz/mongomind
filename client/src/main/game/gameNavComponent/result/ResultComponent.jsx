import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MongoDbComponent from "../mongo/MongoDbComponent";
import style from "./style.module.css"; // Import your CSS style
import Loader from "./extra_components/load/Loader";
import Approved from "./extra_components/approved/Approved";
import Denied from "./extra_components/denied/Denied";

const ResultComponent = ({ onNext, onStart }) => {
  const [checkerForApprove, setCheckerForApprove] = useState(false);
  const [checkerForDenying, setCheckerForDenying] = useState(false);
  const [loadingChecker, setLoadingChecker] = useState(false);

  const data = useSelector((state) => state.auth.token);
  const result = useSelector((state) => state.table.tableData);

  let properties = [];
  let modifiedTableData = [{}];
  if(Object.keys(result[0])[Object.keys(result[0]).length - 1] === "__v"){
    properties = Object.keys(result[0]).slice(0, -1);
    modifiedTableData = result.slice(0, -1);
  }
  else{
    properties = Object.keys(result[0]);
    modifiedTableData = result;
  }


  const isApproved = async () => {
    try {
      const ans = { result };
      setLoadingChecker(true);
      
      const fetchPromise = fetch("http://localhost:8000/mongomind/func/checkTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data}`,
        },
        body: JSON.stringify(ans),
      });
    
      // This function returns a promise that resolves after a specified delay
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
      // Ensure the animation gets a minimum display time of 3 seconds
      await Promise.all([fetchPromise, delay(3000)]);
    
      setLoadingChecker(false);
    
      const response = await fetchPromise;
      if(response.ok) {
        const fullAns = await response.json();
        if(fullAns.message === "passed") {
          setCheckerForApprove(true);
        } else {
          setCheckerForDenying(true);
        }
      } else {
        console.log("Error on sending data.");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
    
  };
  return (
    <div>
      <div className={style.ChecerBlockD}>
        {checkerForDenying ? <Denied onNext={onNext}></Denied> : null}
      </div>
      <div className={style.ChecerBlockA}>
        {checkerForApprove ? <Approved onStart={onStart}></Approved> : null}
      </div>
      <div className={style.BlockThatCanNotSee}>
        {loadingChecker === true ? <Loader></Loader> : null};
      </div>
      <div className={style.MainResultBlockOverflow}>
        <div className={result.length != 1 ? style.HiddenButton : style.v_text}>
          <p className={style.NothingToShow1}>No query has been run yet,</p>
          <p className={style.NothingToShow2}> no results to show.</p>
          <button onClick={() => onNext()} className={style.buttonEnter}>
            Enter a Query
          </button>
        </div>
        <table className={style.tableColor}>
          <thead>
            <tr className={style.theadBlock}>
              {properties.map((item, index) => (
                <th key={index} className={style.maintableElem}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={style.tbodyBlock}>
            {modifiedTableData.map((rowData, rowIndex) => (
              <tr className={style.tbodyBlock} key={rowIndex}>
                {properties.map((property, columnIndex) => (
                  <td key={columnIndex} className={style.tableElem}>
                    {rowData[property]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={style.ButtonLocation}>
        <button
          onClick={() => isApproved()}
          className={
            result.length == 1 ? style.HiddenButton : style.ApprobedOrNotButton
          }
        >
          Submit Result
        </button>
      </div>
    </div>
  );
};

export default ResultComponent;
