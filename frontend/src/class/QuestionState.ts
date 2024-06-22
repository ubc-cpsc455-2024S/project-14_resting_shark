//import MultipleChoice from "./MultipleChoice";
//import DragAndDrop from "./DragAndDrop";
//import Matching from "./Matching";

//class QuestionState {
//    question: DragAndDrop | Matching | MultipleChoice;

//    constructor(question: Matching | MultipleChoice | DragAndDrop) {
//      this.question = question;
//    }

//    chooseAnswer() {
//      throw new Error("This method should be overridden");
//    }

//    submitAnswer() {
//      throw new Error("This method should be overridden");
//    }
//  }

//  class InitialState extends QuestionState {
//    chooseAnswer() {
//      this.question.setState(this.question.answerableState);
//    }

//    submitAnswer() {
//      console.log("Can't submit, no answer chosen");
//    }
//  }

//  class AnswerableState extends QuestionState {
//    chooseAnswer() {
//      console.log("Answer already chosen, waiting for submission");
//    }

//    submitAnswer() {
//      const isCorrect = this.question.checkAnswer();
//      if (isCorrect) {
//        this.question.setState(this.question.evaluatedState);
//        console.log("Answer is correct");
//      } else {
//        this.question.setState(this.question.initialState);
//        console.log("Answer is incorrect, try again");
//      }
//    }
//  }

//  class EvaluatedState extends QuestionState {
//    chooseAnswer() {
//      console.log("Answer already evaluated");
//    }

//    submitAnswer() {
//      console.log("Answer already submitted");
//    }
//  }
