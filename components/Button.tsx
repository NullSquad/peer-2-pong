import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement>,
  name: string,
) {
  return (
    <a
      {...props}
      class={`inline-block cursor-pointer px-3 py-2 bg-white rounded hover:bg-gray-100 ${
        props.class ?? ""
      }`}
    />
  );
}
