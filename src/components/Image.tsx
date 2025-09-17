import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import type { LazyLoadImageProps } from 'react-lazy-load-image-component';

type ImageRatio = '4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1';

interface ImageProps extends Omit<LazyLoadImageProps, 'effect'> {
    ratio?: ImageRatio;
    disabledEffect?: boolean;
    effect?: 'blur' | 'opacity' | 'black-and-white';
    sx?: SxProps<Theme>;
}

export default function Image({
    ratio,
    disabledEffect = false,
    effect = 'blur',
    sx,
    ...other
}: ImageProps) {
    const placeholderSrc = 'https://zone-assets-api.vercel.app/assets/img_placeholder.svg';

    const imageElement = (
        <LazyLoadImage
            effect={disabledEffect ? undefined : effect}
            placeholderSrc={placeholderSrc}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            {...other}
        />
    );

    if (ratio) {
        return (
            <Box
                component="span"
                sx={{
                    width: 1,
                    lineHeight: 0,
                    display: 'block',
                    overflow: 'hidden',
                    position: 'relative',
                    pt: getRatio(ratio),
                    '& .wrapper': {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        lineHeight: 0,
                        position: 'absolute',
                        backgroundSize: 'cover !important',
                    },
                    ...sx,
                }}
            >
                <Box className="wrapper">{imageElement}</Box>
            </Box>
        );
    }

    return (
        <Box
            component="span"
            sx={{
                lineHeight: 0,
                display: 'block',
                overflow: 'hidden',
                '& .wrapper': { width: 1, height: 1, backgroundSize: 'cover !important' },
                ...sx,
            }}
        >
            <Box className="wrapper">{imageElement}</Box>
        </Box>
    );
}

// ----------------------------------------------------------------------

function getRatio(ratio: ImageRatio = '1/1') {
    const ratios: Record<ImageRatio, string> = {
        '4/3': 'calc(100% / 4 * 3)',
        '3/4': 'calc(100% / 3 * 4)',
        '6/4': 'calc(100% / 6 * 4)',
        '4/6': 'calc(100% / 4 * 6)',
        '16/9': 'calc(100% / 16 * 9)',
        '9/16': 'calc(100% / 9 * 16)',
        '21/9': 'calc(100% / 21 * 9)',
        '9/21': 'calc(100% / 9 * 21)',
        '1/1': '100%',
    };
    return ratios[ratio];
}
