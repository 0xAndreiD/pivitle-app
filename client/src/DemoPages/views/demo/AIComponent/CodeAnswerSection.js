import React from "react";

const CodeAnswerSection = ({ codeStoredValues }) => {
  return (
    <>
      <div className="answer-container">
        <div className="yours messages">
          <div className="message last">{codeStoredValues.answer}</div>
        </div>
      </div>
    </>
  );
};

export default CodeAnswerSection;
