import axios from 'axios';

/*Sätter samma baseURL för alla API-anrop, Alla anrop via axios går nu
automatiskt mot backendens API. */
axios.defaults.baseURL = 'http://localhost:5000/api';

export default axios;