import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const FormSection = ({
  generateResponse,
  newQuestion,
  setNewQuestion,
  loading,
}) => {
  return (
    <div className="sidebar-message">
      <div className="input-group">
        <textarea
          type="text"
          className="form-control form-section-control"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <span className="input-group-append">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => generateResponse(newQuestion, setNewQuestion)}
            disabled={newQuestion === "" ? true : false}
          >
            {!loading ? (
              "Send!"
            ) : (
              <ClipLoader
                color="#fff"
                loading={loading}
                size={13}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </button>
        </span>
      </div>
    </div>
  );
};

export default FormSection;
