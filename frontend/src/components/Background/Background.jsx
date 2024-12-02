import { h } from "preact";
import bg_image from "../../img/bgBlock.svg";

export function Background() {
  return (
    <div
      className="fixed inset-0 w-full h-full bg-[#142965] bg-repeat z-[-1]"
      style={{ backgroundImage: `url(${bg_image})` }}
    >
      <div className="absolute inset-0 w-full h-full bg-black opacity-10"></div>
    </div>
  );
}
