import { useEffect } from 'react';
import orderBy from 'lodash/orderBy';

// @mui
import {
  Container, Stack, TextField
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../redux/store';
import { getProducts, filterProducts } from '../redux/slices/product';
// sections
import { ShopProductSort, ShopProductList, ShopProductCategory } from '../sections/shop';

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

export default function Shop() {

  const dispatch = useDispatch();

  const { products = [], sortBy, filters = {} as Filters } = useSelector((state) => state.product);

  const filteredProducts = applyFilter(products, sortBy, filters);

  const averagePrice =
    filteredProducts.length > 0
      ? (filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length).toFixed(2)
      : null;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Container>
      {averagePrice && (
        <Stack direction={'row'} sx={{ mb: 2 }}>
          <strong>Average Price:</strong> ${averagePrice}
        </Stack>
      )}

      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ShopProductSort />
          <ShopProductCategory />
        </Stack>

        <TextField
          label="Search products"
          variant="outlined"
          size="small"
          value={filters.search || ''}
          onChange={(e) => dispatch(filterProducts({ search: e.target.value }))}
        />
      </Stack>

      <ShopProductList products={filteredProducts} loading={!products.length} />
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products: Product[] = [], sortBy: string | null, filters: Filters): Product[] {
  let filtered = [...products];

  // SORT BY
  if (sortBy === 'priceDesc') filtered = orderBy(filtered, ['price'], ['desc']);
  if (sortBy === 'priceAsc') filtered = orderBy(filtered, ['price'], ['asc']);

  // FILTER PRODUCTS BY CATEGORY
  if (filters.category && filters.category !== 'All') {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  // FILTER PRODUCTS BY SEARCH
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter((p) => p.title.toLowerCase().includes(searchLower));
  }

  return filtered;
}
