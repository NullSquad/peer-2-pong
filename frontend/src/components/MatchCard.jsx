import React, { useEffect, useState } from "react";

const MatchCard = ({ player1, player2, player1Img, player2Img, initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Lógica para reducir el tiempo restante
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Limpia el intervalo al desmontar
  }, []);

  // Formatear el tiempo restante (días, horas, minutos, segundos)
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 rounded-lg p-4 shadow-lg relative">
      {/* Jugador 1 */}
      <div className="flex items-center space-x-2 bg-blue-500 p-2 rounded-l-lg">
        <img
          src={player1Img}
          alt={`${player1} avatar`}
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <span className="text-white font-bold">{player1}</span>
      </div>

      {/* VS en el centro */}
      <div className="text-white font-extrabold text-xl">VS</div>

      {/* Jugador 2 */}
      <div className="flex items-center space-x-2 bg-red-500 p-2 rounded-r-lg">
        <span className="text-white font-bold">{player2}</span>
        <img
          src={player2Img}
          alt={`${player2} avatar`}
          className="w-12 h-12 rounded-full border-2 border-white"
        />
      </div>

      {/* Tiempo restante */}
      <div className="absolute bottom-2 right-2 bg-black text-gray-200 px-2 py-1 text-xs rounded-lg">
        Time left: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default MatchCard;
