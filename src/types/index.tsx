export interface TopicsState {
  loading: boolean;
  data: any[];
}

export type VideoPlayerProps = {
  iframe: string;
  title: string;
};


export type CursorState = { 
  position: {
      bottom: number,
      left: number,
      top: number,
      right: number
    },
  cursorLine: number
}
