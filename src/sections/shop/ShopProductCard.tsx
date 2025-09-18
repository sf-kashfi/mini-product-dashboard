import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
// components
import Image from '../../components/Image';

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

interface ShopProductCardProps {
    product: Product;
}
// ----------------------------------------------------------------------

export default function ShopProductCard({ product }: ShopProductCardProps) {
    const { id, title, image, price, rating, category } = product;

    const linkTo = `product/${id}`;

    return (
        <Card>
            <Box sx={{ position: 'relative' }}>
                <Image alt={title} src={image} ratio="1/1" />
            </Box>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link to={linkTo} color="inherit" component={RouterLink}>
                    <Typography variant="subtitle2" noWrap>
                        {title}
                    </Typography>
                </Link>

                <Typography variant="body2" color="text.secondary">
                    {category}
                </Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between">

                    <Typography variant="body2" color="text.secondary">
                        ⭐ {rating.rate} ({rating.count})
                    </Typography>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="subtitle1">{fCurrency(price)}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
}
