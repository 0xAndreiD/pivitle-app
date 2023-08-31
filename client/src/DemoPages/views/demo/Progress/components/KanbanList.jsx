/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import {
  ClipboardCopyIcon,
  DotsHorizontalIcon,
  EyeIcon,
  SelectorIcon,
  TrashIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";
import { Col, Form, Button, Dropdown, ListGroup } from "react-bootstrap";

export default (props) => {
  const { id, listRef, extraProps = {} } = props;
  const [title, setTitle] = useState(props.title ?? "");
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const onTitleChange = () => {
    props.onTitleChange && props.onTitleChange({ id, title });
    toggleIsTitleEditable();
  };

  const toggleIsTitleEditable = () => {
    setIsTitleEditable(!isTitleEditable);
  };

  const onCardAdd = () => {
    props.onCardAdd && props.onCardAdd(id);
  };

  const onListCopy = () => {
    props.onListCopy && props.onListCopy(id);
  };

  const onListMove = () => {
    props.onListMove && props.onListMove();
  };

  const onListDelete = () => {
    props.onListDelete && props.onListDelete(id);
  };

  return (
    <Col xs={12} lg={6} xl={4} xxl={3} ref={listRef} {...extraProps}>
      <div className="d-flex justify-content-between align-items-center kanban-title-container mb-2">
        {isTitleEditable ? (
          <Form.Group id="title" className="w-100">
            <Form.Control
              autoFocus
              value={title}
              className="shadow-none fs-6 fw-bold p-2 m-0 lh-1 border-0"
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) => e.target.select()}
              onBlur={onTitleChange}
            />
          </Form.Group>
        ) : (
          <h5
            className="kanban-title d-flex align-items-center w-100 fs-6 fw-bold p-2 m-0"
            onClick={toggleIsTitleEditable}
          >
            {title}
          </h5>
        )}

        <Dropdown>
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
            {/* <Dropdown.Item
              className="d-flex align-items-center"
              onClick={toggleIsTitleEditable}
            >
              Rename Column name
            </Dropdown.Item> */}
            <Dropdown.Item
              className="d-flex align-items-center"
              onClick={onCardAdd}
            >
              Add Card
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex align-items-center"
              onClick={onListDelete}
            >
              Delete Column
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ListGroup className="kanban-list">{props.children}</ListGroup>
    </Col>
  );
};
