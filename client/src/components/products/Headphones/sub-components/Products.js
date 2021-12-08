import React from "react";
import useReactSimpleMatchMedia from "react-simple-matchmedia";
import Product from "./Product";

function Products({
  whichState,
  whichQuantityToIncrease,
  whichQuantityToDecrease,
}) {
  const matched = useReactSimpleMatchMedia;
  const queryMedia = (media) => matched(media);

  return (
    <div className="products-product">
      {whichState.map(
        ({
          id,
          imageM,
          imageT,
          imageD,
          title,
          name,
          description,
          price,
          quantity,
          featuresOne,
          featuresTwo,
          box,
          carts,
          productsImages,
          suggestions,
        }) => {
          let currentImage = imageM;
          if (queryMedia("(min-width: 40em)")) currentImage = imageT;
          if (queryMedia("(min-width: 64em)")) currentImage = imageD;
          return (
            <Product
              key={id}
              id={id}
              image={currentImage}
              title={title}
              name={name}
              description={description}
              price={price}
              quantity={quantity}
              featuresOne={featuresOne}
              featuresTwo={featuresTwo}
              box={box}
              carts={carts}
              whichQuantityToIncrease={whichQuantityToIncrease}
              whichQuantityToDecrease={whichQuantityToDecrease}
              productsImages={productsImages}
              suggestions={suggestions}
            />
          );
        }
      )}
    </div>
  );
}

export default Products;
