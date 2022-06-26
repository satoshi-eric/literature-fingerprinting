import React from 'react'
import * as d3 from 'd3'

interface BookRepresentationProps {
    textBlockMeans?: Array<number>,
    filename?: string,
    scale: d3.ScaleLinear<number, number, never>
}

const BookRepresentation = ({textBlockMeans = [], filename = '', scale}: BookRepresentationProps) => {
    const filenameStyle: React.CSSProperties = {
        width: '80px',
        height: '30px',
        display: 'flex',
        margin: '10px',
        fontSize: '12px',
        overflow: 'hidden',
    }

    const bookStyle: React.CSSProperties = {
        width: '80px',
        display: 'block',
        margin: '10px',
    }

    const textBlockStyle = (textBlockMean: number): React.CSSProperties => {
        return {
            backgroundColor: `${d3.interpolateRdBu(1 - scale(textBlockMean))}`,
            width: '10px',
            height: '10px',
            float: 'left',
            boxSizing: 'border-box'
        }
    }
    

    let textBlocks = textBlockMeans.map((textBlockMean, i) => 
        <div key={i} style={textBlockStyle(textBlockMean)}></div>
    )

    return (
        <div>
            <div style={filenameStyle}>
                {filename}
            </div>
            <div style={bookStyle}>
                {textBlocks}
            </div>
        </div>
        
    )
}

export default BookRepresentation