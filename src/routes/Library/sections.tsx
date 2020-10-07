import React, { useMemo, useState } from "react"
import { Icon } from "../../codiconComponents/Icon"
import { Button } from "../../sharedComponents/Button/Button"
import { useForm } from "../../sharedComponents/FormHooks/useForm"
import { useFormInput } from "../../sharedComponents/FormHooks/useFormInput"
import { Validators } from "../../sharedComponents/FormHooks/Validators"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Col, Row } from "../../sharedComponents/Grid/frameDeriv"
import { ImageView } from "../../sharedComponents/ImageView/ImageView"
import { Input } from "../../sharedComponents/Input/Input"
import { List } from "../../sharedComponents/List/List"
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
            <Row>
                <TextFrame m="t3">Fab</TextFrame>
                <Button.Frame fab m="l3t1"><Icon icon="menu" /></Button.Frame>
                <Button.Frame fab m="l3t1"><Icon icon="sign-out" /></Button.Frame>
                <Button.Frame fab m="l3t1"><Icon icon="trash" /></Button.Frame>
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
            let [greenToggle] = useFormInput(Toggle, false, "Green toggle", { props: { confirm: true } })
            let [redToggle] = useFormInput(Toggle, false, "Green toggle", { props: { deny: true } })
            let [errorToggle] = useFormInput(Toggle, false, "Toggle this one to trigger error", {
                validators: [
                    Validators.unchecked("Error message goes here!")
                ]
            })

            return <>
                <Frame fill>
                    <Frame >
                        {hookedToggle}
                    </Frame>
                    <Frame m="t3">
                        {greenToggle}
                    </Frame>
                    <Frame m="t3">
                        {redToggle}
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
            let [numberInput] = useFormInput(Input, "", "This is a number input", {
                validators: [
                    Validators.number("Value must be a number")
                ]
            })
            let [emailInput] = useFormInput(Input, "", "This one has browser native email validation", { props: { type: "email" } })
            let [input] = useFormInput(Input, "", "Label here, write 'error' to see error state", {
                validators: [
                    Validators.matchRegexp(/^((?!error).)*$/, "Text must not contain an error")
                ]
            })

            return <>
                <Frame fill>
                    <form>
                        <Frame>
                            {numberInput}
                        </Frame>
                        <Frame>
                            {emailInput}
                        </Frame>
                        <Frame>
                            {input}
                        </Frame>
                    </form>
                </Frame>
            </>
        }
    },
    {
        label: "Form",
        Component: () => {
            let [form, result, , valid] = useForm({
                name: useFormInput(Input, "", "Name", { validators: [Validators.required()], props: { type: "text", autocomplete: "name" } }),
                email: useFormInput(Input, "", "Email", { validators: [Validators.required()], props: { type: "email", autocomplete: "email" } }),
            })

            return (
                <Frame fill>
                    {form}
                    <Frame>
                        <Code>{JSON.stringify(result, null, 2)}</Code>
                        <Code>{JSON.stringify(valid, null, 2)}</Code>
                    </Frame>
                </Frame>
            )
        }
    },
    {
        label: "List",
        Component: () => {
            const elements = useMemo(() => [
                { key: "foo", label: "Foo" },
                { key: "boo", label: "Boo" },
                { key: "doo", label: "Doo" },
            ] as { key: string, label: string }[], [])

            const [list] = useFormInput(List, null, "", { props: { list: elements } })

            return (
                <Frame fill>
                    {list}
                </Frame>
            )
        }
    },
    {
        label: "Icon",
        Component: () => {
            return (
                <Row alignMain="space-between">
                    <Icon icon="person"></Icon>
                    <Icon icon="sign-out"></Icon>
                    <Icon icon="menu"></Icon>
                    <Icon icon="sign-in"></Icon>
                    <Icon icon="debug-step-over"></Icon>
                    <Icon icon="account"></Icon>
                    <Icon icon="arrow-both"></Icon>
                    <Icon icon="eye"></Icon>
                    <Icon icon="diff"></Icon>
                    <Icon icon="feedback"></Icon>
                    <Icon icon="settings"></Icon>
                    <Icon icon="gear"></Icon>
                </Row>
            )
        }
    }
] as Section[]