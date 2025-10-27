import React, { useContext } from "react";
import classes from "./index.module.css";
import classNames from "classnames";
import { COLORS, STROKE_TOOLS, FILL_TOOLS, SIZE_TOOLS } from "../../constants";
import propertiesContext from "../../store/properties-box-context";
import boardContext from "../../store/board-context";

const PropertiesBox = () => {
  const { activeItem } = useContext(boardContext);
  const {
    propertiesBoxState,
    handlechangeStroke,
    handlechangeFill,
    handlechangeSize,
  } = useContext(propertiesContext);
  const strokeColor = propertiesBoxState[activeItem]?.stroke;
  const fillColor = propertiesBoxState[activeItem]?.fill;
  const brushSize = propertiesBoxState[activeItem]?.size;
  return (
    <div className={classNames(classes.container)}>
      {STROKE_TOOLS.includes(activeItem) && (
        <div className={classNames(classes.selectOptionContainer)}>
          <div className={classes.toolBoxLabel}>Stroke Color</div>
          <div className={classNames(classes.colorsContainer)}>
            <div>
              <input
                className={classes.colorPicker}
                type="color"
                value={strokeColor}
                onChange={(e) => handlechangeStroke(activeItem, e.target.value)}
              ></input>
            </div>
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={classNames(classes.colorBox, {
                    [classes.activeColorBox]: COLORS[k] === strokeColor,
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => handlechangeStroke(activeItem, COLORS[k])}
                ></div>
              );
            })}
          </div>
        </div>
      )}
      {FILL_TOOLS.includes(activeItem) && (
        <div className={classNames(classes.selectOptionContainer)}>
          <div className={classes.toolBoxLabel}>Fill Color</div>
          <div className={classNames(classes.colorsContainer)}>
            {fillColor === null ? (
              <div
                className={classNames(
                  classes.noFillColorBox,
                  classes.colorPicker
                )}
                onClick={() => handlechangeFill(activeItem, "BLACK")}
              ></div>
            ) : (
              <div>
                <input
                  className={classes.colorPicker}
                  type="color"
                  value={fillColor}
                  onChange={(e) => handlechangeFill(activeItem, e.target.value)}
                ></input>
              </div>
            )}
            <div
              className={classNames(classes.colorBox, classes.noFillColorBox, {
                [classes.activeColorBox]: fillColor === null,
              })}
              onClick={() => handlechangeFill(activeItem, null)}
            ></div>
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={classNames(classes.colorBox, {
                    [classes.activeColorBox]: COLORS[k] === fillColor,
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => handlechangeFill(activeItem, COLORS[k])}
                ></div>
              );
            })}
          </div>
        </div>
      )}
      {SIZE_TOOLS.includes(activeItem) && (
        <div className={classNames(classes.selectOptionContainer)}>
          <div className={classNames(classes.toolBoxLabel)}>
            {activeItem === "TEXT" ? "TEXT SIZE" : "BRUSH SIZE"}
          </div>
          <input
            type="range"
            min={activeItem === "TEXT" ? 12 : 1}
            max={activeItem === "TEXT" ? 64 : 10}
            value={brushSize}
            step={1}
            onChange={(e) => handlechangeSize(activeItem, e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default PropertiesBox;
