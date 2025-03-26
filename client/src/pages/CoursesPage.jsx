import CourseCard from "../components/CourseCard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCourses } from "../store/coursesSlice"

function CoursesPage() {
    const dispatch = useDispatch()
    const courseReduxState = useSelector(function (state) {
        return state.courses
    })
    const courses = courseReduxState.data

    // console.log(JSON.stringify(courseReduxState.responseBody)) // response body
    // console.log(courseReduxState.data)

    useEffect(() => {
        dispatch(fetchCourses())
    }, [])

    return (
        <section>
            <div className="grid grid-cols-3 px-20 mt-8">
                {courses.map((item, i) => {
                    return <CourseCard imageUrl={item.imageUrl} title={item.title} sensei={item.sensei} desc={item.desc} id={item.id} />
                })}

            </div>

        </section>
    )
}

export default CoursesPage