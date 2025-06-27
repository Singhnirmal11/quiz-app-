import React from 'react';

const Result = ({ score, answers, quizData, restartQuiz }) => (
  <div className="result" role="region" aria-label="Quiz results">
    <h2>Quiz Results</h2>
    <p>You scored {score} out of {quizData.length}!</p>
    <table className="summary" role="grid">
      <thead>
        <tr>
          <th scope="col">Question</th>
          <th scope="col">Your Answer</th>
          <th scope="col">Correct Answer</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {quizData.map((q, index) => (
          <tr key={index}>
            <td>{q.question}</td>
            <td>{answers[index] !== null ? q.options[answers[index]] : "No Answer"}</td>
            <td>{q.options[q.correctAnswer]}</td>
            <td className={answers[index] === q.correctAnswer ? 'correct' : 'incorrect'}>
              {answers[index] === q.correctAnswer ? "Correct" : "Incorrect"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button className="button" onClick={restartQuiz} aria-label="Restart quiz">Restart Quiz</button>
  </div>
);

export default Result;