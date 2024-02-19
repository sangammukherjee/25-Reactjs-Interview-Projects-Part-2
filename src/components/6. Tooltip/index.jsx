import { useState } from "react";

function Tooltip({ children, content, delay }) {
  let timeout;
  const [isVisible, setIsVisible] = useState(false);

  function handleShowTooltip() {
    timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay || 500);
  }

  function handleHideTooltip() {
    clearTimeout(timeout);
    setIsVisible(false);
  }

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleShowTooltip}
      onMouseLeave={handleHideTooltip}
    >
      {children}
      {isVisible ? <div className="tooltip">{content}</div> : null}
    </div>
  );
}

export default Tooltip;
