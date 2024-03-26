/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkAction } from "redux-thunk";
import { ActionObject, action } from "./lib";
import { Action } from "redux";

export type PromiseResult<T> =
    | PromiseSuccess<T>
    | PromiseFailed
    | PromiseNone
    | PromisePending<T>;

type PromiseSuccess<T> = {
    status: "ok";
    value: T;
};

type PromiseNone = {
    status: "none";
    value?: undefined;
};

type PromiseFailed = {
    status: "failed";
    value: undefined;
};

type PromisePending<T> = {
    status: "pending";
    value?: T;
};

export type BonusActions<S, T> = {
    ok?: (state: S, p: T) => S;
    pending?: (state: S) => S;
    failed?: (state: S) => S;
};

/**
 *  Нужен только чтобы передать тип _ в функцию,
 *  не объявляяя все явно обобщенные типы
 */
export type Builder<_> = {
    value: null;
};

export function state<State>(): Builder<State> {
    return { value: null };
}

/**
 * generate thunk and required handlers to track request status.
 */
export function makeRequestThunk<
    T,
    P extends keyof State & string,
    _ValidPropertyCheck extends State[P] & PromiseResult<T>,
    Args extends any[],
    State,
    Bonus extends BonusActions<State, T>,
>(
    type: P,
    thunker: (...args: Args) => ThunkAction<Promise<T>, State, void, Action>,
    bonusActions: Bonus,
    _: Builder<State>,
): readonly [
    (...args: Args) => ThunkAction<void, State, void, Action>,
    [
        [ActionObject<`${P}Ok`, T>, (state: State, p: T) => State],
        [ActionObject<`${P}Err`, void>, (state: State) => State],
        [ActionObject<`${P}Pending`, void>, (state: State) => State],
    ],
] {
    const ok = action(`${type}Ok`)<T>();
    const err = action(`${type}Err`)();
    const pending = action(`${type}Pending`)();

    const okHandler = (state: State, p: T) => {
        const newState = { ...state };
        (newState as any)[type] = { status: "ok", value: p };
        if (bonusActions.ok) {
            return bonusActions.ok(newState, p);
        }
        return newState;
    };
    const handlePending = (state: State) => {
        const newState = { ...state };
        (newState as any)[type] = {
            status: "pending",
            value: (state[type] as PromiseResult<T>).value,
        };

        if (bonusActions.pending) {
            return bonusActions.pending(newState);
        }
        return newState;
    };
    const handlerFailed = (state: State) => {
        const newState = { ...state };
        (newState as any)[type] = { status: "failed", value: undefined };
        if (bonusActions.failed) {
            return bonusActions.failed(newState);
        }
        return newState;
    };

    return [
        (...args: Args) =>
            (dispatch, getState) => {
                dispatch(pending());
                return thunker(...args)(dispatch, getState)
                    .then(result => {
                        dispatch(ok(result));
                    })
                    .catch(e => {
                        console.log(e);
                        dispatch(err());
                    });
            },
        [
            [ok, okHandler],
            [err, handlerFailed],
            [pending, handlePending],
        ],
    ] as const;
}
