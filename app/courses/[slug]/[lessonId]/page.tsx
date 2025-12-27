import { getCourseBySlug } from "@/lib/courses";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lesson } from "@/types";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  // 1. Bongkar parameter (wajib di Next.js 16)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const lessonId = resolvedParams.lessonId;

  // 2. Ambil data course
  const course = getCourseBySlug(slug);

  if (!course) return notFound();

  const activeLessonId = parseInt(lessonId);

  let activeLesson: Lesson | any = null;

  // 3. Cari lesson di dalam module
  if (course.modules) {
    course.modules.forEach((mod) => {
      const found = mod.lessons.find((l) => l.id === activeLessonId);
      if (found) {
        activeLesson = found;
      }
    });
  }

  // 4. Jika lesson tidak ketemu, return 404
  if (!activeLesson) return notFound();

  // 5. Render Halaman
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="flex-1 lg:w-3/4 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/courses/${slug}`}
            className="text-sm text-blue-600 hover:underline mb-4 block"
          >
            &larr; Kembali ke Course
          </Link>

          <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg mb-6">
            <iframe
              width="100%"
              height="100%"
              src={activeLesson.youtube_embed_url}
              title={activeLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {activeLesson.title}
          </h1>
          <p className="text-gray-600">{activeLesson.description}</p>
        </div>
      </div>

      <div className="lg:w-1/4 bg-white border-l border-gray-200 h-auto lg:h-screen lg:overflow-y-auto">
        <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h3 className="font-bold text-gray-800">{course.title}</h3>
          <p className="text-xs text-gray-500">Daftar Materi</p>
        </div>

        <div className="p-4 space-y-6">
          {course.modules.map((module) => (
            <div key={module.id}>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                {module.title}
              </h4>
              <div className="space-y-2">
                {module.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${slug}/${lesson.id}`}
                      className={`block p-3 rounded-lg text-sm transition ${
                        isActive
                          ? "bg-blue-50 text-blue-700 font-medium border border-blue-100"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <div className="flex gap-2">
                        <span className="opacity-50">
                          {lesson.sequence_order}.
                        </span>
                        <span>{lesson.title}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
