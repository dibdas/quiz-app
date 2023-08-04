// App.js
import React, { useState } from "react";
import Quiz from "./Quiz";
import QuizPDF from "./quizPdf.js";
import quizData from "./quizData";

const App = () => {
  const [showQuiz, setShowQuiz] = useState(true);

  const toggleView = () => {
    setShowQuiz(!showQuiz);
  };

  return (
    <div>
      {showQuiz ? (
        <Quiz quizData={quizData} />
      ) : (
        <QuizPDF quizData={quizData} />
      )}
      <button onClick={toggleView}>
        {showQuiz ? "View PDF" : "Back to Quiz"}
      </button>
    </div>
  );
};

export default App;
