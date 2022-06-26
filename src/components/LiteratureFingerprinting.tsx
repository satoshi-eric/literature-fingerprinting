import splitTextBlocks from "../utils/splitTextBlocks"
import BookRepresentation from "./BookRepresentation"
import * as d3 from "d3"

interface literatureFingerprintingProps {
    texts?: Array<string>,
    filenames?: Array<string>,
    n?: number
}

const LiteratureFingerprinting = ({texts = [''], filenames = [''], n = 3}: literatureFingerprintingProps) => {
    const literatureFingerprintingStyle: React.CSSProperties = {
        display: 'flex'
    }

    let allTextsLengths = []
    for (let i = 0; i < texts.length; i++) {
        allTextsLengths.push(...splitTextBlocks(texts[i], n, /[\n]+/g))
    }

    const scale = d3.scaleLinear()
        .domain([Math.min(...allTextsLengths), Math.max(...allTextsLengths)])
        .range([0, 1])

    let textsSplits = texts.map((text, i) => 
        <BookRepresentation key={i} scale={scale} filename={filenames[i]}
            textBlockMeans={splitTextBlocks(text, n, /\n+/g)} />
    )

    return (
        <div style={literatureFingerprintingStyle}>
            {textsSplits}
        </div>
    )
}

export default LiteratureFingerprinting