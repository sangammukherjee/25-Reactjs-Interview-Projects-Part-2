import { useState } from "react";
import './bmi.css'

function BMICalculator() {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBMI] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  function calculateBmi() {
    if (!height || !weight) {
      setErrorMsg("Please enter both height and weight");
      return;
    }

    const numericHeight = parseFloat(height);
    const numericWeight = parseFloat(weight);

    if (
      isNaN(numericHeight) ||
      isNaN(numericWeight) ||
      numericHeight <= 0 ||
      numericWeight <= 0
    ) {
      setErrorMsg(
        "Please enter valid numeric values for both height and weight"
      );
      return;
    }

    const calculateHeightInMeters = numericHeight / 100;
    const calculateBmiValue = (
      numericWeight /
      (calculateHeightInMeters * calculateHeightInMeters)
    ).toFixed(2);

    setBMI(calculateBmiValue);
    setErrorMsg("");
  }

  console.log(bmi);

  return (
    <div className="bmi-calculator-container">
      <h1>BMI Calculator</h1>
      <div className="input-container">
        <label>Height (cm):</label>
        <input
          onChange={(event) => setHeight(event.target.value)}
          type="number"
          value={height}
        />
      </div>
      <div className="input-container">
        <label>Weight (kg):</label>
        <input
          onChange={(event) => setWeight(event.target.value)}
          type="number"
          value={weight}
        />
      </div>
      <button onClick={calculateBmi}>Calculate BMI</button>
      {errorMsg ? <p className="error-msg-text">{errorMsg}</p> : null}
      {errorMsg !== "" ? null : (
        <p className="bmi-result-text">
          {bmi < 18.5
            ? "Underweight"
            : bmi >= 18.5 && bmi < 24.9
            ? "Normal Weight"
            : bmi >= 25 && bmi < 29.9
            ? "Overweight"
            : "Obese"}
        </p>
      )}
    </div>
  );
}

export default BMICalculator;
