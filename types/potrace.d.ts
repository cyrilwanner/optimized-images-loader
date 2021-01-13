declare module 'potrace' {
  interface TraceOptions {
    background?: string;
    color?: string;
    thresold?: string;
    turnPolicy?: any;
    // 0-255 (inclusive)
    threshold?: number;
  }

  export function trace(
    image: string | Buffer,
    options: TraceOptions,
    callback: (error: any, svg: string) => void,
  ): void;

  // export function trace(image: string | Buffer, callback: (error: any, svg: string) => void): void;

  export const Potrace: Record<string, unknown>;
}
