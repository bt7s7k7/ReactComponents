import React, { useState } from "react"
import { Button } from "../../sharedComponents/Button/Button"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Col, Row } from "../../sharedComponents/Grid/frameDeriv"
import { ImageView } from "../../sharedComponents/ImageView/ImageView"
import { LoadingIndicator } from "../../sharedComponents/LoadingIndicator/LoadingIndicator"
import { Code } from "../../sharedComponents/Text/Code"
import { TextFrame } from "../../sharedComponents/Text/TextFrame"
import image from "./image.jpg"

export interface Section {
    label: string,
    Component: React.FC<{}>
}

export const sections = [
    {
        label: "Buttons",
        Component: () => <>
            <Row>
                <Col>
                    <TextFrame center>&nbsp;</TextFrame>
                    <TextFrame m="t3" center>Normal</TextFrame>
                    <TextFrame m="t7" center>Round</TextFrame>
                </Col>
                <Col fill m="l3">
                    <TextFrame center>Normal</TextFrame>
                    <Button.Frame m="t1" fill >Button</Button.Frame>
                    <Button.Frame m="t3" fill round >Button</Button.Frame>
                </Col>
                <Col fill m="l3">
                    <TextFrame center>Confirm</TextFrame>
                    <Button.Frame m="t1" confirm fill >Button</Button.Frame>
                    <Button.Frame m="t3" confirm fill round >Button</Button.Frame>
                </Col>
                <Col fill m="l3">
                    <TextFrame center>Deny</TextFrame>
                    <Button.Frame m="t1" deny fill >Button</Button.Frame>
                    <Button.Frame m="t3" deny fill round >Button</Button.Frame>
                </Col>
            </Row>
        </>
    },
    {
        label: "Code",
        Component: () => <Code><pre>{"<Code>\n    Insert code here\n</Code>"}</pre></Code>
    },
    {
        label: "Image",
        Component: () => <Row>
            <Col fill>
                <TextFrame center>Contain</TextFrame>
                <Frame center m="t3">
                    <ImageView height="600px" src={image} alt="Image shrunk to fit" width="calc(100vw / 5)" />
                </Frame>
            </Col>
            <Col fill>
                <TextFrame center>Cover</TextFrame>
                <Frame center m="t3">
                    <ImageView height="600px" src={image} alt="Image stretched and clipped to cover" width="calc(100vw / 5)" cover />
                </Frame>
            </Col>
        </Row>
    },
    {
        label: "Loading indicator",
        Component: (() => {
            let [error, setError] = useState(false)

            return <>
                <Row>
                    <Button.Frame deny={error} onClick={() => setError((e) => !e)} >Error</Button.Frame>
                </Row>
                <Frame basis="300px" center>
                    <LoadingIndicator error={error} />
                </Frame>
            </>
        }) as React.FC<{}>
    }
] as Section[]