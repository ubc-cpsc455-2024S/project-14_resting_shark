import * as React from "react";

export default function Line(props: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <line
        x1={props.x1}
        y1={props.y1}
        x2={props.x2}
        y2={props.y2}
        stroke="#E7EAF6"
        strokeWidth="4"
      />
    </svg>
  );
}
