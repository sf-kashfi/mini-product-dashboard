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

export default function ShopProductCard({ product }: ShopProductCardProps) {
    const { id, title, image, price } = product;

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

                <Stack direction="row" alignItems="center" justifyContent="space-between">

                    <Stack direction="row" spacing={0.5}>
                        <Typography variant="subtitle1">{fCurrency(price)}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
}
