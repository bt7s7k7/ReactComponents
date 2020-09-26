import React from "react"
import { Frame } from "../Grid/Frame"
import { Col } from "../Grid/frameDeriv"
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator"
import { Code } from "../Text/Code"
import { TextFrame } from "../Text/TextFrame"
import { Resource, useResource } from "./Resource"

export interface AwaitProps<T> {
    /** Resource to wait for */
    resource: Resource<T>
    /** Element to show when loading */
    fallback?: React.ReactElement
    /** Element to show on error */
    errorFallback?: (reason: string, error: any) => React.ReactElement
    children?: (data: T) => React.ReactElement
}

type PropType<T> = Parameters<React.FC<AwaitProps<T>>>[0]

/**
 * Use this component to wait for a resource to resolve. While the resource is 
 * loading, the `fallback` property will be rendered. If an error occurred, the 
 * `errorFallback` property will be rendered. If the resource if finished loading,
 * the render prop will be rendered.
 */
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
                <TextFrame m="t3" center color="deny">{reason}</TextFrame>
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