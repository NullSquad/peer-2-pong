import { h } from "preact";
import bg_image from "../../assets/block.svg";

export function Background() {
  return (
    <div
      className="fixed inset-0 w-full h-full bg-[#142965] bg-repeat bg-pattern"
    >
      <div className="inset-0 w-full h-full bg-black opacity-10"></div>
    </div>
  );
}
