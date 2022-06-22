import React from 'react'
import * as d3 from 'd3'

interface BookRepresentationProps {
    textBlockMeans?: Array<number>,
    scale: d3.ScaleLinear<number, number, never>
}

const BookRepresentation = ({textBlockMeans = [], scale}: BookRepresentationProps) => {
    const bookStyle: React.CSSProperties = {
        width: '80px',
        display: 'flex', 
        flexWrap: 'wrap', 
        margin: '10px'
    }

    const textBlockStyle = (textBlockMean: number): React.CSSProperties => {
        return {
            backgroundColor: `${d3.interpolateRdBu(1 - scale(textBlockMean))}`,
            width: '10px',
            height: '10px',
            margin: '0', 
            boxSizing: 'border-box'
        }
    }
    

    let textBlocks = textBlockMeans.map((textBlockMean, i) => 
        <div key={i} style={textBlockStyle(textBlockMean)}></div>
    )

    return (
        <div style={bookStyle}>
            {textBlocks}
        </div>
    )
}

export default BookRepresentation