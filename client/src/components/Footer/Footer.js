import React from "react";
import { Col, Row} from "../Grid";
import './Footer.css';

const Footer = () =>
  <div id="footer">
	<Col size="xs-10">
	  <hr />
	  <h5 className="text-center">&copy; 2018 Family Money Manager</h5>
	</Col>
  </div>;

export default Footer;