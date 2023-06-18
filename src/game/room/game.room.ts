import { GameSongDto } from "src/song/dto/game-song.dto";
import { GameRoomStatus } from "./../utill/game.enum";
import { plainToClass } from "class-transformer";
export class GameRoom {
  private roomId: number;
  private gameRoomStatus: GameRoomStatus;
  private acceptCount: number;
  private gameSongDto: GameSongDto;
  constructor(
    roomId: number,
    gameRoomStatus: GameRoomStatus,
    acceptCount: number,
    gameSongDto: GameSongDto
  ) {
    this.roomId = roomId;
    this.gameRoomStatus = gameRoomStatus;
    this.acceptCount = acceptCount;
    this.gameSongDto = gameSongDto;
  }

  public getRoomId(): number {
    return this.roomId;
  }

  public getRoomStatus(): GameRoomStatus {
    return this.gameRoomStatus;
  }

  public getAcceptCount(): number {
    return this.acceptCount;
  }

  public getGameSongDto(): GameSongDto {
    return this.gameSongDto;
  }
  public increaseAcceptCount() {
    this.acceptCount += 1;
  }
  public resetAcceptCount() {
    this.acceptCount = 0;
  }

  // public toJSON() {
  //   return {
  //     roomId: this.roomId,
  //     gameRoomStatus: this.gameRoomStatus,
  //     acceptCount: this.acceptCount,
  //     gameSongDto: plainToClass(GameSongDto, this.gameSongDto),
  //   };
  // }
}
