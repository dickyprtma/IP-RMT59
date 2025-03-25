import CourseCard from "../components/CourseCard"

function CoursesPage() {
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