import axios from 'react-native-axios';
export const sendRequest = (url, method, body) => {
    const API_KEY = '557d0d8ed097d1bb8a2ab96f45417952';
    if(method == 'GET') {
    return axios.get('https://api.themoviedb.org/3' + url, {
        params: {
            ...body, 
            'api_key': API_KEY
        }
      })
    }
}