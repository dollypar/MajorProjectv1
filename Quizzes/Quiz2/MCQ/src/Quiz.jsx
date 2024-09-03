import React, { useState, useEffect } from 'react';
import './Quiz.css';

const questions = [
  { question: "What is a red fruit that you can eat?", options: ["Apple", "Banana", "Tomato", "Grape"], answer: "Apple" },
    { question: "What fruit is green on the outside and sweet on the inside?", options: ["Kiwi", "Orange", "Lemon", "Grape"], answer: "Kiwi" },
    { question: "Which animal has stripes and is a big cat?", options: ["Lion", "Tiger", "Bear", "Deer"], answer: "Tiger" },
    { question: "Which animal makes dams in rivers?", options: ["Beaver", "Rabbit", "Squirrel", "Fox"], answer: "Beaver" },
    { question: "What has four wheels and you drive on the road?", options: ["Car", "Bike", "Boat", "Airplane"], answer: "Car" },
    { question: "What is a big vehicle that carries things?", options: ["Truck", "Car", "Bicycle", "Scooter"], answer: "Truck" },
    { question: "What color is a stop sign?", options: ["Blue", "Green", "Red", "Black"], answer: "Red" },
    { question: "What color is the sun during the day?", options: ["Yellow", "Blue", "Green", "Purple"], answer: "Yellow" },
    { question: "What shape has four corners and four sides that are the same?", options: ["Rectangle", "Circle", "Triangle", "Square"], answer: "Square" },
    { question: "What shape has three sides?", options: ["Triangle", "Square", "Circle", "Rectangle"], answer: "Triangle" },
    { question: "What is 2 plus 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is 5 minus 3?", options: ["2", "4", "6", "8"], answer: "2" },
    { question: "What do you use to write?", options: ["Pen", "Spoon", "Knife", "Fork"], answer: "Pen" },
    { question: "What do you use to cut paper?", options: ["Scissors", "Hammer", "Screwdriver", "Plier"], answer: "Scissors" },
    { question: "What do you eat with a fork?", options: ["Pizza", "Soup", "Cake", "Sandwich"], answer: "Pizza" },
    { question: "What is made from milk and you drink it?", options: ["Cheese", "Butter", "Yogurt", "Milk"], answer: "Milk" },
    { question: "What falls from the sky when it rains?", options: ["Snow", "Rain", "Wind", "Sun"], answer: "Rain" },
    { question: "What is it called when it is dark outside and the sun is not up?", options: ["Night", "Day", "Noon", "Sunset"], answer: "Night" },
    { question: "What day comes after Monday?", options: ["Sunday", "Tuesday", "Wednesday", "Thursday"], answer: "Tuesday" },
    { question: "What is the first day of the week?", options: ["Monday", "Sunday", "Friday", "Saturday"], answer: "Monday" },
    { question: "Where do fish live?", options: ["Trees", "Water", "Sky", "Ground"], answer: "Water" },
    { question: "Where does a lion live?", options: ["Forest", "Ocean", "Sky", "Desert"], answer: "Forest" },
    { question: "Which number is bigger: 8 or 5?", options: ["8", "5", "7", "9"], answer: "8" },
    { question: "What number comes after 10?", options: ["11", "12", "9", "8"], answer: "11" },
    { question: "What do you use to brush your teeth?", options: ["Toothbrush", "Spoon", "Towel", "Soap"], answer: "Toothbrush" },
    { question: "What do you use to clean your hands?", options: ["Soap", "Paper", "Cloth", "Brush"], answer: "Soap" },
    { question: "What do you wear on your feet?", options: ["Shoes", "Hat", "Gloves", "Belt"], answer: "Shoes" },
    { question: "What do you wear on your head to keep warm in winter?", options: ["Hat", "Scarf", "Gloves", "Socks"], answer: "Hat" },
    { question: "What do you do to see better in the dark?", options: ["Turn on a light", "Go to sleep", "Close your eyes", "Eat food"], answer: "Turn on a light" },
    { question: "What do you do to open a door?", options: ["Turn the handle", "Push the wall", "Pull the ceiling", "Kick the door"], answer: "Turn the handle" }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (quizFinished) {
      calculateScore();
    }
  }, [quizFinished]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    setAnswers([...answers, { question: questions[currentQuestion].question, answer: selectedOption }]);
    setSelectedOption('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setAnswers([...answers, { question: questions[currentQuestion].question, answer: selectedOption }]);
    setQuizFinished(true);
  };

  const calculateScore = () => {
    let totalCorrect = 0;
    answers.forEach((answer, index) => {
      if (answer.answer === questions[index].correct) {
        totalCorrect++;
      }
    });
    setScore(totalCorrect);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setAnswers([]);
    setQuizFinished(false);
    setScore(0);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        {!quizFinished ? (
          <>
            <div className="quiz-question">
              {questions[currentQuestion].question}
            </div>
            <div className="options-container">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="quiz-controls">
              {currentQuestion > 0 && (
                <button className="previous-button" onClick={handlePrevious}>
                  Previous
                </button>
              )}
              <button
                className="next-button"
                onClick={handleNext}
                disabled={!selectedOption}
              >
                Next
              </button>
              {currentQuestion === questions.length - 1 && (
                <button
                  className="submit-button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="summary">
            <h2>Quiz Completed!</h2>
            <p>You answered {score} out of {questions.length} questions correctly.</p>
            <button className="restart-button" onClick={restartQuiz}>
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
