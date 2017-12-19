import React from "react";

export const Savedwell = props =>
  <div className="well clearfix">
    <h3 className="articleHeadline">
      <strong>{props.art.headline}</strong>
      <a rel="noreferrer noopener" target="_blank" href={props.art.url} style={{ fontSize: 18 }}> Read more ... </a>     
	  </h3>
    {props.children}
	  <h5>Saved on {props.art.date}</h5>
  </div>;