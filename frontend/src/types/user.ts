export type User = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  favourites: favourite[];
  school: string;
};

export type Subject =
  | "Math"
  | "Science"
  | "History"
  | "English"
  | "Art"
  | "Music"
  | "Physical Education"
  | "Computer Science"
  | "Foreign Languages"
  | "";

export type Post = {
  _id: string;
  description: string;
  title: string;
  subject: Subject;
  gcs_url: string;
  created_at: string;
  poster: poster;
  is_favorited: boolean;
};

type poster = {
  _id: string;
  first_name: string;
  last_name: string;
  school: string;
};

type favourite = {
  _id: string;
  subject: Subject;
  gcs_url: string;
  created_at: string;
};
