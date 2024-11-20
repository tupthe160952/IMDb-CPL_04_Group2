import React, { useState } from "react";
import axios from "axios";
import { Movie } from "../../types/Interface";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AddMovie.css"
interface Props {
    existingMovies: Movie[]; // Pass the existing movies as a prop
}

const AddMovie: React.FC<Props> = () => {
    const [movie, setMovie] = useState<Movie>({
        id: "",
        title: "",
        date: "",
        cast: [],
        genres: [],
        href: "",
        thumbnail: "",
        banner: "",
        overview: "",
        popularity: 0,
        vote_average: 0,
        vote_count: 0,
        trailer: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle numeric fields separately
        if (name === "popularity" || name === "vote_average" || name === "vote_count") {
            setMovie({ ...movie, [name]: Number(value) });
        } else if (name === "date") {
            // Ensure date is in the dd-mm-yyyy format
            setMovie({ ...movie, [name]: value });
        } else {
            setMovie({ ...movie, [name]: value });
        }
    };

    const handleArrayChange = (name: keyof Movie, value: string) => {
        // Handle genres as numbers if necessary
        if (name === "genres") {
            setMovie({ ...movie, [name]: value.split(",").map(item => Number(item.trim())) });
        } else {
            setMovie({ ...movie, [name]: value.split(",").map(item => item.trim()) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        // Convert the date to dd-mm-yyyy format
        const formattedDate = movie.date
            .split("-")
            .reverse()
            .join("-");

        // const newMovie = { ...movie, id: String(Date.now()) };
        const newMovie = { ...movie, id: String(Date.now()), date: formattedDate };

        try {
            // Make a POST request to add the new movie
            await axios.post("http://localhost:9999/movie", newMovie);
            alert("Movie added successfully!");

            // Reset the form after successful submission
            setMovie({
                id: "",
                title: "",
                date: "",
                cast: [],
                genres: [],
                href: "",
                thumbnail: "",
                banner: "",
                overview: "",
                popularity: 0,
                vote_average: 0,
                vote_count: 0,
                trailer: "",
            });
        } catch (error) {
            console.error("Error adding movie:", error);
            alert("Failed to add movie. Please try again.");
        }
    };

    return (
        <div className="container mt-5" style={{ padding: "0" }}>
    <h2 className="text-center mb-4 mt-4">Add a New Movie</h2>
    <div
        className="card mx-auto"
        style={{ backgroundColor: "#f9f9f9", padding: "20px",width: "100%"}}
    >
        <form onSubmit={handleSubmit} className="p-4 m-2">
            {/* Row 1 */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        className="form-control"
                        value={movie.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="date" className="form-label">
                        Release Date (dd/mm/yyyy)
                    </label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Release Date"
                        className="form-control"
                        value={movie.date}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Row 2 */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="cast" className="form-label">
                        Cast (comma separated)
                    </label>
                    <input
                        type="text"
                        name="cast"
                        id="cast"
                        placeholder="Cast (comma separated)"
                        className="form-control"
                        value={movie.cast.join(", ")}
                        onChange={(e) => handleArrayChange("cast", e.target.value)}
                    />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="genres" className="form-label">
                        Genres (comma separated IDs)
                    </label>
                    <input
                        type="text"
                        name="genres"
                        id="genres"
                        placeholder="Genres (comma separated IDs)"
                        className="form-control"
                        value={movie.genres.join(", ")}
                        onChange={(e) => handleArrayChange("genres", e.target.value)}
                    />
                </div>
            </div>

            {/* Row 3 */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="href" className="form-label">
                        Href
                    </label>
                    <input
                        type="text"
                        name="href"
                        id="href"
                        placeholder="Href"
                        className="form-control"
                        value={movie.href}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="thumbnail" className="form-label">
                        Thumbnail URL
                    </label>
                    <input
                        type="text"
                        name="thumbnail"
                        id="thumbnail"
                        placeholder="Thumbnail URL"
                        className="form-control"
                        value={movie.thumbnail}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Row 4 */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="banner" className="form-label">
                        Banner URL
                    </label>
                    <input
                        type="text"
                        name="banner"
                        id="banner"
                        placeholder="Banner URL"
                        className="form-control"
                        value={movie.banner}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="overview" className="form-label">
                        Overview
                    </label>
                    <textarea
                        name="overview"
                        id="overview"
                        placeholder="Overview"
                        className="form-control"
                        value={movie.overview}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px",
                        }}
                        required
                    />
                </div>
            </div>

            {/* Row 5 */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="popularity" className="form-label">
                        Popularity
                    </label>
                    <input
                        type="number"
                        name="popularity"
                        id="popularity"
                        placeholder="Popularity"
                        className="form-control"
                        value={movie.popularity}
                        onChange={handleChange}
                        step="1"
                    />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="vote_average" className="form-label">
                        Vote Average
                    </label>
                    <input
                        type="number"
                        name="vote_average"
                        id="vote_average"
                        placeholder="Vote Average"
                        className="form-control"
                        value={movie.vote_average}
                        onChange={handleChange}
                        step="1"
                    />
                </div>
            </div>

            {/* Row 6 */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="vote_count" className="form-label">
                        Vote Count
                    </label>
                    <input
                        type="number"
                        name="vote_count"
                        id="vote_count"
                        placeholder="Vote Count"
                        className="form-control"
                        value={movie.vote_count}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 col-md-6 mb-3">
                    <label htmlFor="trailer" className="form-label">
                        Trailer URL
                    </label>
                    <input
                        type="text"
                        name="trailer"
                        id="trailer"
                        placeholder="Trailer URL"
                        className="form-control"
                        value={movie.trailer}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: "center", marginTop:"15px" }}>
                <button type="submit" className="btn btn-primary">
                    Add Movie
                </button>
            </div>
        </form>
    </div>
</div>

    );
};

export default AddMovie;