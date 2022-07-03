import splitTextBlocks from "../utils/splitTextBlocks"
import BookRepresentation from "./BookRepresentation"
import * as d3 from "d3"

interface literatureFingerprintingProps {
    texts?: Array<string>,
    filenames?: Array<string>,
    n?: number,
}

const LiteratureFingerprinting = ({texts = [''], filenames = [''], n = 3}: literatureFingerprintingProps) => {
    const literatureFingerprintingStyle: React.CSSProperties = {
        display: 'flex'
    }

    const gradientBarStyle: React.CSSProperties = {
        marginTop: '10px',
        width: '400px',
        height: '20px',
        color: 'white',
        background: `linear-gradient(90deg,
            ${d3.interpolateRdBu(0)} 0%,
            ${d3.interpolateRdBu(0.1)} 10%,
            ${d3.interpolateRdBu(0.2)} 20%,
            ${d3.interpolateRdBu(0.3)} 30%,
            ${d3.interpolateRdBu(0.4)} 40%,
            ${d3.interpolateRdBu(0.5)} 50%,
            ${d3.interpolateRdBu(0.6)} 60%,
            ${d3.interpolateRdBu(0.7)} 70%,
            ${d3.interpolateRdBu(0.8)} 80%,
            ${d3.interpolateRdBu(0.9)} 90%,
            ${d3.interpolateRdBu(1)} 100%
        )`,
    }

    const subtitleStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        margin: '10px'
    }


    let allTextsLengths = []
    for (let i = 0; i < texts.length; i++) {
        allTextsLengths.push(...splitTextBlocks(texts[i], n, /[\n]+/g))
    }
    let min = Math.min(...allTextsLengths)
    let max = Math.max(...allTextsLengths)
    if (min === Infinity) {
        min = 0
    }
    if (max === -Infinity) {
        max = 0
    }

    const scale = d3.scaleLinear()
        .domain([min, max])
        .range([0, 1])

    let textsSplits = texts.map((text, i) => 
        <BookRepresentation key={i} scale={scale} filename={filenames[i]}
            textBlockMeans={splitTextBlocks(text, n, /\n+/g)} />
    )

    return (
        <div>
            <div style={subtitleStyle}>
                <span style={{margin: '10px'}}>{min.toFixed(2)}</span>
                <div style={gradientBarStyle}></div>
                <span style={{margin: '10px'}}>{max.toFixed(2)}</span>
            </div>
            <div style={literatureFingerprintingStyle}>
                {textsSplits}
            </div>
        </div>
    )
}

export default LiteratureFingerprinting