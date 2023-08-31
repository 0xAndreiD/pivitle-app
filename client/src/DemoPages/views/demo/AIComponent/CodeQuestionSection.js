import React from "react";

const CodeQuestionSection = ({ codeStoredValues }) => {
  return (
    <>
      <div className="answer-container">
        <div className="mine messages">
          <div className="message last">{codeStoredValues.question}</div>
        </div>
      </div>
    </>
  );
};

export default CodeQuestionSection;
