import axios from 'axios';

const API_KEY = '20386006-9675b11da888a7538d51ef351';
axios.defaults.baseURL = `https://pixabay.com/`;

const fetchHits = ({query, page}) => {
  return axios
    .get(
      `/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data);
   
};

const fetch = { fetchHits };
export default fetch;
