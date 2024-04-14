import {Edge, MarkerType, Node} from "reactflow";
import {
    ActionParams,
    ApiLoadParams,
    ApiSaveParams,
    AssignParams,
    CodeParams,
    ConditionParams,
    EventParams,
    FailParams,
    Flow,
    FunctionCallParams,
    GroupParams,
    Kind,
    Statement
} from "../../model/flow";
import {Add, Bolt, CallReceived, Code, Dangerous, ForkRight, Functions, Search, Update} from "@mui/icons-material";
import React from "react";
import {isBeginningStatement} from "./helper";

interface Position {
    x: number,
    y: number
}

interface PendingItem {
    nodeId: number,
    statement: Statement,
    parentId: number | undefined
    matrixPosition: Position
}

function prepareNode(item: PendingItem): Node {
    const position = {
        x: item.matrixPosition.x * 200,
        y: item.matrixPosition.y * 100
    }

    let node: Node = {
        id: 'node-' + item.nodeId,
        type: 'single',
        position: position,
        data: {
            label: 'Unknown: ' + item.statement.kind,
        },
    }

    if (item.parentId !== undefined) {
        node.parentId = 'node-' + item.parentId
    }

    switch (item.statement.kind) {
        case Kind.END:
            node.data.label = 'End'
            node.type = 'end'
            node.position.x += 80
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

export interface Result {
    nodes: Node[]
    edges: Edge[]
}

export function prepareInner(result: Result, statements: Statement[], lastNode: Node | undefined, cmp: Position): Result {
    const currentCmp = {...cmp}

    for (const statement of statements) {
        let nodeId = 'node-' + result.nodes.length
        if (!isBeginningStatement(statement) && lastNode) {
            // add edge
            result.edges.push({
                id: lastNode.id + '-' + nodeId,
                source: lastNode.id,
                target: nodeId,
                markerEnd: {
                    type: MarkerType.Arrow,
                },
            })
        }

        currentCmp.y++

        const node: Node = prepareNode({
            nodeId: result.nodes.length,
            statement,
            parentId: undefined,
            matrixPosition: {
                x: currentCmp.x,
                y: currentCmp.y
            },
        })

        result.nodes.push(node)

        lastNode = node

        // sub nodes

        if (statement.kind === Kind.CONDITION) {
            const params = statement.params as ConditionParams
            prepareInner(result, params.fail, lastNode, {x: currentCmp.x - 1, y: currentCmp.y})
            prepareInner(result, params.pass, lastNode, {x: currentCmp.x + 1, y: currentCmp.y})
        }
    }

    return result
}

export function prepare(flow: Flow): Result {
    const result: Result = {
        nodes: [],
        edges: []
    } as Result

    return prepareInner(result, flow.statements, undefined, {x: 3, y: 0})

    // let nodeId = 0
    //
    // let pendingItems: PendingItem[] = flow.statements.map(statement => ({
    //     statement,
    //     nodeId: nodeId++,
    //     parentId: undefined,
    // } as PendingItem))
    //
    // const result: PendingItem[] = []
    //
    // const currentMatrixPosition = {
    //     x: 3,
    //     y: 0
    // }
    //
    // while (pendingItems.length > 0) {
    //     const pendingItem = pendingItems.shift()!
    //     result.push(pendingItem)
    //
    //     const statement = pendingItem.statement
    //
    //     if (statement.kind === Kind.GROUP) {
    //         const groupParams = statement.params as GroupParams
    //
    //         pendingItems = groupParams.statements
    //             .map(statement => ({
    //                 statement,
    //                 parentId: pendingItem.nodeId,
    //                 nodeId: nodeId++
    //             } as PendingItem))
    //             .concat(pendingItems)
    //     }
    //
    //     if (statement.kind === Kind.CONDITION) {
    //         const conditionParams = statement.params as ConditionParams
    //
    //         if (conditionParams.pass) {
    //             pendingItems = conditionParams.pass
    //                 .map(statement => ({
    //                     statement,
    //                     parentId: pendingItem.parentId,
    //                     nodeId: nodeId++
    //                 } as PendingItem))
    //                 .concat(pendingItems)
    //         }
    //
    //         if (conditionParams.fail) {
    //             pendingItems = conditionParams.fail
    //                 .map(statement => ({
    //                     statement,
    //                     parentId: pendingItem.parentId,
    //                     nodeId: nodeId++
    //                 } as PendingItem))
    //                 .concat(pendingItems)
    //         }
    //     }
    // }
    //
    // position(result)
    //
    // const nodes = result.map(prepareNode);
    // // const edges = result.map((item, index) => prepareEdge(item.statement, index))
    //
    // return [nodes, []]
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
