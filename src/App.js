import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, BarChart, BookOpen} from 'lucide-react';

// CSS Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    color: '#2c3e50',
    fontSize: '32px',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '18px',
  },
  cardContainer: {
    position: 'relative',
    perspective: '1000px',
    height: '400px',
    maxWidth: '700px',
    margin: '0 auto',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  cardFlipped: {
    transform: 'rotateY(180deg)',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    borderRadius: '10px',
  },
  cardFront: {
    backgroundColor: '#ffffff',
    color: '#333',
  },
  cardBack: {
    backgroundColor: '#3498db',
    color: 'white',
    transform: 'rotateY(180deg)',
  },
  question: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '15px',
  },
  answer: {
    fontSize: '22px',
    textAlign: 'center',
  },
  visualComponent: {
    marginTop: '20px',
    width: '100%',
    maxWidth: '300px',
    height: '150px',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
    gap: '15px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  difficultyIndicator: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '14px',
  },
  progressBar: {
    width: '100%',
    maxWidth: '700px',
    margin: '30px auto',
    height: '10px',
    backgroundColor: '#ddd',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    transition: 'width 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '90%',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    margin: '0 10px',
  },
  activeTab: {
    borderBottom: '2px solid #3498db',
    color: '#3498db',
  },
  visualExample: {
    width: '100%',
    height: '150px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15px',
  }
};

// Balanced Math flashcard data with a mix of simple and hard questions
const mathCards = [
  {
    id: 1,
    question: "What is a right triangle?",
    answer: "A triangle with one angle equal to 90 degrees",
    difficulty: "Easy",
    visual: "triangle"
  },
  {
    id: 2,
    question: "What is the Pythagorean Theorem?",
    answer: "In a right triangle, a² + b² = c², where c is the length of the hypotenuse",
    difficulty: "Medium",
    visual: "triangle"
  },
  {
    id: 3,
    question: "What is a quadratic equation?",
    answer: "An equation in the form of ax² + bx + c = 0",
    difficulty: "Medium",
    visual: "quadratic"
  },
  {
    id: 4,
    question: "What is addition?",
    answer: "The process of combining two or more numbers to find their sum",
    difficulty: "Easy",
    visual: "limit"
  },
  {
    id: 5,
    question: "What is multiplication?",
    answer: "The process of repeated addition of a number to itself",
    difficulty: "Easy",
    visual: "chain"
  },
  {
    id: 6,
    question: "What is the derivative of sin(x)?",
    answer: "cos(x)",
    difficulty: "Hard",
    visual: "sine"
  },
  {
    id: 7,
    question: "What is a line?",
    answer: "A straight path that extends in both directions without end",
    difficulty: "Easy",
    visual: "vector"
  },
  {
    id: 8,
    question: "What is the quadratic formula?",
    answer: "x = (-b ± √(b² - 4ac)) / 2a for the equation ax² + bx + c = 0",
    difficulty: "Hard",
    visual: "quadratic"
  },
  {
    id: 9,
    question: "What is a circle?",
    answer: "A shape where all points are the same distance from the center",
    difficulty: "Easy",
    visual: "eigen"
  },
  {
    id: 10,
    question: "What is the integral of 1/x?",
    answer: "ln|x| + C (natural logarithm of x plus a constant)",
    difficulty: "Hard",
    visual: "fundamental"
  },
  {
    id: 11,
    question: "What is subtraction?",
    answer: "The process of finding the difference between two numbers",
    difficulty: "Easy",
    visual: "chain"
  },
  {
    id: 12,
    question: "What is a matrix?",
    answer: "A rectangular array of numbers arranged in rows and columns",
    difficulty: "Medium",
    visual: "eigen"
  }
];

// Visual components for each card type
const VisualComponent = ({ type }) => {
  switch (type) {
    case 'triangle':
      return (
        <svg width="200" height="150" viewBox="0 0 200 150">
          <polygon points="10,140 190,140 100,20" stroke="black" fill="none" strokeWidth="2" />
          <text x="95" y="85" fontSize="16">c</text>
          <text x="45" y="145" fontSize="16">a</text>
          <text x="150" y="145" fontSize="16">b</text>
          <rect x="90" y="130" width="10" height="10" fill="black" />
        </svg>
      );
    case 'sine':
      return (
        <svg width="200" height="150" viewBox="0 0 200 150">
          <path d="M10,75 Q60,10 100,75 Q140,140 190,75" stroke="#3498db" fill="none" strokeWidth="3" />
          <line x1="10" y1="75" x2="190" y2="75" stroke="#ccc" strokeWidth="1" />
          <text x="80" y="30" fontSize="16">sin(x)</text>
          <text x="150" y="30" fontSize="16">cos(x)</text>
          <path d="M10,75 Q60,140 100,75 Q140,10 190,75" stroke="#e74c3c" fill="none" strokeWidth="2" strokeDasharray="4" />
        </svg>
      );
    case 'quadratic':
      return (
        <svg width="200" height="150" viewBox="0 0 200 150">
          <path d="M10,140 Q100,30 190,140" stroke="#3498db" fill="none" strokeWidth="3" />
          <line x1="10" y1="75" x2="190" y2="75" stroke="#ccc" strokeWidth="1" />
          <line x1="100" y1="10" x2="100" y2="140" stroke="#ccc" strokeWidth="1" />
          <text x="50" y="50" fontSize="16">f(x) = ax² + bx + c</text>
        </svg>
      );
    case 'limit':
      return (
        <svg width="200" height="150" viewBox="0 0 200 150">
          <text x="60" y="75" fontSize="30">5 + 3 = 8</text>
        </svg>
      );
    case 'chain':
      return (
        <svg width="200" height="150" viewBox="0 0 200 150">
          <text x="40" y="75" fontSize="30">3 × 4 = 12</text>
        </svg>
      );
    case 'fundamental':
      return (
        <svg width="200" height="150" viewBox="0 0 200 150">
          <path d="M30,120 L180,120" stroke="#ccc" strokeWidth="1" />
          <path d="M60,30 L60,120" stroke="#ccc" strokeWidth="1" />
          <path d="M60,75 C80,75 100,40 120,40 C140,40 160,75 180,75" stroke="#3498db" strokeWidth="2" fill="none" />
          <text x="40" y="50" fontSize="20">∫ 1/x dx</text>
          <text x="110" y="100" fontSize="20">= ln|x| + C</text>
        </svg>
      );
    case 'vector':
      return (
        <svg width="200" height="150" viewBox="0 0 200 150">
          <line x1="30" y1="75" x2="170" y2="75" stroke="#3498db" strokeWidth="3" />
          <polygon points="170,75 155,70 155,80" fill="#3498db" />
        </svg>
      );
    case 'eigen':
      return (
        <svg width="200" height="150" viewBox="0 0 200 150">
          <circle cx="100" cy="75" r="50" stroke="#3498db" fill="none" strokeWidth="3" />
          <circle cx="100" cy="75" r="3" fill="#3498db" />
        </svg>
      );
    default:
      return <div style={{ textAlign: 'center', color: '#3498db' }}>Interactive visualization</div>;
  }
};

export default function MathVisionApp() {
  const [cards] = useState(mathCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    totalViewed: 0
  });
  const [activeTab, setActiveTab] = useState('cards');
  const [difficulty, setDifficulty] = useState('all');

  // Filter cards based on selected difficulty
  const filteredCards = difficulty === 'all' 
    ? cards 
    : cards.filter(card => card.difficulty.toLowerCase() === difficulty.toLowerCase());

  const progressPercentage = (currentIndex / filteredCards.length) * 100;

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      // Count as viewed when flipping to see answer
      setStats(prev => ({
        ...prev,
        totalViewed: prev.totalViewed + 1
      }));
    }
  };

  const handleNextCard = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // Loop back to the beginning
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    } else {
      // Loop to the end
      setCurrentIndex(filteredCards.length - 1);
      setIsFlipped(false);
    }
  };

  const handleKnewIt = () => {
    setStats(prev => ({
      ...prev,
      correct: prev.correct + 1
    }));
    handleNextCard();
  };

  const handleDidntKnow = () => {
    setStats(prev => ({
      ...prev,
      incorrect: prev.incorrect + 1
    }));
    handleNextCard();
  };

  const handleSkip = () => {
    setStats(prev => ({
      ...prev,
      skipped: prev.skipped + 1
    }));
    handleNextCard();
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setStats({
      correct: 0,
      incorrect: 0,
      skipped: 0,
      totalViewed: 0
    });
  };

  const handleChangeDifficulty = (level) => {
    setDifficulty(level);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (filteredCards.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>MathVision</h1>
          <p style={styles.subtitle}>Interactive Math Concept Explorer</p>
        </div>
        <div style={{textAlign: 'center', padding: '50px', fontSize: '18px'}}>
          No cards available for this difficulty level. Please select another level.
          <div style={{marginTop: '20px'}}>
            <button 
              style={styles.button} 
              onClick={() => handleChangeDifficulty('all')}
            >
              Show All Cards
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = filteredCards[currentIndex];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>MathVision</h1>
        <p style={styles.subtitle}>Interactive Math Concept Explorer</p>
      </div>

      <div style={styles.tabsContainer}>
        <div 
          style={{...styles.tab, ...(activeTab === 'cards' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('cards')}
        >
          <BookOpen size={16} style={{marginRight: '5px', display: 'inline'}} />
          Cards
        </div>
        <div 
          style={{...styles.tab, ...(activeTab === 'stats' ? styles.activeTab : {})}}
          onClick={() => setActiveTab('stats')}
        >
          <BarChart size={16} style={{marginRight: '5px', display: 'inline'}} />
          Stats
        </div>
      </div>

      {activeTab === 'cards' && (
        <>
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px'}}>
            <button 
              style={{...styles.button, backgroundColor: difficulty === 'all' ? '#2c3e50' : '#7f8c8d'}} 
              onClick={() => handleChangeDifficulty('all')}
            >
              All
            </button>
            <button 
              style={{...styles.button, backgroundColor: difficulty === 'easy' ? '#2ecc71' : '#7f8c8d'}} 
              onClick={() => handleChangeDifficulty('easy')}
            >
              Easy
            </button>
            <button 
              style={{...styles.button, backgroundColor: difficulty === 'medium' ? '#f39c12' : '#7f8c8d'}} 
              onClick={() => handleChangeDifficulty('medium')}
            >
              Medium
            </button>
            <button 
              style={{...styles.button, backgroundColor: difficulty === 'hard' ? '#e74c3c' : '#7f8c8d'}} 
              onClick={() => handleChangeDifficulty('hard')}
            >
              Hard
            </button>
          </div>

          <div style={styles.progressBar}>
            <div style={{...styles.progressFill, width: `${progressPercentage}%`}}></div>
          </div>

          <div style={styles.cardContainer} onClick={handleCardFlip}>
            <div style={{
              ...styles.card, 
              ...(isFlipped ? styles.cardFlipped : {})
            }}>
              <div style={{...styles.cardFace, ...styles.cardFront}}>
                <div style={styles.question}>{currentCard.question}</div>
                <div style={{
                  ...styles.difficultyIndicator,
                  backgroundColor: 
                    currentCard.difficulty === 'Easy' ? '#2ecc71' : 
                    currentCard.difficulty === 'Medium' ? '#f39c12' : 
                    '#e74c3c'
                }}>
                  {currentCard.difficulty}
                </div>
              </div>
              <div style={{...styles.cardFace, ...styles.cardBack}}>
                <div style={styles.answer}>{currentCard.answer}</div>
                <div style={styles.visualExample}>
                  <VisualComponent type={currentCard.visual} />
                </div>
              </div>
            </div>
          </div>

          <div style={styles.controls}>
            <button style={styles.button} onClick={handlePrevCard}>
              <ArrowLeft size={16} />
              Previous
            </button>
            {isFlipped ? (
              <>
                <button style={{...styles.button, backgroundColor: '#2ecc71'}} onClick={handleKnewIt}>
                  I Knew It
                </button>
                <button style={{...styles.button, backgroundColor: '#e74c3c'}} onClick={handleDidntKnow}>
                  Didn't Know
                </button>
              </>
            ) : (
              <button style={{...styles.button, backgroundColor: '#f39c12'}} onClick={handleSkip}>
                Skip
              </button>
            )}
            <button style={styles.button} onClick={handleNextCard}>
              Next
              <ArrowRight size={16} />
            </button>
            <button style={{...styles.button, backgroundColor: '#95a5a6'}} onClick={handleReset}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
          <div style={{textAlign: 'center', margin: '20px 0'}}>
            Card {currentIndex + 1} of {filteredCards.length}
          </div>
        </>
      )}

      {activeTab === 'stats' && (
        <div style={{maxWidth: '700px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
          <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Your Performance</h2>
          
          <div style={styles.statItem}>
            <span>Correct answers:</span>
            <span style={{color: '#2ecc71', fontWeight: 'bold'}}>{stats.correct}</span>
          </div>
          
          <div style={styles.statItem}>
            <span>Incorrect answers:</span>
            <span style={{color: '#e74c3c', fontWeight: 'bold'}}>{stats.incorrect}</span>
          </div>
          
          <div style={styles.statItem}>
            <span>Skipped cards:</span>
            <span style={{color: '#f39c12', fontWeight: 'bold'}}>{stats.skipped}</span>
          </div>
          
          <div style={styles.statItem}>
            <span>Total cards viewed:</span>
            <span style={{fontWeight: 'bold'}}>{stats.totalViewed}</span>
          </div>
          
          <div style={styles.statItem}>
            <span>Accuracy rate:</span>
            <span style={{color: '#3498db', fontWeight: 'bold'}}>
              {stats.correct + stats.incorrect > 0 
                ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) + '%' 
                : 'N/A'}
            </span>
          </div>
          
          <div style={styles.statItem}>
            <span>Completion rate:</span>
            <span style={{color: '#9b59b6', fontWeight: 'bold'}}>
              {Math.round((stats.totalViewed / filteredCards.length) * 100) + '%'}
            </span>
          </div>

          <div style={{textAlign: 'center', marginTop: '30px'}}>
            <button style={styles.button} onClick={handleReset}>
              <RotateCcw size={16} style={{marginRight: '5px'}} />
              Reset Stats
            </button>
          </div>
        </div>
      )}
    </div>
  );
}