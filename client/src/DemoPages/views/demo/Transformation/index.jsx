/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Input, Button, Avatar, Menu, Divider, Dropdown } from "antd";
import {
  Dot,
  Pencil,
  Star,
  FileEarmarkText,
  ChatText,
  Chat,
  PinAngle,
  ThreeDots,
  InputCursorText,
  Link45deg,
  Trash,
} from "react-bootstrap-icons";

export default (props) => {
  return (
    <div>
      <div className="top-content">
        <text style={{ color: "#757575f0" }}>
          Matthew Mills / Transformation Roadmap
        </text>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button type="ghost" style={{ padding: "0", height: "24px" }}>
            <Pencil style={{ fontSize: "20px", display: "flex" }} />
          </Button>
          <Button type="ghost" style={{ padding: "0", height: "24px" }}>
            <Star style={{ fontSize: "20px", display: "flex" }} />
          </Button>
          <Button className="primary-button">Share</Button>
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
            Transformation Roadmap
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
        <div className="frame2">
          <text>
            Say hello to your colleagues who want to know your name, pronouns,
            role, team and location
          </text>
          <text>(or if you're remote).</text>
        </div>
        <div className="frame3">
          <FileEarmarkText style={{ color: "#d1ad9af0" }} />
          <text style={{ fontSize: "17px", fontWeight: "500" }}>
            Recent pages that I've worked on
          </text>
        </div>
        <div className="frame4">
          <div className="frame4-left">
            <text
              style={{
                fontSize: "17px",
                fontWeight: "500",
              }}
            >
              Recently Updated
            </text>
            <div>
              <div className="link-button">
                <Chat size={12} />
                <Button type="link" style={{ padding: "4px 4px" }}>
                  Test 2
                </Button>
              </div>
              <div className="comment">
                <text style={{ color: "grey", fontSize: "12px" }}>
                  yesterday at 10:34 PM
                </text>
                <Dot style={{ color: "grey", fontSize: "12px" }} />
                <text style={{ color: "grey", fontSize: "12px" }}>
                  commented by
                </text>
                <Button
                  type="link"
                  style={{ padding: "4px 4px", fontSize: "12px" }}
                >
                  Matthew Mills
                </Button>
              </div>
            </div>
            <div>
              <div className="link-button">
                <FileEarmarkText size={12} />
                <Button type="link" style={{ padding: "4px 4px" }}>
                  Test Blogger
                </Button>
              </div>
              <div className="comment">
                <text style={{ color: "grey", fontSize: "12px" }}>
                  May 01, 2023
                </text>
                <Dot style={{ color: "grey", fontSize: "12px" }} />
                <text style={{ color: "grey", fontSize: "12px" }}>
                  commented by
                </text>
                <Button
                  type="link"
                  style={{ padding: "4px 4px", fontSize: "12px" }}
                >
                  Matthew Mills
                </Button>
              </div>
            </div>
            <div>
              <div className="link-button">
                <Chat size={12} />
                <Button type="link" style={{ padding: "4px 4px" }}>
                  Test
                </Button>
              </div>
              <div className="comment">
                <text style={{ color: "grey", fontSize: "12px" }}>
                  Apr 29, 2023
                </text>
                <Dot style={{ color: "grey", fontSize: "12px" }} />
                <text style={{ color: "grey", fontSize: "12px" }}>
                  commented by
                </text>
                <Button
                  type="link"
                  style={{ padding: "4px 4px", fontSize: "12px" }}
                >
                  Matthew Mills
                </Button>
              </div>
            </div>
            <div>
              <div className="link-button">
                <Chat size={12} />
                <Button type="link" style={{ padding: "4px 4px" }}>
                  Test
                </Button>
              </div>
              <div className="comment">
                <text style={{ color: "grey", fontSize: "12px" }}>
                  Apr 29, 2023
                </text>
                <Dot style={{ color: "grey", fontSize: "12px" }} />
                <text style={{ color: "grey", fontSize: "12px" }}>
                  commented by
                </text>
                <Button
                  type="link"
                  style={{ padding: "4px 4px", fontSize: "12px" }}
                >
                  Matthew Mills
                </Button>
              </div>
            </div>
            <div>
              <div className="link-button">
                <FileEarmarkText size={12} />
                <Button type="link" style={{ padding: "4px 4px" }}>
                  Test 2
                </Button>
              </div>
              <div className="comment">
                <text style={{ color: "grey", fontSize: "12px" }}>
                  Apr 29, 2023
                </text>
                <Dot style={{ color: "grey", fontSize: "12px" }} />
                <text style={{ color: "grey", fontSize: "12px" }}>
                  commented by
                </text>
                <Button
                  type="link"
                  style={{ padding: "4px 4px", fontSize: "12px" }}
                >
                  Matthew Mills
                </Button>
              </div>
            </div>
            <Divider style={{ margin: "8px 0" }} />
            <div style={{ marginTop: "-16px" }}>
              <Button type="link" style={{ padding: "4px 0" }}>
                Show More
              </Button>
            </div>
          </div>
          <div className="frame4-right">
            <text>Blog Posts</text>
            <Divider style={{ margin: "8px 0" }} />
            <div>
              <div className="list-item">
                <div>
                  <FileEarmarkText />
                  <Button type="link" style={{ padding: "4px 4px" }}>
                    Test Blogger
                  </Button>
                  <text>created by Matthew Mills</text>
                </div>
                <text>MatthewMills May 01, 2023</text>
              </div>
              <Divider style={{ margin: "4px 0" }} />
            </div>
          </div>
        </div>
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
