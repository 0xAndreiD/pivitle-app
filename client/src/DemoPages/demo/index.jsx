/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import {
  Input,
  Button,
  Avatar,
  Menu,
  Divider,
  Tag,
  Dropdown,
  Layout,
} from "antd";
import {
  SearchOutlined,
  BellFilled,
  QuestionCircleFilled,
  MenuOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  GearWide,
  FilterLeft,
  Dot,
  App,
  Quote,
  Pencil,
  Star,
  FileEarmarkText,
  ChatText,
  Chat,
  JustifyLeft,
  PinAngle,
  PlusLg,
  ThreeDots,
  InputCursorText,
  Link45deg,
  Trash,
} from "react-bootstrap-icons";
import "../../assests/styles/demo.scss";

const { Sider } = Layout;

const DropdownMenu1 = (
  <>
    <div className="dropdown-menu-header" style={{ padding: "8px 24px" }}>
      <div className="dropdown-menu-header-inner bg-secondary">
        <div className="menu-header-image opacity-5" />
        <div className="menu-header-content btn-pane-right">
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <text className="menu-header-title" style={{ fontWeight: "bold" }}>
              RECOMMENDED FOR YOUR TEAM
            </text>
            <text className="menu-header-subtitle" style={{ fontSize: "14px" }}>
              Ship faster with marketplace apps that integrate your team's tools
              with Jira
            </text>
          </div>
        </div>
      </div>
    </div>
    <DropdownItem divider />
    <DropdownItem style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 496 512"
      >
        <path d="M490 241.7C417.1 169 320.6 71.8 248.5 0 83 164.9 6 241.7 6 241.7c-7.9 7.9-7.9 20.7 0 28.7C138.8 402.7 67.8 331.9 248.5 512c379.4-378 15.7-16.7 241.5-241.7 8-7.9 8-20.7 0-28.6zm-241.5 90l-76-75.7 76-75.7 76 75.7-76 75.7z" />
      </svg>
      <span>Jira</span>
    </DropdownItem>
    <DropdownItem style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
      >
        <path d="M2.3 412.2c-4.5 7.6-2.1 17.5 5.5 22.2l105.9 65.2c7.7 4.7 17.7 2.4 22.4-5.3 0-.1.1-.2.1-.2 67.1-112.2 80.5-95.9 280.9-.7 8.1 3.9 17.8.4 21.7-7.7.1-.1.1-.3.2-.4l50.4-114.1c3.6-8.1-.1-17.6-8.1-21.3-22.2-10.4-66.2-31.2-105.9-50.3C127.5 179 44.6 345.3 2.3 412.2zm507.4-312.1c4.5-7.6 2.1-17.5-5.5-22.2L398.4 12.8c-7.5-5-17.6-3.1-22.6 4.4-.2.3-.4.6-.6 1-67.3 112.6-81.1 95.6-280.6.9-8.1-3.9-17.8-.4-21.7 7.7-.1.1-.1.3-.2.4L22.2 141.3c-3.6 8.1.1 17.6 8.1 21.3 22.2 10.4 66.3 31.2 106 50.4 248 120 330.8-45.4 373.4-112.9z" />
      </svg>
      <span>Confluence</span>
    </DropdownItem>
    <DropdownItem style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        style={{ width: "16px" }}
      >
        <path d="M94.12 315.1c0 25.9-21.16 47.06-47.06 47.06S0 341 0 315.1c0-25.9 21.16-47.06 47.06-47.06h47.06v47.06zm23.72 0c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06v117.84c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V315.1zm47.06-188.98c-25.9 0-47.06-21.16-47.06-47.06S139 32 164.9 32s47.06 21.16 47.06 47.06v47.06H164.9zm0 23.72c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H47.06C21.16 243.96 0 222.8 0 196.9s21.16-47.06 47.06-47.06H164.9zm188.98 47.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06h-47.06V196.9zm-23.72 0c0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06V79.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06V196.9zM283.1 385.88c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06v-47.06h47.06zm0-23.72c-25.9 0-47.06-21.16-47.06-47.06 0-25.9 21.16-47.06 47.06-47.06h117.84c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06H283.1z" />
      </svg>
      <span>Slack</span>
    </DropdownItem>
    <DropdownItem style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{ width: "16px" }}
      >
        <path d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z" />
      </svg>
      <span>Google Drive</span>
    </DropdownItem>
    <DropdownItem style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 18 30"
        fill="none"
      >
        <path
          d="M10.7584 0.816895L0.855469 6.53771V29.421L10.7584 23.7002V0.816895Z"
          fill="#282C33"
        />
        <path
          d="M20.6608 29.0643V17.979L10.7578 23.6998V29.0643H20.6608Z"
          fill="#282C33"
        />
      </svg>
      <span>Lucidchart</span>
    </DropdownItem>
    <DropdownItem divider />
    <DropdownItem style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span>Manage Apps</span>
    </DropdownItem>
    <DropdownItem style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span>View App requests</span>
    </DropdownItem>
  </>
);

const menu1 = (
  <>
    <div className="dropdown-menu-header" style={{ padding: "8px 24px" }}>
      <div className="dropdown-menu-header-inner bg-secondary">
        <div className="menu-header-image opacity-5" />
        <div className="menu-header-content btn-pane-right">
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <text className="menu-header-title" style={{ fontWeight: "bold" }}>
              RECOMMENDED FOR YOUR TEAM
            </text>
            <text className="menu-header-subtitle" style={{ fontSize: "14px" }}>
              Ship faster with marketplace apps that integrate your team's tools
              with Jira
            </text>
          </div>
        </div>
      </div>
    </div>
    <Menu.Divider />
    <Menu.Item>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 496 512"
        >
          <path d="M490 241.7C417.1 169 320.6 71.8 248.5 0 83 164.9 6 241.7 6 241.7c-7.9 7.9-7.9 20.7 0 28.7C138.8 402.7 67.8 331.9 248.5 512c379.4-378 15.7-16.7 241.5-241.7 8-7.9 8-20.7 0-28.6zm-241.5 90l-76-75.7 76-75.7 76 75.7-76 75.7z" />
        </svg>
        <span>Jira</span>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M2.3 412.2c-4.5 7.6-2.1 17.5 5.5 22.2l105.9 65.2c7.7 4.7 17.7 2.4 22.4-5.3 0-.1.1-.2.1-.2 67.1-112.2 80.5-95.9 280.9-.7 8.1 3.9 17.8.4 21.7-7.7.1-.1.1-.3.2-.4l50.4-114.1c3.6-8.1-.1-17.6-8.1-21.3-22.2-10.4-66.2-31.2-105.9-50.3C127.5 179 44.6 345.3 2.3 412.2zm507.4-312.1c4.5-7.6 2.1-17.5-5.5-22.2L398.4 12.8c-7.5-5-17.6-3.1-22.6 4.4-.2.3-.4.6-.6 1-67.3 112.6-81.1 95.6-280.6.9-8.1-3.9-17.8-.4-21.7 7.7-.1.1-.1.3-.2.4L22.2 141.3c-3.6 8.1.1 17.6 8.1 21.3 22.2 10.4 66.3 31.2 106 50.4 248 120 330.8-45.4 373.4-112.9z" />
        </svg>
        <span>Confluence</span>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          style={{ width: "16px" }}
        >
          <path d="M94.12 315.1c0 25.9-21.16 47.06-47.06 47.06S0 341 0 315.1c0-25.9 21.16-47.06 47.06-47.06h47.06v47.06zm23.72 0c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06v117.84c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V315.1zm47.06-188.98c-25.9 0-47.06-21.16-47.06-47.06S139 32 164.9 32s47.06 21.16 47.06 47.06v47.06H164.9zm0 23.72c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H47.06C21.16 243.96 0 222.8 0 196.9s21.16-47.06 47.06-47.06H164.9zm188.98 47.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06h-47.06V196.9zm-23.72 0c0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06V79.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06V196.9zM283.1 385.88c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06v-47.06h47.06zm0-23.72c-25.9 0-47.06-21.16-47.06-47.06 0-25.9 21.16-47.06 47.06-47.06h117.84c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06H283.1z" />
        </svg>
        <span>Slack</span>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          style={{ width: "16px" }}
        >
          <path d="M339 314.9L175.4 32h161.2l163.6 282.9H339zm-137.5 23.6L120.9 480h310.5L512 338.5H201.5zM154.1 67.4L0 338.5 80.6 480 237 208.8 154.1 67.4z" />
        </svg>
        <span>Google Drive</span>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 18 30"
          fill="none"
        >
          <path
            d="M10.7584 0.816895L0.855469 6.53771V29.421L10.7584 23.7002V0.816895Z"
            fill="#282C33"
          />
          <path
            d="M20.6608 29.0643V17.979L10.7578 23.6998V29.0643H20.6608Z"
            fill="#282C33"
          />
        </svg>
        <span>Lucidchart</span>
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
        <span>Manage Apps</span>
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
        <span>View App requests</span>
      </div>
    </Menu.Item>
  </>
);

const menu2 = (
  <>
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
  </>
);

function Demo(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [tempCollapsed, setTempCollapsed] = useState(false);
  const [overSider, setOverSider] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setTempCollapsed(!collapsed);
  };

  const onMouseOverSider = () => {
    if (!collapsed) {
      setTimeout(() => {
        setOverSider(true);
      }, 100);
    } else {
      setTempCollapsed(false);
    }
  };

  const onMouseLeaveSider = () => {
    if (!collapsed) {
      setTimeout(() => {
        setOverSider(false);
      }, 100);
    } else {
      setTempCollapsed(true);
    }
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items1 = [
    getItem(
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <text>Transformation Roadmap</text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            paddingInlineEnd: "60px",
          }}
        >
          <Dropdown
            overlay={<Menu style={{ width: "144px" }}>{menu2}</Menu>}
            placement="bottomRight"
            trigger={["click"]}
          >
            <ThreeDots onClick={(e) => e.preventDefault()} />
          </Dropdown>
          <PlusLg />
        </div>
      </div>,
      "1",
      <FilterLeft size={24} />,
      [
        getItem(
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <text>Agile Process</text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingInlineEnd: "60px",
              }}
            >
              <Dropdown
                overlay={<Menu style={{ width: "144px" }}>{menu2}</Menu>}
                placement="bottomRight"
                trigger={["click"]}
              >
                <ThreeDots onClick={(e) => e.preventDefault()} />
              </Dropdown>
              <PlusLg />
            </div>
          </div>,
          "1-1",
          <DownOutlined />,
          [
            getItem(
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingInlineEnd: "78px",
                }}
              >
                <text>Agile Teams</text>
                <div>
                  <PlusLg />
                </div>
              </div>,
              "1-1-1",
              <Dot />
            ),
          ]
        ),
      ]
    ),
    getItem(
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingInlineEnd: "78px",
        }}
      >
        <text>Progress board</text>
        <div>
          <PlusLg />
        </div>
      </div>,
      "2",
      <App size={24} />
    ),
    getItem(
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingInlineEnd: "78px",
        }}
      >
        <text>Retrospective Board</text>
        <div>
          <PlusLg />
        </div>
      </div>,
      "3",
      <App size={24} />
    ),
    getItem(
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingInlineEnd: "78px",
        }}
      >
        <text>Blog</text>
        <div>
          <PlusLg />
        </div>
      </div>,
      "4",
      <Quote size={24} style={{ transform: "rotate(180deg)" }} />
    ),
    getItem(
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingInlineEnd: "60px",
        }}
      >
        <text>Pages</text>
        <div>
          <PlusLg />
        </div>
      </div>,
      "5",
      <JustifyLeft size={24} />,
      [
        getItem(
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingInlineEnd: "78px",
            }}
          >
            <text
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              Untitled
              <Tag
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "8px",
                  fontSize: "10px",
                  height: "18px",
                  backgroundColor: "#b5b5b5",
                }}
              >
                Draft
              </Tag>
            </text>
            <div>
              <Dropdown
                overlay={<Menu style={{ width: "144px" }}>{menu2}</Menu>}
                placement="bottomRight"
                trigger={["click"]}
              >
                <ThreeDots onClick={(e) => e.preventDefault()} />
              </Dropdown>
            </div>
          </div>,
          "5-1",
          <Dot />
        ),
        getItem(
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingInlineEnd: "60px",
            }}
          >
            <text>Test page</text>
            {/* <div>
              <PlusLg />
            </div> */}
          </div>,
          "5-2",
          <DownOutlined />,
          [
            getItem(
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingInlineEnd: "60px",
                }}
              >
                <text>Test page 2</text>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <Dropdown
                    overlay={<Menu style={{ width: "144px" }}>{menu2}</Menu>}
                    placement="bottomRight"
                    trigger={["click"]}
                  >
                    <ThreeDots onClick={(e) => e.preventDefault()} />
                  </Dropdown>
                  <PlusLg />
                </div>
              </div>,
              "5-2-1",
              <DownOutlined />,
              [
                getItem(
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingInlineEnd: "78px",
                    }}
                  >
                    <text>Test page</text>
                    {/* <div>
                      <PlusLg />
                    </div> */}
                  </div>,
                  "5-2-1-1",
                  <Dot />
                ),
              ]
            ),
          ]
        ),
      ]
    ),
    getItem(
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingInlineEnd: "78px",
        }}
      >
        <text>My Apps</text>
        <div>
          <Dropdown
            overlay={<Menu style={{ width: "350px" }}>{menu1}</Menu>}
            trigger={["click"]}
          >
            <PlusLg onClick={(e) => e.preventDefault()} />
          </Dropdown>
        </div>
      </div>,
      "6",
      <App size={24} />
    ),
    getItem(
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingInlineEnd: "60px",
        }}
      >
        <text>Pin</text>
        <div>
          <PlusLg />
        </div>
      </div>,
      "7",
      <PinAngle size={24} />,
      [
        getItem(
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingInlineEnd: "78px",
            }}
          >
            <text>Test page</text>
            <div>
              <PlusLg />
            </div>
          </div>,
          "7-1",
          <Dot />
        ),
      ]
    ),
  ];

  return (
    <Layout className="demo">
      <div className="top-nav">
        <div className="top-nav-frame1"></div>
        <div className="top-nav-frame2">
          <text style={{ fontSize: "22px", fontWeight: "500" }}>
            Pivitle 360
          </text>
        </div>
        <Nav class="nav" style={{ marginLeft: "52px" }}>
          <NavItem>
            <NavLink
              class="nav-link"
              aria-current="page"
              href="#"
              style={{
                margin: "8px 8px 8px 0",
                fontWeight: "500",
                color: "black",
              }}
            >
              Home
            </NavLink>
          </NavItem>
          <UncontrolledButtonDropdown>
            <DropdownToggle
              caret
              outline
              color="link"
              className="mb-2 me-2"
              style={{
                fontWeight: "500",
                color: "black",
                border: "none",
                marginTop: "8px",
              }}
            >
              Recent
            </DropdownToggle>
            <DropdownMenu
              className="dropdown-menu-xl"
              style={{ width: "350px", marginLeft: "290px" }}
            >
              {DropdownMenu1}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <UncontrolledButtonDropdown>
            <DropdownToggle
              caret
              outline
              color="link"
              className="mb-2 me-2"
              style={{
                fontWeight: "500",
                color: "black",
                border: "none",
                marginTop: "8px",
              }}
            >
              Teams
            </DropdownToggle>
            <DropdownMenu
              className="dropdown-menu-xl"
              style={{ width: "350px", marginLeft: "350px" }}
            >
              {DropdownMenu1}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <UncontrolledButtonDropdown>
            <DropdownToggle
              caret
              outline
              color="link"
              className="mb-2 me-2"
              style={{
                fontWeight: "500",
                color: "black",
                border: "none",
                marginTop: "8px",
              }}
            >
              App
            </DropdownToggle>
            <DropdownMenu
              className="dropdown-menu-xl"
              style={{ width: "350px", marginLeft: "350px" }}
            >
              {DropdownMenu1}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <Button
            style={{
              marginLeft: "8px",
              height: "28px",
              alignSelf: "center",
              backgroundColor: "rgb(22 130 255 / 86%)",
              border: "2px solid #015ace",
              borderRadius: "6px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            Create
          </Button>
        </Nav>
        <div
          style={{
            position: "absolute",
            right: "12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Input prefix={<SearchOutlined />} placeholder="Search"></Input>
          <Button type="ghost" style={{ padding: "0", height: "24px" }}>
            <BellFilled
              rotate={45}
              style={{ fontSize: "18px", display: "flex" }}
            />
          </Button>
          <Button type="ghost" style={{ padding: "0", height: "24px" }}>
            <QuestionCircleFilled
              style={{ fontSize: "20px", display: "flex" }}
            />
          </Button>
          <Button type="ghost" style={{ padding: "0", height: "24px" }}>
            <GearWide style={{ fontSize: "20px", display: "flex" }} />
          </Button>
          <Avatar
            style={{
              width: "44px",
              height: "24px",
              backgroundColor: "#6123ffed",
              display: "flex",
              alignItems: "center",
            }}
          >
            MM
          </Avatar>
          <Button type="ghost" style={{ padding: "0", height: "24px" }}>
            <MenuOutlined style={{ fontSize: "20px", display: "flex" }} />
          </Button>
        </div>
      </div>
      <div className="content">
        <div
          style={{ display: "flex" }}
          onMouseOver={() => onMouseOverSider()}
          onMouseLeave={() => onMouseLeaveSider()}
        >
          <Sider
            className="sider"
            collapsed={tempCollapsed}
            collapsedWidth={20}
            width={330}
          >
            {true && (
              <>
                <div
                  style={{
                    width: "240px",
                    padding: "16px 28px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    size={28}
                    style={{
                      backgroundColor: "#6123ffed",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    MM
                  </Avatar>
                  <text style={{ marginLeft: "8px" }}>Matthew Mills</text>
                </div>
                <Menu
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    border: "none",
                    width: "400px",
                  }}
                  defaultSelectedKeys={["1"]}
                  mode={"inline"}
                  theme={"light"}
                  items={items1}
                  inlineCollapsed={false}
                  expandIcon={() => null}
                />
              </>
            )}
          </Sider>
          <Button
            style={{
              marginTop: "16px",
              marginLeft: "-14px",
              minWidth: "0px",
              width: "28px",
              height: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            hidden={!overSider}
            shape="circle"
            onClick={() => toggleCollapsed()}
          >
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
        </div>
        <div
          className="main-content"
          style={{ marginLeft: overSider ? "-14px" : "0" }}
        >
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
              <Button
                style={{
                  height: "28px",
                  backgroundColor: "rgb(22 130 255 / 86%)",
                  border: "2px solid #015ace",
                  borderRadius: "6px",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                Share
              </Button>
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  size={28}
                  style={{
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
                  <text style={{ fontSize: "10px" }}>
                    Created by Matthew Mills
                  </text>
                  <text style={{ fontSize: "10px" }}>
                    May 03, 2023 – 1 min read
                  </text>
                </div>
              </div>
            </div>
            <div className="frame2">
              <text>
                Say hello to your colleagues who want to know your name,
                pronouns, role, team and location
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
                size={28}
                style={{
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
                size={28}
                style={{
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
      </div>
    </Layout>
  );
}

export default Demo;
