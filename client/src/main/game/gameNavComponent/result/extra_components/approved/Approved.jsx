import React from "react";
import style from "./approve.module.css";
import {useSelector, useDispatch} from "react-redux";
import { fullDReplaceStore } from "../../../../../../state/contnentStoreSlice";
import { finallyFetchAsync } from "../../../../../../state/fetchDataSlice";
import { fetchUserInfoAsync } from "../../../../../../state/userDataSlice";
import { setData } from "../../../../../../state/tableSlice";
const Approved = ({onStart}) => {
  const token = useSelector((state)=> state.auth.token);
  const dispatch = useDispatch();

  const FinalMission = async ()=> {
    try{
      dispatch(finallyFetchAsync(token));
      dispatch(fullDReplaceStore(["cursor"]));
      dispatch(fetchUserInfoAsync(token));
      dispatch(setData([{}]))
      onStart();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className={style.mainDenyBlock}>
      <div className={style.stamp}>
        <span>Approved</span>
      </div>
      <p className={style.text}>Very well done!</p>
      <button onClick={()=> FinalMission()} className={style.button}>Next Problem</button>
    </div>
  );
};

export default Approved;
