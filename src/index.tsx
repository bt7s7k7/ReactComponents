import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Async } from './routes/Async/Async';
import { Home } from './routes/Home/Home';
import logo from "./routes/Home/logo.png";
import { Library } from './routes/Library/Library';
import "./sharedComponents/body.scss";
import { classes } from './sharedComponents/constants';
import "./sharedComponents/global.scss";
import { Row } from './sharedComponents/Grid/frameDeriv';
import { Img } from './sharedComponents/Image/Image';
import styles from "./sharedComponents/index.module.scss";
import { PageNotFound } from './sharedComponents/Prefabs/PageNotFound';

let root = document.getElementById('root')

root?.classList.add(styles.root)

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Row basis="50px" className={classes.shadow} alignCross="stretch" p="a1">
                <Link to="/">
                    <Img height="100%" width="100px" src={logo} />
                </Link>
            </Row>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/library" exact component={Library} />
                <Route path="/async" exact component={Async} />
                <Route path="/" component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    root
);
