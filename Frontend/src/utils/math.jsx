import { ERASE_THRESHOLD } from "../constants";

export const getArrowCoordinates = (x1, y1, x2, y2, len) => {
  const slopeAngle = Math.atan2(y2 - y1, x2 - x1);
  const x3 = x2 - len * Math.cos(slopeAngle - Math.PI / 6);
  const y3 = y2 - len * Math.sin(slopeAngle - Math.PI / 6);
  const x4 = x2 - len * Math.cos(slopeAngle + Math.PI / 6);
  const y4 = y2 - len * Math.sin(slopeAngle + Math.PI / 6);
  return [x3, y3, x4, y4];
};

const average = (a, b) => (a + b) / 2;

export function getSvgPathFromStroke(points, closed = true) {
  const len = points.length;

  if (len < 4) {
    return ``;
  }

  let a = points[0];
  let b = points[1];
  const c = points[2];

  let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
    2
  )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
    b[1],
    c[1]
  ).toFixed(2)} T`;

  for (let i = 2, max = len - 1; i < max; i++) {
    a = points[i];
    b = points[i + 1];
    result += `${average(a[0], b[0]).toFixed(2)},${average(a[1], b[1]).toFixed(
      2
    )} `;
  }

  if (closed) {
    result += "Z";
  }

  return result;
}

export const distanceBetweenPoints = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
};
export const isPointNearLine = (x1, y1, x2, y2, pointX, pointY) => {
  const d = distanceBetweenPoints(x1, y1, x2, y2);
  const d1 = distanceBetweenPoints(x1, y1, pointX, pointY);
  const d2 = distanceBetweenPoints(x2, y2, pointX, pointY);
  if (Math.abs(d1 + d2 - d) < ERASE_THRESHOLD) return true;
  return false;
};
