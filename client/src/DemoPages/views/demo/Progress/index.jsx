/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Input, Button, Avatar, Menu, Divider, Dropdown, Table } from "antd";
import {
  Pencil,
  Star,
  ChatText,
  PinAngle,
  ThreeDots,
  InputCursorText,
  Link45deg,
  Trash,
} from "react-bootstrap-icons";

export default (props) => {
  const tableData = props.progress;
  const tableColumns = [
    {
      title: <div style={{ fontWeight: "bold" }}>Progress board</div>,
      dataIndex: "progressBoard",
      key: "progressBoard",
      width: "45%",
      render: (boardTitle) => (
        <div>
          <div style={{ fontWeight: "bold" }}>{boardTitle.title}</div>
          <div>{boardTitle.subtitle}</div>
        </div>
      ),
    },
    {
      title: <div style={{ fontWeight: "bold" }}>Teams</div>,
      dataIndex: "teams",
      key: "teams",
      width: "20%",
      render: (teams) => (
        <div style={{ display: "flex", marginLeft: "4px" }}>
          {teams.map((item) =>
            item.avatar === "" ? (
              <Avatar
                style={{
                  width: "28px",
                  minWidth: "28px",
                  height: "28px",
                  minHeight: "28px",
                  marginLeft: "-4px",
                  backgroundColor: "rgb(66 154 255)",
                  border: "2px solid rgb(13 114 229)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.name[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                style={{
                  width: "28px",
                  minWidth: "28px",
                  height: "28px",
                  minHeight: "28px",
                  marginLeft: "-4px",
                  backgroundColor: "rgb(66 154 255)",
                  border: "2px solid rgb(13 114 229)",
                  display: "flex",
                  alignItems: "center",
                }}
                src={item.avatar}
              ></Avatar>
            )
          )}
        </div>
      ),
    },
    {
      title: <div style={{ fontWeight: "bold" }}>Date created</div>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
    },
    {
      title: " ",
      key: "action",
      width: "15%",
      render: () => (
        <Button
          type="ghost"
          style={{
            padding: "0",
            height: "24px",
            fontSize: "20px",
            fontWeight: "800",
            display: "flex",
            alignItems: "end",
          }}
        >
          <Dropdown
            overlay={
              <Menu style={{ width: "144px" }}>
                <Menu.Item>
                  <span>Edit board</span>
                </Menu.Item>
                <Menu.Item>
                  <span>Delete board</span>
                </Menu.Item>
              </Menu>
            }
            placement="bottomLeft"
            trigger={["click"]}
          >
            <ThreeDots onClick={(e) => e.preventDefault()} />
          </Dropdown>
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="top-content">
        <text style={{ color: "#757575f0" }}>
          Matthew Mills / Progress Board
        </text>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button type="ghost" style={{ padding: "0", height: "24px" }}>
            <Star style={{ fontSize: "20px", display: "flex" }} />
          </Button>
          <Button className="primary-button">Share</Button>
          <Button className="primary-button">Create Board</Button>
          <Button
            type="ghost"
            style={{
              padding: "0",
              height: "24px",
              fontSize: "20px",
              fontWeight: "800",
              display: "flex",
              alignItems: "end",
            }}
          >
            <Dropdown
              overlay={
                <Menu style={{ width: "144px" }}>
                  <Menu.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Pencil />
                      <span>Edit</span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <InputCursorText />
                      <span>Rename</span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Link45deg />
                      <span>Get link</span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <PinAngle />
                      <span>Pin</span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginLeft: "18px",
                      }}
                    >
                      <span>Copy</span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginLeft: "18px",
                      }}
                    >
                      <span>Archive</span>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        marginLeft: "18px",
                      }}
                    >
                      <span>Move</span>
                    </div>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Trash />
                      <span>Delete</span>
                    </div>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              trigger={["click"]}
            >
              <ThreeDots onClick={(e) => e.preventDefault()} />
            </Dropdown>
          </Button>
        </div>
      </div>
      <div className="middle-content">
        <div className="frame1">
          <text style={{ fontSize: "21px", fontWeight: "600" }}>
            Progress Board
          </text>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "153px",
            }}
          >
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
            <div
              style={{
                marginLeft: "8px",
                display: "flex",
                flexDirection: "column",
                color: "rgba(117, 117, 117, 0.94)",
              }}
            >
              <text style={{ fontSize: "10px" }}>Created by Matthew Mills</text>
              <text style={{ fontSize: "10px" }}>
                May 03, 2023 – 1 min read
              </text>
            </div>
          </div>
        </div>
        <Table
          className="custom-table"
          style={{ marginTop: "24px" }}
          columns={tableColumns}
          dataSource={tableData}
          pagination={{
            pageSize: 5,
            current: 1,
            size: "small",
            position: ["bottomLeft"],
          }}
        />
      </div>
      <div className="bottom-content">
        <Divider style={{ marginBottom: "8px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ChatText size={24} style={{ color: "rgb(123 123 123 / 94%)" }} />
          <text>1 page comment</text>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
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
          <div
            style={{
              marginLeft: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <text>Matthew Mills</text>
            <text style={{ fontSize: "10px" }}>Less than a minute ago</text>
          </div>
        </div>
        <text style={{ marginLeft: "36px" }}>This is a test comment</text>
        <div style={{ marginLeft: "21px", display: "flex", gap: "4px" }}>
          <Button type="ghost">Reply</Button>
          <Button type="ghost">Edit</Button>
          <Button type="ghost">Delete</Button>
        </div>
        <Divider style={{ marginBottom: "8px" }} />
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
          <Input.TextArea
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
            rows={1}
          />
        </div>
      </div>
    </div>
  );
};
