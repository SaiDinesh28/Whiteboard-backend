import React, { useContext, useState } from "react";
import classes from "./index.module.css";
import classNames from "classnames";
import { LuRectangleHorizontal } from "react-icons/lu";
import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
  FaEraser,
  FaFont,
  FaUndoAlt,
  FaRedoAlt,
  FaDownload,
} from "react-icons/fa";
import boardContext from "../../store/board-context";
const Toolbox = () => {
  console.log("Tool box component started rendering");
  // const [activeItem, setactiveItem] = useState("");
  const { activeItem, undo, redo, handlesetactiveItem } =
    useContext(boardContext);
  const handleDownloadClick = () => {
    const canvas = document.getElementById("myCanvas");
    const data = canvas.toDataURL("image/png");
    const anchorTag = document.createElement("a");
    anchorTag.href = data;
    anchorTag.download = "board.png";
    document.body.appendChild(anchorTag);
    anchorTag.click();
    document.body.removeChild(anchorTag);
  };
  return (
    <div className={classes.container}>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "BRUSH",
        })}
        onClick={() => handlesetactiveItem("BRUSH")}
      >
        <FaPaintBrush />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "LINE",
        })}
        onClick={() => handlesetactiveItem("LINE")}
      >
        <FaSlash />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "RECTANGLE",
        })}
        onClick={() => handlesetactiveItem("RECTANGLE")}
      >
        <LuRectangleHorizontal size={30} />
      </div>

      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "CIRCLE",
        })}
        onClick={() => handlesetactiveItem("CIRCLE")}
      >
        <FaRegCircle />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "ARROW",
        })}
        onClick={() => handlesetactiveItem("ARROW")}
      >
        <FaArrowRight />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "ERASE",
        })}
        onClick={() => handlesetactiveItem("ERASE")}
      >
        <FaEraser />
      </div>
      <div
        className={classNames(classes.toolItem, {
          [classes.active]: activeItem == "TEXT",
        })}
        onClick={() => handlesetactiveItem("TEXT")}
      >
        <FaFont />
      </div>
      <div className={classNames(classes.toolItem)} onClick={undo}>
        <FaUndoAlt />
      </div>
      <div className={classNames(classes.toolItem)} onClick={redo}>
        <FaRedoAlt />
      </div>
      <div
        className={classNames(classes.toolItem)}
        onClick={handleDownloadClick}
      >
        <FaDownload />
      </div>
    </div>
  );
};

export default Toolbox;
