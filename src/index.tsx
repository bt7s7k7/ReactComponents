import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import "./sharedComponents/body.scss";
import "./sharedComponents/global.scss";
import styles from "./sharedComponents/index.module.scss";
import { PageNotFound } from './sharedComponents/Prefabs/PageNotFound';

let root = document.getElementById('root')

root?.classList.add(styles.root)

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/" component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    root
);
