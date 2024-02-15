import {Statement} from "acorn";
import {Ast} from "./abs";

export interface AstMatch {
    statement: Statement
    matchIndex: number
    extracted: { [key: string]: any }
}

export interface AstMatcherResult {
    matches: AstMatch[]
    differences: string[]
}

export interface MatchPart {
    matches: boolean
    extracted: { [key: string]: any }
    differences: string[]
}

const matches: () => MatchPart = () => {
    return {
        matches: true,
        extracted: {},
        differences: [],
    }
}

const notMatches: (difference: string) => MatchPart = (difference: string) => {
    return {
        matches: false,
        extracted: {},
        differences: [difference]
    }
}

export function matchObject<T>(path: string, element: T, matcher: Partial<T>): MatchPart {
    console.debug('matchObject', element, matcher)
    const keys = Object.keys(matcher)

    let result = matches()

    for (const key of keys) {
        if (key === 'start' || key === 'end') {
            continue
        }
        const left = (element as any)[key]
        const right = (matcher as any)[key]
        const matchPart = matchAny(path + '.' + key, left, right)

        if (!matchPart.matches) {
            console.debug('matchObject [path] not matches', path + "." + key, left, right)
            return notMatches(path + "." + key)
        }

        result.extracted = {
            ...result.extracted,
            ...matchPart.extracted
        }
    }

    console.debug('matchObject end', result)

    return result
}

export function matchSpecial<T>(path: string, element: T, matcher: any): MatchPart {
    console.debug('matchSpecial', element, matcher)
    if (matcher.$capture) {
        return {
            matches: true,
            extracted: {
                [matcher.$capture]: element
            },
            differences: [],
        }
    } else if (matcher.$or) {
        for (const option of matcher.$or) {
            const matchPart = matchAny(path, element, option)

            if (matchPart.matches) {
                return matchPart
            }
        }

        return notMatches(path + '.$or')
    } else if (matcher.$any) {
        return matches()
    } else if (matcher.$concat) {
        if (typeof element != 'string') {

            return notMatches(path)
        }

        if (typeof matcher.$left == 'string') {
            if (!element.startsWith(matcher.$left)) {
                console.log('Type difference startsWith', path, element, matcher.$left)
                return notMatches(path)
            }

            const rem = element.substring(matcher.$left.length)

            return matchAny(path, rem, matcher.$right)
        } else {
            if (!element.endsWith(matcher.$right)) {

                console.log('endsWith difference', path, element, matcher.$left)
                return notMatches(path)
            }

            const rem = element.substring(0, element.length - matcher.$right.length)

            return matchAny(path, rem, matcher.$left)
        }
    }

    throw new Error('Unknown special matcher: ' + JSON.stringify(matcher))
}

export function matchAny<T>(path: string, element: T, matcher: Partial<T>): MatchPart {
    console.debug('matchAny', element, matcher)
    if ((!matcher) !== (!element)) {
        console.log('undefined mismatch', path, matcher, element)
        return notMatches(path)
    } else if (!matcher && !element) {
        return matches()
    }

    if ((matcher as any).$special) {
        return matchSpecial(path, element, matcher)
    }

    if (typeof element === 'object') {
        return matchObject(path, element, matcher)
    }

    return element === matcher ? matches() : notMatches(path)
}

export function astMatcher(ast: Ast, statement: Partial<Statement>): AstMatcherResult {
    const result = {
        matches: [],
        differences: [],
    } as AstMatcherResult

    for (let i = 0; i < ast.body.length; i++) {
        const node = ast.body[i];
        const matchPart = matchAny('$', node as Statement, statement)
        console.debug('astMatcher matchPart', matchPart)
        if (matchPart.matches) {
            result.matches.push({
                statement: node as Statement,
                matchIndex: i,
                extracted: matchPart.extracted
            })
        } else {
            result.differences = matchPart.differences
        }
    }

    console.debug('astMatcher result', result)

    return result
}

export function ensureStatement(ast: Ast, matcherStatement: Partial<Statement>, applyStatement: Statement): Statement {
    const matches = astMatcher(ast, matcherStatement)

    if (matches.matches.length > 0) {
        return matches.matches[0].statement
    }

    ast.body.push(applyStatement)

    return applyStatement
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


export function concat(left: string, right: string): string {
    return {
        $special: true,
        $concat: true,
        $left: left,
        $right: right
    } as any
}