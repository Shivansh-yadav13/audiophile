import React from "react";
import useReactSimpleMatchMedia from "react-simple-matchmedia";
import Detail from "./Detail";

function Details({ whichState, noOfGrids }) {
  let matched = useReactSimpleMatchMedia;

  const queryMedia = (media) => matched(media);

  return (
    <div className={`details details_grids ${noOfGrids}`}>
      {whichState.map(
        ({
          id,
          imageM,
          imageT,
          imageD,
          title,
          heading,
          description,
          path,
          grid,
        }) => {
          let currentImage = imageM;
          if (queryMedia("(min-width: 40em)")) currentImage = imageT;

          if (queryMedia("(min-width: 64em)")) currentImage = imageD;

          return (
            <Detail
              key={id}
              id={id}
              image={currentImage}
              title={title}
              heading={heading}
              description={description}
              path={path}
              grid={grid}
            />
          );
        }
      )}
    </div>
  );
}

export default Details;
