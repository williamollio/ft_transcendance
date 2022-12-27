import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../interfaces/router.interface";

export default function LoginView(): React.ReactElement {
  const navigate = useNavigate();

  const handleLogin = () => {
    // send request to BE
    navigate(RoutePath.PROFILE);
  };
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        sx={{ width: "100px", height: "50px" }}
        variant="contained"
        onClick={() => handleLogin()}
      >
        Login
      </Button>
    </Box>
  );
}
