import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import Coin from "./components/Coin";

function SingleCoin() {
  let { id } = useParams();
  const [CoinAnalist, setCoinAnalist] = useState({});
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => {
        setCoinAnalist(res.data);
        console.log(res.data);
      })
      .catch(console.error("error"));
  }, []);

  return (
    <div className="single-coin">
      <div className="coin_hero">
        <Link to="/">
          <h1>CRYPTO currancy</h1>{" "}
        </Link>
      </div>
      <div className="single-coin_hero">
        {CoinAnalist.image ? (
          <img
            className="single-coin_image"
            src={CoinAnalist.image.large}
            alt=""
          />
        ) : null}
        <h1 className="single-coin_h1">{CoinAnalist.name}</h1>
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            CoinAnalist.description ? CoinAnalist.description.en : " "
          ),
        }}
      ></p>
    </div>
  );
}

export default SingleCoin;
