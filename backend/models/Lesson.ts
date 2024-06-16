export class Lesson {
  public id: string;
  public name: string;
  public author: string;                      // userId
  public lives: number;
  public livesLastZeroTime: Date;            // the timestamp of when the user's lives hit zero
  public streakCount: number;
  public pageProgress: number;              // the furthest page the user has progressed to
  public highScore: number;
  public currentScore: number;             // the current score of the user as they progress through the quiz score. 
  public info: string;                       // Info id
  public chapters: string[];                  // Chapter ids
}