import axios from 'axios';
import * as type from '../types';

interface AxiosResponse {
  data: type.Editor;
}

const baseURL = process.env.REACT_APP_FIREBASE_API;

// post
const postData = (dataType: string, data: any) => {
  console.log('%c in postData api', 'background: white; color: purple;',
  'dataType:', dataType, '\n',
  'data: ', data,
  );
  return axios.post<AxiosResponse>(`${baseURL}/${dataType}.json`, data);
};

const getData = (dataType: string) => {
  return axios.get<AxiosResponse>(`${baseURL}/${dataType}.json`)
};

export {
  postData,
  getData,
};


