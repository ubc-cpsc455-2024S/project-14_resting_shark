import { createContext, useContext, useState, ReactNode } from "react";
import * as React from "react";

// Define the interface for the context
interface LessonContextType {
  farthestPage: number;
  setFarthestPage: (page: number) => void;
  isQuestionPage: boolean;
  setIsQuestionPage: (isQuestionPage: boolean) => void;
  canProgress: boolean;
  setCanProgress: (canProgress: boolean) => void;
  canCheckAnswers: boolean;
  setCanCheckAnswers: (canCheckAnswers: boolean) => void;
  checkAnswer: boolean;
  setCheckAnswer: (checkAnswer: boolean) => void;
  broadcastCheckAnswer: () => void;
  bannerText: string;
  setBannerText: (bannerText: string) => void;
}

// Create the context
const LessonContext = createContext<LessonContextType | undefined>(undefined);

// Custom hook to use the LessonContext
export function useLessonContext() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error("useLessonContext must be used within a LessonProvider");
  }
  return context;
}

// Define props for LessonProvider
interface LessonProviderProps {
  children: ReactNode;
}

export function LessonProvider({ children }: LessonProviderProps) {
  // Use props for initial state values
  const [farthestPage, setFarthestPage] = useState<number>(0);
  const [isQuestionPage, setIsQuestionPage] = useState(false);
  const [canProgress, setCanProgress] = useState(true);
  const [canCheckAnswers, setCanCheckAnswers] = useState(false);
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [bannerText, setBannerText] = useState("");

  const broadcastCheckAnswer = () => {
    setCheckAnswer((prevState) => !prevState);
  };

  return (
    <LessonContext.Provider
      value={{
        farthestPage,
        setFarthestPage,
        isQuestionPage,
        setIsQuestionPage,
        canProgress,
        setCanProgress,
        canCheckAnswers,
        setCanCheckAnswers,
        checkAnswer,
        broadcastCheckAnswer,
        setCheckAnswer,
        bannerText,
        setBannerText,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}
