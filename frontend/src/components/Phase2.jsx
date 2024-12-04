export function MatchCard({ player1, player2, targetDate }) {
  const [phase, setPhase] = useState(1);
  const [result, setResult] = useState({ blue: 0, red: 0 });

  const nextPhase = () => setPhase((prev) => (prev < 5 ? prev + 1 : 1));
  const prevPhase = () => setPhase((prev) => (prev > 1 ? prev - 1 : 5));
  const togglePhase = () => setPhase((prev) => (prev === 1 ? 2 : 1));

  return (
    <div className="relative flex flex-col w-full max-w-4xl overflow-visible bg-gray-800">
      <button onClick={togglePhase}>
        <Phase1 player1={player1} player2={player2} targetDate={targetDate} />
      </button>
      <div
        className={`transition-all duration-200 ease-out  ${
          phase === 2 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Phase2
          player1={player1}
          player2={player2}
          result={result}
          setResult={setResult}
        />
      </div>
    </div>
  );
}

function Phase2({ result, setResult }) {
  const increaseBlue = () => setResult({ ...result, blue: result.blue + 1 });
  const decreaseBlue = () =>
    setResult({ ...result, blue: Math.max(0, result.blue - 1) });

  const increaseRed = () => setResult({ ...result, red: result.red + 1 });
  const decreaseRed = () =>
    setResult({ ...result, red: Math.max(0, result.red - 1) });

  return (
    <div className="relative bottom-[2.4rem] left-[3rem] sm:bottom-[3.5rem]">
      {/* Controles de puntuación */}
      <div className="relative flex justify-center items-center mt-2 gap-2 ">
        <div className="flex items-center bg-accent-blue-light p-2 rounded">
          <button
            onClick={decreaseBlue}
            className="bg-accent-red-light text-white px-2 py-1 rounded font-bold"
          >
            -
          </button>
          <span className="text-black text-2xl font-extrabold mx-2">
            {result.blue}
          </span>
          <button
            onClick={increaseBlue}
            className="bg-blue-700 text-white px-2 py-1 rounded font-bold"
          >
            +
          </button>
        </div>

        <div className="flex items-center bg-red-500 p-2 rounded">
          <button
            onClick={decreaseRed}
            className="bg-accent-red-light text-white px-2 py-1 rounded font-bold"
          >
            -
          </button>
          <span className="text-black text-2xl font-extrabold mx-2">
            {result.red}
          </span>
          <button
            onClick={increaseRed}
            className="bg-accent-blue-light text-white px-2 py-1 rounded font-bold"
          >
            +
          </button>
        </div>

        <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded shadow-md">
          SUBMIT
        </button>
      </div>
    </div>
  );
}
