import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import { Grid, Box, Typography, Button, Paper } from "@mui/material";
import { Line } from "react-chartjs-2";
import moment from "moment";
import numeral from "numeral";
import styled from 'styled-components';
import WebFont from 'webfontloader';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import InfoButton from "./components/InfoButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const StyledImage = styled.img`
  margin-right: 1em;
  width: 70px;
`;

function SingleCoin() {
  const { id } = useParams();
  const [coinChartData, setCoinChartData] = useState({});
  const [coinAnalist, setCoinAnalist] = useState({});
  const [coinChartDataDays, setCoinChartDataDays] = useState("7");

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=gbp&days=${coinChartDataDays}`
      )
      .then((res) => {
        setCoinChartData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, coinChartDataDays]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => {
        setCoinAnalist(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Raleway:400,700']
      }
    });
  }, []);

  const coinChart = coinChartData.prices
    ? coinChartData.prices.map((value) => ({
        x: value[0],
        y: value[1].toFixed(2),
      }))
    : [];

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
    
    const gradient = document.createElement("canvas").getContext("2d");
    gradient.canvas.height = 300;
    gradient.canvas.width = 1;
    const gradientColor = gradient.createLinearGradient(0, 0, 0, gradient.canvas.height);
    gradientColor.addColorStop(0, "rgba(135, 206, 250, 1)"); 
    gradientColor.addColorStop(1, "rgba(135, 206, 250, 0)"); 
    
    const data = {
      labels: coinChart.map((value) => moment(value.x).format("MMM DD")),
      datasets: [
        {
          fill: true,
          label: id,
          data: coinChart.map((value) => value.y),
          borderColor: gradientColor,
          backgroundColor: gradientColor,
        },
      ],
    };

  return (
    <div className="single-coin">
      <Box  sx={{ p: 0.5, mt: 1 }}>
      <Grid container spacing={2}>
      <Box  display="flex" justifyContent="center" alignItems="center" width={"fit-content"}>
    <Grid item xs={11} md={6}>
      <Box>
      <Box display={"flex"} justifyContent={"end"} m={2} mt={0}>
      <Link to="/Ctrack" style={{ textDecoration: 'none' }}>
      <Typography variant="h4" m={"0.5em"} style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, textDecoration: 'none', color: 'rgba(135, 206, 250, 1)', letterSpacing: '2px', textDecoration: 'none' }}>
      <ArrowBackIosNewIcon /> C-Track
  </Typography>
</Link>
</Box>
        <Paper>
       
          <Box pt={2} display="flex" alignItems="center" justifyContent="center">
            {/* Image */}
            {coinAnalist.image && (
              <StyledImage src={coinAnalist.image.large} alt="" style={{ width: "40px" }} />
            )}
            {/* Name */}
            <Typography variant="h4">{coinAnalist.name}</Typography>
          </Box>

          <Box p={1} display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center">
            
            <Typography variant="h5" m={2}>
              £ {numeral(coinAnalist.market_data?.current_price.gbp).format("0,0.00")}
            </Typography>
            <Box display="flex" justifyContent="left" alignItems="center">
              
              <Typography
                variant="h6"
                ml={2}
                color={coinAnalist.market_data?.market_cap_change_percentage_24h > 0 ? "green" : "red"}
              >
                {coinAnalist.market_data?.market_cap_change_percentage_24h > 0 ? "+" : ""}
                {coinAnalist.market_data?.market_cap_change_percentage_24h.toFixed(2)} %
              </Typography>
              <Typography variant="body1" ml={1}>
                (24h)
              </Typography>
            </Box>
          </Box>
        </Paper>

        
        <Grid item xs={12}  ml={0} container spacing={0.5} justifyContent="center" sx={{ mt: 3, mb: 3 }}>
          {/* days buttons */}
          <Grid item>
            <Button variant="outlined" onClick={() => setCoinChartDataDays("1")}>
              1 D
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setCoinChartDataDays("7")}>
              7 D
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setCoinChartDataDays("30")}>
              30 D
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setCoinChartDataDays("365")}>
              1 Y
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setCoinChartDataDays("max")}>
              MAX
            </Button>
          </Grid>
        </Grid>

        {/* graphic */}
        <Grid item xs={12} >
          <div className="chart-container">
            <Line options={options} data={data} style={{ height: "350px" }} />
          </div>
        </Grid>
      </Box>

      
      <Grid item mt={3}>
        <Paper>
          <Box p={3} gap={2} display="flex" justifyContent="space-between" flexWrap="wrap">
            {/* Market Cap */}
            <Typography variant="body1">
              Market Cap: <br />
              {" " + numeral(coinAnalist.market_data?.market_cap.gbp).format("0.00 a")} £
            </Typography>

            {/*  */}
            <Typography variant="body1">
              Total Volume: <br />
              {" " + numeral(coinAnalist.market_data?.total_volume.gbp).format("0.00 a")} £
            </Typography>

            {/*  */}
            <Typography variant="body1">
              Circulating Sup: <br />
              {" " + numeral(coinAnalist.market_data?.circulating_supply).format("0.00 a") + " " + coinAnalist.symbol}
            </Typography>

            {/*  */}
            <Typography variant="body1">
              Max Supply: <br />
              {" " + numeral(coinAnalist.market_data?.max_supply).format("0.00 a") + " " + coinAnalist.symbol}
            </Typography>
          </Box>
        </Paper>
        <Box mt={3}>
      <Paper>
        <Box display="flex" justifyContent="center" flexDirection="column">
          <InfoButton
            nameCrypto={coinAnalist.name}
            info={DOMPurify.sanitize(coinAnalist.description ? coinAnalist.description.en : "")}
          />
        </Box>
      </Paper>
    </Box>

      </Grid>
    </Grid>
    </Box>
    </Grid>
  </Box>
    </div>
  );
}

export default SingleCoin;