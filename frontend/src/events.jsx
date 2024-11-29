import { useState } from 'react';

export const Event = ({ children }) => {
  // State for "Norms" pop-up
  const [normsPopup, setNormsPopup] = useState(false);
  const toggleNormsPopup = () => {
    setNormsPopup(!normsPopup); // Toggle norms pop-up visibility
  };

  // State for "Join" pop-up
  const [joinPopup, setJoinPopup] = useState(false);
  const toggleJoinPopup = () => {
    setJoinPopup(!joinPopup); // Toggle join pop-up visibility
  };

  return (
    <>
      <div className="slider-container">
        <div className="league-window-container">
          <div className="time-container">
            league ends in: 00h00mn00s
          </div>
          <div className="league-window">

            {/* Norms Button */}
            <button className="norms-button" onClick={toggleNormsPopup}>
              Norms
            </button>

            {/* Join Button */}
            <button className="join-button" onClick={toggleJoinPopup}>
              Join
            </button>

            {/* Norms Pop-up */}
            {normsPopup && (
              <div className="popup-overlay">
                <div className="popup">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p>This is the pop-up content!</p>
                  <button className="close-button" onClick={toggleNormsPopup}>
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Join Pop-up */}
            {joinPopup && (
              <div className="join-overlay">
                <div className="subscribed">
                  <p>Successfully registered   !</p>
                  <button className="close-button" onClick={toggleJoinPopup}>
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
