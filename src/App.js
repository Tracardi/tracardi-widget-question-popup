import React from 'react';
import "regenerator-runtime/runtime";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Fade from "@material-ui/core/Fade";


function App({domElement}) {

    const [openQuestionPopUp, setOpenQuestionPopUp] = React.useState(true);

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
    const popupLifetime = parseInt(domElement.getAttribute("data-popup-lifetime"), 10) * 1000;
    const eventType = domElement.getAttribute("data-event-type");
    const saveEvent = domElement.getAttribute("data-save-event");
    const profileId = domElement.getAttribute("data-profile-id");
    const borderRadius = domElement.getAttribute("data-border-radius") || 0;
    const borderWidth = domElement.getAttribute("data-border-width") || 0;
    const borderColor = domElement.getAttribute("data-border-color") || "transparent";
    const paddingLeft = domElement.getAttribute("data-padding-left") || 0;
    const paddingRight = domElement.getAttribute("data-padding-right") || 0;
    const paddingTop = domElement.getAttribute("data-padding-top") || 0;
    const paddingBottom = domElement.getAttribute("data-padding-bottom") || 0;
    const marginLeft = domElement.getAttribute("data-margin-left") || 0;
    const marginRight = domElement.getAttribute("data-margin-right") || 0;
    const marginTop = domElement.getAttribute("data-margin-top") || 0;
    const marginBottom = domElement.getAttribute("data-margin-bottom") || 0;
    const boxBgColor = domElement.getAttribute("data-bg-color") || "white";
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
            setOpenQuestionPopUp(false);
        }
    }

    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            setOpenQuestionPopUp(false);
        }

        if (reason === 'timeout') {
            setOpenQuestionPopUp(false);
        }
    };

    return <Snackbar
        anchorOrigin={{vertical: posVertical, horizontal: posHorizontal}}
        open={openQuestionPopUp}
        onClose={handleClose}
        autoHideDuration={popupLifetime}
        style={{

        }}
    >
        <SnackbarContent
            style={{
                background: boxBgColor,
                borderRadius: `${borderRadius}px`,
                border: `${borderWidth}px solid ${borderColor}`,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                maxWidth: boxMaxWidth,
                padding: `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`,
                margin: `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`
            }}
            elevation={boxElevation}
            message={
                <Fade in={openQuestionPopUp} {...(openQuestionPopUp ? {timeout: 1500} : {})}>
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
                        <div
                            style={{
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
                        </div>
                    </Box>
                </Fade>
            }
        />
    </Snackbar>;

}

export default App;
