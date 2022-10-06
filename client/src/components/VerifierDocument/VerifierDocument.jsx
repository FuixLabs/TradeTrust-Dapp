import React from "react";

export default function VerifierDocument({ handleOnFileChange }) {
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <h3>Upload your document which you wanna verify</h3>
      <div>
        <input data-testid = 'fileReader' type="file" onChange={handleOnFileChange} />
      </div>
    </div>
  );
}
