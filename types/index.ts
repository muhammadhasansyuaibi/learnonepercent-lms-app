export interface Lesson {
  id: number;
  title: string;
  description: string;
  sequence_order: number;
  youtube_embed_url: string;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  slug: string;
  modules: Module[];
}
