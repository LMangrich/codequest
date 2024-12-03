import { ArrowBack } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ArrowBackAndTitle = ({title}) => {
    const navigate = useNavigate();

  return (
    <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          mb: 4,
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={() => navigate("/menu")}
          sx={{
            color: "var(--text-weak-color)",
            left: 0,
            position: "absolute",
          }}
        >
          <ArrowBack />
        </IconButton>

        <Typography variant="h5" sx={{ color: "var(--text-color)" }}>
          {title}
        </Typography>
      </Box>

  )
}

export default ArrowBackAndTitle
