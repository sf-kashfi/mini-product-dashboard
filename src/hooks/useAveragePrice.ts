import { useMemo } from 'react';
// ----------------------------------------------------------------------
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
// ----------------------------------------------------------------------


export function useAveragePrice(products: Product[]) {
    return useMemo(() => {
        if (!products || products.length === 0) return null;
        const sum = products.reduce((acc, p) => acc + p.price, 0);
        return (sum / products.length).toFixed(2);
    }, [products]);
}
