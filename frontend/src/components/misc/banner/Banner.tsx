import { motion } from "framer-motion";
import s from "./Banner.module.css";

const variants = {
  initial: { width: 0 },
  animate: { width: "22vw", transition: { duration: 0.4 } },
  exit: { width: 0, transition: { duration: 0.4 } },
};

export default function Banner(props: { isCorrect: boolean; message: string }) {
  return (
    <motion.div
      className={
        props.isCorrect
          ? `${s.container} ${s.correct}`
          : `${s.container} ${s.false}`
      }
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      <div>{props.message}</div>
    </motion.div>
  );
}
