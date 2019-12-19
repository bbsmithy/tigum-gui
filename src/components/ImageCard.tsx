import React from "react";
import { createUseStyles } from "react-jss";

type ImageCardProps = {
  src: string;
  origin: string;
};

const useStyles = createUseStyles({
    imageContainer:{
        textAlign: 'center'

    },
    image:{
        width: '100%'
    }
})

export const ImageCard = (props: ImageCardProps) => {

    const classes = useStyles();

  return (
    <article className="center shadow-card mw7 hidden br2 ba dark-gray b--black-10  mv3">
        <div className={classes.imageContainer}>
            <img src={props.src} className={classes.image}/>
        </div>
        <div className="pa3">
            <a href={props.src}>{props.src}</a>
        </div>
    </article>
  );
};
