import type { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

export function Container(props: Props) {
  return (
    <div class="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-900 py-10">
      <div class="flex flex-col mt-6">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden sm:rounded-lg">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
