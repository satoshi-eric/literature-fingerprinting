import React, { ChangeEvent, useState } from 'react';
import LiteratureFingerprinting from './components/LiteratureFingerprinting';

function App() {
  const parseErrorStyle = {color: 'red', display: 'inline', marginLeft: '10px'}
  const noParseErrorStyle = {display: 'none'}
  const fileInputStyle = {display: 'flex', marginTop: '10px'}


  const [blockValue, setBlockValue] = useState(10)
  const [parseError, setParseError] = useState(false)
  const [texts, setTexts] = useState<Array<string>>([])
  const [filenames, setFilenames] = useState<Array<string>>([])

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

  const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as ArrayLike<File>);
    setFilenames(files.map(file => file.name))
      getFiles(files).then(texts => {
        setTexts(texts)
    })
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
      <h1>Literature Fingerprinting</h1>
      <div>
        <div style={fileInputStyle} >
          <label htmlFor="value-block">Number of paragraphs per blocks: </label>
          <input style={{marginLeft: '10px'}} type="text" id='value-block' onChange={(event) => handleChangeBlockValue(event)} />
        </div>
        <input style={{marginTop: '10px'}} onChange={(event) => handleFileInputChange(event)} type="file" multiple={true} />
        <div style={parseError ? parseErrorStyle : noParseErrorStyle}>Digite um número.</div>
      </div>
      <div>
        <LiteratureFingerprinting n={blockValue} texts={texts} filenames={filenames}  />
      </div>
    </div>
  );
}

export default App;
