import { configureStore } from '@reduxjs/toolkit';
import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
} from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux';
import productReducer from './slices/product';



export const store = configureStore({
    reducer: {
        product: productReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const { dispatch } = store;

