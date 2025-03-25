import CourseCard from "../components/CourseCard"
import { useDispatch, useSelector } from "react-redux"
import axiosInstance from "../helpers/axiosInstance"
import { useEffect } from "react"

function CoursesPage() {
    const dispatch = useDispatch()
    const courseRedux = useSelector((state) => state.courses)

    const fetchData = async () => {
        try {
            const result = await axiosInstance({
                method: 'GET',
                url: '/courses',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQyOTAwNDA4fQ.HD18APGTpiyd6rTHEJBshECBXNzQkvhq8SYUI9X-H3U'
                }
            })
            const response = result.data
            // dispatch({ type: 'SET_COURSES', payload: data })
            console.log(response)
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchData()
    })

    return (
        <section>
            <div className="grid grid-cols-3 px-20 mt-8">
                <CourseCard />
                <CourseCard />
                <CourseCard />

            </div>

        </section>
    )
}

export default CoursesPage