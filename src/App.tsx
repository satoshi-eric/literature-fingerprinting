import React, { ChangeEvent, useState } from 'react';
import LiteratureFingerprinting from './components/LiteratureFingerprinting';
import * as d3 from 'd3'

function App() {
  const parseErrorStyle = {color: 'red', display: 'inline', marginLeft: '10px'}
  const noParseErrorStyle = {display: 'none'}
  const fileInputStyle = {display: 'flex'}

  const [blockValue, setBlockValue] = useState(1)
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
      </div>
      <div>
        <LiteratureFingerprinting n={blockValue} texts={texts} />
      </div>
    </div>
  );
}

export default App;
