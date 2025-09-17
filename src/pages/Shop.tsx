import { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
import type { UseFormReturn } from "react-hook-form";
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getProducts, filterProducts } from '../redux/slices/product';
// sections
import { ShopProductSort, ShopProductList } from '../sections/shop';

// -------------------------- Types --------------------------

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

interface FormValues extends Filters { }

// ----------------------------------------------------------------------

export default function EcommerceShop() {

  const dispatch = useDispatch();

  const { products = [], sortBy, filters = {} as Filters } = useSelector((state) => state.product);

  const filteredProducts = applyFilter(products, sortBy, filters);

  const defaultValues: FormValues = {
    category: filters?.category || 'All',
    priceRange: filters?.priceRange || '',
    rating: filters?.rating || '',
  };

  const methods: UseFormReturn<FormValues> = useForm<FormValues>({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.category === 'All';

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(filterProducts(values));
    }, 300);

    return () => clearTimeout(timeout);
  }, [dispatch, values]);


  return (
    <Container>

      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >

        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ShopProductSort />
        </Stack>
      </Stack>

      <Stack sx={{ mb: 3 }}>
        {!isDefault && (
          <>
            <Typography variant="body2" gutterBottom>
              <strong>{filteredProducts.length}</strong>&nbsp;Products found
            </Typography>
          </>
        )}
      </Stack>

      <ShopProductList products={filteredProducts} loading={!products.length && isDefault} />
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products: Product[] = [], sortBy: string | null, filters: Filters): Product[] {
  let filtered = [...products];

  // SORT BY
  if (sortBy === 'featured') filtered = orderBy(filtered, ['sold'], ['desc']);
  if (sortBy === 'newest') filtered = orderBy(filtered, ['createdAt'], ['desc']);
  if (sortBy === 'priceDesc') filtered = orderBy(filtered, ['price'], ['desc']);
  if (sortBy === 'priceAsc') filtered = orderBy(filtered, ['price'], ['asc']);

  // FILTER PRODUCTS

  return filtered;
}
