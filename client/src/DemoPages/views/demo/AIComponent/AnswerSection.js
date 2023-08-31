import React from "react";

const AnswerSection = ({ storedValues }) => {
  return (
    <>
      <div className="answer-container">
        <div className="yours messages">
          <div className="message last">{storedValues.answer}</div>
        </div>
      </div>
    </>
  );
};

export default AnswerSection;
