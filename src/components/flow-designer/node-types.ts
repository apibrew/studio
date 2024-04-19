import {EntryNode} from "./nodes/EntryNode";
import {EndNode} from "./nodes/EndNode";
import {SimpleNode} from "./nodes/SimpleNode";
import {GroupNode} from "./nodes/GroupNode";

export const nodeTypes = {
    'simple': SimpleNode,
    'entry': EntryNode,
    'end': EndNode,
    'group': GroupNode,
}
