import { useState } from "react";
import './progress.css'

function ProgressBar() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  function handleProgressPercentage(event) {
    setProgressPercent(event.target.value);
    if (event.target.value > 100) {
      setErrorMsg("Please enter a value less than 100");
    } else {
      setErrorMsg("");
    }
  }

  return (
    <div className="progress-bar-container">
      <h1>Custom Progress Bar</h1>
      <div className="progress-bar">
        <div className="wrapper">
          {progressPercent >= 0 && progressPercent <= 100 ? (
            <div
              style={{ width: `${progressPercent}%` }}
              className="innerWrapper"
            >
              {progressPercent}
            </div>
          ) : (
            <p>{errorMsg}</p>
          )}
        </div>
      </div>
      <div className="input-container">
        <label>Input Percentage :</label>
        <input
          onChange={handleProgressPercentage}
          type="number"
          value={progressPercent}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
