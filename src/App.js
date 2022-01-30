import React, {useEffect} from 'react';
import "regenerator-runtime/runtime";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";


function App({domElement}) {

    const [open, setOpen] = React.useState(true);

    const API_URL = "http://localhost:8686"; // hard-coded for now
    const sourceId = domElement.getAttribute("source-id");
    const sessionId = domElement.getAttribute("session-id");
    const leftBtnText = domElement.getAttribute("left-button-text");
    const rightBtnText = domElement.getAttribute("right-button-text");
    const popupTitle = domElement.getAttribute("popup-title");
    const content = domElement.getAttribute("content");
    const posHorizontal = domElement.getAttribute("horizontal-position");
    const posVertical = domElement.getAttribute("vertical-position");
    const popupLifetime = parseInt(domElement.getAttribute("popup-lifetime")) * 1000;
    const theme = domElement.getAttribute("theme");
    const eventType = domElement.getAttribute("event-type");
    const saveEvent = domElement.getAttribute("save-event");
    const profileId = domElement.getAttribute("profile-id");


    const sendEvent = async (answer) => {

        const response = await fetch(`${API_URL}/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "source": {
                    "id": sourceId
                },
                "session": {
                    "id": sessionId
                },
                "metadata": {
                    "ip": "254.23.12.188"
                },
                "profile": {
                    "id": profileId
                },
                "context": {},
                "properties": {},
                "events": [
                    {
                        "type": eventType,
                        "properties": {
                            "answer": answer
                        },
                        "options": {
                            "saveEvent": saveEvent === 'yes'
                        }
                    }
                ],
                "options": {}
            })
        })

        const data = await response.json()
        console.log(data);

        setOpen(false);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpen(false);
        }
    };

    return (
        <Snackbar
            anchorOrigin={{vertical: posVertical, horizontal: posHorizontal}}
            open={open}
            onClose={handleClose}
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
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Box sx={{color: theme === "dark" ? "#ffffff" : "#343434"}}>
                                <Typography variant="h5">{popupTitle}</Typography>
                            </Box>
                            <Box sx={{color: theme === "dark" ? "#ffffff" : "#343434"}}>
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
                                <Button variant="outlined" onClick={() => sendEvent(leftBtnText)}
                                        color="inherit">{leftBtnText}</Button>
                                <Button variant="outlined" onClick={() => sendEvent(rightBtnText)}
                                        color="inherit">{rightBtnText}</Button>
                            </Box>
                        </Box>
                    </>
                }
            />
        </Snackbar>
    );

}

export default App;
