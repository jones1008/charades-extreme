import {Team} from "./Team";
import {Ref} from "typesaurus";

export class Score {
    team: Ref<Team>;
    value: number = 0;

    constructor(team: Ref<Team>) {
        this.team = team
    }
}