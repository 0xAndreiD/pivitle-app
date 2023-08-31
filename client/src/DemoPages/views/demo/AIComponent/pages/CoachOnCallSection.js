import { Button } from "antd";
import { Trash } from "react-bootstrap-icons";

const CoachOnCallSection = ({ activeTab }) => {
  return (
    <div
      id="tab-3"
      className={activeTab === "tab-3" ? "tab-pane active" : "tab-pane"}
    >
      <div className="sidebar-title">
        <i className="fa fa-user"></i> Code explainer helps you review your code
        and provide suggestions on how to make it better.
      </div>
      <div className="chat-response">
        <div className="chat">
          <div className="mine messages">
            <div className="message last">
              {" "}
              Good morning. My name is Bill. We are trying to organize our team
              to be more Agile but currently running into some obstacles.{" "}
            </div>
          </div>
          <div className="yours messages">
            <div className="message last">
              {" "}
              Good morning! My name is Mike. Hope you are having a great day.
              How may I help you?{" "}
            </div>
          </div>
          <div className="mine messages">
            <div className="message last">
              {" "}
              I am here to help you come to a solution for your impediments. How
              many teams do you currently have?{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-message">
        <div className="input-group">
          <input type="text" className="form-control" />
          <span className="input-group-append">
            <button type="button" className="btn btn-primary">
              Send!
            </button>
          </span>
        </div>
      </div>
      <br />
      <div>
        <ul>
          <li>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#addMeetingModal"
            >
              <i className="fa fa-phone"></i> Schedule a meeting with a Coach{" "}
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              data-toggle="modal"
              data-target="#addMeetingModal"
            >
              <i className="fa fa-briefcase"></i> Invite a coach to your next
              sceramony/meeting{" "}
            </a>
          </li>
        </ul>
      </div>
      <div className="sidebar-title">
        <i className="fa fa-calendar"></i> Scheduled meetings
      </div>
      <div
        className="ibox-content inspinia-timeline"
        style={{ height: "calc(70vh - 432px)" }}
      >
        <div className="full-height-scroll">
          <div className="timeline-item">
            <div className="row">
              <div className="col-3 date">
                <i className="fa fa-briefcase"></i> 6:00 am <br />
                <small className="text-navy">2 hour ago</small>
              </div>
              <div className="col-7 content no-top-border">
                <p className="m-b-xs">
                  <strong>Meeting</strong>
                </p>
                <p>
                  Conference on the sales results for the previous year. Monica
                  please examine sales trends in marketing and products. Below
                  please find the current status of the sale.
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="row">
              <div className="col-3 date">
                <i className="fa fa-file-text"></i> 7:00 am <br />
                <small className="text-navy">3 hour ago</small>
              </div>
              <div className="col-7 content">
                <p className="m-b-xs">
                  <strong>Send documents to Mike</strong>
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since.
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="row">
              <div className="col-3 date">
                <i className="fa fa-coffee"></i> 8:00 am <br />
              </div>
              <div className="col-7 content">
                <p className="m-b-xs">
                  <strong>Coffee Break</strong>
                </p>
                <p>
                  {" "}
                  Go to shop and find some products. Lorem Ipsum is simply dummy
                  text of the printing and typesetting industry. Lorem Ipsum has
                  been the industry's.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="row">
              <div className="col-3 date">
                <i className="fa fa-phone"></i> 11:00 am <br />
                <small className="text-navy">21 hour ago</small>
              </div>
              <div className="col-7 content">
                <p className="m-b-xs">
                  <strong>Phone with Jeronimo</strong>
                </p>
                <p>
                  {" "}
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="row">
              <div className="col-3 date">
                <i className="fa fa-user-md"></i> 09:00 pm <br />
                <small>21 hour ago</small>
              </div>
              <div className="col-7 content">
                <p className="m-b-xs">
                  <strong>Go to the doctor dr Smith</strong>
                </p>
                <p> Find some issue and go to doctor. </p>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="row">
              <div className="col-3 date">
                <i className="fa fa-user-md"></i> 11:10 pm
              </div>
              <div className="col-7 content">
                <p className="m-b-xs">
                  <strong>Chat with Sandra</strong>
                </p>
                <p>
                  {" "}
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="row">
              <div className="col-3 date">
                <i className="fa fa-comments"></i> 12:50 pm <br />
                <small className="text-navy">48 hour ago</small>
              </div>
              <div className="col-7 content">
                <p className="m-b-xs">
                  <strong>Chat with Monica and Sandra</strong>
                </p>
                <p>
                  {" "}
                  Web sites still in their infancy. Various versions have
                  evolved over the years, sometimes by accident, sometimes on
                  purpose (injected humour and the like).{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="row">
              <div className="col-3 date">
                <i className="fa fa-phone"></i> 08:50 pm <br />
                <small className="text-navy">68 hour ago</small>
              </div>
              <div className="col-7 content">
                <p className="m-b-xs">
                  <strong>Phone to James</strong>
                </p>
                <p>
                  {" "}
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose (injected humour and the like).{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="row">
              <div className="col-3 date">
                <i className="fa fa-file-text"></i> 7:00 am <br />
                <small className="text-navy">3 hour ago</small>
              </div>
              <div className="col-7 content">
                <p className="m-b-xs">
                  <strong>Send documents to Mike</strong>
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button className="clear-chat-button">
        <Trash />
        Clear Conversation
      </Button>
    </div>
  );
};

export default CoachOnCallSection;
