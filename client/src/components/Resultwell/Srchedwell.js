import React from "react";

export const Srchedwell = props =>
  <div className="well clearfix">
    <h3 className="articleHeadline">
      <span className="label label-primary">{props.art.id}</span>
      <a rel="noreferrer noopener" target="_blank" href={props.art.url}>
        <strong>{props.art.headline}</strong>
	    </a>     
	  </h3>
    {props.children}
	  <h5>{props.art.author ? `By ${props.art.author}` : ``}</h5>
    <h6>{props.art.pubdate}</h6>
  </div>;