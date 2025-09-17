declare module 'react-lazy-load-image-component' {
    import { ImgHTMLAttributes, ComponentType } from 'react';
  
    export interface LazyLoadImageProps extends ImgHTMLAttributes<HTMLImageElement> {
      src: string;
      alt?: string;
      effect?: 'blur' | 'opacity' | 'black-and-white';
      placeholderSrc?: string;
      wrapperClassName?: string;
    }
  
    export const LazyLoadImage: ComponentType<LazyLoadImageProps>;
  }
  