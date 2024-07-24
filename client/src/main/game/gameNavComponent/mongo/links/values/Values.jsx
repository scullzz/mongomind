import React, { useEffect } from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import {fullDReplaceStore, setDStore} from "../../../../../../state/contnentStoreSlice";

const Values = () => {
  const data = useSelector((state) => state.fetch.data);
  const dStore = useSelector((state)=> state.dstore.content);

  const dispatch = useDispatch();

  const ValueHandleFunc = (elem) => {
    const array = [...dStore];
    for(let i =0; i < dStore.length; i++){
      if(dStore[i] === "cursor"){
        array.splice(i, 0, elem);
        i++;
      }
    } 
    dispatch(fullDReplaceStore(array));
  }

  // Check if data is available and extraButtons is not an empty array
  let extraButtons =
    data && data.extraFileds ? data.extraFileds.split(" ") : [];
  return (
    <div className={style.MainBlockValues}>
      {extraButtons.length > 0 &&
        extraButtons.map((elem, index) => (
          <button onClick={()=> ValueHandleFunc(elem)} key={index} className={style.ValueButtonsClick}>
            {elem}
          </button>
        ))}
    </div>
  );
};

export default Values;
