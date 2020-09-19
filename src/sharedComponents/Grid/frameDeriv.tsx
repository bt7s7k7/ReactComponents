import React, { forwardRef } from "react";
import { BaseProps } from "../StyleBuilder";
import { Frame, FrameProps } from "./Frame";


export let Col = forwardRef<HTMLDivElement, FrameProps & BaseProps>(function Col(props, ref) { return <Frame {...{ ...props, direction: "column" }} ref={ref} /> })
export let Row = forwardRef<HTMLDivElement, FrameProps & BaseProps>(function Row(props, ref) { return <Frame {...{ ...props, direction: "row" }} ref={ref} /> })
export let Spacer = forwardRef<HTMLDivElement, FrameProps & BaseProps>(function Spacer(props, ref) { return <Frame {...{ ...props, fill: true }} ref={ref} /> })
