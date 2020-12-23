export interface TopicsState {
  loading: boolean;
  data: any[];
}

export type VideoPlayerProps = {
  iframe: string;
  title: string;
};


export type CursorState = { 
  absPos: {
      bottom: number,
      left: number,
      top: number,
      right: number
    },
  cursorPos: any
}
