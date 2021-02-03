interface IRecordFileHeader {
    fps: number;
    frameCount: number;
    redScore: number;
    yellowScore: number;
    blueScore: number;
    eggScores: number[];
    timestamp: Date;
}
interface Player {
    id: number;
    position: [number, number];
    eggInHand: number;
    endurance: number;
}
interface Egg {
    id: number;
    position: [number, number];
    score: number;
}
interface IRecordFileFrame {
    playerInfo: Player[];
    eggInfo: Egg[];
}
interface IRecordFile {
    header: IRecordFileHeader;
    frames: IRecordFileFrame[];
}
export { IRecordFile, IRecordFileHeader, IRecordFileFrame, Player, Egg };
//# sourceMappingURL=interfaces.d.ts.map