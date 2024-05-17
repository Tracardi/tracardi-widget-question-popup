import React from 'react';
import "regenerator-runtime/runtime";

import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";


export const theme = createTheme({
    typography: {
        "fontFamily": `"IBM Plex Sans", "Arial", sans-serif`,
        "fontSize": 15,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
})


function Question({titleSize, popupTitle, questionSize, content, textColor, leftBtnType, leftBtnText, rightBtnType, rightBtnText, onAnswer}) {
    return <>
        <div style={{fontSize: titleSize, padding: "10px 0 0 6px"}}>{popupTitle}</div>
        <p style={{overflow: "scroll", maxHeight: 103, fontSize: questionSize, padding: "10px 20px"}}>{content}</p>
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
            <Button variant={leftBtnType} onClick={() => onAnswer(leftBtnText)}
                    color="inherit">{leftBtnText}</Button>
            <Button variant={rightBtnType} onClick={() => onAnswer(rightBtnText)}
                    color="inherit">{rightBtnText}</Button>
        </div>
    </>
}

function ContactQuestion({content, onAnswer}) {

    const [text, setText] = React.useState("");

    return <div style={{padding: 20}}>
        <div style={{padding: 20}}>
            <div style={{fontSize: 16}}>{content}</div>
        </div>

               <div style={{display: "flex", alignItems: "center", gap: 5}}>
                <TextField size="small" label="e-mail" variant="outlined" value={text}
                           onChange={(e) => setText(e.target.value)}/>
                <Button size="small" variant="contained" onClick={() => onAnswer(text)}>Submit</Button>
            </div>
    </div>
}

function App({domElement}) {

    const api_url = domElement.getAttribute("data-api-url") || "http://localhost:8686";
    const sourceId = domElement.getAttribute("data-source-id");
    const sessionId = domElement.getAttribute("data-session-id");
    const leftBtnType = domElement.getAttribute("data-left-button-type") || "text";
    const rightBtnType = domElement.getAttribute("data-right-button-type") || "text";
    const leftBtnText = domElement.getAttribute("data-left-button-text");
    const rightBtnText = domElement.getAttribute("data-right-button-text");
    const popupTitle = domElement.getAttribute("data-popup-title");
    const content = domElement.getAttribute("data-popup-question");
    const posHorizontal = domElement.getAttribute("data-horizontal-position");
    const posVertical = domElement.getAttribute("data-vertical-position");
    const popupLifetime = parseInt(domElement.getAttribute("data-popup-lifetime") || 5, 10) * 1000;
    const answerEventType = domElement.getAttribute("data-answer-event-type") || 'question-answered';
    const contactEventType = domElement.getAttribute("data-contact-event-type") || 'email-contact-delivered';
    const saveEvent = domElement.getAttribute("data-save-event");
    const profileId = domElement.getAttribute("data-profile-id");
    const borderRadius = domElement.getAttribute("data-border-radius") || 10;
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
    const boxElevation = domElement.getAttribute("data-box-elevation") || 2;
    const boxMaxWidth = domElement.getAttribute("data-box-max_width") || "450px";
    const contactText = domElement.getAttribute("data-contact-text");
    const contactDisplayedWhen = domElement.getAttribute("data-display-contact-text-button") || "none";

    const [openQuestionPopUp, setOpenQuestionPopUp] = React.useState(true);
    const [displayContactQuestion, setDisplayContactQuestion] = React.useState(false);
    const [answer, setAnswer] = React.useState("");
    const [popupTimeout, setPopupTimeout] = React.useState(popupLifetime);

    const handleAnswer = async (answer) => {
        await sendEvent(answerEventType, "answer", answer)
        if(contactDisplayedWhen === 'both' || contactDisplayedWhen.toLowerCase() === answer.toLowerCase()) {
            setAnswer(answer)
            setPopupTimeout(120* 1000)
            setDisplayContactQuestion(true)
        } else {
            setOpenQuestionPopUp(false)
        }
    }

    const handleContactSubmit = async (contact) => {
        await sendEvent(contactEventType, "email", contact)
        setOpenQuestionPopUp(false)
    }

    const sendEvent = async (eventType, key, answer) => {

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
                                [key]: answer
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

    return <ThemeProvider theme={theme}>
    <Snackbar
        anchorOrigin={{vertical: posVertical, horizontal: posHorizontal}}
        open={openQuestionPopUp}
        onClose={handleClose}
        autoHideDuration={popupTimeout}
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
                            color: textColor,
                        }}
                    >
                        {displayContactQuestion
                            ? <ContactQuestion
                                content={contactText}
                                onAnswer={handleContactSubmit}
                            />
                            : <Question
                                titleSize={titleSize}
                                popupTitle={popupTitle}
                                questionSize={questionSize}
                                content={content}
                                textColor={textColor}
                                leftBtnType={leftBtnType}
                                leftBtnText={leftBtnText}
                                rightBtnType={rightBtnType}
                                rightBtnText={rightBtnText}
                                onAnswer={handleAnswer}
                            />}
                    </Box>
                </Fade>
            }
        />
    </Snackbar>
    </ThemeProvider>;

}

export default App;
