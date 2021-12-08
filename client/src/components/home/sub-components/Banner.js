import React from "react";
import { useHistory } from "react-router-dom";

function Banner() {
  const history = useHistory();
  return (
    <section className="home-banner">
      <div className="banner-titles">
        <div className="banner-title a">
          <p>NEW PRODUCT</p>
        </div>

        <div className="banner-title b">
          <h4>XX99 MARK II</h4>
          <h4>HEADPHONE</h4>
        </div>
        <div className="banner-title c">
          <p>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
        </div>
        <div className="banner-title d">
          <button onClick={() => history.push("/categories/headphones")}>
            SEE PRODUCT
          </button>
        </div>
      </div>
    </section>
  );
}

export default Banner;
