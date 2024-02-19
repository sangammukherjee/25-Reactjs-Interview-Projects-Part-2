import CountdownTimer from ".";
import './timer.css'

function CountdownTimerTest() {
  function handleTimeFinish() {
    console.log(
      "Once the timer is finished I want to make an api call and save some data to database"
    );
  }

  return (
    <div className="countdown-timer-container">
      <h1>CountDown Timer</h1>
      <CountdownTimer initialTime={120} onTimeFinish={handleTimeFinish} />
    </div>
  );
}

export default CountdownTimerTest;
