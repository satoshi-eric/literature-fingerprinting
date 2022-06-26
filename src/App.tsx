import React, { ChangeEvent, useState } from 'react';
import LiteratureFingerprinting from './components/LiteratureFingerprinting';
import * as d3 from 'd3'

function App() {
  const parseErrorStyle = {color: 'red', display: 'inline', marginLeft: '10px'}
  const noParseErrorStyle = {display: 'none'}
  const fileInputStyle = {display: 'flex'}
  const gradientBarStyle: React.CSSProperties = {
    marginTop: '10px',
    width: '400px',
    height: '20px',
    background: `linear-gradient(90deg, 
      ${d3.interpolateRdBu(1)} 0%, 
      ${d3.interpolateRdBu(0.9)} 10%, 
      ${d3.interpolateRdBu(0.8)} 20%, 
      ${d3.interpolateRdBu(0.7)} 30%,
      ${d3.interpolateRdBu(0.6)} 40%, 
      ${d3.interpolateRdBu(0.5)} 50%, 
      ${d3.interpolateRdBu(0.4)} 60%,
      ${d3.interpolateRdBu(0.3)} 70%, 
      ${d3.interpolateRdBu(0.2)} 80%,
      ${d3.interpolateRdBu(0.1)} 90%,
      ${d3.interpolateRdBu(0)} 100%
    )`,
  }

  const [blockValue, setBlockValue] = useState(10)
  const [parseError, setParseError] = useState(false)
  const [texts, setTexts] = useState<Array<string>>([])

  const handleChangeBlockValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    if (isNaN(value)) {
      setParseError(true)
      setBlockValue(1)
    } else {
      setBlockValue(value)
      setParseError(false)
    }
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as ArrayLike<File>);
    getFiles(files).then(texts => setTexts(texts))
  }

  const getFiles = async (files: Array<File>) => {
    const texts = await Promise.all(files.map(async (file) => {
      const text = await file.text()
      return text
    }))
    return texts
  }

  return (
    <div>
      <div>
        <label htmlFor="value-block">Número de parágrafo por bloco: </label>
        <input type="text" id='value-block' onChange={(event) => handleChangeBlockValue(event)} />
        <input style={fileInputStyle} onChange={(event) => handleFileInputChange(event)} type="file" multiple={true} />
        <div style={parseError ? parseErrorStyle : noParseErrorStyle}>Digite um número.</div>
        <div style={gradientBarStyle}></div>
      </div>
      <div>
        <LiteratureFingerprinting n={blockValue} texts={texts} />
      </div>
    </div>
  );
}

export default App;
