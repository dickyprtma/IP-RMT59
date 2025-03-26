import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { index } from "../store/kanjiSlice"

function KanjiPage() {
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
                            <h1 className="text-xl font-bold text-gray-800 mb-2">Romaji to Kanji</h1>
                            <button className="ms-4 bg-blue-200 rounded-md text-sm px-2 py-1">Ubah</button>
                        </div>
                        <div className="flex flex-row mt-2">
                            <input className="px-2 py-1 border-2 rounded-md" placeholder="Masukkan romaji.." />
                            <button className="px-2 py-1 bg-blue-500 text-white rounded-md ml-2">Konversi</button>
                        </div>
                    </div>
                    <div className="flex items-end ms-2">
                        <input readOnly className="px-2 py-1 border-2 rounded-md bg-gray-100" placeholder="Transliterasi" />

                    </div>
                </div>

                <div className="flex flex-row">
                    <div>
                        <div className="flex flex-row">
                            <h1 className="text-xl font-bold text-gray-800 mb-2">Terjemahan (IND - JPN)</h1>
                            <button className="ms-4 bg-blue-200 rounded-md text-sm px-2 py-1">Ubah</button>
                        </div>
                        <div className="flex flex-row mt-2">
                            <input className="px-2 py-1 border-2 rounded-md" placeholder="Masukkan romaji.." />
                            <button className="px-2 py-1 bg-blue-500 text-white rounded-md ml-2">Konversi</button>
                        </div>
                    </div>
                    <div className="flex items-end ms-2">
                        <input readOnly className="px-2 py-1 border-2 rounded-md bg-gray-100" placeholder="Transliterasi" />

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