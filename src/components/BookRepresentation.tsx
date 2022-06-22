import React from 'react'
import * as d3 from 'd3'
import { useState } from 'react'

interface BookRepresentationProps {
    textBlockMeans?: Array<number>
}

const BookRepresentation = ({textBlockMeans = []}: BookRepresentationProps) => {
    textBlockMeans = [234, 123, 432, 143, 423] // Apagar. Testes feitos para criar um 
    const bookStyle: React.CSSProperties = {
        width: '30px', 
        display: 'flex', 
        flexWrap: 'wrap', 
        margin: '10px'
    }
    const textBlockStyle: React.CSSProperties = {
        backgroundColor: 'yellow',
        width: '10px',
        height: '10px',
        margin: '0',
        border: 'solid 1px blue',
        boxSizing: 'border-box'
    }

    const scale = d3.scaleLinear()
        .domain([Math.min(...textBlockMeans), Math.max(...textBlockMeans)])
        .range([0, 1])
    

    let textBlocks = textBlockMeans.map((textBlockMean, i) => <div key={i} style={textBlockStyle}></div>)

    return (
        <div style={bookStyle}>
            {textBlocks}
        </div>
    )
}

export default BookRepresentation