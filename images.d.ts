type ImgSrc = {
  src: string;
  width: number;
  height: number;
  format: string;
  toString(): string;
}

type ColorsSrc = {
  src: string[];
  width: number;
  height: number;
  format: string;
  toString(): string;
}

declare module '*.png' {
  const value: ImgSrc;
  export = value;
}

declare module '*.png?colors' {
  const value: ColorsSrc;
  export = value;
}

declare module '*.jpg' {
  const value: ImgSrc;
  export = value;
}

declare module '*.jpg?colors' {
  const value: ColorsSrc;
  export = value;
}

declare module '*.jpeg' {
  const value: ImgSrc;
  export = value;
}

declare module '*.jpeg?colors' {
  const value: ColorsSrc;
  export = value;
}

declare module '*.webp' {
  const value: ImgSrc;
  export = value;
}

declare module '*.webp?colors' {
  const value: ColorsSrc;
  export = value;
}

declare module '*.svg' {
  const value: ImgSrc;
  export = value;
}

declare module '*.svg?colors' {
  const value: ColorsSrc;
  export = value;
}

declare module '*.gif' {
  const value: ImgSrc;
  export = value;
}

declare module '*.gif?colors' {
  const value: ColorsSrc;
  export = value;
}
