import React, { useContext, useLayoutEffect } from "react";
import { useEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import propertiesContext from "../../store/properties-box-context";
import classes from "./index.module.css";
const Board = () => {
  console.log("Board component rendered");
  const {
    elements,
    activeItem,
    toolActionType,
    handleMouseDownBoard,
    handleMouseMoveBoard,
    handleMouseUpBoard,
    handleonBlurBoard,
    undo,
    redo,
  } = useContext(boardContext);
  const { propertiesBoxState } = useContext(propertiesContext);
  const canvasRef = useRef();
  const textRef = useRef();
  useEffect(() => {
    console.log("use effect executed");
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);
  useEffect(() => {
    const textElement = textRef.current;
    if (toolActionType === "WRITING") {
      setTimeout(() => {
        textElement.focus();
      }, 0);
    }
  }, [toolActionType]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key == "z") {
        undo();
      }
      if (event.ctrlKey && event.key == "y") {
        redo();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let rc = rough.canvas(canvas);
    elements.forEach((ele) => {
      switch (ele.type) {
        case "LINE":
        case "RECTANGLE":
        case "CIRCLE":
        case "ARROW":
          rc.draw(ele.roughEle);
          break;
        case "BRUSH":
          ctx.fillStyle = ele.stroke;
          ctx.fill(ele.path);
          ctx.restore();
          break;
        case "TEXT":
          console.log("text box opened");
          ctx.textBaseline = "top";
          ctx.font = `${ele.size}px Caveat`;
          ctx.fillStyle = ele.stroke;
          ctx.fillText(ele.text, ele.x1, ele.y1);
          ctx.restore();
          break;
        default:
          throw new Error("Type not found");
      }
    });
    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  function handleMouseDown(event) {
    // console.log(event.target);
    handleMouseDownBoard(
      event,
      propertiesBoxState[activeItem]?.stroke,
      propertiesBoxState[activeItem]?.fill,
      propertiesBoxState[activeItem]?.size
    );
  }
  function handleMouseMove(event) {
    handleMouseMoveBoard(event);
  }
  function handleMouseUp() {
    handleMouseUpBoard();
  }
  console.log("Board component end");
  return (
    <>
      {toolActionType === "WRITING" && (
        <textarea
          type="text"
          ref={textRef}
          className={classes.textElementBox}
          style={{
            top: elements[elements.length - 1].y1,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1]?.size}px`,
            color: elements[elements.length - 1]?.stroke,
          }}
          onBlur={(event) => handleonBlurBoard(event.target.value)}
        ></textarea>
      )}
      <canvas
        id="myCanvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        Your browser does not support the HTML canvas tag.
      </canvas>
    </>
  );
};

export default Board;
