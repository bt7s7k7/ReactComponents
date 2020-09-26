import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Col, Row } from "../../sharedComponents/Grid/frameDeriv"
import { ScrollArea } from "../../sharedComponents/ScrollArea/ScrollArea"
import { TextFrame } from "../../sharedComponents/Text/TextFrame"
import { Theme } from "../../sharedComponents/Theme/Theme"
import { DefaultDark } from "../../sharedComponents/Theme/themes/DefaultDark/DefaultDark"
import { DefaultLight } from "../../sharedComponents/Theme/themes/DefaultLight/DefaultLight"
import { sections } from "./sections"

export interface LibraryProps {

}

export let Library: React.FC<LibraryProps> = (props) => {
    let filteredSections = sections
    let hash = useLocation().hash
    if (hash) filteredSections = filteredSections.filter(v => "#" + v.label === decodeURIComponent(hash))
    return (
        <ScrollArea fill>
            {filteredSections.map(section =>
                <Frame m="a3" key={section.label}>
                    <Link to={`/library#` + encodeURIComponent(section.label)}>
                        <TextFrame size={Theme.textSizes.heading}>{section.label}</TextFrame>
                    </Link>
                    <Row fill b="a" className={Theme.classes.round}>
                        <Theme theme={DefaultLight}>
                            <Col fill p="a3">
                                <section.Component />
                            </Col>
                        </Theme>
                        <Theme theme={DefaultDark}>
                            <Col fill p="a3" background>
                                <section.Component />
                            </Col>
                        </Theme>
                    </Row>
                </Frame>
            )}

        </ScrollArea>
    )
}