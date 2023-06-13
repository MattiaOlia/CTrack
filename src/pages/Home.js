import axios from "axios";
import React, { useState, useEffect } from "react";
import Coin from "./components/Coin";
import { Link } from "react-router-dom";
import { Grid, Box, Typography, Button, Paper } from "@mui/material";


export function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(console.error("error"));
  }, []);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin_app">
      <div className="coin_hero">
      
      
  <Typography variant={window.innerWidth < 600 ? "h6" : "h3"} m={"0.5em"} style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, textDecoration: 'none', color: 'rgba(135, 206, 250, 1)', letterSpacing: '2px', textDecoration: 'none' }}>
    C-Track
  </Typography>

        <div className="coin_search">
          <h3 className="coin_text">Insert name of the currancy</h3>
          <form>
            <input
              type="text"
              placeholder="Search"
              className="coin-input"
              onChange={handleChange}
            ></input>
          </form>
        </div>
      </div>
      
    
        
      <div className="coins_container">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.ath}
              url={coin.id}
              cptName={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              volume={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
        
      </div>
     
      
      
    </div>
    
  );
}

export default Home;
