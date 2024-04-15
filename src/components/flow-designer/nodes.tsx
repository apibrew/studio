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
import {Add, Bolt, Code, Dangerous, ForkRight, Functions, Search, Update} from "@mui/icons-material";
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
        x: item.matrixPosition.x * 150,
        y: item.matrixPosition.y * 70
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
            node.data.label = 'Action: '
            node.data.text = actionParams.type
            node.type = 'entry'
            // node.data.icon = <CallReceived/>
            break
        case Kind.ASSIGN:
            const assignParams = item.statement.params as AssignParams
            node.data.label = 'Assign: '
            node.data.text = assignParams.left + ' = ' + assignParams.expression
            node.type = 'single'
            // node.data.icon = <Code/>
            break
        case Kind.CODE:
            const codeParams = item.statement.params as CodeParams
            node.data.label = 'Code: '
            node.data.text = codeParams.content.substring(0, 16) + '...'
            // node.data.icon = <Code/>
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
            node.data.label = 'Update: '
            node.data.text = apiSaveParams.type
            // node.data.icon = <Update/>
            node.type = 'single'
            break
        }
        case Kind.API_LOAD: {
            const params = item.statement.params as ApiLoadParams
            node.data.label = 'Load: '
            node.data.text = params.type
            // node.data.icon = <Search/>
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
            node.data.label = 'If: '
            node.data.text = params.condition
            // node.data.icon = <ForkRight/>
            node.type = 'single'
            break
        }
        case Kind.FAIL: {
            const params = item.statement.params as FailParams
            node.data.label = 'Error: '
            node.data.text = params.message
            // node.data.icon = <Dangerous/>
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

export function prepareInner(result: Result, statements: Statement[], lastNode: Node | undefined, cmp: Position): number {
    const currentCmp = {...cmp}

    let maxY = currentCmp.y

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

        if (currentCmp.y > maxY) {
            maxY = currentCmp.y
        }

        result.nodes.push(node)

        lastNode = node

        // sub nodes

        if (statement.kind === Kind.CONDITION) {
            const params = statement.params as ConditionParams
            let maxYInner;
            maxYInner = prepareInner(result, params.fail, lastNode, {x: currentCmp.x - 0.8, y: currentCmp.y})

            if (maxYInner > maxY) {
                maxY = maxYInner
            }

            maxYInner = prepareInner(result, params.pass, lastNode, {x: currentCmp.x + 1, y: currentCmp.y})

            if (maxYInner > maxY) {
                maxY = maxYInner
            }

            currentCmp.y = maxY
        }
    }

    return maxY
}

export function prepare(flow: Flow): Result {
    const result: Result = {
        nodes: [],
        edges: []
    } as Result

    prepareInner(result, flow.statements, undefined, {x: 2, y: 0})

    return result
}
