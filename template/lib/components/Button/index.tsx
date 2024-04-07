import { useEffect } from "react";
import styles from "./styles.module.css";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className, ...restProps } = props;

  useEffect(() => {
    console.log("Button mounted");
  }, []);

  return <button className={`${className} ${styles.button}`} {...restProps} />;
}
