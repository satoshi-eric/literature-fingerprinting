const mean = (numbers: Array<number>) => {
    let sum = 0
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }
    return sum/numbers.length
}

const splitTextBlocks = (text: string = '', n: number = 3, paragraphSeparator: string | RegExp = '\n') => {
    const formatedText = text.replace(/[\r]/g, '')
    let paragraphs = formatedText.split(paragraphSeparator)
    let blocks = []
    let currentBlock = ''
    for (let i = 0; i < paragraphs.length + 1; i++) {
        if (i % n === 0 && i !== 0) {
            blocks.push(currentBlock)
            currentBlock = ''
        }
        if (i === paragraphs.length) {
            blocks.push(currentBlock)
        } else {
            currentBlock += paragraphs[i]
        }
    }
    let sentencesMeans = []
    for (let i = 0; i < blocks.length; i++) {
        let currentSentences = blocks[i].split('.').filter(block => block)
        let sentecesLengths = currentSentences.map(text => text.length)
        let sentenceMean = mean(sentecesLengths)
        sentencesMeans.push(sentenceMean)
    }
    sentencesMeans = sentencesMeans.filter(sentenceMean => !isNaN(sentenceMean))
    return sentencesMeans
}

export default splitTextBlocks