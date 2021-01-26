import Team from "./Team";
import CurrentPlayer from "./CurrentPlayer";
import {Collection} from "fireorm";

@Collection('games')
export default class Game {
    id: string
    countdownTime: number
    currentPlayer: CurrentPlayer
    isStarted: boolean
    wordsPerPlayer: number
    remainingTime: number
    rounds: string[]
    teams: Team[]
    words: string[]
    wordsDone: string[]
}