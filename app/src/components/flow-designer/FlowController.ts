import {Control, Flow} from "../../model/flow";
import {Edge, Node} from "reactflow";
import {Parameter} from "../../model/flow-control-type";

export class FlowController {
    private flow: Flow = {
        controls: [],
        name: '',
        version: 0,
        id: ''
    } as Flow;

    private nodes: Node[] = [];
    private edges: Edge[] = [];
    private blockMap: Map<string, Control[]> = new Map<string, Control[]>();

    setFlow(flow: Flow) {
        this.flow = flow
        this.nodes = []
        this.edges = []
        this.prepare()
    }

    getFlow(): Flow {
        return this.flow
    }

    getNodes(): Node[] {
        return this.nodes;
    }

    getEdges(): Edge[] {
        return this.edges;
    }

    clear() {
        this.nodes = []
        this.edges = []
        this.flow.controls = []
    }

    addRootControl(control: Control) {
        this.flow.controls.push(control)
        const node = this.prepareNodeFromControl(control)
        this.nodes.push(node)

        return node
    }

    setFlowName(value: string) {
        this.flow.name = value
    }

    removeNode(node: Node<Control>) {
        this.nodes = this.nodes.filter(item => item.id !== node.id)
    }

    updateNode(node: Node<Control>, control: Control) {
        this.nodes = this.nodes.map(item => {
            if (item.id === node.id) {
                return {
                    ...item,
                    data: control
                }
            }

            return item
        })

        const parentControl = this.blockMap.get(node.id)

        parentControl?.forEach((item, index) => {
            if (item.id === control.id) {
                parentControl[index] = control
            }
        })

        this.flow.controls.forEach((item, index) => {
            if (item.id === control.id) {
                this.flow.controls[index] = control
            }
        });
    }

    addNodeToLastPlaceOfBase(baseNode: Node<Control>, param: Parameter, control: Control): Node {
        if (!baseNode.data.params[param.name]) {
            baseNode.data.params[param.name] = []
        }

        let block = baseNode.data.params[param.name] as Control[]

        block.push(control)

        // adding node to the end of the string
        let prevNode = baseNode

        if (block.length > 1) {
            const blockPrevElement = block[block.length - 2]

            prevNode = this.nodes.find(item => item.data.id === blockPrevElement.id)!

            if (!prevNode) {
                throw new Error('Previous node not found')
            }
        }

        const newNode = this.prepareNodeFromControl(control)
        this.nodes.push(newNode)
        this.blockMap.set(newNode.id, block)

        this.link(prevNode, newNode)

        return newNode
    }

    prepare() {
        const controls = [...this.flow.controls]
        this.flow.controls = []

        for (let i = 0; i < controls.length; i++) {
            let control = controls[i];

            const node = this.addRootControl(control)

            for (const param of control.controlType.parameters) {
                if (param.paramKind === 'BLOCK') {
                    this.prepareSub(node, param)
                }
            }
        }
    }

    prepareSub(baseNode: Node<Control>, param: Parameter) {
        let block = baseNode.data.params[param.name] as Control[] || []

        let lastNode = baseNode

        for (const control of block) {
            const node = this.prepareNodeFromControl(control)
            this.nodes.push(node)
            this.blockMap.set(node.id, block)

            this.link(lastNode, node)
            lastNode = node

            for (const param of control.controlType.parameters) {
                if (param.paramKind === 'BLOCK') {
                    this.prepareSub(node, param)
                }
            }
        }
    }

    private link(prevNode: Node<Control>, newNode: Node<Control>) {
        this.edges.push({
            id: 'edge-' + prevNode.id + '-' + newNode.id,
            source: prevNode.id,
            target: newNode.id,
            animated: true,
        })
    }

    newControl(): Control {
        const id = (Math.random() * 100000000).toFixed(0)
        return {
            id: id,
            params: {}
        } as Control;
    }

    prepareNodeFromControl(control: Control): Node {
        return {
            id: control.id,
            position: {x: 500, y: 0},
            data: control,
            ariaLabel: control.title,
            connectable: true,
            draggable: true,
            selectable: true,
            style: {
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                background: '#effbfb',
            },
            type: 'controlNode',
        };
    }
}
