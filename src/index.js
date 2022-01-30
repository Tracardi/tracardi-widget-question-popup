import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const widgetName = 'tracardi-question-popup-widget'
const widgetDivs = document.querySelectorAll('.'+widgetName)

widgetDivs.forEach(Div => {
    ReactDOM.render(
        <React.StrictMode>
            <App domElement={Div} />
        </React.StrictMode>,
        Div
    );
})
