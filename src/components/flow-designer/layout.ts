import {Edge, Node, Position} from "reactflow";
import dagre from 'dagre';
import {Control} from "../../model/flow";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;

export const getLayoutedElements = (nodes: Node<Control>[], edges: Edge[], direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({rankdir: direction});

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {width: nodeWidth, height: calculateNodeHeight(node)});
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? Position.Left : Position.Top;
        node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - calculateNodeHeight(node) / 2,
        };

        console.log(node.position)

        return node;
    });

    return {nodes, edges};
};

function calculateNodeHeight(node: Node<Control>) {
    let height = 50;

    if (node.data.controlType) {
        height += node.data.controlType.parameters.length * 30;
    }

    return height
}
