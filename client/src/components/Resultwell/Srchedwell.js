import React from "react";

export const Srchedwell = props =>
  <div className="well clearfix">
    <h3 className="articleHeadline">
      <span className="label label-primary">{props.art.id}</span>
      <a rel="noreferrer noopener" target="_blank" href={props.art.url}>
        <strong>{props.art.headline}</strong>
	    </a>     
	  </h3>
	  <h5>By {props.art.author}  {props.art.pubdate}</h5>
	  {props.children}
  </div>;