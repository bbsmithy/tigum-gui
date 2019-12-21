import { createUseStyles } from "react-jss";

export const simmer = createUseStyles({
  wrapper: {
    width: 0,
    animation: "fullView 0.5s forwards cubic-bezier(0.250, 0.460, 0.450, 0.940)"
  },

  "@keyframes fullView": {
    "100%": {
      width: "100%"
    }
  },

  animate: {
    animation: "shimmer 2s infinite linear",
    background: "linear-gradient(to right, black 4%, black 25%, black 36%)",
    "background-size": "1000px 100%"
  },

  "@keyframes shimmer": {
    "0%": {
      "background-position": "-1000px 0"
    },
    "100%": {
      "background-position": "1000px 0"
    }
  }
});

export const divider = {
  border: "0.5px solid #efefef"
};
