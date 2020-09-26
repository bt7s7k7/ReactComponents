import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Async } from './routes/Async/Async';
import { Home } from './routes/Home/Home';
import logo from "./routes/Home/logo.png";
import { Library } from './routes/Library/Library';
import "./sharedComponents/body.scss";
import "./sharedComponents/global.scss";
import { Row } from './sharedComponents/Grid/frameDeriv';
import { ImageView } from './sharedComponents/ImageView/ImageView';
import styles from "./sharedComponents/index.module.scss";
import { PageNotFound } from './sharedComponents/Prefabs/PageNotFound';
import { useTheme } from './sharedComponents/Theme/ThemeContext';

let root = document.getElementById('root')

root?.classList.add(styles.root)

const Index: React.FC<{}> = () => {
    const theme = useTheme()
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Row basis="50px" className={theme.classes.shadow} alignCross="stretch" p="a1">
                    <Link to="/">
                        <ImageView height="100%" width="100px" src={logo} />
                    </Link>
                </Row>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/library" exact component={Library} />
                    <Route path="/async" exact component={Async} />
                    <Route path="/" component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    )
}

ReactDOM.render(<Index />, root);
