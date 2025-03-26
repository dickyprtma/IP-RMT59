import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { index } from "../store/kanjiSlice"
import axiosInstance from "../helpers/axiosInstance"
import Swal from "sweetalert2"

function KanjiPage() {
    const [romaji, setRomaji] = useState("")
    const [translateTextInput, setTranslateTextInput] = useState("")

    const [transliteration, setTransliteration] = useState("")
    const [translation, setTranslation] = useState("")

    const [transliterator, setTransliterator] = useState("romaji-kanji")
    const [translatorMode, setTranslatorMode] = useState("indonesia-japan")

    const onSubmitTransliteration = async () => {
        try {

            if (transliterator === "romaji-kanji") {
                const result = await axiosInstance({
                    method: "POST",
                    url: "/romaji-transliterator",
                    data: {
                        romaji: romaji
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                const responseBody = result.data
                console.log(responseBody)
                setTransliteration(responseBody.transliteration)
            } else {
                const result = await axiosInstance({
                    method: "POST",
                    url: "/kanji-transliterator",
                    data: {
                        kanji: romaji
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                const responseBody = result.data
                console.log(responseBody)
                setTransliteration(responseBody.transliteration)
            }


        } catch (error) {
            console.log(error)
        }
    }

    const onSubmitTranslation = async () => {
        try {
            if (translatorMode === "indonesia-japan") {
                const result = await axiosInstance({
                    method: "POST",
                    url: "/translate-to-japanese",
                    data: {
                        text: translateTextInput
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                const responseBody = result.data
                setTranslation(responseBody.translation)
            } else {
                const result = await axiosInstance({
                    method: "POST",
                    url: "/translate-to-indonesia",
                    data: {
                        text: translateTextInput
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
                const responseBody = result.data
                console.log(responseBody)
                setTranslation(responseBody.translation)
            }
        } catch (error) {

        }
    }

    const dispatch = useDispatch()
    const kanjiState = useSelector(function (state) {
        return state.kanjiReducer
    })

    const kanjis = kanjiState.data
    console.log(kanjis)

    useEffect(() => {
        dispatch(index())
    }, [])

    return (
        <section className="px-20">
            <div className="flex flex-col lg:flex-row justify-between mt-8">
                <div className="flex flex-row">
                    <div>
                        <div className="flex flex-row">
                            <h1 className="text-xl font-bold text-gray-800 mb-2">{(transliterator === "romaji-kanji") ? "Romaji to Kanji" : "Kanji to Romaji"}</h1>
                            <button onClick={() => {
                                if (transliterator === "romaji-kanji") {
                                    setTransliterator("kanji-romaji")
                                }
                                else {
                                    setTransliterator("romaji-kanji")
                                }
                            }} className="ms-4 bg-blue-200 rounded-md text-sm px-2 py-1">Ubah</button>
                        </div>
                        <div className="flex flex-row mt-2">
                            <input onChange={(e) => { setRomaji(e.target.value) }} className="px-2 py-1 border-2 rounded-md" placeholder="Masukkan romaji.." />
                            <button onClick={() => {
                                onSubmitTransliteration()
                            }} className="px-2 py-1 bg-blue-500 text-white rounded-md ml-2">Konversi</button>
                        </div>
                    </div>
                    <div className="flex items-end ms-2">
                        <input readOnly className="px-2 py-1 border-2 rounded-md bg-gray-100" placeholder="Transliterasi" value={transliteration} />

                    </div>
                </div>

                <div className="flex flex-row">
                    <div>
                        <div className="flex flex-row">
                            <h1 className="text-xl font-bold text-gray-800 mb-2">{(translatorMode === "indonesia-japan") ? "Terjemahan (IND - JPN)" : "Terjemahan (JPN - IND)"}</h1>
                            <button onClick={() => {
                                if (translatorMode === "indonesia-japan") {
                                    setTranslatorMode("japan-indonesia")
                                }
                                else {
                                    setTranslatorMode("indonesia-japan")
                                }
                            }} className="ms-4 bg-blue-200 rounded-md text-sm px-2 py-1">Ubah</button>
                        </div>
                        <div className="flex flex-row mt-2">
                            <input onChange={(e) => {
                                setTranslateTextInput(e.target.value)
                            }} className="px-2 py-1 border-2 rounded-md" placeholder="Masukkan teks.." />
                            <button onClick={() => {
                                onSubmitTranslation()
                            }} className="px-2 py-1 bg-blue-500 text-white rounded-md ml-2">Terjemahkan</button>
                        </div>
                    </div>
                    <div className="flex items-end ms-2">
                        <input readOnly className="px-2 py-1 border-2 rounded-md bg-gray-100" placeholder="Terjemahan" value={translation} />

                    </div>
                </div>
            </div>
            <div className="grid grid-cols-5  mt-8 gap-2">
                {kanjis.map((item) => {
                    return <div class=" bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-12 flex flex-col justify-center items-center">
                        <span className="text-center text-5xl font-medium">{item}</span>
                    </div>
                })}

            </div>

        </section>
    )
}

export default KanjiPage