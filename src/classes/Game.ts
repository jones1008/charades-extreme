// import Team from "./Team";
// import Score from "./Score";
// import {Collection, getRepository, ISubCollection, SubCollection} from "fireorm";
//
// @Collection()
// export default class Game {
//     id: string;
//
//     countdownTime: number = 60;
//
//     remainingTime: number = 60;
//
//     score: Score[] = [];
//
//     @SubCollection(Team)
//     teams: ISubCollection<Team>;
//
//     words: string[] = [];
//
//     wordsDone: string[] = [];
//
//     initialize(playerName: string = 'defaultPlayer'): Promise<{ t: Team, s: Score }[]> {
//         // create 2 default teams and its scores
//         const teamRepo = getRepository(Team);
//         const scoreRepo = getRepository(Score);
//
//         let team1: Team = new Team("Blau", [playerName]);
//         let team2: Team = new Team("Rot");
//
//         let promise1: Promise<{ t: Team, s: Score }> = teamRepo.create(team1).then((t: Team) => {
//             return scoreRepo.create(new Score(t)).then((s: Score) => {
//                 return {t, s};
//             });
//         });
//         let promise2: Promise<{ t: Team, s: Score }> = teamRepo.create(team2).then((t: Team) => {
//             return scoreRepo.create(new Score(t)).then((s: Score) => {
//                 return {t, s};
//             });
//         });
//
//         return Promise.all([promise1, promise2]);
//     }
// };


import Team from "./Team";
import Score from "./Score";
import {Entity, rootCollection, field, subCollection, ICollection, Collection} from 'firebase-firestorm';

@rootCollection({
    name: 'games'
})
export default class Game extends Entity {
// export default class Game  {
    id: string;

    @field({name: 'countdown_time'})
    countdownTime: number = 60;

    @field({name: 'remaining_time'})
    remainingTime: number = 60;

    @field({name: 'score'})
    score: Score[] = [];

    @subCollection({
        name: 'teams',
        entity: Team
    })
    teams: ICollection<Team>;
    // teams: Team[];

    @field({name: 'words'})
    words: string[] = [];

    @field({name: 'words_done'})
    wordsDone: string[] = [];

    initialize(playerName: string = 'defaultPlayer'): Promise<{t: Team, s: Score}[]> {
        // create 2 default teams and its scores
        let team1: Team = new Team("Blau", [playerName]);
        let team2: Team = new Team("Rot");
        let promise1: Promise<{t: Team, s: Score}> = this.teams.create(team1).then((t: Team) => {
            return Collection(Score).create(new Score(t)).then((s: Score) => {
                return {t, s};
            });
        });
        let promise2: Promise<{t: Team, s: Score}> = this.teams.create(team2).then((t: Team) => {
            return Collection(Score).create(new Score(t)).then((s: Score) => {
                return {t, s};
            });
        });
        return Promise.all([promise1, promise2]);
    }
}