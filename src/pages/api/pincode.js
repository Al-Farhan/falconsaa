export default function handler(req, res) {

    let pincodes = {
        "400612": ["Mumbra", "Maharashtra"],
        "276129": ["Ausatpur", "Uttar pradesh"],
    }

    res.status(200).json(pincodes)
}