import axios from 'axios';

export const http = axios.create({
  withCredentials: true
});


export const noCredentialsHttp = axios.create();