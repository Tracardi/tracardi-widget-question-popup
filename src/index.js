import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const widgetDivs = document.querySelectorAll('.tracardi-question-widget')

widgetDivs.forEach(Div => {
    ReactDOM.render(
        <React.StrictMode>
            <App domElement={Div} />
        </React.StrictMode>,
        Div
    );
})
