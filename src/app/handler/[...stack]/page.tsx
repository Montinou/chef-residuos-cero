import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/stack";

export default function Handler(props: any) {
  return <StackHandler fullPage={true} app={stackServerApp} {...props} />;
}
