import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export function useRequest(initialPromise: Promise<AxiosResponse>) {
    const [promise, setPromise] = useState(initialPromise);
    const [state, setState] = useState("idle");
    const [success, setSuccess] = useState<AxiosResponse | undefined>( );
    const [error, setError] = useState<unknown | undefined>();    

    useEffect(() => {
        axios.get("/")
        .then(value => {
            setSuccess(value);
            setState('success');
        })
        .catch(error => setError(error)) 
    }, [promise])

    return [state, state === "success" ? success : error, setPromise] as const
}