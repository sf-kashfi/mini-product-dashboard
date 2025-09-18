import { Box } from '@mui/material';
import ShopProductCard from './ShopProductCard';

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

interface ShopProductListProps {
    products: Product[];
    loading?: boolean;
}
// ----------------------------------------------------------------------

export default function ShopProductList({ products, loading = false }: ShopProductListProps) {
    return (
        <Box
            sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                },
            }}
        >
            {(loading ? [...Array(12)] : products).map((product, index) =>
                product ? (
                    <ShopProductCard key={(product as Product).id} product={product as Product} />
                ) : (
                    <div key={index}>Loading...</div>
                )
            )}
        </Box>
    );
}
