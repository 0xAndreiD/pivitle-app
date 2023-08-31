import React from "react";

const QuestionSection = ({ storedValues }) => {
  return (
    <>
      <div className="answer-container">
        <div className="mine messages">
          <div className="message last">{storedValues.question}</div>
        </div>
      </div>
    </>
  );
};

export default QuestionSection;
