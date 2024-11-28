import { useState, useEffect } from 'preact/hooks';

//export function App() {
//  const [message, setMessage] = useState('');
//
//  useEffect(() => {
//    async function fetchMessage() {
//      const response = await fetch('/api/');
//      const data = await response.json();
//      setMessage(data.message);
//    }
//    fetchMessage();
//  }, []);
//
//  return (
//    <>
//      <h1 class="text-white text-5xl">Peer 2 Pong</h1>
//      <div class="text-3xl font-bold underline text-primary">
//        <p>{message}</p>
//      </div>
//    </>
//  );
//}

function	LoginPage()
{
// shadow-inner-t_colors-primary-yellow-100+b_colors-primary-yellow-900
	return (
		<>
			<div className="w-[800px] h-[70px] left-[96px] top-[575px] absolute justify-center items-center inline-flex">
				<div className="w-[800px] h-[70px] relative">
					<div className="w-[199.99px] h-[69.72px] shadow-yellow-100-700 parallelogram-tuta px-4 py-2 left-0 top-[0.28px] bg-primary-yellow rounded-sm border-2 border-black justify-center items-center gap-2 inline-flex">
						<div className="text-white leading-loose"><h1>LOGIN</h1></div>
					</div>
					<div className="w-[199.99px] h-[69.72px] shadow-yellow-50-700 parallelogram-tuta px-4 py-2 left-0 top-[0.28px] bg-primary-yellow rounded-sm border-2 border-black justify-center items-center gap-2 inline-flex">
						<div className="text-white leading-loose"><h1>MATCHES</h1></div>
					</div>
					<div className="w-[25.99px] h-[20.72px] text-[25px] shadow-blue-ocean parallelogram-tuta px-4 py-2 left-0 top-[0.28px] bg-accent-blue rounded-sm border-2 border-black justify-center items-center gap-2 inline-flex">
						<div className="text-white leading-loose">+</div>
					</div>
					<div className="w-[25.99px] h-[20.72px] text-[25px] shadow-red-light-dark px-4 py-2 left-0 top-[0.28px] bg-accent-red rounded-sm border-2 border-black justify-center items-center gap-2 inline-flex">
						<div className="text-white leading-loose">-</div>
					</div>
				</div>
			</div>
			<img className="w-[203px] h-[183px] left-[93px] top-[223px] absolute" src="assets/logo.png" />
		</>
	);

}

function	Background({children})
{
	return (
			<div className="w-[1200px] h-[852px] relative bg-[#212528]">
				<img className="w-[1200px] h-[854px] left-0 top-[-2px] absolute" src="assets/background_image.png" />
				{children}
			</div>
	);
}

function	Banner()
{
	return (
		<div className="w-80 h-9 relative">
			<div className="w-72 mt-2 h-5 left-[7.85px] rounded-r-sm shadow-yellow-50-700 bg-primary-yellow top-[23.10px] absolute">
			</div>
			<div className="w-64 h-5 left-[95px] rounded-r-sm shadow-yellow-50-700 bg-primary-yellow top-[8.20px] absolute">
			</div>
			<div className="w-60 h-12 left-0 parallelogram-banner rounded-r-sm shadow-yellow-50-700 bg-primary-yellow top-0 absolute">
			</div>
			<div className="w-44 left-[37px] top-[-2px] absolute text-white text-3xl font-normal font-['Fugaz One'] leading-loose">MATCHES</div>
		</div>
	);
}

export function	App()
{
	return (
		<Background>
			<Banner/>
		</Background>
	);
}
				// <LoginPage/>
