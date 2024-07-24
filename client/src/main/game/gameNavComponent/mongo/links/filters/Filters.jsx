import React from "react";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDStore } from "../../../../../../state/contnentStoreSlice";
import { fullDReplaceStore } from "../../../../../../state/contnentStoreSlice";
const Filters = () => {
  const dispatch = useDispatch();
  const dStore = useSelector((state) => state.dstore.content);

  const setElementHandle = (elem) => {
    const array = [...dStore];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === "cursor") {
        array.splice(i, 0, elem);
        i++;
      }
    }
    dispatch(fullDReplaceStore(array));
  };
  return (
    <div className={style.MainFiltersBlock}>
      <button
        onClick={() => {
          setElementHandle("$count:");
        }}
        className={style.FilterButtons}
      >
        $count
      </button>
      <button
        onClick={() => {
          setElementHandle("$max:");
        }}
        className={style.FilterButtons}
      >
        $max
      </button>
      <button
        onClick={() => {
          setElementHandle("$min:");
        }}
        className={style.FilterButtons}
      >
        $min
      </button>
      <button
        onClick={() => {
          setElementHandle("$avg:");
        }}
        className={style.FilterButtons}
      >
        $avg
      </button>
      <button
        onClick={() => {
          setElementHandle("$sum:");
        }}
        className={style.FilterButtons}
      >
        $sum
      </button>
      <button
        onClick={() => {
          setElementHandle("$gt:");
        }}
        className={style.FilterButtons}
      >
        $gt
      </button>
      <button
        onClick={() => {
          setElementHandle("$lt:");
        }}
        className={style.FilterButtons}
      >
        $lt
      </button>
      <button
        onClick={() => {
          setElementHandle("$gte:");
        }}
        className={style.FilterButtons}
      >
        $gte
      </button>
      <button
        onClick={() => {
          setElementHandle("$lte:");
        }}
        className={style.FilterButtons}
      >
        $lte
      </button>
    </div>
  );
};

export default Filters;
