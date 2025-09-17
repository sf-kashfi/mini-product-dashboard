import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
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
    priceRange: string;
    rating: string;
}

interface Checkout {
    activeStep: number;
    cart: Product[];
    subtotal: number;
    total: number;
    discount: number;
    shipping: number;
    billing: any;
}

interface ProductState {
    isLoading: boolean;
    error: any;
    products: Product[];
    product: Product | null;
    sortBy: string | null;
    filters: Filters;
    checkout: Checkout;
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
        priceRange: '',
        rating: '',
    },
    checkout: {
        activeStep: 0,
        cart: [],
        subtotal: 0,
        total: 0,
        discount: 0,
        shipping: 0,
        billing: null,
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
            state.filters.category = action.payload.category || 'All';
            state.filters.priceRange = action.payload.priceRange || '';
            state.filters.rating = action.payload.rating || '';
        },

        getCart(state, action: PayloadAction<Product[]>) {
            const cart = action.payload;
            const subtotal = sum(cart.map((item) => item.price * (item.quantity || 1)));
            const discount = cart.length === 0 ? 0 : state.checkout.discount;
            const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
            const billing = cart.length === 0 ? null : state.checkout.billing;

            state.checkout.cart = cart;
            state.checkout.subtotal = subtotal;
            state.checkout.total = subtotal - discount;
            state.checkout.discount = discount;
            state.checkout.shipping = shipping;
            state.checkout.billing = billing;
        },
        addCart(state, action: PayloadAction<Product>) {
            const product = action.payload;
            const isEmptyCart = state.checkout.cart.length === 0;

            if (isEmptyCart) {
                state.checkout.cart = [product];
            } else {
                state.checkout.cart = state.checkout.cart.map((_product) =>
                    _product.id === product.id
                        ? { ..._product, quantity: (_product.quantity || 1) + 1 }
                        : _product
                );
                state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
            }
        },
        deleteCart(state, action: PayloadAction<number>) {
            state.checkout.cart = state.checkout.cart.filter((item) => item.id !== action.payload);
        },
        resetCart(state) {
            state.checkout = { ...initialState.checkout };
        },
    },
});

// ---------------- Exports ----------------

export default slice.reducer;

export const { getCart, addCart, resetCart, deleteCart, sortByProducts, filterProducts } = slice.actions;

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


