import Link from "next/link";
import { getAllCourses } from "@/lib/courses";

export default function Home() {
  const courses = getAllCourses();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Selamat Datang di LOPED Course <br />
          <span className="text-green-600">"Learn One Percent Every Day"</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            // --- LOGIKA BARU: MENGHITUNG TOTAL LESSON ---
            // Kita gunakan fungsi 'reduce' untuk menjumlahkan isi lesson di setiap module
            const totalLessons = course.modules.reduce((total, module) => {
              return total + module.lessons.length;
            }, 0);
            // ---------------------------------------------

            return (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col h-full">
                  {/* Thumbnail */}
                  <div className="h-48 bg-gray-200 w-full relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    {/* --- TAMPILAN BARU: Badge Jumlah Materi --- */}
                    <div className="mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {totalLessons} Materi Video
                      </span>
                    </div>
                    {/* ------------------------------------------ */}

                    <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
                      {course.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                      {course.description}
                    </p>

                    {/* Opsional: Tombol Text di bawah */}
                    <div className="mt-auto text-blue-600 text-sm font-medium">
                      Lihat Detail &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          href="https://web.telegram.org/a/#-4845240042"
          className="mt-10 inline-block bg-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition shadow-lg shadow-blue-200"
        >
          Gabung Grub Telegram "Saham bangil"
        </Link>
      </div>
    </main>
  );
}
