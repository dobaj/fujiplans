export type User = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  favourites: favourite[];
  school: string;
};

export type Post = {
  _id: string;
  description: string;
  title: string;
  subject: string;
  gcs_url: string;
  created_at: string;
  poster: poster;
};

type poster = {
  _id: string;
  first_name: string;
  last_name: string;
  school: string;
};

type favourite = {
  _id: string;
  subject: string;
  gcs_url: string;
  created_at: string;
};
