export class User {
  public id: string;
  public username: string;
  public password: string;
  public profile: string;                    // Profile id
  public history: string;                    // history id
  public dailyStreakLastUpdateTime: Date;
  public dailyStreakCount: number;
  public longestStreak: number;
  public lessons: string[];                  // Lesson ids
}