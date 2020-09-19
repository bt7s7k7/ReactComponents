import React, { useState } from "react"
import { LoadingIndicator } from "../../sharedComponents/Async/LoadingIndicator"
import { Button } from "../../sharedComponents/Button/Button"
import { Rippling } from "../../sharedComponents/Button/Rippling"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Col, Row } from "../../sharedComponents/Grid/frameDeriv"
import { Img } from "../../sharedComponents/Image/Image"
import { Code } from "../../sharedComponents/Text/Code"
import { TextFrame } from "../../sharedComponents/Text/TextFrame"
import image from "./image.jpg"

export interface Section {
    label: string,
    render: () => JSX.Element
}

export const sections = [
    {
        label: "Rippling",
        render: () => <>
            <Row basis="300px">
                <Col fill m="r3">
                    <TextFrame center m="b1">Brighten</TextFrame>
                    <Rippling baseColor="#000000" fill ripples={[{
                        trigger: "down",
                        duration: 0.25
                    }]} />
                </Col>
                <Col fill>
                    <TextFrame center m="b1">Lerp To</TextFrame>
                    <Rippling baseColor="#000000" fill ripples={[{
                        trigger: "down",
                        duration: 0.25,
                        lerpTo: [0, 255, 0]
                    }]} />
                </Col>
            </Row>
            <TextFrame center m="y1">Keep Alive</TextFrame>
            {[...Array(10)].map((_, i) =>
                <Rippling baseColor="#000000" key={i} basis="20px" ripples={[{
                    trigger: "enter",
                    duration: 0.1,
                    keepAlive: true
                }]} />
            )}
        </>
    },
    {
        label: "Buttons",
        render: () => <>
            <Row>
                <Col>
                    <TextFrame center>&nbsp;</TextFrame>
                    <TextFrame m="t3" center>Normal</TextFrame>
                    <TextFrame m="t7" center>Round</TextFrame>
                </Col>
                <Col fill m="l3">
                    <TextFrame center>Normal</TextFrame>
                    <Button m="t1" fill >Button</Button>
                    <Button m="t3" fill round >Button</Button>
                </Col>
                <Col fill m="l3">
                    <TextFrame center>Confirm</TextFrame>
                    <Button m="t1" confirm fill >Button</Button>
                    <Button m="t3" confirm fill round >Button</Button>
                </Col>
                <Col fill m="l3">
                    <TextFrame center>Deny</TextFrame>
                    <Button m="t1" deny fill >Button</Button>
                    <Button m="t3" deny fill round >Button</Button>
                </Col>
            </Row>
        </>
    },
    {
        label: "Code",
        render: () => <Code><pre>{"<Code>\n    Insert code here\n</Code>"}</pre></Code>
    },
    {
        label: "Image",
        render: () => <Row>
            <Col fill>
                <TextFrame center>Contain</TextFrame>
                <Img center height="600px" src={image} alt="Image shrunk to fit" width="calc(100vw / 5)" m="t3" />
            </Col>
            <Col fill>
                <TextFrame center>Cover</TextFrame>
                <Img center height="600px" src={image} alt="Image stretched and clipped to cover" width="calc(100vw / 5)" cover m="t3" />
            </Col>
        </Row>
    },
    {
        label: "Loading indicator",
        render: (() => {
            let [error, setError] = useState(false)

            return <>
                <Row>
                    <Button deny={error} onClick={() => setError((e) => !e)} >Error</Button>
                </Row>
                <Frame basis="300px" center>
                    <LoadingIndicator error={error} />
                </Frame>
            </>
        }) as React.FC<{}>
    }
] as Section[]