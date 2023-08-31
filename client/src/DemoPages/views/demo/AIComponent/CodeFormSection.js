import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const CodeFormSection = ({ generateCodeResponse, loading }) => {
  const [newCodeQuestion, setNewCodeQuestion] = useState("");

  return (
    <div className="sidebar-message">
      <div className="input-group">
        <textarea
          type="text"
          className="form-control form-section-control"
          value={newCodeQuestion}
          onChange={(e) => setNewCodeQuestion(e.target.value)}
        />
        <span className="input-group-append">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              generateCodeResponse(newCodeQuestion, setNewCodeQuestion)
            }
            disabled={newCodeQuestion === "" ? true : false}
          >
            {!loading ? (
              "Explain!"
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

export default CodeFormSection;
