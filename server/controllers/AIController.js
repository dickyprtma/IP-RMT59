const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

class AIController {
    static async romajiToKanji(req, res, next) {
        try {
            const { romaji } = req.body

            if (!romaji) {
                return res.status(400).json({
                    message: "Inputan tidak boleh kosong"
                })
            }

            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `berikan transliterasi untuk romaji '${romaji}' ke bentuk kanjinya. berikan response hanya kanjinya saja. jika yang diinputkan bukan romaji maka berikan repsponse huruf itu sendiri`,
            });

            res.json({
                transliteration: response.text.replace(/\n/g, '')
            })
            console.log(response)
        } catch (error) {
            next(error)
        }
    }

    static async kanjiToRomaji(req, res, next) {
        try {
            const { kanji } = req.body

            if (!kanji) {
                return res.status(400).json({
                    message: "Inputan tidak boleh kosong"
                })
            }

            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `berikan transliterasi untuk kanji '${kanji}' ke bentuk romajinya. berikan response hanya romajinya saja. jika yang diinputkan bukan kanji maka berikan response '400:badrequest'`,
            });

            if (response.text.replace(/\n/g, '') === "400:badrequest") {
                return res.status(400).json({
                    message: "Inputan bukan kanji"
                })
            }

            res.json({
                transliteration: response.text.replace(/\n/g, '')
            })
            console.log(response)
        } catch (error) {
            next(error)
        }
    }

    // translate from indonesia to japanese
    static async translateToJapanese(req, res, next) {
        try {
            const { text } = req.body

            if (!text) {
                return res.status(400).json({
                    message: "Inputan tidak boleh kosong"
                })
            }

            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `terjemahkan '${text}' ke bahasa jepang. berikan response hanya terjemahannya saja`,
            });
            res.json({
                translation: response.text.replace(/\n/g, '')
            })
            console.log(response)
        } catch (error) {
            next(error)
        }
    }

    // translate from japanese to indonesia
    static async translateToIndonesia(req, res, next) {
        try {
            const { text } = req.body

            if (!text) {
                return res.status(400).json({
                    message: "Inputan tidak boleh kosong"
                })
            }

            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `terjemahkan '${text}' ke bahasa indonesia. berikan response hanya terjemahannya saja`,
            });
            res.json({
                translation: response.text.replace(/\n/g, '')
            })
            console.log(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AIController