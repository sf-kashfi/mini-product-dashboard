import { useState } from 'react';
import type { MouseEvent } from 'react';
// @mui
import { Button, MenuItem, Typography } from '@mui/material';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { filterProducts } from '../../redux/slices/product';
// components
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

export default function ShopProductCategory() {
  const dispatch = useDispatch();
  const { filters, products } = useSelector((state) => state.product);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategory = (category: string) => {
    dispatch(filterProducts({ category }));
    handleClose();
  };

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  return (
    <>
      <Button color="inherit" disableRipple onClick={handleOpen}>
        Category:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {filters.category || 'All'}
        </Typography>
      </Button>

      <MenuPopover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          width: 'auto',
          '& .MuiMenuItem-root': { typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {categories.map((cat) => (
          <MenuItem
            key={cat}
            selected={cat === filters.category}
            onClick={() => handleCategory(cat)}
          >
            {cat}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
