import React from 'react';

const Progress = ({ current, total }) => {
  const progress = (current / total) * 100;
  const circumference = 251; // 2 * π * radius (radius = 40)
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      <p>Question {current} of {total}</p>
      <div className="progress-circle">
        <svg width="80" height="80">
          <circle cx="40" cy="40" r="36" />
          <circle className="progress-fill" cx="40" cy="40" r="36" strokeDashoffset={offset} />
        </svg>
      </div>
    </div>
  );
};

export default Progress;