/*const Carousel = ({children}) => 
{
    return 
    (
        <div className='carousel'>
            {active > 0 && <button className='nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline/></button>}
            {React.Children.map(children, (child, i) => 
            (
                <div className='card-container' style=
                {{
                    '--active': i === active ? 1 : 0,
                    '--offset': (active - i) / 3,
                    '--direction': Math.sign(active - i),
                    '--abs-offset': Math.abs(active - i) / 3,
                    'pointer-events': active === i ? 'auto' : 'none',
                    'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                    'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                }}
                >
                    {child}
                </div>
            ))
            }
        {active < count - 1 && <button className='nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline/></button>}
        </div>
    );
};

const App = () => 
(
    <div className='app'>
        <Carousel>
            {[...new Array(CARDS)].map((_, i) => 
            (
                <Card title={'Card ' + (i + 1)} content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'/>
            ))
            }
        </Carousel>
    </div>  
);

ReactDOM.render
(
    <App/>,
    document.body
);

*/

import { useState, useEffect } from 'preact/hooks';
import { useSwipeable } from "react-swipeable";
import { toChildArray } from 'preact';

const SwipeCardStack = ({ children }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const childArray = toChildArray(children);
    const newCards = childArray.map((child, index) => ({
      id: index,
      content: child[index],
      bgColor: index % 2 === 0 ? "bg-primary-light" : "bg-primary-dark"
    }));
    setCards(newCards);
  }, [children]);

  const handleSwipe = () => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const movedCard = updatedCards.shift(); // Extrae la carta superior
      updatedCards.push(movedCard); // Añade la carta al final del stack
      return updatedCards;
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
  });

  return (
    <section
      className="relative w-full h-96 mx-auto mt-10 flex justify-center items-center"
      {...handlers}
    >
      {cards.map((card, index) => (
        <section
          key={card.id}
          className={`absolute w-80 h-40 rounded-lg shadow-lg ${card.bgColor} flex
            justify-center items-center text-black text-2xl font-bold
            transition-transform duration-300`}
          style={{
            zIndex: cards.length - index,
            transform: `translateX(${index * 20}px)`,
            opacity: index === 0 ?  1 : 1 - index * 0.4,
            filter: index === 0 ? "none" : "grayscale(100%)",
            clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
          }}
        >
          {card.content}
        </section>
      ))}
    </section>
  );
};

export function App() 
{
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMessage() {
      const response = await fetch('/api/');
      const data = await response.json();
      setMessage(data.message);
    }
    fetchMessage();
  }, []);

  return (
    <>
      <h1>Hello Archly</h1>
      <SwipeCardStack>
        <section>hello</section>
        <section>how</section>
        <section>are</section>
        <section>you</section>
      </SwipeCardStack>
    </>
  );
}
