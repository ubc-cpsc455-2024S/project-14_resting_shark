import Content from "./Content";

export default interface Lesson {
  id: string;
  name: string;
  author: string;
  lives: number;
  livesLastZeroTime: Date; // placeholder data
  streakCount: number;
  pageProgress: number;
  highScore: number;
  currentScore: number;
  content: Content[];
}
