import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
// @mui
import { Box, Card, Grid, Divider, Container, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getProduct } from '../redux/slices/product';

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

export default function ProductDetails() {
    const dispatch = useDispatch();

    console.log('idd', useParams())
    const { id = '' } = useParams<{ id: string }>();
    const { product, error } = useSelector((state) => state.product);

    useEffect(() => {
        if (id) {
            dispatch(getProduct(Number(id)));
        }
    }, [dispatch, id]);

    return (

        <Container>

            {product && (
                <Card sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6, }}>
                            <Box
                                component="img"
                                src={product.image}
                                alt={product.title}
                                sx={{ width: '100%', borderRadius: 2 }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6, }}>
                            <Typography variant="h4" gutterBottom>
                                {product.title}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                {product.category}
                            </Typography>
                            <Typography variant="h5" color="primary" gutterBottom>
                                ${product.price}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="body1" paragraph>
                                {product.description}
                            </Typography>

                            <Typography variant="subtitle2" color="text.secondary">
                                ⭐ {product.rating.rate} ({product.rating.count} reviews)
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            )}

            {!product && !error && <Typography>Loading...</Typography>}

            {error && <Typography variant="h6">Product not found!!!</Typography>}
        </Container>

    );
}
