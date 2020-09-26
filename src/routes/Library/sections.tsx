import React, { useState } from "react"
import { Button } from "../../sharedComponents/Button/Button"
import { useFormInput } from "../../sharedComponents/FormHooks/useFormInput"
import { Validators } from "../../sharedComponents/FormHooks/Validators"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Col, Row } from "../../sharedComponents/Grid/frameDeriv"
import { ImageView } from "../../sharedComponents/ImageView/ImageView"
import { Input } from "../../sharedComponents/Input/Input"
import { LoadingIndicator } from "../../sharedComponents/LoadingIndicator/LoadingIndicator"
import { Code } from "../../sharedComponents/Text/Code"
import { TextFrame } from "../../sharedComponents/Text/TextFrame"
import { Toggle } from "../../sharedComponents/Toggle/Toggle"
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
    },
    {
        label: "Toggle",
        Component: () => {
            let [hookedToggle] = useFormInput(Toggle, false, "Normal toggle")
            let [errorToggle] = useFormInput(Toggle, false, "Toggle this one to trigger error", [
                Validators.unchecked("Error message goes here!")
            ])

            return <>
                <Frame fill>
                    <Frame >
                        {hookedToggle}
                    </Frame>
                    <Frame m="t3">
                        {errorToggle}
                    </Frame>
                </Frame>
            </>
        }
    },
    {
        label: "Input",
        Component: () => {
            let [input] = useFormInput(Input, "", "Label here, write 'error' to see error state", [
                Validators.matchRegexp(/^((?!error).)*$/, "Text must not contain an error")
            ])

            return <>
                <Frame fill>
                    <Frame>
                        {input}
                    </Frame>
                </Frame>
            </>
        }
    }
] as Section[]