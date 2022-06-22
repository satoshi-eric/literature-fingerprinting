import React, { ChangeEvent, useState } from 'react';
import LiteratureFingerprinting from './components/LiteratureFingerprinting';
import splitTextBlocks from './utils/splitTextBlocks';

function App() {
  const parseErrorStyle = {color: 'red', display: 'inline', marginLeft: '10px'}
  const noParseErrorStyle = {display: 'none'}

  const [blockValue, setBlockValue] = useState(1)
  const [parseError, setParseError] = useState(false)

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

  return (
    <div>
      <div>
        <label htmlFor="value-block">Número de parágrafo por bloco: </label>
        <input type="text" id='value-block' onChange={(event) => handleChangeBlockValue(event)} />
        <div style={parseError ? parseErrorStyle : noParseErrorStyle}>Digite um número.</div>
      </div>
      <div>
        <LiteratureFingerprinting />
      </div>
    </div>
  );
}

export default App;
