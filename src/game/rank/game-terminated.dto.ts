export class GameTerminatedDto {
  constructor(userId: string, mmrDiff: number, userScore: number) {
    this.userId = userId;
    this.mmrDiff = mmrDiff;
    this.userScore = userScore;
  }

  private userId: string;
  private nickname: string;
  private mmrDiff: number;
  private userScore: number;
  private isFriend: boolean;

  public getUserId() {
    return this.userId;
  }

  public setIsFriend(isFriend: boolean) {
    this.isFriend = isFriend;
  }

  public setNickname(nickname: string) {
    this.nickname = nickname;
  }
}
