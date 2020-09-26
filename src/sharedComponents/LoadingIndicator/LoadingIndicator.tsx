import React from "react";
import { useTheme } from "../Theme/ThemeContext";

export interface LoadingIndicatorProps {
    /** Duration in seconds of the loading animation 
     *  @default 0.6 */
    duration?: number
    /** Radius in pixels of the loading animation 
     *  @default 50
     */
    radius?: number
    /** Background style of the dots in the loading animation
     *  @default colors.foreground
     */
    background?: string
    /** Background style of the dots in the loading animation in the error state
     *  @default colors.delete
    */
    backgroundError?: string
    /** Size (not radius) in pixels of the dots in the loading animation 
     *  @default 10
     */
    dotSize?: number
    /** Is the error state active? 
     *  @default false
     */
    error?: boolean
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props) => {
    let theme = useTheme()
    return <theme.components.LoadingIndicator {...props} />
}