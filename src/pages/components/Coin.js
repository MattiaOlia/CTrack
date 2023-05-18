import React from "react";
import "./Coin.css";
import { Link } from "react-router-dom";

export function Coin(props) {
  const percentage_color = props.priceChange > 0 ? "green" : "red";
  const positve = props.priceChange > 0 ? "+" : "";
  return (
    <div className="coin_container">
      <div className="coin-row">
        <div className="coin">
          <img src={props.image} alt="crypto" />
          <Link
            to={props.url}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h1>{props.cptName}</h1>
          </Link>
          <p className="coin_symbols">{props.symbol}</p>
        </div>
        <div className="coin-data">
          <div className="coin_price">£ {props.price}</div>
          <div className={percentage_color}>
            {positve}
            {props.priceChange.toFixed(2)} %
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coin;
