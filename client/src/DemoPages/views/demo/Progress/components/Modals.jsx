import React, { useState } from "react";
import moment from "moment-timezone";
import { CheckIcon, PencilAltIcon } from "@heroicons/react/solid";
import {
  Col,
  Row,
  Form,
  Modal,
  Button,
  Badge,
  Image,
  InputGroup,
} from "react-bootstrap";
import { Input, Menu, Divider, Dropdown, Avatar } from "antd";
import {
  ChatText,
  ChatRightText,
  HandThumbsUp,
  ThreeDots,
} from "react-bootstrap-icons";

import KanbanAvatar from "./KanbanAvatar";
import {
  Members as BoardMembers,
  Labels as BoardLabels,
} from "../progressBoard";

function convertId2Title(id, array) {
  for (let i = 0; i < array.length; i++) {
    if (id === array[i].id) {
      return array[i].title;
    }
  }
  return;
}

export const KanbanEditModal = (props) => {
  const {
    id: cardId,
    index,
    kanbanLists = [],
    show = false,
    boardTitle,
    author,
    assignees = [],
    members = [],
    labels = [],
    priorities = [],
    links = [],
    comments = [],
    CP,
    dateCreated,
    dateUpdated,
  } = props;

  const [listId, setListId] = useState(props.listId ?? "");
  const [title, setTitle] = useState(props.title ?? "");
  const [description, setDescription] = useState(props.description ?? "");
  const [priority, setPriority] = useState(props.priority ?? "");
  const [comment, setComment] = useState("");
  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const toggleIsTitleEditable = () => {
    setIsTitleEditable(!isTitleEditable);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onTitleChange = () => {
    const payload = { listId, cardId, title };

    if (title !== props.title) {
      props.onChange && props.onChange(payload);
    }

    toggleIsTitleEditable();
  };

  const onStatusChange = (prop) => {
    if (listId !== prop) {
      setListId(prop);
      const payload = { listId: prop, cardId };

      props.onChange && props.onChange(payload);
    }
  };

  const onPriorityChange = (prop) => {
    if (priority.id !== prop.id) {
      setPriority(prop);
      const payload = { listId, cardId, priority: prop };

      props.onChange && props.onChange(payload);
    }
  };

  const onEditAssignees = () => {
    props.onEditAssignees && props.onEditAssignees(props);
  };

  const onEditMembers = () => {
    props.onEditMembers && props.onEditMembers(props);
  };

  const onEditLabels = () => {
    props.onEditLabels && props.onEditLabels(props);
  };

  return (
    <Modal
      className="custom-modal custom-modal-centered"
      as={Modal.Dialog}
      size="lg"
      show={show}
      onHide={onHide}
    >
      <Form className="modal-content">
        <Modal.Header
          className="align-items-start border-bottom"
          style={{ backgroundColor: "white" }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                backgroundColor: `${priority.color}`,
                marginTop: "-17px",
                marginLeft: "-17px",
                marginRight: "8px",
                width: "10px",
                height: "122px",
              }}
            />
            <div className="d-block">
              <h5
                className="text-gray-900 fs-6 fw-bold py-1 ps-1"
                style={{ color: "grey" }}
              >
                {boardTitle}
              </h5>

              {isTitleEditable ? (
                <Form.Group id="title" className="mb-2">
                  <Form.Control
                    required
                    autoFocus
                    value={title}
                    className="text-gray-900 fs-5 fw-bold py-1 ps-1"
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={onTitleChange}
                  />
                </Form.Group>
              ) : (
                <h5
                  className="text-gray-900 fs-5 fw-bold py-1 ps-1"
                  onClick={toggleIsTitleEditable}
                >
                  {title}
                </h5>
              )}

              <div className="d-block me-3 me-sm-4">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {assignees.length === 0 ? (
                    <div
                      className="fs-6 fw-bold text-gray-500"
                      style={{ color: "grey" }}
                    >
                      Unassigned
                    </div>
                  ) : (
                    <div
                      className="fs-6 fw-bold text-gray-500"
                      style={{ marginRight: "8px" }}
                    >
                      Assignees:
                    </div>
                  )}
                  <div className="d-flex align-items-center">
                    {assignees.map((m) => (
                      <KanbanAvatar key={`kanban-avatar-${m.id}`} {...m} />
                    ))}
                    <PencilAltIcon
                      className="icon icon-xs hover-pointer"
                      style={{ color: "grey", marginLeft: "4px" }}
                      onClick={onEditAssignees}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  color: "gray",
                  fontSize: "16px",
                }}
              >
                6
              </span>
              <HandThumbsUp style={{ transform: "scaleX(-1)" }} />
              <span
                style={{
                  color: "gray",
                  fontSize: "16px",
                }}
              >
                Like
              </span>
            </div>
            <Button
              style={{
                display: "flex",
                backgroundColor: "transparent",
                color: "black",
                border: "none",
              }}
            >
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <span>Clone</span>
                    </Menu.Item>
                    <Menu.Item>
                      <span>Delete</span>
                    </Menu.Item>
                  </Menu>
                }
                overlayStyle={{ zIndex: 9999 }}
                placement="bottomLeft"
                trigger={["click"]}
              >
                <ThreeDots onClick={(e) => e.preventDefault()} />
              </Dropdown>
            </Button>
            <Button variant="close" onClick={onHide} />
          </div>
        </Modal.Header>

        <Modal.Body className="py-4">
          <Row>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div className="d-block me-3 me-sm-4">
                <h5
                  className="fs-6 fw-bold text-gray-500"
                  style={{ color: "grey" }}
                >
                  Team
                </h5>
                <div className="d-flex align-items-center">
                  {members.map((m) => (
                    <KanbanAvatar key={`kanban-avatar-${m.id}`} {...m} />
                  ))}
                  <PencilAltIcon
                    className="icon icon-xs hover-pointer"
                    style={{ color: "grey", marginLeft: "4px" }}
                    onClick={onEditMembers}
                  />
                </div>
              </div>
              <div className="d-block me-3">
                <h5
                  className="fs-6 fw-bold text-gray-500"
                  style={{ color: "grey" }}
                >
                  Label
                </h5>
                <div
                  className="d-flex align-items-center"
                  style={{ maxWidth: "564px" }}
                >
                  {labels.map((l) => (
                    <Badge
                      text="white"
                      key={`kanban-label-${l.id}`}
                      className={`rounded py-2 px-3 custom-badge-${l.color}`}
                    >
                      {l.name}
                    </Badge>
                  ))}
                  <PencilAltIcon
                    className="icon icon-xs hover-pointer"
                    style={{ color: "grey", marginLeft: "4px" }}
                    onClick={onEditLabels}
                  />
                </div>
              </div>
              <div className="d-block me-3">
                <h5
                  className="fs-6 fw-bold text-gray-500"
                  style={{ color: "grey" }}
                >
                  Status
                </h5>
                <Button
                  style={{
                    display: "flex",
                    backgroundColor: "transparent",
                    color: "black",
                    border: "1px solid black",
                    padding: "0 8px",
                  }}
                >
                  <Dropdown
                    overlay={
                      <Menu style={{ width: "144px" }}>
                        {kanbanLists.map((item) => (
                          <Menu.Item
                            key={`kanban-list-${item.id}`}
                            onClick={() => onStatusChange(item.id)}
                          >
                            <span>{item.title}</span>
                          </Menu.Item>
                        ))}
                      </Menu>
                    }
                    overlayStyle={{ zIndex: 9999 }}
                    placement="bottomLeft"
                    trigger={["click"]}
                  >
                    <div onClick={(e) => e.preventDefault()}>
                      <span>{convertId2Title(listId, kanbanLists)}</span>
                    </div>
                  </Dropdown>
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "4px",
                }}
              >
                <div style={{ color: "grey", fontSize: "14px" }}>
                  Created {dateCreated}
                </div>
                <div style={{ color: "grey", fontSize: "14px" }}>
                  Updated {dateUpdated}
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <Col xs={12} lg={6}>
              <Row style={{ marginBottom: "16px" }}>
                <h5 className="fs-6 fw-bold text-gray-500">Description</h5>
                <Row style={{ marginLeft: "initial" }}>
                  <Divider style={{ marginBottom: "16px" }} />
                </Row>
                <Form.Group id="description">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </Form.Group>
              </Row>
              <Row style={{ marginBottom: "16px" }}>
                <h5 className="fs-6 fw-bold text-gray-500">Activity</h5>
                <Row style={{ marginLeft: "initial" }}>
                  <Divider style={{ marginBottom: "16px" }} />
                </Row>
                <div style={{ display: "flex" }}>
                  <Avatar
                    style={{
                      width: "28px",
                      minWidth: "28px",
                      height: "28px",
                      minHeight: "28px",
                      backgroundColor: "#6123ffed",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    MM
                  </Avatar>
                  <Input
                    style={{
                      marginLeft: "8px",
                      marginTop: "-2px",
                      width: "-webkit-fill-available",
                      backgroundColor: "rgb(209 209 209 / 48%)",
                      padding: "4px 16px",
                      borderRadius: "4px",
                      fontSize: "14px",
                    }}
                    placeholder="Write a comment…"
                  />
                </div>
                <div
                  style={{
                    paddingLeft: "48px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Divider style={{ marginTop: "16px", marginBottom: "8px" }} />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <ChatText
                      size={24}
                      style={{ color: "rgb(123 123 123 / 94%)" }}
                    />
                    <text>1 page comment</text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        style={{
                          width: "24px",
                          minWidth: "24px",
                          height: "24px",
                          minHeight: "24px",
                          backgroundColor: "#6123ffed",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        MM
                      </Avatar>
                      <div
                        style={{
                          marginLeft: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <text>Matthew Mills</text>
                        <text style={{ fontSize: "10px" }}>
                          Less than a minute ago
                        </text>
                      </div>
                    </div>
                    <text style={{ marginLeft: "36px" }}>
                      This is a test comment
                    </text>
                    <div
                      style={{
                        marginLeft: "36px",
                        display: "flex",
                        gap: "24px",
                      }}
                    >
                      <span
                        className="hover-pointer"
                        style={{ fontSize: "14px" }}
                      >
                        Edit
                      </span>
                      <span
                        className="hover-pointer"
                        style={{ fontSize: "14px" }}
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                </div>
              </Row>
            </Col>
            <Col xs={12} lg={3}>
              <Row>
                <h5 className="fs-6 fw-bold text-gray-500">Details</h5>
                <Row style={{ marginLeft: "initial" }}>
                  <Divider style={{ marginBottom: "16px" }} />
                </Row>
                <div
                  style={{
                    marginBottom: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className="gray-font-14">Assignee</div>
                    </Col>
                    <Col xs={12} lg={8}>
                      <div className="hover-pointer" onClick={onEditAssignees}>
                        {assignees.length === 0 ? (
                          <div className="gray-font-14">Unassigned</div>
                        ) : (
                          <div
                            className="d-flex align-items-center"
                            style={{ marginLeft: "4px" }}
                          >
                            {assignees.map((m) => (
                              <Avatar
                                style={{
                                  width: "24px",
                                  minWidth: "24px",
                                  height: "24px",
                                  minHeight: "24px",
                                  marginLeft: "-4px",
                                }}
                                src={m.image}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className="gray-font-14">Reporter</div>
                    </Col>
                    <Col xs={12} lg={8}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          style={{
                            width: "24px",
                            minWidth: "24px",
                            height: "24px",
                            minHeight: "24px",
                            backgroundColor: "#6123ffed",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          MM
                        </Avatar>
                        <div
                          className="gray-font-14"
                          style={{
                            marginLeft: "8px",
                            color: "black",
                          }}
                        >
                          Matthew Mills
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className="gray-font-14">Priority</div>
                    </Col>
                    <Col xs={12} lg={8}>
                      <Button
                        style={{
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          padding: "0",
                        }}
                      >
                        <Dropdown
                          overlay={
                            <Menu style={{ width: "144px" }}>
                              {priorities.map((item) => (
                                <Menu.Item
                                  key={`priority-item-${item.id}`}
                                  onClick={() => onPriorityChange(item)}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "8px",
                                        height: "12px",
                                        backgroundColor: `${item.color}`,
                                      }}
                                    />
                                    <span>{item.name}</span>
                                  </div>
                                </Menu.Item>
                              ))}
                            </Menu>
                          }
                          overlayStyle={{ zIndex: 9999 }}
                          placement="bottomLeft"
                          trigger={["click"]}
                        >
                          <div
                            className="gray-font-14"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                            onClick={(e) => e.preventDefault()}
                          >
                            <div
                              style={{
                                width: "8px",
                                height: "12px",
                                backgroundColor: `${priority.color}`,
                              }}
                            />
                            <span>{priority.name}</span>
                          </div>
                        </Dropdown>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className="gray-font-14">Labels</div>
                    </Col>
                    <Col xs={12} lg={8}>
                      <div className="hover-pointer" onClick={onEditLabels}>
                        {labels.map((l) => (
                          <Badge
                            text="white"
                            key={`kanban-label-${l.id}`}
                            className={`rounded py-1 px-2 custom-badge-${l.color}`}
                          >
                            {l.name}
                          </Badge>
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className="gray-font-14">Effort</div>
                    </Col>
                    <Col xs={12} lg={8}>
                      <div className="gray-font-14">5</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className="gray-font-14">Business Value</div>
                    </Col>
                    <Col xs={12} lg={8}>
                      <div className="gray-font-14">6</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className="gray-font-14">Value area</div>
                    </Col>
                    <Col xs={12} lg={8}>
                      <div className="gray-font-14">Accounting</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className="gray-font-14">Category</div>
                    </Col>
                    <Col xs={12} lg={8}>
                      <div className="gray-font-14">None</div>
                    </Col>
                  </Row>
                </div>
              </Row>
              <Row>
                <h5 className="fs-6 fw-bold text-gray-500">Links</h5>
                <Row style={{ marginLeft: "initial" }}>
                  <Divider style={{ marginBottom: "16px" }} />
                </Row>
              </Row>
              <Row className="g-1">
                {links.map((link) => (
                  <Col xs={12}>
                    <Input
                      prefix={
                        <Image
                          style={{ width: "18px", height: "18px" }}
                          src={link.image}
                        />
                      }
                      placeholder={link.name}
                      value={link.link}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={12} lg={3}>
              <Row>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Avatar
                    shape="square"
                    style={{
                      width: "18px",
                      minWidth: "18px",
                      height: "18px",
                      minHeight: "18px",
                      backgroundColor: "rgb(233 130 20)",
                      borderRadius: "0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    CP
                  </Avatar>
                  <div className="fs-6 fw-bold text-gray-500">
                    Copilot Assistance
                  </div>
                </div>
                <Row style={{ marginLeft: "initial" }}>
                  <Divider style={{ marginBottom: "16px" }} />
                </Row>
                <div>
                  <Row style={{ paddingInline: "12px" }}>
                    <Input.TextArea
                      className="disabled-input-textarea"
                      style={{
                        resize: "none",
                      }}
                      rows={18}
                      value={CP}
                      disabled
                    ></Input.TextArea>
                  </Row>
                  <Row>
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginTop: "4px",
                        justifyContent: "end",
                        color: "grey",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          6
                        </span>
                        <HandThumbsUp style={{ transform: "scaleX(-1)" }} />
                        <span
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          Like
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          6
                        </span>
                        <ChatRightText />
                        <span
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          Comment
                        </span>
                      </div>
                    </div>
                  </Row>
                </div>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        {/* <Modal.Footer className="justify-content-end border-top">
          <Button
            variant="gray-800"
            className="me-2 text-start white-button"
            onClick={onHide}
          >
            Cancel
          </Button>
          <Button variant="gray-800" className="me-2 text-start primary-button">
            Update
          </Button>
        </Modal.Footer> */}
      </Form>
    </Modal>
  );
};

export const KanbanEditAssigneesModal = (props) => {
  const { listId, id: cardId, show = false, assignees = [] } = props;
  const [searchValue, setSearchValue] = useState("");
  const [boardMembers, setBoardMembers] = useState(
    BoardMembers.map((bm) => ({
      ...bm,
      show: true,
      isAssignedToCard: assignees.some((m) => m.id === bm.id),
    }))
  );

  const onSearchValueChange = (e) => {
    const newSearchValue = e.target.value;
    const searchResults = boardMembers.map((bm) => ({
      ...bm,
      show: bm.name.toLowerCase().includes(newSearchValue.toLowerCase()),
    }));

    setSearchValue(newSearchValue);
    setBoardMembers(searchResults);
  };

  const onMemberClick = (id) => {
    const boardMembersUpdated = boardMembers.map((m) =>
      m.id === id ? { ...m, isAssignedToCard: !m.isAssignedToCard } : m
    );
    setBoardMembers(boardMembersUpdated);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onSubmit = () => {
    const membersSelected = boardMembers.filter((m) => m.isAssignedToCard);
    const payload = { listId, cardId, assignees: membersSelected };

    return props.onSubmit && props.onSubmit(payload);
  };

  return (
    <Modal
      className="custom-modal-centered"
      as={Modal.Dialog}
      size="lg"
      show={show}
      onHide={onHide}
    >
      <Form className="modal-content p-3" style={{ width: "400px" }}>
        <Modal.Header
          className="border-0 px-3 pb-0"
          style={{ backgroundColor: "white" }}
        >
          <Modal.Title className="fw-normal">Assignees</Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="px-3 pb-0">
          <Form.Group id="search" className="mb-3">
            <InputGroup className="search-bar">
              <Form.Control
                type="text"
                placeholder="Search board assignees.."
                value={searchValue}
                onChange={onSearchValueChange}
              />
            </InputGroup>
          </Form.Group>

          <div className="px-3">
            {boardMembers
              .filter((m) => m.show)
              .map((m) => (
                <Row
                  key={`board-member-${m.id}`}
                  className="kanban-card-member border-bottom py-2"
                  onClick={() => onMemberClick(m.id)}
                >
                  <Col xs={2}>
                    <Image
                      src={m.image}
                      className="avatar-md rounded-circle"
                      style={{ width: "48px", height: "48px" }}
                    />
                  </Col>
                  <Col
                    xs={8}
                    className="d-flex align-items-center justify-content-start"
                  >
                    <h4 className="fs-6 text-dark mb-0">{m.name}</h4>
                  </Col>
                  {m.isAssignedToCard && (
                    <Col xs={2} className="d-flex align-items-center">
                      <CheckIcon className="icon icon-sm text-success" />
                    </Col>
                  )}
                </Row>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pb-0">
          <Button
            variant="secondary"
            className="d-inline-flex align-items-center primary-button"
            onClick={onSubmit}
          >
            Confirm assignees
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const KanbanEditMembersModal = (props) => {
  const { listId, id: cardId, show = false, members = [] } = props;
  const [searchValue, setSearchValue] = useState("");
  const [boardMembers, setBoardMembers] = useState(
    BoardMembers.map((bm) => ({
      ...bm,
      show: true,
      isAssignedToCard: members.some((m) => m.id === bm.id),
    }))
  );

  const onSearchValueChange = (e) => {
    const newSearchValue = e.target.value;
    const searchResults = boardMembers.map((bm) => ({
      ...bm,
      show: bm.name.toLowerCase().includes(newSearchValue.toLowerCase()),
    }));

    setSearchValue(newSearchValue);
    setBoardMembers(searchResults);
  };

  const onMemberClick = (id) => {
    const boardMembersUpdated = boardMembers.map((m) =>
      m.id === id ? { ...m, isAssignedToCard: !m.isAssignedToCard } : m
    );
    setBoardMembers(boardMembersUpdated);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  const onSubmit = () => {
    const membersSelected = boardMembers.filter((m) => m.isAssignedToCard);
    const payload = { listId, cardId, members: membersSelected };

    return props.onSubmit && props.onSubmit(payload);
  };

  return (
    <Modal
      className="custom-modal-centered"
      as={Modal.Dialog}
      size="lg"
      show={show}
      onHide={onHide}
    >
      <Form className="modal-content p-3" style={{ width: "400px" }}>
        <Modal.Header
          className="border-0 px-3 pb-0"
          style={{ backgroundColor: "white" }}
        >
          <Modal.Title className="fw-normal">Members</Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="px-3 pb-0">
          <Form.Group id="search" className="mb-3">
            <InputGroup className="search-bar">
              <Form.Control
                type="text"
                placeholder="Search board members.."
                value={searchValue}
                onChange={onSearchValueChange}
              />
            </InputGroup>
          </Form.Group>

          <div className="px-3">
            {boardMembers
              .filter((m) => m.show)
              .map((m) => (
                <Row
                  key={`board-member-${m.id}`}
                  className="kanban-card-member border-bottom py-2"
                  onClick={() => onMemberClick(m.id)}
                >
                  <Col xs={2}>
                    <Image
                      src={m.image}
                      className="avatar-md rounded-circle"
                      style={{ width: "48px", height: "48px" }}
                    />
                  </Col>
                  <Col
                    xs={8}
                    className="d-flex align-items-center justify-content-start"
                  >
                    <h4 className="fs-6 text-dark mb-0">{m.name}</h4>
                  </Col>
                  {m.isAssignedToCard && (
                    <Col xs={2} className="d-flex align-items-center">
                      <CheckIcon className="icon icon-sm text-success" />
                    </Col>
                  )}
                </Row>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-start border-0 pb-0">
          <Button
            variant="secondary"
            className="d-inline-flex align-items-center primary-button"
            onClick={onSubmit}
          >
            Confirm members
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export const KanbanEditLabelsModal = (props) => {
  const { listId, id: cardId, show = false, labels = [] } = props;
  const [searchValue, setSearchValue] = useState("");
  const [boardLabels, setBoardLabels] = useState(
    BoardLabels.map((bm) => ({
      ...bm,
      show: true,
      isAssignedToCard: labels.some((m) => m.id === bm.id),
    }))
  );

  const onSearchValueChange = (e) => {
    const newSearchValue = e.target.value;
    const searchResults = boardLabels.map((bm) => ({
      ...bm,
      show: bm.name.toLowerCase().includes(newSearchValue.toLowerCase()),
    }));

    setSearchValue(newSearchValue);
    setBoardLabels(searchResults);
  };

  const onLabelClick = (id) => {
    const boardLabelsUpdated = boardLabels.map((m) =>
      m.id === id ? { ...m, isAssignedToCard: !m.isAssignedToCard } : m
    );
    setBoardLabels(boardLabelsUpdated);

    const labelsSelected = boardLabelsUpdated.filter((l) => l.isAssignedToCard);
    const payload = { listId, cardId, labels: labelsSelected };
    props.onSubmit && props.onSubmit(payload);
  };

  const onHide = () => {
    props.onHide && props.onHide();
  };

  return (
    <Modal
      className="custom-modal-centered"
      as={Modal.Dialog}
      size="lg"
      show={show}
      onHide={onHide}
    >
      <Form className="modal-content p-3" style={{ width: "400px" }}>
        <Modal.Header
          className="border-0 px-3 pb-0"
          style={{ backgroundColor: "white" }}
        >
          <Modal.Title className="fw-normal">Labels</Modal.Title>
          <Button variant="close" onClick={onHide} />
        </Modal.Header>

        <Modal.Body className="px-3 pb-0">
          <Form.Group id="search" className="mb-3">
            <InputGroup className="search-bar">
              <Form.Control
                type="text"
                placeholder="Search labels.."
                value={searchValue}
                onChange={onSearchValueChange}
              />
            </InputGroup>
          </Form.Group>

          <div className="px-3 py-2">
            {boardLabels
              .filter((l) => l.show)
              .map((l) => (
                <Row key={`label-${l.id}`} className="my-1">
                  <Badge
                    className={`kanban-card-label py-2 px-3 custom-badge-${l.color}`}
                    onClick={() => onLabelClick(l.id)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <h4 className="fs-6 text-white mb-0">{l.name}</h4>
                      {l.isAssignedToCard && (
                        <CheckIcon className="icon icon-sm" />
                      )}
                    </div>
                  </Badge>
                </Row>
              ))}
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};
