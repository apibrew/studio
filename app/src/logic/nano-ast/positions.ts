import {Statement} from "acorn";
import {Resource} from "@apibrew/react";
import {Ast, SectionDetails} from "./abs";
import {any, astMatcher} from "./matcher";
import {functionCallMatcher, resourceHandlerMethodMatcher, resourceMatcher,} from "./matchers";

export const sections: SectionDetails[] = [
    {
        key: 'resources',
        comment: 'Resources',
        matcherStatement: resourceMatcher({
            name: any(),
            namespace: {
                name: 'default'
            }
        } as Resource),
    },
    {
        key: 'functions',
        comment: 'Resource Validation Functions',
        matcherStatement: functionCallMatcher(),
    },
    {
        key: 'handlers',
        comment: 'Resource Handlers',
        matcherStatement: resourceHandlerMethodMatcher(any(), any()),
    }
]

export function appendStatementToSection(ast: Ast, statement: Statement, sectionKey: string) {
    const sectionIndex = sections.findIndex(item => item.key === sectionKey)

    console.debug('appendStatementToSection', sectionKey, sectionIndex)

    if (sectionIndex === -1) {
        throw new Error(`Section ${sectionKey} not found`)
    }

    let csi = sectionIndex

    while (csi >= 0) {
        console.debug('appendStatementToSection', csi, sectionKey, sections[csi])
        const section = sections[csi]

        // locate section

        const matches = astMatcher(ast, section.matcherStatement)

        console.debug('appendStatementToSection', matches)

        if (matches.matches.length > 0) {
            let sectionLastItem = matches.matches[matches.matches.length - 1].matchIndex

            if (csi !== sectionIndex) {
                const separator = {
                    "type": "EmptyStatement"
                } as Statement

                ast.body.splice(sectionLastItem + 1, 0, separator)
                sectionLastItem++;
            }

            ast.body.splice(sectionLastItem + 1, 0, statement)
            return
        }

        csi--;
    }

    console.debug('appendStatementToSection', ast)

    ast.body.push(statement)
}
