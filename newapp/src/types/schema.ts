import {Property} from "@apibrew/client/model";

export interface Schema {
    properties: { [key: string]: Property }
}