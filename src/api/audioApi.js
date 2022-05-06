import {postRequest} from './utils';

export const audioComparison = data => postRequest('/predict-audio/', data);
