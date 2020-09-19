import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../../sharedComponents/Button/Button"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Row } from "../../sharedComponents/Grid/frameDeriv"
import { Img } from "../../sharedComponents/Image/Image"
import { TextFrame } from "../../sharedComponents/Text/TextFrame"
import { TextSize } from "../../sharedComponents/Text/textStyleDeriv"
import logo from "./logo.png"

export let Home: React.FC<{}> = () => {
    return (
        <Frame fill center>
            <Frame p="a5t0">
                <Img width="500px" src={logo}></Img>
                <TextFrame center>
                    <TextSize.heading>
                        React Components Library
                            </TextSize.heading>
                </TextFrame>
                <TextFrame center m="t3">Collection of my custom made React components</TextFrame>
                <Row center m="t3">
                    <Row>
                        <Link to="/library">
                            <Button m="r1">Go to library</Button>
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