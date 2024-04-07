import {EventNode} from "./nodes/EventNode";
import {Kind} from "../../model/flow";
import {EndNode} from "./nodes/EndNode";

export const nodeTypes = {
    [Kind.EVENT]: EventNode,
    [Kind.END]: EndNode,
}