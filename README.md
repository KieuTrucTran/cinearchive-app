# CineArchive

**CineArchive** is a movie discovery web app built with **React**, **Redux**, and **Tailwind CSS**, powered by the [TMDB API](https://www.themoviedb.org/).
Users can explore trending, popular, top-rated, and upcoming movies, search, filter and sort movies by various criteria, and manage personal favorites and watchlists. The app is responsive and supports dark mode for a modern user experience.

Live Demo
[cinearchive-app.vercel.app](https://cinearchive-app.vercel.app/)

![CineArchive Live Demo](public/img/CineArchive_liveDemo.gif)

## Features

### Discover & Explore

- **Home Page:** Displays trending movies.
- **Movies Page:** Browse all movies with filter and sort options (by genre, popularity, rating, etc.).
- **Search Page:** Search movies by title or keywords.
- **Movie Detail Page:** Posters, trailers, cast, genres, providers, and similar movies.

### State Management

- Global state with **Redux Toolkit**.
- Favorites & watchlist stored persistently in **localStorage**.

### Theming & UI

- Full **Dark Mode** support (toggleable, persisted).
- **TailwindCSS**-powered responsive UI with reusable components.

### TMDB API Integration

- Supports:
  - Real-time search
  - Genre filtering
  - Trending / Popular / Top Rated / Upcoming endpoints
  - Movie trailers, cast, and related titles

### Navigation

- Pages: `Home`, `Movies`, `Search`, `Favorites`, `Watchlist`, `Details`
- Routing with **React Router v6**

---

## Tech Stack

| Tech               | Usage                       |
| ------------------ | --------------------------- |
| React + TypeScript | Core UI Framework           |
| React Router       | Routing between pages       |
| Redux Toolkit      | Global state management     |
| Tailwind CSS       | Styling & responsive layout |
| TMDB API           | Movie data & search         |
| React Icons        | UI icons                    |

---

## Planned Features

- Movie rating & reviews
- Rewatch, like/dislike system
- User authentication (login, signup, guest mode)
- Movie stats & analytics dashboard
- Personalized recommendation engine
- **"Movie Decider"** – Random pick from your watchlist

---

## Getting Started

### 1. Clone the repo

```
git clone https://github.com/yourusername/cinearchive.git
cd cinearchive
```

## Local Development

1. Clone the repository
   ```
   git clone https://github.com/KieuTrucTran/cinearchive-app.git
   cd cinearchive
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Set up environment variables

   - Create a `.env` file in the root directory:
     `REACT_APP_MOVIE_KEY=your_tmdb_api_key`
   - Get your API key from TMDB.

4. Start development server

   ```
   npm run dev
   ```

5. Deployment
   - App is deployed using [Vercel](https://vercel.com/)

## Resources & Inspirations

- YouTube Tutorial – [Build a Movie App with Redux Toolkit, TypeScript, Tailwind CSS, and React](https://youtu.be/Ha2u6H_Y-Zg?si=hXJ-pQv5skkhLkQW)
- GitHub repos:
  - [laribright/movie-app-yt](https://github.com/laribright/movie-app-yt/)
  - [jameshnl232/Redux-ToolKit-Movies-Streaming-Project](https://github.com/jameshnl232/Redux-ToolKit-Movies-Streaming-Project)
- TMDB API Docs – [The Movie Database Developer Portal](https://developer.themoviedb.org/docs/getting-started)
