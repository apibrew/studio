import {EntryNode} from "./nodes/EntryNode";
import {EndNode} from "./nodes/EndNode";
import {SingleNode} from "./nodes/SingleNode";
import {GroupNode} from "./nodes/GroupNode";

export const nodeTypes = {
    'single': SingleNode,
    'entry': EntryNode,
    'end': EndNode,
    'group': GroupNode,
}