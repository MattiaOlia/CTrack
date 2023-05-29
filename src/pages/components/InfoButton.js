import React, { useState } from 'react';
import { Button, Typography, Collapse,Box } from '@mui/material';
import DOMPurify from 'dompurify';
import ReactHtmlParser from 'react-html-parser';
import InfoIcon from '@mui/icons-material/Info';

export default function InfoButton (props){
  const [showDescription, setShowDescription] = useState(false);

  const handleButtonClick = () => {
    setShowDescription(!showDescription);
  };

  return (
    <Box m={3} alignItems={"center"} display="flex" justifyContent="center" flexDirection={"column"}>
      <Button onClick={handleButtonClick} endIcon={<InfoIcon />} sx={{ width: '30%' }} >
       {props.nameCrypto + " " } Info
      </Button>
    
      <Collapse in={showDescription}>
        <Typography variant="body1" sx={{ mt: 2,textAlign: "justify",textJustify: "inter-word"}}>
        {ReactHtmlParser(DOMPurify.sanitize(props.info))}
        </Typography>
      </Collapse>
    </Box>
  );
};

