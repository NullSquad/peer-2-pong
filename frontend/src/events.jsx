import { useState } from 'react';

export const Event = ({ children }) => {

  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup); /* Toggle pop-up visibility */
  };

  return (
    <>
      <div className="slider-container">
        <div className="league-window-container">
          <div className="time-container">
            league ends in: 00h00mn00s
          </div>
          <div className="league-window">

            {/* Corrected onClick */}
            <button className="norms-button" onClick={togglePopup}>
              Norms
            </button>

            <button className="join-button">
              Join
            </button>

            {/* Pop-up */}
            {showPopup && (
              <div className="popup-overlay">
                <div className="popup">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p>This is the pop-up content!</p>
                  <button className="close-button" onClick={togglePopup}>
                    Close
                  </button>
                </div>
              </div>
            )}

            League-Window
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
