import React from 'react';
import "regenerator-runtime/runtime";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";


function App({domElement}) {

    const [open, setOpen] = React.useState(true);

    const api_url = domElement.getAttribute("data-api-url") || "http://localhost:8686";
    const sourceId = domElement.getAttribute("data-source-id");
    const sessionId = domElement.getAttribute("data-session-id");
    const leftBtnType = domElement.getAttribute("data-left-button-type") || "text";
    const rightBtnType = domElement.getAttribute("data-right-button-type") || "text";
    const leftBtnText = domElement.getAttribute("data-left-button-text");
    const rightBtnText = domElement.getAttribute("data-right-button-text");
    const popupTitle = domElement.getAttribute("data-popup-title");
    const content = domElement.getAttribute("data-content");
    const posHorizontal = domElement.getAttribute("data-horizontal-position");
    const posVertical = domElement.getAttribute("data-vertical-position");
    const popupLifetime = parseInt(domElement.getAttribute("data-popup-lifetime")) * 1000;
    const eventType = domElement.getAttribute("data-event-type");
    const saveEvent = domElement.getAttribute("data-save-event");
    const profileId = domElement.getAttribute("data-profile-id");
    const boxBgColor = domElement.getAttribute("data-box-bg-color") || "white";
    const textColor = domElement.getAttribute("data-text-color") || "black";
    const titleSize = domElement.getAttribute("data-title-size") || "22px";
    const questionSize = domElement.getAttribute("data-question-size") || "15px";
    const boxElevation = domElement.getAttribute("data-box-elevation") || "1";
    const boxMaxWidth = domElement.getAttribute("data-box-max_width") || "200px";

    const sendEvent = async (answer) => {

        try {
            const response = await fetch(`${api_url}/track`, {
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

        } catch (e) {
            console.error(e)
        } finally {
            setOpen(false);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpen(false);
        }
    };

    return <Snackbar
        anchorOrigin={{vertical: posVertical, horizontal: posHorizontal}}
        open={open}
        onClose={handleClose}
        autoHideDuration={popupLifetime}
    >
        <SnackbarContent
            style={{
                backgroundColor: boxBgColor,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                maxWidth: boxMaxWidth,
                padding: "0px 20px"
            }}
            elevation={boxElevation}
            message={
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: textColor
                    }}
                >
                    <div style={{fontSize: titleSize, padding: "10px 0 0 6px"}}>{popupTitle}</div>
                    <p style={{overflow: "scroll", maxHeight: 103, fontSize: questionSize}}>{content}</p>
                    <Box
                        sx={{
                            alignSelf: "center",
                            margin: "10px",
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            color: textColor
                        }}
                    >
                        <Button variant={leftBtnType} onClick={() => sendEvent(leftBtnText)}
                                color="inherit">{leftBtnText}</Button>
                        <Button variant={rightBtnType} onClick={() => sendEvent(rightBtnText)}
                                color="inherit">{rightBtnText}</Button>
                    </Box>
                </Box>
            }
        />
    </Snackbar>;

}

export default App;
