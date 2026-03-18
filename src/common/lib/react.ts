import {type Context, createContext, useContext} from "react";

export function useStrictContext<T>(context: Context<T | null>):T {
    const value = useContext(context);
    if (!value) throw new Error('Strict context not found');
    return value;
}

export function createStrictContext<T>(): Context<T | null> {
    return createContext<T | null>(null);
}