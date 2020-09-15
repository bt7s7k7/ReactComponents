import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../Button/Button"
import { colors, fonts } from "../constants"
import { Frame } from "../Grid/Frame"
import { Row } from "../Grid/frameDeriv"
import { Text } from "../Text/Text"

export interface PageNotFoundProps {

}

export let PageNotFound: React.FC<PageNotFoundProps> = (props) => {
    return (
        <Frame center fill>
            <Frame>
                <Text size="100px" color={colors.delete} font={fonts.monospace} center>404</Text>
                <Text size="25px" center>Page not found</Text>
                <Row center m="t5">
                    <Link to="/">
                        <Button>Back to index</Button>
                    </Link>
                </Row>
            </Frame>
        </Frame>
    )
}