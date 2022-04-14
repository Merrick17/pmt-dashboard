import axios from 'axios';

const BASE_URL = 'http://192.168.1.162:3500';

export const postApi = async (url, body, config = {}) => {
  try {
    let result = await axios.post(`${BASE_URL}/${url}`, body, config);
    console.log('Result', result.data);
    return result.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const putApi = async (url, body, config = {}) => {
  try {
    let result = await axios.put(`${BASE_URL}/${url}`, body, config);
    return result.data;
  } catch (error) {
    console.error(error.message);
  }
};

export const getApi = async (url, config = {}) => {
  try {
    let result = await axios.get(`${BASE_URL}/${url}`, config);
    console.log('Result', result.data);
    return result.data;
  } catch (error) {
    console.error(error.message);
  }
};
