import React from "react";

export default function UploadFile({ handleOnFileChange }) {
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <h3>Upload your file</h3>
      <div>
        <input
          data-testid="fileReader"
          type="file"
          onChange={handleOnFileChange}
        />
      </div>
    </div>
  );
}
