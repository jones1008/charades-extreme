// import Team from "./Team";
// import {Collection} from "fireorm";
// import {Type} from "class-transformer";
//
// @Collection()
// export default class Score {
//     id: string;
//
//     @Type(() => Team)
//     team: Team[];
//
//     value: number = 0;
//
//     constructor(team: Team = new Team()) {
//         // this.team = Collection(Team).doc(team.id);
//         this.team.push(team);
//     }
// }

import Team from "./Team";
import {Collection, documentRef, Entity, field, IDocumentRef} from "firebase-firestorm";

export default class Score extends Entity {
    @documentRef({
        name: 'team',
        entity: Team
    })
    team: IDocumentRef<Team>;
    // team: Team;

    @field({name: 'value'})
    value: number = 0;

    constructor(team: Team = new Team()) {
        super();
        this.team = Collection(Team).doc(team.id);
    }
}