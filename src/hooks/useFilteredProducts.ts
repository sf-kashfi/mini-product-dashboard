// src/hooks/useFilteredProducts.ts
import { useMemo } from 'react';
import orderBy from 'lodash/orderBy';
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

interface Filters {
    category: string;
    search?: string;
}
// ----------------------------------------------------------------------

export function useFilteredProducts(
    products: Product[],
    sortBy: string | null,
    filters: Filters
): Product[] {
    return useMemo(() => {
        let filtered = [...products];

        // SORT BY
        if (sortBy === 'priceDesc') filtered = orderBy(filtered, ['price'], ['desc']);
        if (sortBy === 'priceAsc') filtered = orderBy(filtered, ['price'], ['asc']);

        // FILTER BY CATEGORY
        if (filters.category && filters.category !== 'All') {
            filtered = filtered.filter((p) => p.category === filters.category);
        }

        // FILTER BY SEARCH
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchLower));
        }

        return filtered;
    }, [products, sortBy, filters]);
}
