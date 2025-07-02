import MovieCard from "./MovieCard";

const MovieList = ({title,movies}) => {
    return movies && (
        <div className="px-6 py-4">
            <h1 className="text-white font-bold text-2xl">{title}</h1>
            <div className="flex overflow-x-scroll scrollbar-hide">
                <div className="flex py-2 gap-6 rounded-md">
                   {movies.map((movie) => <MovieCard key={movie.id}posterPath={movie.poster_path}/>)}
                </div>
            </div>
        </div>
    )
}
export default MovieList;