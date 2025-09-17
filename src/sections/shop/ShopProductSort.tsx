import { useState } from 'react';
import type { MouseEvent } from 'react';
// @mui
import { Button, MenuItem, Typography } from '@mui/material';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { sortByProducts } from '../../redux/slices/product';
// components
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

type SortByOption = {
    value: string;
    label: string;
};

const SORT_BY_OPTIONS: SortByOption[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'priceDesc', label: 'Price: High-Low' },
    { value: 'priceAsc', label: 'Price: Low-High' },
];

const renderLabel = (label: string | null) => {
    switch (label) {
        case 'featured':
            return 'Featured';
        case 'newest':
            return 'Newest';
        case 'priceDesc':
            return 'Price: High-Low';
        case 'priceAsc':
            return 'Price: Low-High';
        default:
            return 'Featured';
    }
};

// ----------------------------------------------------------------------

export default function ShopProductSort() {
    const dispatch = useDispatch();
    const sortBy = useSelector((state) => state.product.sortBy);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSortBy = (value: string) => {
        dispatch(sortByProducts(value));
        handleClose();
    };

    return (
        <>
            <Button
                color="inherit"
                disableRipple
                onClick={handleOpen}
            >
                Sort By:&nbsp;
                <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {renderLabel(sortBy)}
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
                {SORT_BY_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === sortBy}
                        onClick={() => handleSortBy(option.value)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </MenuPopover>
        </>
    );
}
