import { createContext, useContext, useState, ReactNode } from "react";
import * as React from "react";

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

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export function useLessonContext() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error("useLessonContext must be used within a PageProvider");
  }
  return context;
}

interface LessonProviderProps {
  children: ReactNode;
}

export function LessonProvider({ children }: LessonProviderProps) {
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
