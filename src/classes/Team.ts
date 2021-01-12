// import {Collection} from "fireorm";
//
// @Collection()
// export default class Team {
//     id: string;
//
//     name: string;
//
//     members: string[] = [];
//
//     constructor(name: string = 'player1', members?: string[]) {
//         this.name = name;
//         this.members = members;
//     }
// };


import {Entity, field} from "firebase-firestorm";

export default class Team extends Entity {
    @field({name: 'name'})
    name: string

    @field({name: 'members'})
    members: string[] = [];

    constructor(name: string = 'player1', members?: string[]) {
        super();
        this.name = name;
        this.members = members;
    }
}