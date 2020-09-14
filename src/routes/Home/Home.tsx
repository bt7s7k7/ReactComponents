import React from "react"
import { Frame } from "../../sharedComponents/Grid/Grid"
import { Image } from "../../sharedComponents/Image/Image"
import { Text } from "../../sharedComponents/Text/Text"
import { TextSize } from "../../sharedComponents/Text/textStyleDeriv"
import logo from "./logo.png"

export let Home: React.FC<{}> = () => {
    return (
        <Frame fill alignCross="center" alignMain="space-around">
            <Frame>
                <Image width="500px" src={logo}></Image>
                <Text center>
                    <TextSize.header>
                        React Components Library
                    </TextSize.header>
                </Text>
                <Text center>Collection of my custom made React components</Text>
            </Frame>
        </Frame>
    )
}