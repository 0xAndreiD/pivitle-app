/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { Card, Button, Image, Dropdown } from "react-bootstrap";
import { ChatRightText, HandThumbsUp } from "react-bootstrap-icons";

import KanbanAvatar from "./KanbanAvatar";
import { Avatar } from "antd";

export default (props) => {
  const {
    cardRef,
    priority,
    title,
    image,
    members,
    links,
    description,
    CP,
    style = {},
    extraProps = {},
  } = props;
  const membersCountDescription = !members.length
    ? "Unassigned"
    : members.length === 1
    ? "1 Assignee"
    : `${members.length} Assignees`;

  const onEdit = () => {
    props.onEdit && props.onEdit();
  };

  const onCopy = () => {
    props.onCopy && props.onCopy();
  };

  const onMove = () => {
    props.onMove && props.onMove();
  };

  const onChangeLabels = () => {
    props.onChangeLabels && props.onChangeLabels();
  };

  const onChangeMembers = () => {
    props.onChangeMembers && props.onChangeMembers();
  };

  const onDelete = () => {
    props.onDelete && props.onDelete();
  };

  const onCardClick = (e) => {
    if (e.defaultPrevented) return;

    props.onClick && props.onClick();
  };

  const onDropdownClick = (e) => {
    e.preventDefault();
  };

  return (
    <Card
      border={1}
      className="p-3"
      ref={cardRef}
      {...extraProps}
      style={style}
      onClick={onCardClick}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: `${priority.color}`,
            width: "10px",
            minWidth: "10px",
            marginLeft: "-16px",
            marginTop: "-16px",
            marginBottom: "-16px",
          }}
        ></div>
        <div style={{ marginLeft: "16px", width: "-webkit-fill-available" }}>
          <Card.Header className="d-flex align-items-center justify-content-between border-0 p-0 mb-3">
            <div className="mb-0" style={{ fontSize: "16px" }}>
              {title}
            </div>
            <div>
              <Dropdown onClick={onDropdownClick}>
                <Dropdown.Toggle
                  as={Button}
                  variant="link"
                  size="sm"
                  className="fs-6 px-1 py-0"
                >
                  <DotsHorizontalIcon
                    className="icon icon-xs text-gray-500"
                    style={{ color: "#414141" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu
                  align="end"
                  className="dashboard-dropdown dropdown-menu-start mt-2 py-1"
                >
                  <Dropdown.Item
                    className="d-flex align-items-center"
                    onClick={onEdit}
                  >
                    Edit card
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="d-flex align-items-center"
                    onClick={onDelete}
                  >
                    Delete card
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            {image && (
              <Image src={image} className="card-img-top mb-2 mb-lg-3" />
            )}

            <p>{description}</p>

            <div style={{ display: "flex", gap: "4px" }}>
              <div style={{ width: "24px" }}>
                <Avatar
                  shape="square"
                  style={{
                    width: "24px",
                    minWidth: "24px",
                    height: "24px",
                    minHeight: "24px",
                    backgroundColor: "rgb(233 130 20)",
                    borderRadius: "0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  CP
                </Avatar>
              </div>
              <p>{CP.length > 128 ? CP.substring(0, 128) + "..." : CP}</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="fs-6 fw-normal">Links:</div>
              <div className="avatar-group">
                {links.map((link) =>
                  link.link === "" ? (
                    ""
                  ) : (
                    <KanbanAvatar key={`card-member-${link.id}`} {...link} />
                  )
                )}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginTop: "18px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h5 className="fs-6 fw-normal">{membersCountDescription}</h5>
                <div className="avatar-group">
                  {members.map((member) => (
                    <KanbanAvatar
                      key={`card-member-${member.id}`}
                      {...member}
                    />
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>6</span>
                <HandThumbsUp style={{ transform: "scaleX(-1)" }} />
                <span>Like</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span>6</span>
                <ChatRightText />
                <span>Comment</span>
              </div>
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};
