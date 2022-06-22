const mean = (numbers: Array<number>) => {
    let sum = 0
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }
    return sum/numbers.length
}

const splitTextBlocks = (text: string = '', n: number = 3) => {
    
    let paragraphs = text.split('\n')
    let blocks = []
    let currentBlock = ''
    for (let i = 0; i < paragraphs.length + 1; i++) {
        if (i % 3 === 0 && i !== 0) {
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
    return sentencesMeans
}

export default splitTextBlocks