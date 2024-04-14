import {Kind, Statement} from "../../model/flow";

export function isBeginningStatement(statement: Statement): boolean {
    switch (statement.kind) {
        case Kind.ACTION:
        case Kind.EVENT:
            return true
    }

    return false
}

export function isLastStatement(statement: Statement): boolean {
    switch (statement.kind) {
        case Kind.END:
            return true
    }

    return false

}
