import { useState, useRef, useEffect } from 'react'
import './App.css'

// Customize your question here
const QUESTION_TEXT = "Sahla, will you be my Valentine? 💕";

// Video source - Valentine's Day video for Sahla & Athas
// 
// TO ADD YOUR OWN VALENTINE'S DAY VIDEO:
// 
// Method 1: Local video file (RECOMMENDED)
//   1. Place your video file (MP4) in the public/ folder
//   2. Update the VIDEO_SOURCE below to: "/your-video-name.mp4"
//
// Method 2: Import from assets folder
//   1. Place video in src/assets/ folder
//   2. Uncomment the import line below and update filename
//   3. Uncomment the VIDEO_SOURCE line that uses the import
//
// Method 3: Online video URL
//   Upload your video to a hosting service and use the direct URL

// Importing the Valentine's Day video from assets folder
import valentinesVideo from './assets/Untitled design.mp4';

// Using the Valentine's Day video file for Sahla & Athas
const VIDEO_SOURCE = valentinesVideo;

///mple video - replace with your romantic Valentine's Day video!
// const VIDEO_SOURCE = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

function App() {


  const [showVideo, setShowVideo] = useState(false);
  const [showNoMessage, setShowNoMessage] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false);
  const noButtonRef = useRef(null);
  const buttonsContainerRef = useRef(null);
  const originalPositionRef = useRef({ x: 0, y: 0 });
  const returnTimeoutRef = useRef(null);

  const handleYesClick = async () => {
    setShowVideo(true);
    setShowNoMessage(false);
    
    // Send email notification via Netlify Function
    try {
      // Use Netlify function endpoint (works both locally and in production)
      const functionUrl = '/.netlify/functions/send-email';
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail: 'infobsc12@gmail.com'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        console.log('✅ Email sent successfully!');
      } else {
        console.error('❌ Failed to send email:', data.message);
      }
    } catch (error) {
      console.error('❌ Error sending email:', error);
      // Don't block the video from showing if email fails
    }
  };

  const moveNoButton = () => {
    if (!buttonsContainerRef.current || !noButtonRef.current) return;
    
    const container = buttonsContainerRef.current;
    const button = noButtonRef.current;
    
    // Ensure button is in absolute position for movement
    setIsNoButtonMoved(true);
    
    // Force a reflow to ensure layout is updated
    void container.offsetHeight;
    
    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    
    // Calculate available space (with some padding)
    const padding = 10;
    const maxX = Math.max(padding, containerRect.width - buttonRect.width - padding);
    const maxY = Math.max(padding, containerRect.height - buttonRect.height - padding);
    
    // Define 4 corner positions
    const positions = [
      { x: padding, y: padding },                    // Top-left
      { x: maxX, y: padding },                       // Top-right
      { x: padding, y: maxY },                       // Bottom-left
      { x: maxX, y: maxY }                           // Bottom-right
    ];
    
    // Get current position (use original if not moved yet)
    const currentPos = isNoButtonMoved ? noButtonPosition : originalPositionRef.current;
    
    // Filter out current position and pick a random one from remaining
    const availablePositions = positions.filter(
      pos => !(Math.abs(pos.x - currentPos.x) < 5 && Math.abs(pos.y - currentPos.y) < 5)
    );
    
    // If all positions are same (edge case), use all positions
    const positionsToChoose = availablePositions.length > 0 ? availablePositions : positions;
    
    // Pick random position from the 4 corners
    const randomIndex = Math.floor(Math.random() * positionsToChoose.length);
    const newPosition = positionsToChoose[randomIndex];
    
    // Small delay to ensure position is set before moving
    setTimeout(() => {
      setNoButtonPosition(newPosition);
    }, 10);
    
    // Clear any existing timeout
    if (returnTimeoutRef.current) {
      clearTimeout(returnTimeoutRef.current);
    }
    
    // Return to original position after 0.8 seconds
    returnTimeoutRef.current = setTimeout(() => {
      setNoButtonPosition(originalPositionRef.current);
      setIsNoButtonMoved(false);
    }, 800);
  };

  const handleNoMouseEnter = () => {
    moveNoButton();
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    moveNoButton();
    setShowNoMessage(true);
    
    // Hide message after a short delay
    setTimeout(() => {
      setShowNoMessage(false);
    }, 2000);
  };

  // Initialize original position on mount
  useEffect(() => {
    const calculateOriginalPosition = () => {
      if (buttonsContainerRef.current && noButtonRef.current) {
        const container = buttonsContainerRef.current;
        const button = noButtonRef.current;
        
        // Temporarily set to static to get natural position
        const originalPosition = button.style.position;
        button.style.position = 'static';
        
        // Force reflow
        void container.offsetHeight;
        
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        
        // Calculate position relative to container
        const x = buttonRect.left - containerRect.left;
        const y = buttonRect.top - containerRect.top;
        
        // Restore
        button.style.position = originalPosition;
        
        originalPositionRef.current = { x, y };
        if (!isNoButtonMoved) {
          setNoButtonPosition({ x, y });
        }
      }
    };
    
    // Calculate after layout is complete
    const timer = setTimeout(calculateOriginalPosition, 50);
    
    // Recalculate on window resize
    window.addEventListener('resize', calculateOriginalPosition);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateOriginalPosition);
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
    };
  }, [isNoButtonMoved]);

  return (
    <div className="app">
      {showVideo ? (
        <div className="video-container">
          <div className="video-wrapper">
            <video 
              controls 
              autoPlay 
              className="surprise-video"
              onError={(e) => {
                console.error("Video error:", e);
              }}
            >
              <source src={VIDEO_SOURCE} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay">
              <h2 className="video-title">Sahla ❤️ Athas</h2>
              <p className="video-subtitle">Happy Valentine's Day 💕</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="question-container">
          <div className="hearts-background">
            <div className="heart heart1">💖</div>
            <div className="heart heart2">💕</div>
            <div className="heart heart3">💗</div>
            <div className="heart heart4">💝</div>
            <div className="heart heart5">💖</div>
          </div>
          
          <div className="question-content">
            <h1 className="question-text">{QUESTION_TEXT}</h1>
            
            {showNoMessage && (
              <div className="no-message">
                <p>Please try again! 😊</p>
              </div>
            )}
            
            <div className="buttons-container" ref={buttonsContainerRef}>
              <button 
                className="btn btn-yes" 
                onClick={handleYesClick}
              >
                Yes 💕
              </button>
              <button 
                ref={noButtonRef}
                className="btn btn-no"
                onClick={handleNoClick}
                onMouseEnter={handleNoMouseEnter}
                style={{
                  position: isNoButtonMoved ? 'absolute' : 'static',
                  left: isNoButtonMoved ? `${noButtonPosition.x}px` : 'auto',
                  top: isNoButtonMoved ? `${noButtonPosition.y}px` : 'auto',
                  transition: isNoButtonMoved ? 'all 0.1s ease-out' : 'all 0.15s ease-out',
                  zIndex: isNoButtonMoved ? 10 : 1
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
