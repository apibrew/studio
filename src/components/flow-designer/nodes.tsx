import {Edge, MarkerType, Node} from "reactflow";
import {
    ActionParams,
    ApiLoadParams,
    ApiSaveParams,
    AssignParams,
    CodeParams,
    ConditionParams,
    EventParams, FailParams,
    Flow,
    FunctionCallParams,
    GroupParams,
    Kind,
    Statement
} from "../../model/flow";
import {
    Add,
    Bolt,
    CallReceived,
    Code,
    Dangerous,
    Error,
    ForkRight,
    Functions,
    Search,
    Update
} from "@mui/icons-material";
import React from "react";

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
    let node: Node = {
        id: 'node-' + item.nodeId,
        type: 'single',
        position: item.position,
        data: {
            label: 'Unknown: ' + item.statement.kind,
            ...item.additionalData,
        },
    }

    if (item.parentId !== undefined) {
        node.parentId = 'node-' + item.parentId
    }

    switch (item.statement.kind) {
        case Kind.END:
            node.data.label = 'End'
            node.type = 'end'
            break
        case Kind.EVENT:
            const eventParams = item.statement.params as EventParams
            const act = eventParams.action.toLowerCase()
            // act first letter to uppercase
            const action = act.charAt(0).toUpperCase() + act.slice(1)
            node.data.label = eventParams.order.toLowerCase() + action + ': ' + eventParams.type
            node.data.icon = <Bolt/>
            node.type = 'entry'
            break
        case Kind.ACTION:
            const actionParams = item.statement.params as ActionParams
            node.data.label = actionParams.type
            node.type = 'entry'
            node.data.icon = <CallReceived/>
            break
        case Kind.ASSIGN:
            const assignParams = item.statement.params as AssignParams
            node.data.label = assignParams.left + ' = ' + assignParams.expression
            node.type = 'single'
            node.data.icon = <Code/>
            break
        case Kind.CODE:
            const codeParams = item.statement.params as CodeParams
            node.data.label = ''
            node.data.text = codeParams.content.substring(0, 16) + '...'
            node.data.icon = <Code/>
            node.type = 'single'
            break
        case Kind.API_CREATE: {
            const apiSaveParams = item.statement.params as ApiSaveParams
            node.data.label = apiSaveParams.type
            node.data.icon = <Add/>
            node.type = 'single'
            break
        }
        case Kind.API_UPDATE: {
            const apiSaveParams = item.statement.params as ApiSaveParams
            node.data.label = 'Update: ' + apiSaveParams.type
            node.data.icon = <Update/>
            node.type = 'single'
            break
        }
        case Kind.API_LOAD: {
            const params = item.statement.params as ApiLoadParams
            node.data.label = params.type
            node.data.icon = <Search/>
            node.type = 'single'
            break
        }
        case Kind.FUNCTION_CALL: {
            const params = item.statement.params as FunctionCallParams
            node.data.label = params.name
            node.data.icon = <Functions/>
            node.type = 'single'
            break
        }
        case Kind.CONDITION: {
            const params = item.statement.params as ConditionParams
            node.data.label = params.condition
            node.data.icon = <ForkRight/>
            node.type = 'single'
            break
        }
        case Kind.FAIL: {
            const params = item.statement.params as FailParams
            node.data.label = params.message
            node.data.icon = <Dangerous/>
            node.type = 'single'
            break
        }
        case Kind.GROUP: {
            const groupParams = item.statement.params as GroupParams
            node.data.label = groupParams.name
            node.type = 'group'
            node.selectable = false
            break
        }
    }

    return node
}

export function position(items: PendingItem[]) {
    let x = 60
    let y = 40

    let maxY = 0
    let gi = 0

    let groupTop = 20

    let lastGroup: PendingItem | undefined = undefined

    for (let item of items) {
        if (item.statement.kind === Kind.GROUP) {
            if (lastGroup !== undefined) {
                lastGroup.additionalData = {
                    height: y - 20
                }

                groupTop += y + 20
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

            item.position = {
                x: x,
                y: groupTop
            }
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

        if (statement.kind === Kind.CONDITION) {
            const conditionParams = statement.params as ConditionParams

            console.log('conditionParams', flow.statements)

            if (conditionParams.pass) {
                pendingItems = conditionParams.pass
                    .map(statement => ({
                        statement,
                        parentId: pendingItem.parentId,
                        nodeId: nodeId++
                    } as PendingItem))
                    .concat(pendingItems)
            }

            if (conditionParams.fail) {
                pendingItems = conditionParams.fail
                    .map(statement => ({
                        statement,
                        parentId: pendingItem.parentId,
                        nodeId: nodeId++
                    } as PendingItem))
                    .concat(pendingItems)
            }
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