import React, { useCallback, useState } from "react"
import { Resource } from "../../sharedComponents/Async/Resource"
import { Button } from "../../sharedComponents/Button/Button"
import { Col, Row } from "../../sharedComponents/Grid/frameDeriv"
import { TextFrame } from "../../sharedComponents/Text/TextFrame"

export interface AsyncProps {

}

export let Async: React.FC<AsyncProps> = (props) => {
    let [resHost, setResource] = useState<{ resolve: (val: string) => void, reject: (err: string) => void, resource: Resource<string> } | null>(null)
    let [done, setDone] = useState(false)

    let makeResource = useCallback(() => {
        let resolve!: NonNullable<typeof resHost>["resolve"];
        let reject!: NonNullable<typeof resHost>["reject"];
        setResource({
            resource: new Resource(new Promise<string>((res, rej) => {
                resolve = res
                reject = rej
            })),
            reject,
            resolve
        })
    }, [resHost])

    return (
        <Row fill>
            <Col fill>
                {resHost == null
                    ? <TextFrame center fill>Waiting for resource</TextFrame>
                    : <resHost.resource.Await></resHost.resource.Await>
                }
            </Col>
            <Col basis="200px" b="l" p="a3">
                {
                    !done ? (resHost == null
                        ? <Button.Frame onClick={makeResource}>Create Resource</Button.Frame>
                        : <>
                            <Button.Frame onClick={() => { resHost!.resolve("Got data!"); setDone(true) }}>Resolve Resource</Button.Frame>
                            <Button.Frame m="t3" onClick={() => { resHost!.reject("Error"); setDone(true) }}>Reject Resource</Button.Frame>
                        </>
                    )
                        : <Button.Frame onClick={() => { setResource(null); setDone(false) }}>Reset</Button.Frame>
                }
            </Col>
        </Row>
    )
}