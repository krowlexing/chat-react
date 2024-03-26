import { useState } from "react";

type RequestStatus = "none" | "pending" | "success" | "fail";
type PromiseError = { error: unknown };

export function useRequest<T>(
    value: Promise<T> | undefined
): [
    (promise: Promise<T> | undefined) => void,
    RequestStatus,
    T | PromiseError | undefined,
] {
    const [status, setStatus] = useState<RequestStatus>("none");
    const [result, setResult] = useState<T | PromiseError | undefined>();

    const promise = (promise: Promise<T> | undefined) => {
        if (promise == undefined) {
            setStatus("none");
            setResult(undefined);
        } else {
            promise
                .then((t) => {
                    setStatus("success");
                    setResult(t);
                })
                .catch((something) => {
                    setStatus("fail");
                    setResult({ error: something });
                });

            setStatus("pending");
            setResult(undefined);
        }
    };
    value?.then;

    return [promise, status, result];
}
