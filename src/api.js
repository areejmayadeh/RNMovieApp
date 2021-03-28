import { sendRequest} from './connection';

export const getPopular =  async (body = {}) =>  {
    return await sendRequest(
        '/movie/popular',
        'GET',
        body
    );
}

export const getUpcomingMovies = async (body = {}) => {
    return await sendRequest(
        '/movie/upcoming',
        'GET',
        body
    );
}

export const getTopRatedMovies = async (body = {}) => {
    return await sendRequest(
        '/movie/top_rated',
        'GET',
        body
    );
}

export const getMoviesGenres = async (body = {}) => {
    return await sendRequest(
        '/genre/movie/list',
        'GET',
        {}
    );
}

export const getMovieDetails = async (body = {}) => {
    return await sendRequest(
        `/movie/${body.movie_id}`,
        'GET',
        body
    );
}