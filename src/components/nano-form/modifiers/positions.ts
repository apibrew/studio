import {Ast, SectionDetails} from "./abs";
import {resourceMatcher} from "./matchers";
import {any} from "./matcher";

export const sections: SectionDetails[] = [
    {
        key: 'resources',
        comment: 'Resources',
        matcherStatement: resourceMatcher(any(), any()),
        order: {
            first: true,
        },
    }
]

export function locateSectionBegin(ast: Ast, commentPrefix: string): number {
    return -1
}

export function ensureSectionComment(ast: Ast, comment: string) {

}