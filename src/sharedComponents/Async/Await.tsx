import React from "react"
import { colors } from "../constants"
import { Frame } from "../Grid/Frame"
import { Col } from "../Grid/frameDeriv"
import { Code } from "../Text/Code"
import { TextFrame } from "../Text/TextFrame"
import { LoadingIndicator } from "./LoadingIndicator"
import { Resource, useResource } from "./Resource"

export interface AwaitProps<T> {
    resource: Resource<T>
    fallback?: React.ReactElement
    errorFallback?: (reason: string, error: any) => React.ReactElement
    children?: (data: T) => React.ReactElement
}

type PropType<T> = Parameters<React.FC<AwaitProps<T>>>[0]

export let Await = function <T>({
    resource,
    fallback = (
        <Col fill center>
            <Frame>
                <Frame center>
                    <LoadingIndicator />
                </Frame>
                <TextFrame m="t3" center>Loading...</TextFrame>
            </Frame>
        </Col>
    ),
    errorFallback = (reason) => (
        <Col fill center>
            <Frame>
                <Frame center>
                    <LoadingIndicator error />
                </Frame>
                <TextFrame m="t3" center color={colors.delete}>{reason}</TextFrame>
            </Frame>
        </Col>
    ),
    children = (data) => (
        <Frame fill center>
            <Code children={JSON.stringify(data, null, 2)} />
        </Frame>
    )
}: PropType<T>): ReturnType<React.FC> {
    const { data, done, error } = useResource(resource)

    if (!done) {
        return fallback
    } else {
        if (data == null) {
            let reason = ""
            if (error instanceof Error) {
                reason = error.message
            } else if (typeof error == "object") {
                reason = JSON.stringify(error)
            } else if (error != null) {
                reason = error.toString()
            } else {
                reason = "" + error
            }

            return errorFallback(reason, error)
        } else {
            return children(data)
        }
    }
}