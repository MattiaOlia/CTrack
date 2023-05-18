import React from "react";

export default function CoinInfo(props) {
  return (
    <div>
      <h1>{props.name} </h1>
      <img src={props.image.large} alt="/" />
    </div>
  );
}
