import { h } from 'preact';

export function Background() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#1c2541] bg-[url('../../img/bgBlock.svg')] bg-repeat z-[-1]">
      <div className="absolute inset-0 w-full h-full bg-black opacity-30"></div>
    </div>
  );
}
