import clsx from "clsx";

export default function Card({ children, className }) {
  return <div className={clsx("app-surface rounded-2xl p-5", className)}>{children}</div>;
}
