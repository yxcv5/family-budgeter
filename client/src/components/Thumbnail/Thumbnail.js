import React from "react";
import "./Thumbnail.css";

const Thumbnail = props => (
  <div
    className="thumbnail"
    role="img"
    aria-label="Member Image"
    style={{
      backgroundImage:  props.src ? `url(${props.src})` : "none"
    }}
  />
);

export default Thumbnail;