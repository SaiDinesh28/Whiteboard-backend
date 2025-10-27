import React from "react";
import rough from "roughjs/bin/rough";
import { getArrowCoordinates } from "./math";
const gen = rough.generator();
const createRoughElement = (
  id,
  x1,
  y1,
  x2,
  y2,
  { type, stroke, fill, size }
) => {
  let newElement = {
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    stroke,
    fill,
    size,
  };
  let options = {
    seed: id + 1,
    fillStyle: "solid",
  };
  if (stroke) {
    options.stroke = stroke;
  }
  if (fill) {
    options.fill = fill;
  }
  if (size) {
    options.strokeWidth = size;
  }
  switch (type) {
    case "LINE":
      {
        newElement.roughEle = gen.line(x1, y1, x2, y2, options);
      }
      break;
    case "RECTANGLE":
      {
        newElement.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
      }
      break;
    case "CIRCLE":
      {
        const diameter =
          2 * Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        newElement.roughEle = gen.circle(x1, y1, diameter, options);
      }
      break;
    case "ARROW": {
      const arrowLength = 20;
      const [x3, y3, x4, y4] = getArrowCoordinates(x1, y1, x2, y2, arrowLength);
      const points = [
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x2, y2],
        [x4, y4],
        [x2, y2],
      ];
      newElement.roughEle = gen.linearPath(points, options);
    }
    case "BRUSH":
      break;
    case "TEXT":{
      newElement.text = "";
      return newElement;
    }
    case "DEFAULT": {
      throw Error("Type is invalid");
    }
  }
  return newElement;
};

export default createRoughElement;
