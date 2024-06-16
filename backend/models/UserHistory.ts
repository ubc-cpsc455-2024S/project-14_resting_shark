export class UserHistory {
  public id: string;
  public lessonsPerDay: number[];           // number of lessons per day, array of length 7. arr[0] is sunday, arr[1], ... this is to display in user stats

  constructor(lessonsPerDay?: number[]) {
    if (lessonsPerDay && lessonsPerDay.length === 7) {
      this.lessonsPerDay = lessonsPerDay;
    } else if (lessonsPerDay && lessonsPerDay.length !== 7) {
      throw new Error("Length must be 7");
    } else {
      this.lessonsPerDay = [0, 0, 0, 0, 0, 0, 0];
    }
  }
}