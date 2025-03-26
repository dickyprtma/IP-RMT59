import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { show } from "../store/coursesSlice";
import { index } from "../store/materialSlice";
import { index as indexUserCourse, toggleUserCourse } from "../store/userCourseSlice";
import dotcircle from "../assets/dot-circle.svg"
import Swal from "sweetalert2";

function DetailCourse() {

    // redux store -> reducer -> state

    const dispatch = useDispatch()
    const courseReduxState = useSelector(function (state) {
        return state.courses
    })
    const userId = localStorage.getItem("user_id")

    const materialState = useSelector(function (state) {
        return state.materialReducer
    })

    const userCourseState = useSelector(function (state) {
        return state.userCourseReducer
    })
    console.log(JSON.stringify(userCourseState.isEnrolled))

    const { courseId } = useParams()

    const course = courseReduxState.course
    const materials = materialState.data

    useEffect(() => {
        dispatch(show(courseId))
        dispatch(index(courseId))
        dispatch(indexUserCourse({ courseId, userId }))
    }, [])

    const handleToggleEnrollment = () => {
        dispatch(toggleUserCourse({ courseId, userId }))
    }

    const handleVideoClick = (e, videoUrl) => {
        if (!userCourseState.isEnrolled) {
            e.preventDefault()
            Swal.fire("Gagal", "Anda harus mengambil kursus terlebih dahulu", "error")
        } else {
            window.open(videoUrl, "_blank")
        }
    }

    return (
        <div className="lg:px-20 pb-20 py-8">
            <div class="max-w-[85rem] mx-auto">
                <div class="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                    <div>
                        <h1 class="block text-2xl font-bold text-gray-800 sm:text-4xl lg:text-5xl lg:leading-tight dark:text-white">{course.title}</h1>
                        <p class="mt-3 text-lg text-gray-800 dark:text-neutral-400">{course.desc}</p>

                        <div class="mt-7 grid gap-3 w-full sm:inline-flex">
                            <button onClick={() => {
                                handleToggleEnrollment()
                            }} className={`py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-white ${userCourseState.isEnrolled ? 'bg-red-500' : 'bg-blue-500'}`}>
                                {userCourseState.isEnrolled ? "Keluar Kursus" : "Ambil Kursus"}
                                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </button>
                            <button onClick={() => {
                                Swal.fire("Info", `${course.desc}`, "info")
                            }} class="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                                Selengkapnya
                            </button>
                        </div>

                    </div>

                    <div class="relative ms-4">
                        <img class="w-full rounded-md" src={course.imageUrl} alt="Hero Image" />
                        <div class="absolute inset-0 -z-1 bg-linear-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>
                    </div>
                </div>
            </div>

            <h1 class="block text-2xl font-bold text-gray-800 sm:text-2xl lg:text-2xl lg:leading-tight dark:text-white mt-20 text-center mb-8">Materi</h1>

            {materials.map((item, i) => {
                return <div class="group relative flex gap-x-5">
                    <div class="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                        <div class="relative z-10 size-6 flex justify-center items-center">
                            <img src={dotcircle} />
                        </div>
                    </div>
                    <div class="grow pb-8 group-last:pb-0">
                        <div class="mt-3 ">
                            <a onClick={(e) => handleVideoClick(e, item.videoUrl)} class="block border border-gray-200 rounded-lg hover:shadow-2xs focus:outline-hidden dark:border-neutral-700 cursor-pointer">
                                <div class="relative flex items-center overflow-hidden">
                                    <img class="w-32 sm:w-48 h-full absolute inset-0 object-cover rounded-s-lg" src={item.imageUrl} alt="Blog Image" />

                                    <div class="grow p-4 ms-32 sm:ms-48">
                                        <div class="min-h-24 flex flex-col justify-center">
                                            <h3 class="font-semibold text-sm text-gray-800 dark:text-neutral-300">
                                                {item.title}
                                            </h3>

                                            <div className="flex flex-row">
                                                <span class="bg-blue-200 py-1 px-2 rounded-md text-center text-sm self-start inline-block mt-1 mb-1 ms-2">
                                                    {item.duration}
                                                </span>


                                            </div>
                                            <p class="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            })}




        </div>
    )
}

export default DetailCourse