import type {NodeTypes} from "@reactflow/core/dist/esm/types";
import {StartNode} from "./StartNode";
import {ControlNode} from "./ControlNode";

export const nodeTypes: NodeTypes = {
    startNode: StartNode,
    controlNode: ControlNode,
}
