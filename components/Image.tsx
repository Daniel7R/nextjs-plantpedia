import NextImage, { ImageLoaderProps } from 'next/image';
import {useCallback} from 'react';

export type ImageProps= {
    layout: "responsive" | "intrinsic",
    src: string,
    width: number,
    height?: never,
    aspectRatio: "1:1" | "4:3" | "16:9" | "3:2" | "9:12",
    fit?: "crop" | "fill" | "pad" | "scale"
  }
  
  export function Image({layout, src, width, aspectRatio, fit="scale"}:ImageProps) {
    
    //Para calcular el aspect ratio
    const Calheight= (aspectRatio: "1:1" | "4:3" | "16:9" | "3:2" | "9:12", width: number ): number => {
      let ratio= 0;
  
      if(aspectRatio === "1:1") {
        ratio= width *1;
      } else if(aspectRatio === "16:9") {
        ratio= width * (9/16);
      } else if(aspectRatio === "4:3") {
        ratio=  width * (3/4);
      } else if(aspectRatio === "3:2") {
        ratio= width * (2/3);
      } else {
        ratio= width * (12/9);
      }
  
      return Math.floor(ratio);
    }
  
    const height: number= Calheight(aspectRatio, width);
    
    const loader= useCallback( (args: ImageLoaderProps): string => {
  
      const loaderHeigth= Calheight(aspectRatio, args.width)
      return `${args.src}?w=${args.width}&h=${loaderHeigth}&fit=${fit}`;
    }, [aspectRatio, fit])
  
    return <NextImage layout={layout} src={src} width={width} height={height} loader={loader} />
  }