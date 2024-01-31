import {Program} from "acorn";

export type CodeModifierFunction<T> = (ast: Program, options: T) => void;

export type CodeModifierCheckFunction<T> = (ast: Program, options: T) => boolean;