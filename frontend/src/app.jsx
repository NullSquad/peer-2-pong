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
	return (
		<>
			<div className="w-[200px] h-[70px] left-[96px] top-[575px] absolute justify-center items-center inline-flex">
				<div className="w-[200px] h-[70px] relative">
					<div className="w-[199.99px] h-[69.72px] shadow-item px-4 py-2 left-0 top-[0.28px] absolute bg-yellow-500 rounded-sm border-2 border-black justify-center items-center gap-2 inline-flex">
						<div className="text-white leading-loose"><h1>LOGIN</h1></div>
					</div>
				</div>
			</div>
			<img className="w-[203px] h-[183px] left-[93px] top-[223px] absolute" src="assets/logo.png" />
		</>
	);

}

export function	App()
{
	return (
		<>
			<div className="w-[393px] h-[852px] relative bg-[#212528]">
				<img className="w-[393px] h-[854px] left-0 top-[-2px] absolute" src="assets/background_image.png" />
				<LoginPage/>
			</div>
		</>
	);
}
