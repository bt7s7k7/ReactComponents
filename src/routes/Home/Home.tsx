import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../../sharedComponents/Button/Button"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Row } from "../../sharedComponents/Grid/frameDeriv"
import { ImageView } from "../../sharedComponents/ImageView/ImageView"
import { TextFrame } from "../../sharedComponents/Text/TextFrame"
import { TextSize } from "../../sharedComponents/Text/textStyleDeriv"
import logo from "./logo.png"

export let Home: React.FC<{}> = () => {
    return (
        <Frame fill center>
            <Frame p="a5t0">
                <ImageView width="500px" src={logo}></ImageView>
                <TextFrame center>
                    <TextSize.heading>
                        React Components Library
                    </TextSize.heading>
                </TextFrame>
                <TextFrame center m="t3">Collection of my custom made React components</TextFrame>
                <Row center m="t3">
                    <Row>
                        <Link to="/library">
                            <Button.Frame m="r1">Go to library</Button.Frame>
                        </Link>
                        <Link to="/async">
                            <Button>Go to async showcase</Button>
                        </Link>
                    </Row>
                </Row>
            </Frame>
        </Frame>
    )
}