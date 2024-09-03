import React, { useState, useEffect } from 'react';
import LineTo from 'react-lineto';
import './MemoryGame.css';

const MemoryGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [finalScore, setFinalScore] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0); // 0: Fruits, 1: Animals, 2: Vehicles

  const quizzes = [
    {
      type: 'fruits',
      backgroundImage: '/Images/Bg1.jpg',
      words: ['Apple', 'Banana', 'Grapes', 'Orange', 'Carrot'],
      images: [
        { src: '/Images/apple.jpg', alt: 'Apple' },
        { src: '/Images/banana.jpg', alt: 'Banana' },
        { src: '/Images/grapes.jpg', alt: 'Grapes' },
        { src: '/Images/orange.jpg', alt: 'Orange' },
        { src: '/Images/carrot.png', alt: 'Carrot' }
      ]
    },
    {
      type: 'animals',
      backgroundImage: '/Images/Bg2.jpg',
      words: ['Elephant', 'Cat', 'Lion', 'Pig', 'Giraffe'],
      images: [
        { src: '/Images/elephant.jpg', alt: 'Elephant' },
        { src: '/Images/cat.jpg', alt: 'Cat' },
        { src: '/Images/lion.jpg', alt: 'Lion' },
        { src: '/Images/pig.png', alt: 'Pig' },
        { src: '/Images/giraffe.png', alt: 'Giraffe' }
      ]
    },
    {
      type: 'vehicles',
      backgroundImage: '/Images/Bg3.jpg',
      words: ['Car', 'Bike', 'Bus', 'Truck', 'Plane'],
      images: [
        { src: '/Images/car.jpg', alt: 'Car' },
        { src: '/Images/bike.jpg', alt: 'Bike' },
        { src: '/Images/bus.png', alt: 'Bus' },
        { src: '/Images/truck.jpg', alt: 'Truck' },
        { src: '/Images/plane.jpg', alt: 'Plane' }
      ]
    }
  ];

  useEffect(() => {
    if (gameStarted) {
      const currentQuiz = quizzes[quizIndex];
      setShuffledWords(shuffleArray(currentQuiz.words));
      setShuffledImages(shuffleArray(currentQuiz.images));
      startTimer();
    }
  }, [gameStarted, quizIndex]);

  useEffect(() => {
    if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const startGame = () => {
    setGameStarted(true);
  };

  const startTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  const handleImageClick = (imageAlt) => {
    setSelectedImage(imageAlt);
    if (selectedWord) {
      checkMatch(selectedWord, imageAlt);
      setSelectedWord(null);
      setSelectedImage(null);
    }
  };

  const checkMatch = (word, imageAlt) => {
    if (word === imageAlt) {
      setMatches((prev) => ({ ...prev, [word]: true }));
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
      setLines((prevLines) => [...prevLines, { from: `word-${word}`, to: `image-${imageAlt}` }]);
    } else {
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };

  const endGame = () => {
    setGameStarted(false);
    setFinalScore(score);
    setTimeTaken(120 - timeLeft);
  };

  const handleNext = () => {
    if (quizIndex < quizzes.length - 1) {
      setQuizIndex(quizIndex + 1);
      resetGame();
    }
  };

  const handlePrevious = () => {
    if (quizIndex > 0) {
      setQuizIndex(quizIndex - 1);
      resetGame();
    }
  };

  const resetGame = () => {
    setFinalScore(null); // Reset final score
    setGameStarted(false);
    setTimeLeft(120);
    setSelectedWord(null);
    setSelectedImage(null);
    setLines([]);
    setMatches({});
    setScore({ correct: 0, incorrect: 0 });
    setTimeTaken(null);
  };

  return (
    <div className="memory-game-container" style={{ backgroundImage: `url(${quizzes[quizIndex].backgroundImage})` }}>
      <h1 className="game-title">Match Each Item to Its Correct Image!</h1>
      {gameStarted ? (
        <>
          <div className="game-content">
            <div className="words-container">
              {shuffledWords.map((word) => (
                <button
                  key={word}
                  id={`word-${word}`}
                  className={`word-button ${matches[word] ? 'matched' : ''} ${selectedWord === word ? 'selected' : ''}`}
                  onClick={() => handleWordClick(word)}
                  disabled={finalScore !== null}
                >
                  {word}
                </button>
              ))}
            </div>
            <div className="images-container">
              {shuffledImages.map((image) => (
                <button
                  key={image.alt}
                  id={`image-${image.alt}`}
                  className={`image-button ${matches[image.alt] ? 'matched' : ''} ${selectedImage === image.alt ? 'selected' : ''}`}
                  onClick={() => handleImageClick(image.alt)}
                  disabled={finalScore !== null}
                >
                  <img src={image.src} alt={image.alt} className="image" />
                </button>
              ))}
            </div>
          </div>
          {lines.map((line, index) => (
            <LineTo
              key={index}
              from={`word-${line.from}`}
              to={`image-${line.to}`}
              borderColor="green"
              borderWidth={2}
            />
          ))}
          <div className="game-status">
            <p>Time Left: {timeLeft} seconds</p>
            <p>Score: {score.correct} correct, {score.incorrect} incorrect</p>
          </div>
          <button onClick={endGame} className="submit-button">Submit</button>
        </>
      ) : finalScore !== null ? (
        <div className="final-score">
          <h2>Final Score</h2>
          <p>Correct: {finalScore.correct}</p>
          <p>Incorrect: {finalScore.incorrect}</p>
          <p>Time Taken: {timeTaken} seconds</p>
          {quizIndex > 0 && <button onClick={handlePrevious} className="previous-button">Previous Quiz</button>}
          {quizIndex < quizzes.length - 1 && <button onClick={handleNext} className="next-button">Next Quiz</button>}
          <button onClick={resetGame} className="restart-button">Restart Quiz</button>
        </div>
      ) : (
        <button onClick={startGame} className="start-button">Start Game</button>
      )}
    </div>
  );
};

export default MemoryGame;
