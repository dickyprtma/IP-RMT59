import { NavLink } from "react-router";

function CourseCard(props) {
    const { title, sensei, desc, imageUrl, id } = props
    return (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-lg" src={imageUrl} alt="" />
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>

                <span className="bg-blue-200 py-1 px-2 rounded-md">{sensei}</span>

                <p class="mb-3 mt-2 font-normal text-gray-700 dark:text-gray-400">{desc}</p>
                <NavLink to={`/courses/${id}`} className={"inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>
                    Lihat Kursus
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </NavLink>
            </div>
        </div>

    )
}

export default CourseCard;