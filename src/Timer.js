import React from 'react';

const Timer = ({ timeLeft }) => (
  <div className="timer" role="timer" aria-live="polite">
    Time Left: <span>{timeLeft}</span> seconds
  </div>
);

export default Timer;