import React, { ChangeEvent, useState } from "react";
import { makeStyles } from "tss-react/mui";
import Navbar from "../component/Navbar";
import {
  Box,
  TextField,
  Button,
  Typography,
  Input,
  Avatar,
} from "@mui/material";
import usersService from "../service/users.service";
import { UserCreation } from "../interfaces/user.interface";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../interfaces/router.interface";
import { idTabs } from "../interfaces/tab.interface";

const isEditMode = false; // TO DO

export default function ProfileView(): React.ReactElement {
  const { classes } = useStyles();
  const [name, setName] = useState<string>("");
  const [picture, setPicture] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const navigate = useNavigate();

  function navigateToGamePage() {
    navigate(RoutePath.GAME, { state: { activeTabId: idTabs.GAME } });
  }

  async function handleOnSavePicture() {
    let response;
    const formData = new FormData();
    formData.append("file", picture, picture.name);
    response = await usersService.postUserImage(formData);
    const isSuccess = !response?.error;
    if (!isSuccess) {
      console.error("an error has occurred on picture sending"); // TO DO : show error on UI
    }
  }
  async function handleOnSaveName() {
    let response;
    const userCreation: UserCreation = { name: name };
    response = await usersService.postUser(userCreation);
    const isSuccess = !response?.error;
    if (isSuccess) {
      navigateToGamePage();
    } else {
      console.error("an error has occurred on name sending"); // TO DO : show error on UI
    }
  }

  async function handleOnSave() {
    if (isEditMode) {
      // usersService.patchUser() // TO DO
    }
    if (picture) {
      handleOnSavePicture();
    }
    if (name !== "") {
      handleOnSaveName();
    }
  }

  function handleOnChangeName(name: string) {
    setName(name);
  }

  function handleOnChangePicture(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPicture(e.target.files[0]);
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <Navbar />
      <Box className={classes.containerProfile}>
        <Box className={classes.boxProfile}>
          <Box className={classes.wrapperProfile}>
            <Box className={classes.wrapperTile}>
              <Typography
                variant="h4"
                color={"#d2601a"}
                fontWeight={"bold"}
                sx={{ textDecoration: "underline" }}
              >
                Profile
              </Typography>
            </Box>
            <Box className={classes.wrapperContent}>
              <Box className={classes.wrapperPicture30}>
                <Avatar
                  id="profile-picture"
                  src={avatar}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </Box>
              <Box className={classes.wrapperPicture20}>
                <Button
                  variant="contained"
                  component="label"
                  className={classes.iconButton}
                >
                  Upload Picture
                  <Input
                    type="file"
                    sx={{ display: "none" }}
                    onChange={handleOnChangePicture}
                  />
                </Button>
              </Box>
              <Box className={classes.wrapperInputName}>
                <TextField
                  className={classes.inputName}
                  value={name}
                  name={"name"}
                  variant="outlined"
                  onChange={(event) => {
                    handleOnChangeName(event.target.value);
                  }}
                  label="Choose an unique name"
                ></TextField>
              </Box>
              <Box className={classes.buttons}>
                <Button
                  className={classes.iconButton}
                  variant="outlined"
                  onClick={() => handleOnSave()}
                >
                  Save
                </Button>
                {isEditMode && (
                  <Button className={classes.iconButton} variant="outlined">
                    Cancel
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const useStyles = makeStyles()(() => ({
  containerProfile: {
    marginTop: "4rem",
    border: "1px",
    width: "100%",
    height: "calc(100vh - 4rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxProfile: {
    background: "#fff1e1",
    borderRadius: "50px",
    boxShadow: "46px 46px 92px #b3a99e, -46px -46px 92px #ffffff",
    height: "25rem",
    width: "40rem",
    marginBottom: "10rem",
  },
  wrapperProfile: {
    height: "100%",
    width: "100%",
  },
  wrapperTile: {
    height: "20%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px",
  },
  wrapperContent: {
    height: "80%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "top",
    gap: "1rem",
    flexDirection: "column",
  },
  wrapperPicture20: {
    height: "15%",
    width: "60%",
    display: "flex",
    justifyContent: "center",
  },
  wrapperPicture30: {
    height: "30%",
    width: "70%",
    display: "flex",
    justifyContent: "center",
  },
  wrapperInputName: {
    height: "20%",
    width: "60%",
  },
  buttons: {
    height: "20%",
    width: "70%",
    display: "flex",
    justifyContent: "center",
    gap: "1em",
  },
  iconButton: {
    height: "50%",
    width: "50%",
  },
  inputName: {
    width: "100%",
    height: "100%",
    borderRadius: "100px",
  },
}));
