import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { dispatch } from '../store';

// ---------------- Types ----------------

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    quantity?: number;
}

interface Filters {
    category: string;
    search?: string;
}

interface ProductState {
    isLoading: boolean;
    error: any;
    products: Product[];
    product: Product | null;
    sortBy: string | null;
    filters: Filters;
}

// ---------------- Initial State ----------------

const initialState: ProductState = {
    isLoading: false,
    error: null,
    products: [],
    product: null,
    sortBy: null,
    filters: {
        category: 'All',
    },
};

// ---------------- Slice ----------------

const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action: PayloadAction<any>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        getProductsSuccess(state, action: PayloadAction<Product[]>) {
            state.isLoading = false;
            state.products = action.payload;
        },
        getProductSuccess(state, action: PayloadAction<Product>) {
            state.isLoading = false;
            state.product = action.payload;
        },
        sortByProducts(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
        filterProducts(state, action: PayloadAction<Partial<Filters>>) {
            if (action.payload.category !== undefined) {
                state.filters.category = action.payload.category;
            }
            if (action.payload.search !== undefined) {
                state.filters.search = action.payload.search;
            }
        },
    },
});

// ---------------- Exports ----------------

export default slice.reducer;

export const { sortByProducts, filterProducts } = slice.actions;

// ---------------- Async thunk ----------------
export function getProducts() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
            dispatch(slice.actions.getProductsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getProduct(id: number) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get<Product>(`https://fakestoreapi.com/products/${id}`);
            dispatch(slice.actions.getProductSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}


