import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import "./sharedComponents/body.css";
import "./sharedComponents/variables.css";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Route path="/" exact component={Home} />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
