import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../Button/Button"
import { Frame } from "../Grid/Frame"
import { Row } from "../Grid/frameDeriv"
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator"
import { TextFrame } from "../Text/TextFrame"
import { useTheme } from "../Theme/ThemeContext"

export interface PageNotFoundProps {

}

export let PageNotFound: React.FC<PageNotFoundProps> = (props) => {
    const { colors, fonts } = useTheme()
    return (
        <Frame center fill>
            <Frame>
                <Frame center>
                    <LoadingIndicator error />
                </Frame>
                <TextFrame size="100px" color={colors.deny} font={fonts.monospace}>404</TextFrame>
                <TextFrame size="25px" center>Page not found</TextFrame>
                <Row center m="t5">
                    <Link to="/">
                        <Button>Back to index</Button>
                    </Link>
                </Row>
            </Frame>
        </Frame >
    )
}