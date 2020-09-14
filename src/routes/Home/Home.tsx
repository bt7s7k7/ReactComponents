import React from "react"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Image } from "../../sharedComponents/Image/Image"
import { Page } from "../../sharedComponents/ScrollArea/Page"
import { ScrollArea } from "../../sharedComponents/ScrollArea/ScrollArea"
import { Text } from "../../sharedComponents/Text/Text"
import { TextSize } from "../../sharedComponents/Text/textStyleDeriv"
import { themes } from "../../sharedComponents/themes/themes"
import logo from "./logo.png"

export let Home: React.FC<{}> = () => {
    return (
        <ScrollArea fill>
            <Page>
                <Frame fill center className={themes.dark}>
                    <Frame className={themes.white} p="a5t0">
                        <Image width="500px" src={logo}></Image>
                        <Text center>
                            <TextSize.header>
                                React Components Library
                            </TextSize.header>
                        </Text>
                        <Text center m="t3">Collection of my custom made React components</Text>
                    </Frame>
                </Frame>
            </Page>
            <Page>
                page
            </Page>
        </ScrollArea>
    )
}