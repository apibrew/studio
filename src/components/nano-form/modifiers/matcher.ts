import {Statement} from "acorn";
import {Ast} from "./abs";

export interface AstMatch {
    statement: Statement
    extracted: { [key: string]: any }
}

export interface AstMatcherResult {
    matches: AstMatch[]
}

export interface MatchPart {
    matches: boolean
    extracted: { [key: string]: any }
}

const matches: () => MatchPart = () => {
    return {
        matches: true,
        extracted: {}
    }
}

const notMatches: () => MatchPart = () => {
    return {
        matches: false,
        extracted: {}
    }
}

export function matchObject<T>(element: T, matcher: Partial<T>): MatchPart {
    console.debug('matchObject', element, matcher)
    const keys = Object.keys(matcher)

    let result = matches()

    for (const key of keys) {
        console.debug('matchObject [key]', key)
        const matchPart = matchAny((element as any)[key], (matcher as any)[key])

        if (!matchPart.matches) {
            console.debug('matchObject [key] not matches', key)
            return notMatches()
        }

        result.extracted = {
            ...result.extracted,
            ...matchPart.extracted
        }
    }

    console.debug('matchObject end', result)

    return result
}

export function matchSpecial<T>(element: T, matcher: any): MatchPart {
    console.debug('matchSpecial', element, matcher)
    if (matcher.$capture) {
        return {
            matches: true,
            extracted: {
                [matcher.$capture]: element
            }
        }
    } else if (matcher.$or) {
        for (const option of matcher.$or) {
            const matchPart = matchAny(element, option)

            if (matchPart.matches) {
                return matchPart
            }
        }

        return notMatches()
    } else if (matcher.$any) {
        return matches()
    }

    throw new Error('Unknown special matcher: ' + JSON.stringify(matcher))
}

export function matchAny<T>(element: T, matcher: Partial<T>): MatchPart {
    console.debug('matchAny', element, matcher)
    if ((matcher === undefined) !== (element === undefined)) {
        return notMatches()
    }
    if ((matcher === null) !== (element === null)) {
        return notMatches()
    }

    if ((matcher as any).$special) {
        return matchSpecial(element, matcher)
    }

    if (typeof element === 'object') {
        return matchObject(element, matcher)
    }

    return element === matcher ? matches() : notMatches()
}

export function astMatcher(ast: Ast, statement: Partial<Statement>): AstMatcherResult {
    const result = {
        matches: []
    } as AstMatcherResult

    console.log(ast.body)

    for (const node of ast.body) {
        const matchPart = matchAny(node as Statement, statement)
        console.debug('astMatcher matchPart', matchPart)
        if (matchPart.matches) {
            result.matches.push({
                statement: node as Statement,
                extracted: matchPart.extracted
            })
        }
    }

    console.debug('astMatcher result', result)

    return result
}

export function capture<T>(extractName: string): T {
    return {
        $special: true,
        $capture: extractName
    } as T
}

export function or<T>(...options: T[]): T {
    return {
        $special: true,
        $or: options
    } as T
}

export function any<T>(): T {
    return {
        $special: true,
        $any: true
    } as T
}