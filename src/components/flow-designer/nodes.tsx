import {Edge, MarkerType, Node} from "reactflow";
import {
    ApiLoadParams,
    ApiSaveParams,
    AssignParams,
    CodeParams,
    ConditionParams,
    FailParams,
    Flow,
    FunctionCallParams,
    Kind,
    Statement
} from "../../model/flow";
import {Add, Functions} from "@mui/icons-material";
import React from "react";

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
        type: 'simple',
        position: position,
        data: {
            label: 'Unknown: ' + item.statement.kind,
        },
        className: 'kind-' + item.statement.kind.toLowerCase(),
    }

    if (item.parentId !== undefined) {
        node.parentId = 'node-' + item.parentId
    }

    switch (item.statement.kind) {
        case Kind.ASSIGN:
            const assignParams = item.statement.params as AssignParams
            node.data.label = 'Assign: '
            node.data.text = assignParams.left + ' = ' + assignParams.expression
            // node.data.icon = <Code/>
            break
        case Kind.CODE:
            const codeParams = item.statement.params as CodeParams
            node.data.label = 'Code: '
            node.data.text = codeParams.content.substring(0, 16) + '...'
            // node.data.icon = <Code/>
            break
        case Kind.API_CREATE: {
            const apiSaveParams = item.statement.params as ApiSaveParams
            node.data.label = apiSaveParams.type
            node.data.icon = <Add/>
            break
        }
        case Kind.API_UPDATE: {
            const apiSaveParams = item.statement.params as ApiSaveParams
            node.data.label = 'Update: '
            node.data.text = apiSaveParams.type
            // node.data.icon = <Update/>
            break
        }
        case Kind.API_LOAD: {
            const params = item.statement.params as ApiLoadParams
            node.data.label = 'Load: '
            node.data.text = params.type
            // node.data.icon = <Search/>
            break
        }
        case Kind.FUNCTION_CALL: {
            const params = item.statement.params as FunctionCallParams
            node.data.label = params.name
            node.data.icon = <Functions/>
            break
        }
        case Kind.CONDITION: {
            const params = item.statement.params as ConditionParams
            node.data.label = 'If: '
            node.data.text = params.condition
            // node.data.icon = <ForkRight/>
            break
        }
        case Kind.FAIL: {
            const params = item.statement.params as FailParams
            node.data.label = 'Error: '
            node.data.text = params.message
            // node.data.icon = <Dangerous/>
            break
        }
    }

    return node
}

export interface Result {
    nodes: Node[]
    edges: Edge[]
}

export function prepareInner(result: Result, statements: Statement[], lastNode: Node | undefined, cmp: Position, edgeLabel: string | undefined): number {
    const currentCmp = {...cmp}

    let maxY = currentCmp.y

    let currentEdgeLabel = edgeLabel

    for (const statement of statements) {
        let nodeId = 'node-' + result.nodes.length
        if (lastNode) {
            // add edge
            result.edges.push({
                id: lastNode.id + '-' + nodeId,
                source: lastNode.id,
                target: nodeId,
                label: currentEdgeLabel,
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
            maxYInner = prepareInner(result, params.fail, lastNode, {x: currentCmp.x - 0.8, y: currentCmp.y}, 'fail')

            if (maxYInner > maxY) {
                maxY = maxYInner
            }

            maxYInner = prepareInner(result, params.pass, lastNode, {x: currentCmp.x + 1, y: currentCmp.y}, 'pass')

            if (maxYInner > maxY) {
                maxY = maxYInner
            }

            currentCmp.y = maxY
        }

        currentEdgeLabel = undefined
    }

    return maxY
}

export function prepare(flow: Flow): Result {
    const result: Result = {
        nodes: [],
        edges: []
    } as Result

    prepareInner(result, flow.statements, undefined, {x: 2, y: 0}, undefined)

    return result
}
