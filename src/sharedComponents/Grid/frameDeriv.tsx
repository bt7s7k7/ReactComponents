import React from "react";
import { Frame } from "./Frame";


export let Col: typeof Frame = (props) => <Frame {...{ ...props, direction: "column" }} />;
export let Row: typeof Frame = (props) => <Frame {...{ ...props, direction: "row" }} />;
