import React from "react";
import { useState } from "react";

const ChatHistory = ({ generateHistoryResponse, history }) => {
  const [newHistoryQuestion, setNewHistoryQuestion] = useState(
    history.question
  );

  const CreatedData = history.createdAt;
  const timeDiff = Math.abs(new Date() - new Date(CreatedData));
  const diffMinutes = Math.floor(timeDiff / (1000 * 60));
  const diffHours = Math.floor(timeDiff / (1000 * 60 * 60));

  let TimeComponent = () => {
    return (
      <div className="col-3 date">
        <i className="fa fa-comment"></i>
        {formattedDate}
      </div>
    );
  };

  let formattedDate = new Date(CreatedData).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  if (diffMinutes < 60) {
    formattedDate = `${diffMinutes} min ago`;
    TimeComponent = () => {
      return (
        <div className="col-3 date">
          <i className="fa fa-comment"></i>
          <small className="text-navy">{formattedDate}</small>
        </div>
      );
    };
  } else if (diffHours < 24) {
    formattedDate = `${diffHours} hours ago`;
    TimeComponent = () => {
      return (
        <div className="col-3 date">
          <i className="fa fa-comment"></i>
          <small className="text-navy">{formattedDate}</small>
        </div>
      );
    };
  }

  const setHistory = (historyQues) => {
    generateHistoryResponse(historyQues, setNewHistoryQuestion);
  };

  return (
    <>
      <div className="timeline-item">
        <div className="row">
          <TimeComponent />
          <div className="col-7 content">
            <a onClick={() => setHistory(history.question)}>
              {history.question}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
