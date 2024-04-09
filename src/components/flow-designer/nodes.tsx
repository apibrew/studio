import {Edge, MarkerType, Node} from "reactflow";
import {ActionParams, EventParams, Flow, GroupParams, Kind, Statement} from "../../model/flow";

interface PendingItem {
    nodeId: number,
    statement: Statement,
    parentId: number | undefined
    position: {
        x: number,
        y: number
    }
    additionalData: any
}

function prepareNode(item: PendingItem): Node {
    let data: Node = {
        id: 'node-' + item.nodeId,
        type: 'single',
        position: item.position,
        data: {
            label: 'Unknown',
            ...item.additionalData,
        },
    }

    if (item.parentId !== undefined) {
        data.parentId = 'node-' + item.parentId
    }

    switch (item.statement.kind) {
        case Kind.END:
            data.data.label = 'End'
            data.type = 'end'
            break
        case Kind.EVENT:
            const eventParams = item.statement.params as EventParams
            data.data.label = eventParams.type
            data.type = 'entry'
            break
        case Kind.ACTION:
            const actionParams = item.statement.params as ActionParams
            data.data.label = actionParams.type
            data.type = 'entry'
            break
        case Kind.GROUP:
            const groupParams = item.statement.params as GroupParams
            data.data.label = groupParams.name
            data.type = 'group'
            break
    }

    return data
}

export function position(items: PendingItem[]) {
    let x = 20
    let y = 40

    let maxY = 0
    let gi = 0

    let lastGroup: PendingItem | undefined = undefined

    for (let item of items) {
        if (item.statement.kind === Kind.GROUP) {
            if (lastGroup !== undefined) {
                lastGroup.additionalData = {
                    height: y - 20
                }
            }

            y = maxY + 20 + (gi++ * 20)
            lastGroup = item
        }
        item.position = {
            x: x,
            y: y
        }

        y += 60

        if (item.statement.kind === Kind.GROUP) {
            y = 40
        }

        if (y > maxY) {
            maxY = y
        }
    }

    if (lastGroup !== undefined) {
        lastGroup.additionalData = {
            height: y
        }
    }
}

export function prepare(flow: Flow): [Node[], Edge[]] {
    let nodeId = 0

    let pendingItems: PendingItem[] = flow.statements.map(statement => ({
        statement,
        nodeId: nodeId++,
        parentId: undefined,
    } as PendingItem))

    const result: PendingItem[] = []

    while (pendingItems.length > 0) {
        const pendingItem = pendingItems.shift()!
        result.push(pendingItem)

        const statement = pendingItem.statement


        if (statement.kind === Kind.GROUP) {
            const groupParams = statement.params as GroupParams

            pendingItems = groupParams.statements
                .map(statement => ({
                    statement,
                    parentId: pendingItem.nodeId,
                    nodeId: nodeId++
                } as PendingItem))
                .concat(pendingItems)
        }
    }

    position(result)

    console.log(result)

    const nodes = result.map(prepareNode);
    const edges = result.map((item, index) => prepareEdge(item.statement, index))

    console.log(nodes)
    console.log(edges)

    return [nodes, edges]
}

function prepareEdge(statement: Statement, index: number): Edge {
    return {
        id: 'A->B',
        source: 'node-' + index,
        target: 'node-' + (index + 1),
        markerEnd: {
            type: MarkerType.Arrow,
        },
    };
}