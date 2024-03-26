/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkAction } from "redux-thunk";
import { BonusActions, makeRequestThunk, state } from "./thunker_lib";
import { Action as ReduxAction } from "redux";
type HandlerMap<S, P> = {
    [str: string]: (state: S, payload: P) => S;
};

class ReducerBuilder<
    S,
    Tuple extends TupleElement[],
    ThunkTuple extends ThunkTupleElement<S>[],
> {
    private handlerMap: HandlerMap<S, unknown> = {};
    private defaultState: S;
    private actionTuple: Tuple;
    private thunkTuple: ThunkTuple;

    constructor(defaultState: S, tuple: Tuple, thunkTuple: ThunkTuple) {
        this.defaultState = defaultState;
        this.actionTuple = tuple;
        this.thunkTuple = thunkTuple;
    }

    handle<T extends string, P>(
        action: ActionObject<T, P>,
        handler: (state: S, payload: P) => S,
    ): ReducerBuilder<S, [...Tuple, typeof action], ThunkTuple> {
        this.actionTuple.push(action);
        this.handlerMap[action.type as string] = handler as (
            s: S,
            p: unknown,
        ) => S;
        return this as any;
    }

    #registerThunk<Args extends any[], T extends string>(
        thunk: (...args: Args) => ThunkAction<void, S, void, ReduxAction>,
        name: T,
    ): ReducerBuilder<S, Tuple, [...ThunkTuple, ThunkTupleElement<S>]> {
        const nextTuple = this.thunkTuple as any as [
            ...ThunkTuple,
            [T, typeof thunk],
        ];
        nextTuple.push([name, thunk]);
        return this as any;
    }

    thunker<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Args extends any[],
        P extends keyof S & string,
        X extends S[P] & T,
        T,
        Bonus extends BonusActions<S, T>,
    >(
        type: P,
        thunker: (
            ...args: Args
        ) => ThunkAction<Promise<T>, S, void, ReduxAction>,
        bonus: Bonus,
    ) {
        const [request, handlers] = makeRequestThunk(
            type,
            thunker,
            {},
            state<S>(),
        );

        return this.handleThunker(handlers);
    }

    handleThunker<P extends string, T>(
        arg: [
            [ActionObject<`${P}Ok`, T>, (state: S, p: T) => S],
            [ActionObject<`${P}Err`, void>, (state: S) => S],
            [ActionObject<`${P}Pending`, void>, (state: S) => S],
            [ActionObject<`${P}None`, void>, (state: S) => S],
        ],
    ) {
        return this.handle(arg[0][0], arg[0][1])
            .handle(arg[1][0], arg[1][1])
            .handle(arg[2][0], arg[2][1])
            .handle(arg[3][0], arg[3][1]);
    }

    actions(): Actions<Tuple> & ThunkActions<ThunkTuple, S> {
        const thunks = processThunks<ThunkTuple, S>(this.thunkTuple);
        const actions = process<Tuple>(this.actionTuple);

        return { ...thunks, ...actions };
    }

    done(): [ReturnType<typeof this.reducer>, ReturnType<typeof this.actions>] {
        return [this.reducer(), this.actions()];
    }

    reducer() {
        return (
            state: S | undefined = this.defaultState,
            action: Action<string, unknown>,
        ) => {
            const handler = this.handlerMap[action.type];
            if (handler) {
                return handler(state, action.payload);
            } else {
                return state;
            }
        };
    }
}

export function newReducer<S>(defaultState: S) {
    return new ReducerBuilder<S, [], []>(defaultState, [], []);
}

export function action<T extends string>(type: T) {
    return function <P = void>(): ActionObject<T, P> {
        const construct = (payload: P) => {
            return { type, payload };
        };
        construct.type = type;
        return construct;
    };
}

type Action<T extends string, P> = {
    type: T;
    payload: P;
};

export type ActionObject<T extends string, P> = {
    type: T;
    (payload: P): Action<T, P>;
};

type ActionTuple = readonly TupleElement[];

type TupleElement = ActionObject<string, any>;
type ThunkTupleElement<S> = [
    string,
    (...args: any[]) => ThunkAction<void, S, void, ReduxAction>,
];
type Actions<A extends ActionTuple> = {
    [K in A[number]["type"]]: Extract<A[number], { type: K }>;
};

type ThunkActions<A extends ThunkTupleElement<S>[], S> = {
    [K in A[number][0]]: Extract<A[number], { type: K }>;
};

function process<AO extends ActionTuple>(objects: [...AO]): Actions<AO> {
    const result = {} as any;
    for (const act of objects) {
        result[act.type] = act;
    }
    return result;
}

function processThunks<AO extends ThunkTupleElement<S>[], S>(
    objects: [...AO],
): ThunkActions<AO, S> {
    const result = {} as any;
    for (const act of objects) {
        const name = act[0];
        result[name] = act[1];
    }
    return result;
}
