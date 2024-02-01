import {Ast, CodeModifierCheckFunction, CodeModifierFunction} from "./abs";
import {astMatcher} from "./matcher";
import {resourceMatcher} from "./matchers";
import {resourceStatement} from "./statements";
import {resourceVarName} from "./names";

export interface UseResourceModifierOptions {
    /**
     * The name of the resource to use
     */
    namespace: string
    resource: string;
}

export const locateResourceVariable = (ast: Ast, options: UseResourceModifierOptions): string | undefined => {
    const result = astMatcher(ast, resourceMatcher(options.namespace, options.resource))

    if (result.matches.length > 0) {
        return result.matches[0].extracted.resourceVariableName
    }

    return undefined
}

export const applyUseResourceModifier: CodeModifierFunction<UseResourceModifierOptions> = (ast, options) => {
    ast.body.unshift(resourceStatement(options.namespace, options.resource))
}

export const declareUseResourceModifier: (ast: Ast, options: UseResourceModifierOptions) => string = (ast, options) => {
    let result = locateResourceVariable(ast, options)

    if (result) {
        return result
    }

    applyUseResourceModifier(ast, options)

    return resourceVarName(options.resource)
}

export const checkUseResourceModifierAlreadyApplied: CodeModifierCheckFunction<UseResourceModifierOptions> = (ast, options) => {
    return Boolean(locateResourceVariable(ast, options));
}