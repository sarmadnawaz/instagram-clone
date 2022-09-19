import React from "react";
import "../css/LoadingSpinner.css"

function LoadingSpinner() {
  return (
    <div className="loader">
      <img src="/img/loader.gif" className="loader__image" />
    </div>
  );
}

export default LoadingSpinner;