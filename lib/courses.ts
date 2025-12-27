import coursesData from "@/data/courses.json";
import { Course } from "@/types";

export function getAllCourses(): Course[] {
  if (!coursesData) return [];
  return coursesData as Course[];
}

export function getCourseBySlug(slug: string): Course | undefined {
  const data = coursesData as Course[];

  if (!data) return undefined;

  return (coursesData as Course[]).find((course) => course.slug === slug);
}
