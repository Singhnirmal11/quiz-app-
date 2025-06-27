import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import Result from './Result';
import Timer from './Timer';
import Progress from './Progress';
import quizData from './quizData';
import './index.css';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem('quizAnswers')) || Array(quizData.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(15);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [isLoading, setIsLoading] = useState(false);

  const filteredQuizData = selectedCategory === 'All'
    ? quizData
    : quizData.filter(q => q.category === selectedCategory);

  const categories = ['All', ...new Set(quizData.map(q => q.category))];

  useEffect(() => {
    if (timeLeft === 0 && !isFinished && !answerFeedback) {
      handleNext();
    }
    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, answerFeedback]);

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setAnswerFeedback(optionIndex === filteredQuizData[currentQuestion].correctAnswer ? 'correct' : 'incorrect');
    setTimeLeft(0);
  };

  const handleNext = () => {
    if (answerFeedback === 'correct') {
      setScore(score + 1);
    }
    setAnswerFeedback(null);
    setTimeLeft(15);
    if (currentQuestion < filteredQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(15);
      setAnswerFeedback(null);
    }
  };

  const handleSubmit = () => {
    if (answerFeedback === 'correct') {
      setScore(score + 1);
    }
    setIsFinished(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const restartQuiz = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentQuestion(0);
      setScore(0);
      setAnswers(Array(quizData.length).fill(null));
      setTimeLeft(15);
      setIsFinished(false);
      setAnswerFeedback(null);
      setSelectedCategory('All');
      setIsLoading(false);
    }, 1000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCategoryChange = (category) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setCurrentQuestion(0);
      setScore(0);
      setAnswers(Array(quizData.length).fill(null));
      setAnswerFeedback(null);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="app">
      <button className="dark-mode-button" onClick={toggleDarkMode} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <h1>Quiz App</h1>
      {isLoading ? (
        <div className="loading" aria-label="Loading quiz"></div>
      ) : (
        <>
          {!isFinished && (
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category)}
                  aria-label={`Select ${category} category`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          {isFinished ? (
            <Result score={score} answers={answers} quizData={filteredQuizData} restartQuiz={restartQuiz} />
          ) : (
            <div className="quiz-container">
              <Progress current={currentQuestion + 1} total={filteredQuizData.length} />
              <Timer timeLeft={timeLeft} />
              <Quiz
                question={filteredQuizData[currentQuestion].question}
                options={filteredQuizData[currentQuestion].options}
                selectedAnswer={answers[currentQuestion]}
                handleAnswer={handleAnswer}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleSubmit={handleSubmit}
                isFirst={currentQuestion === 0}
                isLast={currentQuestion === filteredQuizData.length - 1}
                answerFeedback={answerFeedback}
                correctAnswer={filteredQuizData[currentQuestion].correctAnswer}
              />
            </div>
          )}
          {showConfetti && (
            <div className="confetti">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="confetti-piece"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    backgroundColor: ['#6366f1', '#22c55e', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 4)]
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;