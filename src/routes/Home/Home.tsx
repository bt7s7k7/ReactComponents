import React from "react"
import { Frame } from "../../sharedComponents/Grid/Grid"
import { Image } from "../../sharedComponents/Image/Image"
import logo from "./logo.png"

export let Home: React.FC<{}> = () => {
    return (
        <Frame fill alignCross="center" alignMain="space-around">
            <Frame>
                <Image width="500px" src={logo}></Image>
            </Frame>
        </Frame>
    )
}