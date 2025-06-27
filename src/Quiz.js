import React from 'react';

const Quiz = ({ question, options, selectedAnswer, handleAnswer, handleNext, handlePrevious, handleSubmit, isFirst, isLast, answerFeedback, correctAnswer }) => (
  <div className="quiz" role="region" aria-label="Quiz question">
    <h2 className="question">{question}</h2>
    <div className="options">
      {options.map((option, index) => (
        <label
          key={index}
          className={`option ${answerFeedback && selectedAnswer === index ? answerFeedback : ''} ${answerFeedback && index === correctAnswer ? 'correct' : ''}`}
          aria-label={`Option ${option}`}
        >
          <input
            type="radio"
            name="answer"
            value={index}
            checked={selectedAnswer === index}
            onChange={() => handleAnswer(index)}
            disabled={answerFeedback !== null}
            aria-checked={selectedAnswer === index}
          />
          {option}
        </label>
      ))}
    </div>
    <div className="navigation">
      {!isFirst && <button className="button" onClick={handlePrevious} aria-label="Previous question">Previous</button>}
      {isLast ? (
        <button
          className="button"
          onClick={handleSubmit}
          disabled={selectedAnswer === null || answerFeedback === null}
          aria-label="Submit quiz"
        >
          Submit
        </button>
      ) : (
        <button
          className="button"
          onClick={handleNext}
          disabled={selectedAnswer === null || answerFeedback === null}
          aria-label="Next question"
        >
          Next
        </button>
      )}
    </div>
  </div>
);

export default Quiz;