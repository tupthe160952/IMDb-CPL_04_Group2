export default interface Genre {
  user_rating: number;
  popularity: number;
  vote_count: number;
  id: number;
  name: string;
}

export default interface GenreDetail {
  id: number;
  name: string;
  image: string;
  description: string;
}

export default interface CardProps {
  id: number;
  image: string;
  rating: string | number;
  name: string;
}

export default interface SliderProps {
  id: number;
  title: string;
  extract: string;
  thumbnail: string;
  banner: string;
  vote_average: number;
  trailer: string;
  genres: number[];
}

export default interface Genders {
  id: number;
  name: string;
}

export default interface Celebs {
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  genders: number;
  popularity: number;
  profile_path: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  known_for: string;
}

// export interface Movie {
//   id: number;
//   title: string;
//   date: string;
//   cast: string[];
//   genres: number[];
//   href: string;
//   extract: string;
//   thumbnail: string;
//   banner: string;
//   overview: string;
//   popularity: number;
//   vote_average: number;
//   vote_count: number;
//   trailer: string;
// }

// export interface WatchlistItem {
//   id: number;
//   userId: number;
//   movieId: number;
// }
