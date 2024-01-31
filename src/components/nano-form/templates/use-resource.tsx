import {Code} from "@apibrew/client/nano/model/code";
import React from "react";
import {NanoCodeTemplate} from "./abs";
import {ResourceSelect} from "../../ResourceSelect";
import toast from "react-hot-toast";
import * as babel from '@babel/core';

import * as parser from "@babel/parser";
import generate from "@babel/generator";

export interface RenderParamsProps {
    onChange: (resource: string) => void
}

function RenderParams(props: RenderParamsProps) {
    const [resource, setResource] = React.useState<string>()

    return <>
        <span>Resource:</span>
        <ResourceSelect
            value={resource}
            onChange={e => {
                setResource(e.target.value as string)
                props.onChange(e.target.value as string)
            }}
            fullWidth
            size='small'/>
    </>
}

export class UseResource implements NanoCodeTemplate {

    constructor(resource?: string) {
        this.resource = resource
    }

    label: string = 'Use Resource';
    private resource?: string;

    apply(code: Code, updateCode: (code: Code) => void): boolean {
        const ast = parser.parse(code.content);

        if (!this.resource) {
            toast.error('Resource is required')
            return false

        }
        const resourceName = this.resource.startsWith('default/') ? this.resource.substring(8) : this.resource
        const varName = resourceName.replace('/', '')

        const line = `const ${varName} = resource('${resourceName}')`

        if (code.content.indexOf(line) >= 0) {
            toast.error('Resource already used')
            return false
        }

        babel.traverse(ast, {
            enter(path) {
                // Your logic to modify the AST based on certain conditions
            }
        });

        const output = generate(ast);

        updateCode({
            ...code,
            content: output.code,
        } as Code)

        return true
    }

    renderParams() {
        return <RenderParams onChange={resource => {
            this.resource = resource
        }}/>
    }

}