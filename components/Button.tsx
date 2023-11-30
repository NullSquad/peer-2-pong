import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(
  props: JSX.HTMLAttributes<HTMLButtonElement>,
  name: string,
) {
  return (
    <a
      {...props}

      class={`border-2 border-foreground hover:border-0 bordertext-foreground bg-transparent hover:bg-foreground font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-background ${
        props.class ?? ""
      }`}
    />
  );
}
