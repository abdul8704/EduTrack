import React from "react";
import "../../styles/addCourse.css";

const SubmitSection = ({
  isFormValid,
  onSubmit,
  isSubmitting = false,
  errorMessage = "",
}) => {
  return (
    <div className="add-card" style={{ textAlign: "center", marginTop: "2rem" }}>
      <button
        type="submit"
        className="add-input-field"
        disabled={!isFormValid || isSubmitting}
        onClick={onSubmit}
        style={{
          width: "200px",
          backgroundColor: isFormValid && !isSubmitting ? "#007bff" : "#6c757d",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: isFormValid && !isSubmitting ? "pointer" : "not-allowed",
          opacity: isFormValid && !isSubmitting ? 1 : 0.6,
        }}
      >
        Submit Course
      </button>

      {!isFormValid && !isSubmitting && errorMessage && (
        <p style={{ color: "#dc3545", marginTop: "0.5rem", fontSize: "14px" }}>
          {errorMessage}
        </p>
      )}

      {isSubmitting && (
        <p style={{ color: "#6c757d", marginTop: "0.5rem", fontSize: "14px" }}>
          Submitting, please wait...
        </p>
      )}
    </div>
  );
};

export default SubmitSection;
