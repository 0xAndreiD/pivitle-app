/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Card, Image, Tooltip, OverlayTrigger } from "react-bootstrap";

export default (props) => {
  const { name, image } = props;

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip className="m-0">{name}</Tooltip>}
    >
      <Card.Link className="avatar ms-0">
        <Image style={{ width: "28px", height: "28px" }} rounded src={image} />
      </Card.Link>
    </OverlayTrigger>
  );
};
