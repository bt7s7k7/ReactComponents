import React from "react"
import { Button } from "../../sharedComponents/Button/Button"
import { Col, Row } from "../../sharedComponents/Grid/frameDeriv"
import { Img } from "../../sharedComponents/Image/Image"
import { Code } from "../../sharedComponents/Text/Code"
import { TextFrame } from "../../sharedComponents/Text/TextFrame"
import image from "./image.jpg"

export interface Section {
    label: string,
    render: JSX.Element
}

export const sections = [
    {
        label: "Buttons",
        render: <>
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
        render: <Code><pre>{"<Code>\n    Insert code here\n</Code>"}</pre></Code>
    },
    {
        label: "Image",
        render: <Row>
            <Col fill>
                <TextFrame center>Contain</TextFrame>
                <Img center height="600px" src={image} alt="Image shrunk to fit" width="calc(100vw / 5)" m="t3" />
            </Col>
            <Col fill>
                <TextFrame center>Cover</TextFrame>
                <Img center height="600px" src={image} alt="Image stretched and clipped to cover" width="calc(100vw / 5)" cover m="t3" />
            </Col>
        </Row>
    }
] as Section[]