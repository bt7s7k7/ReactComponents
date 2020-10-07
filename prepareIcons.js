/// <reference lib="es2020" />
const fs = require("fs")

const definition = fs.readFileSync("./node_modules/vscode-codicons/dist/codicon.csv").toString()
const icons = definition.split("\n").map(v => v.split(",")[0]).filter(v => !!v).map(v => `"${v}"`)
const iconsUnion = icons.join("\n    | ")

const iconsUnionType = "type IconName = " + iconsUnion
const replaceBlockStartMark = "// ICON START"
const replaceBlockEndMark = "// ICON END"

const scriptContent = fs.readFileSync("./src/codiconComponents/Icon.tsx").toString()
const replaceBlockStart = scriptContent.indexOf(replaceBlockStartMark)
if (replaceBlockStart == -1) throw new Error("Failed to find the start of the replace block")
const replaceBlockEnd = scriptContent.indexOf(replaceBlockEndMark)
if (replaceBlockEnd == -1) throw new Error("Failed to find the end of the replace block")

const scriptBegin = scriptContent.slice(0, replaceBlockStart)
const scriptEnd = scriptContent.slice(replaceBlockEnd + replaceBlockEndMark.length)

const outContent = scriptBegin + replaceBlockStartMark + "\n" + iconsUnionType + "\n" + replaceBlockEndMark + scriptEnd

fs.writeFileSync("./src/codiconComponents/Icon.tsx", outContent)
