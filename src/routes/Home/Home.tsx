import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../../sharedComponents/Button/Button"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Row } from "../../sharedComponents/Grid/frameDeriv"
import { Image } from "../../sharedComponents/Image/Image"
import { Text } from "../../sharedComponents/Text/Text"
import { TextSize } from "../../sharedComponents/Text/textStyleDeriv"
import logo from "./logo.png"

export let Home: React.FC<{}> = () => {
    return (
        <Frame fill center>
            <Frame p="a5t0">
                <Image width="500px" src={logo}></Image>
                <Text center>
                    <TextSize.heading>
                        React Components Library
                            </TextSize.heading>
                </Text>
                <Text center m="t3">Collection of my custom made React components</Text>
                <Row center m="t3">
                    <Link to="/library">
                        <Button>Go to library</Button>
                    </Link>
                </Row>
            </Frame>
        </Frame>
    )
}