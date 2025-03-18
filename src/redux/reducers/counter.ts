/**
 * Custom Hook Just For Reference To Get The Idea Of The React Redux
 */

import { useAppDispatch, useAppSelector } from "../hooks"
import { decrement, increment, incrementX } from "../slices/counter";
import { RootState } from "../store";

// Custom hook for the reference of the redux that how to create the redux
export const useCounter = () => {

    // dispatch function to dispatch various actions
    const dispatch = useAppDispatch();
    // selector is used to select the value stored in the store of some slice
    const count = useAppSelector((state: RootState) => state.counter.value);

    return {

        // returning the functions and values
        count,
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        incrementX: (value: number) => dispatch(incrementX(value)),
    }
}