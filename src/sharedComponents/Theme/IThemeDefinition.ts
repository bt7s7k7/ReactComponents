import { ButtonProps } from "../Button/Button";
import { ImageViewProps } from "../ImageView/ImageView";
import { LoadingIndicatorProps } from "../LoadingIndicator/LoadingIndicator";

export interface IThemeDefinition {
    colors: {
        hover: string
        active: string
        confirm: string
        deny: string
        link: string
        background: string
        foreground: string
        button: string
        code: string
        error: string
    },
    textSizes: {
        normal: string
        heading: string
        header: string
    },
    fonts: {
        normal: string,
        monospace: string,
        serif: string
    },
    classes: {
        shadow: string,
        round: string
    },
    components: {
        LoadingIndicator: React.FC<LoadingIndicatorProps>,
        Button: React.FC<ButtonProps>,
        ImageView: React.FC<ImageViewProps>
    },
    className: string
}