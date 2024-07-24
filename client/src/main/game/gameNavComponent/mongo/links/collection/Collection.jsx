import React from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import {setDStore} from "../../../../../../state/contnentStoreSlice"
import { fullDReplaceStore } from "../../../../../../state/contnentStoreSlice";

const Collection = () => {
  const dispatch = useDispatch();
  const Ddata = useSelector((state)=> state.dstore.content);
  const info = useSelector((state) => state.fetch.data);
  let arrayOfCollectionProperties = info.properties.split(' ');

  const StoreDataFunc = (elem, index) => {

    let copyDstore = [...Ddata];

    if(elem === `${info.db_name}.`){
      copyDstore.unshift(elem);
      dispatch(fullDReplaceStore(copyDstore));
    }
    else if(elem == "$limit:"){
      for (let i = 0; i < copyDstore.length; i++) {
        if (copyDstore[i] === "cursor") {
          copyDstore.splice(i, 0, elem);
          i++;
        }
      }
      dispatch(fullDReplaceStore(copyDstore));
    }
    else if(elem === "$match:" || elem === "$group:" ||
     elem === "$project:" ||
     elem === "$sort:" ||
     elem === "$sortByCount:"){
      for(let i =0; i < copyDstore.length; i++){
        if(copyDstore[i] === "cursor"){
          copyDstore.splice(i, 0, elem + " {");
          i++;
        }
      }
      for(let i = 0;i < copyDstore.length; i++){
        if(copyDstore[i] === "cursor"){
          copyDstore.splice(i+1, 0, "}");
          i++;
        }
      }
      dispatch(fullDReplaceStore(copyDstore));
    }
    else if(elem === "{" || elem === "}"){
      for(let i =0; i < copyDstore.length; i++){
        if(copyDstore[i] === "cursor"){
          copyDstore.splice(i, 0, elem);
          i++;
        }
      }
      dispatch(fullDReplaceStore(copyDstore));
    }
    else if(index === 1 && elem != null){
      for(let i =0; i < copyDstore.length; i++){
        if(copyDstore[i] === "cursor"){
          copyDstore.splice(i, 0, elem + ":");
          i++;
        }
      }
      dispatch(fullDReplaceStore(copyDstore));
    }
    else{
      console.log("not applied yet");
    }
  }



  return (
    <div className={style.MainCollectionBlock}>
      <div className={style.firstBlock}>
        <div className={style.firstGroupOfButtons}>
          <button onClick={()=>{StoreDataFunc("$match:")}} className={style.queryButtons}>$match</button>
          <button onClick={()=>{StoreDataFunc("$group:")}} className={style.queryButtons}>$group</button>
          <button onClick={()=> {StoreDataFunc("$project:")}} className={style.queryButtons}>$project</button>
          <button onClick={()=> {StoreDataFunc("$sort:")}} className={style.queryButtons}>$sort</button>
          <button onClick={()=> {StoreDataFunc("$limit:")}} className={style.queryButtons}>$limit</button>
          <button onClick={()=> {StoreDataFunc("$sortByCount:")}} className={style.queryButtons}>$sortByCount</button>
        </div>
        <div className={style.secondGroupOfButtons}>
          <div className={style.firstBlockOfCollection}>
            <button onClick={()=> {StoreDataFunc("{")}} className={style.bracketsButtons1}>&#123;</button>
            <button onClick={()=> {StoreDataFunc(info.db_name+".")}} className={style.collectionNameButton}>{info.db_name}</button>
            <button onClick={()=> {StoreDataFunc("}")}} className={style.bracketsButtons2}>&#125;</button>
          </div>
          <div className={style.secondBlockOfCollection}>
            {
              arrayOfCollectionProperties.map((elem, index)=> (
                <button onClick={()=> {
                  StoreDataFunc(elem, 1)
                }} className={style.propertiesButtonsClock} key={index}>{elem}</button>
              ))
            }
          </div>
        </div>
      </div>
      <div className={style.secondBlock}></div>
    </div>
  );
};

export default Collection;
