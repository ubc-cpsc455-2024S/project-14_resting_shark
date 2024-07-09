import { motion } from "framer-motion";
import { useLessonContext } from "../../../../context/LessonProvider";
import { BodyProps } from "../Body.d";

export default function MainDisplay(props: BodyProps) {
  const {
    farthestPage,
    canProgress,
    isQuestionPage,
    setFarthestPage,
    canCheckAnswers,
    broadcastCheckAnswer,
  } = useLessonContext();

  const onNextButtonPress = () => {
    if (props.gameOver) {
      props.onSubmit(); 
    } else {
      setTimeout(() => {
        if (!isQuestionPage) {
          if (props.pageNumber + 1 < props.contentList.length) {
            props.setPageNumber(props.pageNumber + 1);
            if (props.pageNumber + 1 < farthestPage) {
              setFarthestPage(farthestPage + 1);
            }
          }
        } else {
          if (props.pageNumber + 1 <= farthestPage) {
            props.setPageNumber(props.pageNumber + 1);
          } else {
            if (canCheckAnswers) {
              broadcastCheckAnswer();
              if (canProgress) {
                setFarthestPage(farthestPage + 1);
                props.setPageNumber(props.pageNumber + 1);
                props.setButtonText("Next");
              }
            }
          }
        }
      }, 150);
    }
  };

  return (
    <>
      <div className="main-display">{props.renderedPage}</div>
      <motion.button
        layout
        transition={{ duration: 0.2 }}
        className="next-button"
        onClick={onNextButtonPress}
        style={
          canCheckAnswers || !isQuestionPage
            ? {}
            : { backgroundColor: "#E7EAF6" }
        }
      >
        <div
          className="inner-button"
          style={
            canCheckAnswers || !isQuestionPage
              ? {}
              : { backgroundColor: "#B5BDDC" }
          }
        >
          {props.buttonText}
        </div>
      </motion.button>
    </>
  );
}
