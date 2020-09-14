import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import "./sharedComponents/body.scss";
import "./sharedComponents/global.scss";
import styles from "./sharedComponents/index.module.scss";

let root = document.getElementById('root')

root?.classList.add(styles.root)

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Route path="/" exact component={Home} />
        </BrowserRouter>
    </React.StrictMode>,
    root
);
