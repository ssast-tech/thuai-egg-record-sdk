import { IRecordFile, IRecordFileFrame, IRecordFileHeader, Player, Egg } from './interfaces.js'

const EGG_COUNT = 15, PLAYER_COUNT = 12


function arrayBufferToString(ab: ArrayBuffer): string {
  return String.fromCharCode.apply(null, Array.from(new Uint8Array(ab)))
}

function readHeader(view: DataView): IRecordFileHeader {
  const frameCount = view.getUint16(8, true)
  const fps = view.getUint16(10, true)
  const redScore = view.getUint32(12, true),
        yellowScore = view.getUint32(16, true),
        blueScore = view.getUint32(20, true)
  const timestampLeft = view.getUint32(24, true), timestampRight = view.getUint32(28, true)
  const timestamp = new Date(((timestampRight * (2 ** 32)) + timestampLeft) * 1000) // s -> ms
  // NOTE: code above cannot handle years < 1970, but it doesn't matter

  const eggScores = [], eggScoresOffset = 32
  for (let i = 0; i < EGG_COUNT; i++) {
    eggScores[i] = view.getUint8(eggScoresOffset + i)
  }

  return { frameCount, fps, redScore, yellowScore,
    blueScore, timestamp, eggScores }
}

function readFrame(view: DataView, eggScores: number[], offset: number): IRecordFileFrame {
  const playerInfo: Player[] = []
  const eggInfo: Egg[] = []

  for (let id = 0; id < PLAYER_COUNT; id++) {
    const x = view.getFloat32(offset + 120 + 4 * id, true),
          y = view.getFloat32(offset + 168 + 4 * id, true)
    const enduranceZipped = view.getUint8(offset + 228 + id)
    playerInfo.push({
      id,
      position: [x, y],
      eggInHand: view.getInt8(offset + 216 + id),
      endurance: enduranceZipped / 255.0 * 5.0
    })
  }

  for (let id = 0; id < EGG_COUNT; id++) {
    const x = view.getFloat32(offset + 4 * id, true),
          y = view.getFloat32(offset + 60 + 4 * id, true)
    eggInfo.push({
      id,
      position: [x, y],
      score: eggScores[id]
    })
  }

  return {playerInfo, eggInfo}
}

function readFromRecordFile(blob: ArrayBuffer): IRecordFile | null {
  const view = new DataView(blob)
  if (arrayBufferToString(blob.slice(0, 6)) !== 'THAIEG' || view.getUint16(6, true) !== 1) {
    return null
  }

  const header: IRecordFileHeader = readHeader(view)
  const frames: IRecordFileFrame[] = []
  const frameSizeInBytes = 240
  for (let frameNum = 0, offset = 47; frameNum < header.frameCount;
    frameNum++, offset += frameSizeInBytes) {
      frames.push(readFrame(view, header.eggScores, offset))
  }

  return { header, frames }
}

export {
  readFromRecordFile
}