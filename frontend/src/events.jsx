
export const Event = ({children}) => { 
    return ( 
    <>
     <div className="slider-container">
      <div className="league-window-container">
        <div className="time-container">
          league ends in : 00h00mn00s
        </div>
        <div className="league-window">
          League-Window
            {children}
        </div>
      </div>
    </div>
    </>);  
};
