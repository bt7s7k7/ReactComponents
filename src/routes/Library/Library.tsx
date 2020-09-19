import React from "react"
import { classes, textSizes } from "../../sharedComponents/constants"
import { Frame } from "../../sharedComponents/Grid/Frame"
import { Col, Row } from "../../sharedComponents/Grid/frameDeriv"
import { ScrollArea } from "../../sharedComponents/ScrollArea/ScrollArea"
import { TextFrame } from "../../sharedComponents/Text/TextFrame"
import { themes } from "../../sharedComponents/themes/themes"
import { sections } from "./sections"

export interface LibraryProps {

}

export let Library: React.FC<LibraryProps> = (props) => {
    return (
        <ScrollArea fill>
            {sections.map(section =>
                <Frame m="a3" key={section.label}>
                    <TextFrame size={textSizes.heading}>{section.label}</TextFrame>
                    <Row fill b="a" className={[classes.round]}>
                        <Col fill p="a3">
                            {section.render()}
                        </Col>
                        <Col fill p="a3" className={themes.dark} background>
                            {section.render()}
                        </Col>
                    </Row>
                </Frame>
            )}

        </ScrollArea>
    )
}