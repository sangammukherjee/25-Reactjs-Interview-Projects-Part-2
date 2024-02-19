import { useState } from "react";
import StepProgressBar from ".";
import './progress.css'

function StepProgressBarTest() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

  return (
    <div className="step-progress-bar-container">
      <h1>Step Progress Bar</h1>
      <StepProgressBar
        setActiveStep={setActiveStep}
        steps={steps}
        activeStep={activeStep}
      />
    </div>
  );
}

export default StepProgressBarTest;
