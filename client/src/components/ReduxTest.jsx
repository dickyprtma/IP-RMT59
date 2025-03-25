import { useSelector } from "react-redux"

export default function ReduxTest() {
    const counter = useSelector((state) => state.counter)
    return (
        <div>{counter.value}</div>
    )
}
