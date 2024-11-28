
export const Event = ({children}) => { 
    return ( 
    <>
     <div className="py-2">
      <div className="parallelogram-tuta">
        <div className="time-container">
          league ends in : 00h00mn00s
        </div>
        <div className="w-[600px] h-[300px] font-sans bg-accent-blue-light text-black text-right leading-[1px] text-[45px] font-[bold] skew-x-[-0.5deg] flex justify-center justify-self-end items-center">
          {children}
        </div>
      </div>
    </div>
    </>
    );  
};

export default Event;
