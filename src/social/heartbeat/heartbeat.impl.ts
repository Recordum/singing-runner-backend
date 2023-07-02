import { ConsoleLogger, Injectable } from "@nestjs/common";
import { HeartBeat } from "./heartbeat";
import { UserService } from "src/user/user.service";
import { userActiveStatus } from "src/user/util/user.enum";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class HeartBeatimpl implements HeartBeat {
  constructor(private userService: UserService) {}
  private logger = new ConsoleLogger(HeartBeatimpl.name);
  private heartBeatMap: Map<string, number> = new Map();

  @Cron("* * * * *")
  async updateHeartBeatMap() {
    const updatedDate: number = Date.now();
    this.logger.debug(JSON.stringify([...this.heartBeatMap]));
    if (this.heartBeatMap.size === 0) {
      return;
    }
    for (const userId of this.heartBeatMap.keys()) {
      const lastUpdate: number = this.getHeratbeatMap(userId);
      if (lastUpdate < updatedDate - 300000) {
        await this.updateDB(userId);
        this.deleteHeartBeatMap(userId);
      }
    }
  }

  public setHeartBeatMap(userId: string, updateAt: number) {
    this.heartBeatMap.set(userId, updateAt);
  }

  public deleteHeartBeatMap(userId: string) {
    this.heartBeatMap.delete(userId);
  }

  public async updateDB(userId: string) {
    await this.userService.updateUserActive(userId, userActiveStatus.LOGOUT);
  }

  private getHeratbeatMap(userId: string) {
    const updateDate: number | undefined = this.heartBeatMap.get(userId);
    if (updateDate === undefined) {
      throw new Error("Heartbeat에 map 에 해당 userId가 존재하지 않습니다");
    }
    return updateDate;
  }

  public isLoginUser(userId: string): boolean {
    return this.heartBeatMap.has(userId);
  }
}
