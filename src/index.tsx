import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import "./sharedComponents/body.css";
import styles from "./sharedComponents/index.module.css";
import "./sharedComponents/variables.css";

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
