import React from "react"
import { Frame } from "../sharedComponents/Grid/Grid"

export let Home: React.FC<{}> = () => {
    return (
        <Frame fill alignCross="center" alignMain="space-around">
            <Frame>Hello world!</Frame>
        </Frame>
    )
}