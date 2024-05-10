import type {NodeTypes} from "@reactflow/core";
import {StartNode} from "./StartNode";
import {ControlNode} from "./ControlNode";
import {ControlNodeCompact} from "./ControlNodeCompact";

export const nodeTypes: NodeTypes = {
    startNode: StartNode,
    controlNode: ControlNode,
    controlNodeCompact: ControlNodeCompact,
}
