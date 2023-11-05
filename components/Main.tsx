import type { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export function Main(props: Props) {
  return (
    <main class="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-900 py-10">
      {props.children}
    </main>
  );
}
