import React from "react";
import style from "./style.module.css";
import { useState, useEffect, createElement } from "react";
import Collection from "./links/collection/Collection";
import Filters from "./links/filters/Filters";
import Values from "./links/values/Values";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDStore } from "../../../../state/contnentStoreSlice";
import { fullDReplaceStore } from "../../../../state/contnentStoreSlice";
import { setData } from "../../../../state/tableSlice";
import { clearStore } from "../../../../state/contnentStoreSlice";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

//&emsp;
const MongoDbComponent = ({onNext}) => {
  const dispatch = useDispatch();
  const Ddata = useSelector((state) => state.dstore.content);
  const tableData = useSelector((state) => state.table.tableData);
  const copyArray = [...Ddata];
  const data = useSelector((state) => state.fetch.data);
  const arrayOfDBProperties = data.properties.split(" ");
  const [checkTrue, setCheckTrue] = useState(false);
  const [msgError, setMsgError] = useState("");

  const [currentSection, setCurrentSection] = useState("collection");

  const getButtonStyle = (section) => {
    return currentSection === section
      ? style.NavigationButtonsActive
      : style.NavigationButtons;
  };

  const renderComponent = () => {
    switch (currentSection) {
      case "collection":
        return <Collection />;
      case "filters":
        return <Filters />;
      case "values":
        return <Values />;
      default:
        return <Collection />;
    }
  };

  const setDispatchMethod = (elem) => {
    let copyDstore = [...Ddata];
    switch (elem) {
      case "aggregate":
        for (let i = 0; i < copyDstore.length; i++) {
          if (copyDstore[i] === "cursor") {
            copyDstore.splice(i, 0, "aggregate([{");
            i++;
          }
        }

        for (let i = 0; i < copyDstore.length; i++) {
          if (copyDstore[i] === "cursor") {
            copyDstore.splice(i + 1, 0, "}])");
            i++;
          }
        }

        dispatch(fullDReplaceStore(copyDstore));
        break;
      case "1":
        for (let i = 0; i < copyDstore.length; i++) {
          if (copyDstore[i] === "cursor") {
            copyDstore.splice(i, 0, "1");
            i++;
          }
        }
        dispatch(fullDReplaceStore(copyDstore));
        break;

      case "0":
        for (let i = 0; i < copyDstore.length; i++) {
          if (copyDstore[i] === "cursor") {
            copyDstore.splice(i, 0, "0");
            i++;
          }
        }
        dispatch(fullDReplaceStore(copyDstore));
        break;
      case "-1":
        for (let i = 0; i < copyDstore.length; i++) {
          if (copyDstore[i] === "cursor") {
            copyDstore.splice(i, 0, "-1");
            i++;
          }
        }
        dispatch(fullDReplaceStore(copyDstore));
        break;
      case ",":
        for (let i = 0; i < copyDstore.length; i++) {
          if (copyDstore[i] === "cursor") {
            copyDstore.splice(i, 0, ",");
            i++;
          }
        }
        dispatch(fullDReplaceStore(copyDstore));
        break;
      default:
        console.log("not yet");
        break;
    }
  };
  //----------------------------------------------------------------
  const deleteMethod = () => {
    let copyDstore = [...Ddata];
    const index = copyDstore.indexOf("cursor");
    if (index !== -1 && index > 0) {
      copyDstore.splice(index - 1, 1);
    }
    dispatch(fullDReplaceStore(copyDstore));
  };
  //----------------------------------------------------------------

  useEffect(() => {
    ChangeMethod();

    console.log(Ddata);
  }, [Ddata]);

  function checkElement(array, element) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] + ":" === element) {
        return true;
      }
    }
    return false;
  }

  const shiftArrayOfElements = (element) => {
    const index = copyArray.indexOf(element);
    const removeIndex = copyArray.indexOf("cursor");
    copyArray.splice(removeIndex, 1);
    copyArray.splice(index + 1, 0, "cursor");
    dispatch(fullDReplaceStore(copyArray));
  };

  const ChangeMethod = () => {
    const elements = [];
    for (let index = 0; index < copyArray.length; index++) {
      const elem = copyArray[index];
      if (elem === "aggregate([{") {
        elements.push(
          <span key={index}>
            <span
              onClick={() => shiftArrayOfElements(elem)}
              className={style.GameSpanElement}
            >
              {elem}
            </span>
            <br />
            <span className={style.Tabnation}></span>
          </span>
        );
      } else if (elem === "cursor") {
        elements.push(<span className={style.cursor}></span>);
      } else if (elem === "}])") {
        elements.push(
          <span key={index}>
            <br />
            <span
              onClick={() => shiftArrayOfElements(elem)}
              className={style.GameSpanElement}
            >
              {elem}
            </span>
          </span>
        );
      } else if (checkElement(arrayOfDBProperties, elem)) {
        elements.push(
          <span key={index}>
            <br />
            <span
              onClick={() => shiftArrayOfElements(elem)}
              className={style.DoubleTabnation}
            >
              {elem}
            </span>
          </span>
        );
      } else if (elem === ",") {
        elements.push(
          <span
            onClick={() => shiftArrayOfElements(elem)}
            key={index}
            className={style.GameSpanElement}
          >
            {elem}
          </span>
        );
        if (
          copyArray[index - 1] === "}" &&
          (copyArray[index - 2] === "1" ||
            copyArray[index - 2] === "-1" ||
            copyArray[index - 2] === "0")
        ) {
          elements.push(
            <span>
              <br />
              <span className={style.Tabnation}></span>
            </span>
          );
        }
      } else if (elem === "1" || elem === "-1" || elem === "0") {
        elements.push(
          <span
            onClick={() => shiftArrayOfElements(elem)}
            key={index}
            className={style.GameSpanElement}
          >
            {" " + elem}
          </span>
        );
        if (
          copyArray[index + 1] === "}" ||
          (copyArray[index + 1] === "cursor" && copyArray[index + 2] === "}")
        ) {
          elements.push(
            <span>
              <br />
              <span className={style.Tabnation}></span>
            </span>
          );
        }
      } else if (elem === "{" || elem === "}") {
        elements.push(
          <span
            className={style.Breckets}
            onClick={() => shiftArrayOfElements(elem)}
          >
            {elem}
          </span>
        );
      } else {
        elements.push(
          <span
            onClick={() => shiftArrayOfElements(elem)}
            key={index}
            className={style.GameSpanElement}
          >
            {elem}
          </span>
        );
      }
    }
    return elements;
  };

  const onExecute = async (e) => {
    e.preventDefault();
    let answear = "";
    for (let i = 0; i < copyArray.length; i++) {
      if (copyArray[i] === "cursor") {
        continue;
      } else {
        answear += copyArray[i];
      }
    }
    const sender = { answear };
    try {
      const response = await fetch(
        "http://localhost:8000/mongomind/func/sendTask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sender),
        }
      );

      if (!response.ok) {
        console.log("Bad responce on sending pipeline.");
        const data = await response.json();
        setMsgError(data.result);
        setCheckTrue(true);
      } else {
        const data = await response.json();
        dispatch(setData(data.result));
        onNext();
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <div>
      <div className={checkTrue === false ? style.HideElemBlock : style.ShowElemBlock}>
        <h2 className={style.headerText}>{msgError}</h2>
        <button onClick={()=> setCheckTrue(false)} className={style.buttonError}>OK</button>
      </div>
      <div className={style.MongoMainGame}>{ChangeMethod()}</div>
      <div className={style.MongoMainMenu}>
        <div className={style.littleMenuForExecution}>
          <div className={style.liitleMenuFlex1}>
            <button
              className={style.NumberButton}
              onClick={() => setDispatchMethod("-1")}
            >
              -1
            </button>
            <button
              onClick={() => setDispatchMethod("0")}
              className={style.NumberButton}
            >
              &#48;
            </button>
            <button
              onClick={() => setDispatchMethod("1")}
              className={style.NumberButton}
            >
              &#49;
            </button>
            <button
              onClick={() => setDispatchMethod(",")}
              className={style.commaButton}
            >
              &#44;
            </button>

            <button onClick={onExecute} className={style.playButton}>
              <PlayArrowIcon htmlColor="#9CC5A1" /> Execute
            </button>
          </div>
          <div className={style.littleMenuFlex2}>
            <button
              onClick={() => setDispatchMethod("aggregate")}
              className={style.aggregateButton}
            >
              aggregate
            </button>
            <button
              onClick={() => {
                deleteMethod();
              }}
              className={style.backspaceButton}
            >
              <BackspaceIcon style={{ fontSize: "20px" }} />
            </button>
            <button
              onClick={() => {
                dispatch(clearStore());
              }}
              className={style.deleteButton}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={style.MongoMainGameButtons}>
        <div>
          <div className={style.littleFlex}>
            <button className={style.activeButton}>Problem</button>
            <span className={style.littleGraphicsForButton}></span>
          </div>
          <div className={style.LittleMongoProblemName}>
            <div className={style.v_text}>
              <p className={style.fetchedTaskName}>{data.task}</p>
            </div>
          </div>
        </div>

        <div>
          <div className={style.littleFlex1}>
            <button
              onClick={() => setCurrentSection("collection")}
              className={getButtonStyle("collection")}
            >
              Collection
            </button>
            <button
              onClick={() => setCurrentSection("filters")}
              className={getButtonStyle("filters")}
            >
              Filters
            </button>
            <button
              onClick={() => setCurrentSection("values")}
              className={getButtonStyle("values")}
            >
              Values
            </button>
          </div>
          <div className={style.OtherButtonsBorder}>{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default MongoDbComponent;
