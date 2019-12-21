import React from "react";
import { createUseStyles } from "react-jss";
import { useStateValue } from "../state/StateProvider";
import { deleteImage } from "../client-lib/api";

type ImageCardProps = {
  id: number;
  index: number;
  src: string;
  origin: string;
};

const useStyles = createUseStyles({
  imageContainer: {
    textAlign: "center"
  },
  image: {
    width: "100%"
  },
  imagelink: {
    overflow: "hidden",
    width: "90%",
    display: "inline-block"
  }
});

export const ImageCard = (props: ImageCardProps) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { images }
  } = state;
  const classes = useStyles();

  const deleteImageBlock = async () => {
    try {
      const res = await deleteImage(props.id);
      if (res.status === 200) {
        let newCodes = images;
        delete newCodes[props.index];
        dispatch({ type: "SET_IMAGES", payload: newCodes });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article className="center shadow-card mw7 hidden br2 ba dark-gray b--black-10  mv3">
      <div className={classes.imageContainer}>
        <img src={props.src} className={classes.image} />
      </div>
      <div className="pa3">
        <div className={classes.imagelink}>
          <a href={props.src}>{props.src}</a>
        </div>

        <button
          className={`f6 fr link pointer pv1 ph1 br2 mb3 dib black bg-white`}
          onClick={deleteImageBlock}
        >
          <i className="fa fa-trash" /> Delete
        </button>
      </div>
    </article>
  );
};
