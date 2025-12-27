// FILE: src/app/courses/[slug]/page.tsx

import { getCourseBySlug } from "@/lib/courses";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CourseOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = getCourseBySlug(slug); // Ambil data course berdasarkan slug

  if (!course) return notFound();

  // Ambil lesson pertama untuk tombol "Mulai Belajar"
  const firstLessonId = course.modules[0]?.lessons[0]?.id;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm max-w-2xl w-full text-center border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {course.title}
        </h1>
        <p className="text-gray-600 mb-8 text-lg">{course.description}</p>

        {firstLessonId ? (
          <Link
            href={`/courses/${slug}/${firstLessonId}`}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Mulai Belajar Sekarang
          </Link>
        ) : (
          <p className="text-red-500">Materi belum tersedia.</p>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100">
          <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
