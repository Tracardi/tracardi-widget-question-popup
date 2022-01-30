import React from 'react';
import "regenerator-runtime/runtime";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { HighlightOff } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";


function App({domElement}) {

    const [open, setOpen] = React.useState(true);

    const API_URL = "http://localhost:8686/track"; // hard-coded for now
    const leftBtnText = domElement.getAttribute("left-button-text");
    const rightBtnText = domElement.getAttribute("right-button-text");
    const popupTitle = domElement.getAttribute("popup-title");
    const content = domElement.getAttribute("content");
    const posHorizontal = domElement.getAttribute("horizontal-position");
    const posVertical = domElement.getAttribute("vertical-position");
    const popupLifetime = parseInt(domElement.getAttribute("popup-lifetime")) * 1000;
    const theme = domElement.getAttribute("theme");

    const handlePopupClose = () => {
        setOpen(false);
    }

    const sendEvent = ( answer ) => {
        setOpen(false);
    }



    return (
        <div>
            <Snackbar 
                anchorOrigin={{ vertical: posVertical, horizontal: posHorizontal }}
                open={open}
                autoHideDuration={popupLifetime}
            >
                <SnackbarContent
                    style={{
                        backgroundColor: theme === "dark" ? "#343434" : "#ffffff",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}
                    message={
                        <Box>
                            <Box sx={{ position: "absolute", top: 0, right: 0, color: theme === "dark" ? "#ffffff" : "#343434" }}>
                                <IconButton onClick={handlePopupClose} color="inherit">
                                    <HighlightOff sx={{ color: "red" }} />
                                </IconButton>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Box sx={{ color: theme === "dark" ? "#ffffff" : "#343434" }}>
                                    <Typography variant="h5">{popupTitle}</Typography>
                                </Box>
                                <Box sx={{ color: theme === "dark" ? "#ffffff" : "#343434" }}>
                                    <Typography variant="p">{content}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        alignSelf: "center",
                                        margin: "10px",
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "20px",
                                        color: theme === "dark" ? "#ffffff" : "#343434"
                                    }}
                                >
                                    <Button variant="outlined" onClick={() => sendEvent(leftBtnText)} color="inherit">{leftBtnText}</Button>
                                    <Button variant="outlined" onClick={() => sendEvent(rightBtnText)} color="inherit">{ rightBtnText }</Button>
                                </Box>
                            </Box>
                        </Box>
                    }
                />
            </Snackbar>
        </div>
    );

}

export default App;
