// Quiz.js
import React, { useState } from "react";
import "./Quiz.css";

const Quiz = ({ quizData }) => {
  const [userAnswers, setUserAnswers] = useState(
    new Array(quizData.length).fill("")
  );
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (index, event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    if (name === `question-${index}`) {
      const upperCaseValue = value.toUpperCase();
      if (
        upperCaseValue === "A" ||
        upperCaseValue === "B" ||
        upperCaseValue === "C" ||
        upperCaseValue === "D"
      ) {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[index] = upperCaseValue;
        setUserAnswers(updatedUserAnswers);
        console.log(updatedUserAnswers);
      }
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (
        userAnswers[i].split("")[0] === quizData[i].correctAnswer.split("")[0]
      ) {
        totalScore++;
      }
    }
    setScore(totalScore);
    score > 0 ? setShowScore(false) : setShowScore(true);
  };

  const handleClearAnswers = () => {
    setUserAnswers(new Array(quizData.length).fill(""));
    setShowScore(false);
    setScore(0);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz App</h1>
      {quizData.map((question, index) => (
        <div key={index} className="questions">
          <h2>{question.question}</h2>
          {question.options.map((option, optionIndex) => {
            const optionLetter = String.fromCharCode(65 + optionIndex);
            const isUserAnswer = userAnswers[index] === optionLetter;
            // console.log(question.correctAnswer.split("")[0]);
            const isCorrectAnswer =
              question.correctAnswer.split("")[0] === optionLetter;
            const answerStyle = isUserAnswer
              ? isCorrectAnswer
                ? { color: "green" }
                : { color: "red" }
              : {};
            return (
              <label key={optionIndex} style={answerStyle}>
                {/* // <label key={optionIndex} className={answerClass}> */}
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={optionLetter}
                  checked={isUserAnswer}
                  onChange={(e) => handleAnswerChange(index, e)}
                  className="options"
                />
                {option}
              </label>
            );
          })}
          <br />
          <input
            type="text"
            name={`question-${index}`}
            value={userAnswers[index]}
            maxLength="1"
            onChange={(e) => handleAnswerChange(index, e)}
            style={{
              width: 30,
              textAlign: "center",
              textTransform: "uppercase",
            }}
            placeholder="A, B, C, D"
          />
        </div>
      ))}

      <div className="buttons-container">
        <button className="submit-button" onClick={calculateScore}>
          Submit
        </button>
        <button className="clear-button" onClick={handleClearAnswers}>
          Clear Answers
        </button>
      </div>

      {/* <button className="submit-button" onClick={calculateScore}>
        Submit
      </button>
      <button className="clear-button" onClick={handleClearAnswers}>
        Clear Answers
      </button> */}

      {showScore && (
        <div className="quiz-finished">
          <h2>Quiz Finished!</h2>
          <p>
            Your Score: {score}/{quizData.length}
          </p>
          <div>
            <h3>Your Answers:</h3>
            {userAnswers.map((answer, index) => (
              <p key={index}>
                Question {index + 1}:{" "}
                <span
                  style={{
                    color:
                      quizData[index].correctAnswer.split("")[0] === answer
                        ? "green"
                        : "red",
                  }}
                >
                  {answer}
                </span>
              </p>
            ))}
          </div>
          <div>
            <h3>Correct Answers:</h3>
            {quizData.map((question, index) => (
              <p
                key={index}
                style={{ color: "green" }}
                className="correct-answer"
              >
                Question {index + 1}: {question.correctAnswer}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
