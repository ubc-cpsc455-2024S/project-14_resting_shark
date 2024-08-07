import { motion } from "framer-motion";
import { useLessonContext } from "../../../../context/LessonProvider";
import { BodyProps } from "../Body.d";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { requests } from "../../../../api/requestTemplate";
import { useAppSelector } from "../../../../redux/hooks";

export default function MainDisplay(props: BodyProps) {
  const {
    farthestPage,
    canProgress,
    isQuestionPage,
    setFarthestPage,
    canCheckAnswers,
    broadcastCheckAnswer,
  } = useLessonContext();

  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.jwtToken);

  const updateLessonHistory = async () => {
    const hasCompleted = await requests.getRequest(
      token,
      `/lessonHistory/${props.lessonId}`
    );

    if (!hasCompleted.hasCompletedBefore) {
      await requests.postRequest(token, `/lessonHistory/${props.lessonId}`);
      console.log("updated history");

      const user = await requests.patchRequest(token, `/user`, { user: {} });
      const exp = user.totalExp;
      console.log(exp);

      await requests.patchRequest(token, `/user`, {
        user: { totalExp: exp + 100 },
      });
    }
  };

  const onNextButtonPress = () => {
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
              if (props.pageNumber + 1 == props.contentList.length) {
                props.setButtonText("Next");
                navigate("/finished", {
                  state: {
                    title: "title",
                    lives: props.lives,
                    streak: props.streak,
                    lessonId: props.lessonId,
                  },
                });
                updateLessonHistory();
              } else {
                setFarthestPage(farthestPage + 1);
                props.setPageNumber(props.pageNumber + 1);
                props.setButtonText("Next");
              }
            }
          }
        }
      }
    }, 150);
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
