import {collection, Collection} from "typesaurus";

export class Team {
    collection: Collection<Team>

    name: string
    members: string[];

    constructor(name: string) {
        this.collection = collection("teams")
        this.name = name
    }
}