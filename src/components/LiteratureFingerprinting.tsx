import splitTextBlocks from "../utils/splitTextBlocks"
import BookRepresentation from "./BookRepresentation"

interface literatureFingerprintingProps {
    texts?: Array<string>,
    n?: number
}

const LiteratureFingerprinting = ({texts = [''], n = 3}: literatureFingerprintingProps) => {

    const literatureFingerprintingStyle: React.CSSProperties = {
        display: 'flex'
    }

    texts = []
    let textsSplits = texts.map(text => splitTextBlocks(text, n))

    return (
        <div style={literatureFingerprintingStyle}>
            <BookRepresentation />
            <BookRepresentation />
        </div>
    )
}

export default LiteratureFingerprinting