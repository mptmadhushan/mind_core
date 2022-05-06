import {postRequest} from './utils';

export const sketchApi = data => postRequest('/predict-sketch/', data);
