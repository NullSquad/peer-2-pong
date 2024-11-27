import { useEffect, useState } from 'preact/hooks';

export function MatchCard({ player1, player2, targetDate }) {
  const [timeLeft, setTimeLeft] = useState('');

  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

	  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    //   if (days > 0) {
    //     return `${days}d ${hours}h`;
    //   } else if (hours > 0) {
    //     return `${hours}h ${minutes}m`;
    //   } else if (minutes > 0) {
    //     return `${minutes}m ${seconds}s`;
    //   } else {
    //     return `${seconds}s`;
    //   }
    } else {
      return 'Time expired';
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="relative flex w-full max-w-4xl shadow-lg overflow-visible">
      {/* Player 1 Side */}
      <div className="flex items-center justify-center bg-blue-500 w-1/2 px-6 py-8 text-black">
        <img
          src={player1.image}
          alt={player1.name}
          className="w-16 h-16 rounded-full border-4 border-black mr-4"
        />
        <span className="text-2xl font-bold">{player1.name}</span>
      </div>

      {/* VS Section */}
      <div
        className="absolute inset-0 flex items-center justify-center text-white text-4xl font-extrabold"
        style={{
          textShadow: '2px 2px 4px black',
        }}
      >
        VS
      </div>

      {/* Player 2 Side */}
      <div className="flex items-center justify-center bg-red-500 w-1/2 px-6 py-8 text-black">
        <span className="text-2xl font-bold mr-4">{player2.name}</span>
        <img
          src={player2.image}
          alt={player2.name}
          className="w-16 h-16 rounded-full border-4 border-black"
		  // WebkitTextStroke: '0.3px black',
		  // color: 'white',
        />
      </div>

      {/* Time Left */}
      <div
        className="absolute bottom-0 right-0 bg-gray-900 text-white text-sm p-2 rounded-lg translate-y-full"
        style={{ marginTop: '8px', zIndex: 10 }}
      >
        Time left: {timeLeft}
      </div>
    </div>
  );
}

export default MatchCard;
