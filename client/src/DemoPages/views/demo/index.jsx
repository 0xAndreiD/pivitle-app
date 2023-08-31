/* eslint-disable default-case */
/* eslint-disable jsx-a11y/alt-text */
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../../config/variables";
import Subscriptions from "../../Subscriptions/Subscription";
import { setSubscriptions, setUser } from "../../../reducers/Auth";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../Redux/Store";

import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

import { Input, Button, Avatar, Menu, Tag, Dropdown, Layout } from "antd";
import {
  SearchOutlined,
  BellFilled,
  QuestionCircleFilled,
  MenuOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";
import {
  GearWide,
  FilterLeft,
  Dot,
  App,
  Quote,
  Pencil,
  JustifyLeft,
  PinAngle,
  PlusLg,
  ThreeDots,
  InputCursorText,
  Link45deg,
  Trash,
} from "react-bootstrap-icons";
import "../../../assets/styles/demo.scss";
import Transformation from "./Transformation";
import Progress from "./Progress";
import ProgressBoard from "./Progress/progressBoard";
import AIcomponent from "../demo/AIComponent";

import { Configuration, OpenAIApi } from "openai";

import Config from "../utilities/Config";

import dojo_icon1 from "../../../assets/img/dojo_1.png";
import dojo_icon2 from "../../../assets/img/dojo_2.png";

const configuration = new Configuration({
  apiKey: Config.openAIKey,
});

const openai = new OpenAIApi(configuration);

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

const menu3 = (
  <>
    <div
      className="menu-header-content btn-pane-right"
      style={{ padding: "8px" }}
    >
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          width: "240px",
        }}
      >
        <text
          className="menu-header-title"
          style={{ fontWeight: "bold", fontSize: "16px" }}
        >
          RECOMMENDED FOR YOUR TEAM
        </text>
        <text className="menu-header-subtitle" style={{ fontSize: "11px" }}>
          Ship faster with marketplace apps that integrate your team's tools
          with Jira
        </text>
      </div>
    </div>
    <Menu.Divider />
    <Menu.Item>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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

const progress = [
  {
    key: "1",
    progressBoard: {
      title: "Technical team progress",
      subtitle: "North America tech team",
    },
    teams: [
      { name: "Brian", avatar: "" },
      { name: "Ryan", avatar: "" },
      { name: "Rod", avatar: "" },
    ],
    createdAt: "Sep 05, 2022",
    draft: true,
  },
  {
    key: "2",
    progressBoard: {
      title: "Technical team progress",
      subtitle: "Overseas tech team",
    },
    teams: [
      { name: "Brian", avatar: "" },
      { name: "Ryan", avatar: "" },
      { name: "Rod", avatar: "" },
    ],
    createdAt: "Sep 05, 2022",
    draft: false,
  },
  {
    key: "3",
    progressBoard: {
      title: "Business team progress",
      subtitle: "North America business team",
    },
    teams: [
      { name: "Brian", avatar: "" },
      { name: "Ryan", avatar: "" },
      { name: "Rod", avatar: "" },
    ],
    createdAt: "Sep 05, 2022",
    draft: false,
  },
];

let originalSelectedNode = null;

function Demo(props) {
  const dispatch = useDispatch();
  const { user, Authorization, subscriptions } = useSelector(
    (state) => state.Auth
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  const [collapsed, setCollapsed] = useState(false);
  const [tempCollapsed, setTempCollapsed] = useState(false);
  const [overSider, setOverSider] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [rightSibebarClassName, setRightSidebarClassName] = useState(false);
  const [activeTab, setActiveTab] = useState("tab-1");
  const [loading, setLoading] = useState(false);
  const [storedValues, setStoredValues] = useState([]);

  const [selectedText, setSelectedText] = useState("");
  const [isSelectedTextOpen, setIsSelectedTextOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [selRange, setSelRange] = useState(null);

  const [selectButtonClick, setSelectButtonClick] = useState(false);

  const handleMouseUp = (e) => {
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
      var range = window.getSelection().getRangeAt(0);
      var rect = range.getBoundingClientRect();
      if (rect.left > window.innerWidth - 120) {
        setPosition({ x: rect.left - 120, y: rect.bottom });
      } else {
        setPosition({ x: rect.left, y: rect.bottom });
      }
      setIsSelectedTextOpen(true);
    } else {
      setIsSelectedTextOpen(false);
    }
  };

  const handleSelection = () => {
    setIsSelectedTextOpen(false);
    const selection = window.getSelection().toString();

    var selectedRange = window.getSelection();
    var range = selRange;
    if (originalSelectedNode) {
      range.deleteContents();
      range.insertNode(originalSelectedNode);
      originalSelectedNode = null;
    }
    range = selectedRange.getRangeAt(0);
    originalSelectedNode = range.cloneContents();
    var newNode = document.createElement("b");
    newNode.appendChild(range.extractContents());
    range.insertNode(newNode);
    setSelRange(range);

    setSelectedText(selection);
    setRightSidebarClassName(true);
    setActiveTab("tab-1");
    handleCopy(selection);
  };

  const handleCopy = (selection) => {
    if (selection) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(selection);
      }
      setSelectButtonClick(true);
      // generateHistoryResponse(selection);
    }
  };

  const generateHistoryResponse = async (
    newHistoryQuestion,
    setNewHistoryQuestion
  ) => {
    setLoading(true);

    let options = {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["/"],
    };

    const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The assistant can also use markdown formatting to include code snippets.\n Human: Hello, who are you? \n AI: I am an Ai created by Clovon with the help of OpenAI. How can I help you today? \n Human: ${newHistoryQuestion}. \n AI:`;

    let completeOptions = {
      ...options,
      prompt: prompt,
    };

    try {
      const response = await openai.createCompletion(completeOptions);

      if (response.data.choices) {
        setStoredValues([
          ...storedValues,
          {
            question: newHistoryQuestion,
            answer: response.data.choices[0].text,
          },
        ]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err);
      setLoading(false);
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);

    if (window.innerWidth <= 840) {
      setCollapsed(true);
      setTempCollapsed(true);
    } else if (!collapsed) {
      setCollapsed(false);
      setTempCollapsed(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);

    const authToken = localStorage.getItem("Authorization");

    if (!authToken) props.history.push("/pages/login");

    var userData = user;

    if (userData) {
      if (!userData._id) {
        const profile = await axios.get(baseURL + "/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        });
        userData = profile.data.data;
        if (!Authorization)
          dispatch(
            setUser({ data: profile.data.data, Authorization: authToken })
          );
      }

      if (!userData.subscribed) {
        const response = await axios.get(baseURL + "/static/subscriptions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        });

        dispatch(setSubscriptions(response.data));
      }
    }

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    history.push("/pages/login"); // navigate to login page
  };

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

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        history.push("/home/transformation");
        break;
      case "2":
        history.push("/home/progress");
        break;
    }

    if (e.key !== "2" && e.key[0] === "2") {
      history.push(`/home/progress/board/${e.key.slice(2)}`);
    }
  };

  const renderMenuItems = (items) =>
    items.map((item) =>
      item.children ? (
        <Menu.SubMenu
          key={item.key}
          icon={item.icon}
          title={item.label}
          onTitleClick={handleMenuClick}
        >
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item.key} icon={item.icon} onClick={handleMenuClick}>
          {item.label}
        </Menu.Item>
      )
    );

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
          paddingInlineEnd: "60px",
        }}
      >
        <text>Progress board</text>
        <div>
          <PlusLg />
        </div>
      </div>,
      "2",
      <App size={24} />,
      progress.map((item) =>
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
              {item.progressBoard.title}
              {item.draft && (
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
              )}
            </text>
            <div>
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
            </div>
          </div>,
          `2-${item.key}`,
          <Dot />
        )
      )
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
    <Provider store={store}>
      <Layout className="demo" onMouseUp={handleMouseUp}>
        <div className="top-nav">
          <div className="top-nav-frame1"></div>
          <div className="top-nav-frame2">
            <text
              style={{ width: "104px", fontSize: "22px", fontWeight: "500" }}
            >
              Pivitle 360
            </text>
          </div>
          <Nav className="nav demo-nav-menu" style={{ marginLeft: "52px" }}>
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
                style={{ width: "350px", marginLeft: "296px" }}
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
                style={{ width: "350px", marginLeft: "376px" }}
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
                style={{ width: "350px", marginLeft: "406px" }}
              >
                {DropdownMenu1}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <Button
              className="primary-button"
              style={{
                marginLeft: "8px",
                alignSelf: "center",
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
            {windowWidth > 980 ? (
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search"
                className="search"
              ></Input>
            ) : (
              <Button
                style={{
                  padding: "0 8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SearchOutlined />
              </Button>
            )}
            <Button
              type="ghost"
              style={{
                borderRadius: "50%",
                padding: "0",
                height: "24px",
              }}
            >
              <BellFilled
                rotate={45}
                style={{ fontSize: "18px", display: "flex" }}
              />
            </Button>
            <Button
              type="ghost"
              style={{
                borderRadius: "50%",
                padding: "0",
                height: "24px",
              }}
            >
              <QuestionCircleFilled
                style={{ fontSize: "20px", display: "flex" }}
              />
            </Button>
            <Button
              type="ghost"
              style={{
                borderRadius: "50%",
                padding: "0",
                height: "24px",
              }}
            >
              <GearWide style={{ fontSize: "20px", display: "flex" }} />
            </Button>
            <Button
              type="ghost"
              style={{
                padding: "0",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                minWidth: "24px",
                height: "24px",
                minHeight: "24px",
              }}
            >
              <Dropdown
                overlay={
                  <Menu style={{ width: "240px" }}>
                    <div
                      style={{
                        paddingTop: "4px",
                        paddingInline: "12px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <div>ACCOUNT</div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
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
                          <text style={{ fontSize: "12px" }}>
                            Matthew Mills
                          </text>
                          <text style={{ fontSize: "10px" }}>
                            Mmills.matthew@outlook.com
                          </text>
                        </div>
                      </div>
                    </div>
                    <Menu.Item>
                      <div>Manage account</div>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item>
                      <div>UPGRADE</div>
                    </Menu.Item>
                    <Menu.Item>
                      <div>Upgrade your plan</div>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item>
                      <div>Profile</div>
                    </Menu.Item>
                    <Menu.Item>
                      <div>Personal settings</div>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={handleLogout}>
                      <div>Log out</div>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomRight"
                trigger={["click"]}
              >
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
              </Dropdown>
            </Button>
            <Button
              type="ghost"
              style={{
                padding: "0",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                minWidth: "28px",
                height: "28px",
                minHeight: "28px",
                marginRight: "-16px",
              }}
              onClick={() => setRightSidebarClassName(!rightSibebarClassName)}
            >
              <Avatar
                style={{
                  width: "28px",
                  minWidth: "28px",
                  height: "28px",
                  minHeight: "28px",
                  display: "flex",
                  alignItems: "center",
                }}
                src={dojo_icon2}
              ></Avatar>
            </Button>
            <Button
              className="demo-nav-min-menu"
              type="ghost"
              style={{ padding: "0", height: "24px" }}
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
                          fontWeight: "500",
                          marginLeft: "14px",
                        }}
                      >
                        <span>Home</span>
                      </div>
                    </Menu.Item>
                    <Menu.SubMenu
                      title={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CaretLeftOutlined />
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontWeight: "500",
                            }}
                          >
                            Recent
                          </span>
                        </div>
                      }
                      expandIcon={() => null}
                    >
                      {menu3}
                    </Menu.SubMenu>
                    <Menu.SubMenu
                      title={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CaretLeftOutlined />
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontWeight: "500",
                            }}
                          >
                            Teams
                          </span>
                        </div>
                      }
                      expandIcon={() => null}
                    >
                      {menu3}
                    </Menu.SubMenu>
                    <Menu.SubMenu
                      title={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CaretLeftOutlined />
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontWeight: "500",
                            }}
                          >
                            App
                          </span>
                        </div>
                      }
                      expandIcon={() => null}
                    >
                      {menu3}
                    </Menu.SubMenu>
                    <Menu.Divider />
                    <Menu.Item>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Button
                          className="primary-button"
                          style={{
                            width: "100%",
                            alignSelf: "center",
                            alignItems: "center",
                          }}
                        >
                          Create
                        </Button>
                      </div>
                    </Menu.Item>
                  </Menu>
                }
                placement="bottomRight"
                trigger={["click"]}
              >
                <MenuOutlined
                  style={{ fontSize: "20px", display: "flex" }}
                  onClick={(e) => e.preventDefault()}
                />
              </Dropdown>
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
                    inlineCollapsed={false}
                    expandIcon={() => null}
                  >
                    {renderMenuItems(items1)}
                  </Menu>
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
          {subscriptions ? (
            <Subscriptions props={props} />
          ) : (
            <div
              className="main-content"
              style={{ marginLeft: overSider ? "-14px" : "0" }}
            >
              <Switch>
                <Route exact path="/home" component={Transformation} />
                <Route path="/home/transformation" component={Transformation} />
                <Route
                  exact
                  path="/home/progress"
                  render={(props) => (
                    <Progress {...props} progress={progress} />
                  )}
                />
                {progress.map((item) => (
                  <Route
                    path={`/home/progress/board/${item.key}`}
                    render={(props) => (
                      <ProgressBoard {...props} boardInfo={item} />
                    )}
                  />
                ))}
              </Switch>
            </div>
          )}
          <AIcomponent
            rightSibebarClassName={rightSibebarClassName}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedText={selectedText}
            setSelectedText={setSelectedText}
            loading={loading}
            setLoading={setLoading}
            storedValues={storedValues}
            setStoredValues={setStoredValues}
            selectButtonClick={selectButtonClick}
            setSelectButtonClick={setSelectButtonClick}
          />
          {isSelectedTextOpen && (
            <Button
              style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                display: "flex",
                alignItems: "center",
                width: "110px",
                height: "38px",
              }}
              onClick={() => handleSelection()}
            >
              <Avatar
                style={{
                  width: "28px",
                  minWidth: "28px",
                  height: "28px",
                  minHeight: "28px",
                  display: "flex",
                  alignItems: "center",
                  marginRight: "4px",
                }}
                src={dojo_icon2}
              ></Avatar>
              Dojo
            </Button>
          )}
          <Button
            type="ghost"
            style={{
              position: "absolute",
              padding: "0",
              border: "none",
              borderRadius: "50%",
              width: "48px",
              minWidth: "48px",
              height: "48px",
              minHeight: "48px",
              right: "48px",
              bottom: "24px",
            }}
            onClick={() => setRightSidebarClassName(!rightSibebarClassName)}
          >
            <Avatar
              style={{
                width: "48px",
                minWidth: "48px",
                height: "48px",
                minHeight: "48px",
                display: "flex",
                alignItems: "center",
              }}
              src={dojo_icon1}
            ></Avatar>
          </Button>
        </div>
      </Layout>
    </Provider>
  );
}

export default Demo;
