import {add, collection, Doc, get, Ref, subcollection, update} from "typesaurus";

export class Game {
    countdownTime: number = 60
    remainingTime: number = -1
    score: Score[] = []
    teams: Ref<Team>[]
    words: string[] = []
    wordsDone: string[] = []
}

export function getGame(gameRef: Ref<Game>): Promise<Doc<Game>> {
    return get(gameRef)
}

class Score {
    team: Ref<Team>;
    value: number = 0;
    constructor(team: Ref<Team>) {
        this.team = team
    }
}

class Team {
    name: string = ""
    members: string[] = [];
    teamRef: Ref<Team>
    constructor(name) {
        this.name = name
        this.members.push("Spieler 1")
        this.members.push("Spieler 2")
    }
}

export function createGame(): Promise<Ref<Game>> {
    const games = collection<Game>('games')
    const teams = subcollection<Team, Game>("teams", games)
    let game = new Game()

    return add(games, game).then(gameRef => {
        let team1 = new Team("team1")
        return add(teams(gameRef), team1).then(team1Ref => {
            let team2 = new Team("team2")
            return add(teams(gameRef), team2).then(team2Ref => {
                let score1 = new Score(team1Ref)
                let score2 = new Score(team2Ref)
                game.score.push(score1)
                game.score.push(score2)
                return update(gameRef, game).then(() => {
                    return new Promise<Ref<Game>>(() => game)
                });
            })
        });
    })
}