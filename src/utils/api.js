import store from '@redux/store';
import axios from 'axios';
import {handleExpiredToken, throttle} from './helper';

// axios.defaults.baseURL = 'http://192.168.1.55/baoan/thehoivien/website/api/v1';
axios.defaults.baseURL = 'https://thehoivien.thietkewebsite.info.vn/api/v1';

const getDataBody = config => {
  let data = '';
  if (
    config.data &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    for (const key in config.data) {
      data = data + `${key}=${config.data[key]}&`;
    }
    data = data.slice(0, data.length - 1);
  } else {
    data = config.data;
  }

  return data;
};

const _handleExpiredToken = throttle(handleExpiredToken, 300);

//TODO: REQUEST
axios.interceptors.request.use(
  config => {
    const data = getDataBody(config);
    if (__DEV__ && config.url) {
      console.log(
        `%c [REQUEST] ${config?.url}`,
        'color: #458B00; font-weight: bold',
        config,
      );
      console.log('url:', config.url);
      console.log('method:', config.method);
      console.log('data:', config.data);
      console.log('params:', config.params);
    }

    return {...config, data};
  },
  error => {
    return Promise.reject(error);
  },
);

//TODO: RESPONSE
axios.interceptors.response.use(
  response => {
    if (__DEV__ && response.config.url) {
      console.log(
        `%c [RESPONSE] ${response.config.url}`,
        'color: #CD950C; font-weight: bold',
        response,
      );
      console.log('status:', response.status);
      console.log('data:', response.data);
    }

    return response;
  },
  error => {
    if (__DEV__) {
      console.log(
        `%c [RESPONSE ERROR] ${error.config.url}`,
        'color: #EE3B3B; font-weight: bold',
        {dataHeader: error.config.data},
        {paramsHeader: error.config.params},
        JSON.stringify(error.response.data, null, 2),
      );
    }

    _handleExpiredToken(error);
    return Promise.reject(error);
  },
);

export default class HttpService {
  static generateHeader(headers) {
    const token = store.getState()?.appToken?.data;

    let options = {
      'Content-Type': headers || 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    };
    if (token !== null) {
      options = {
        ...options,
        Authorization: `Bearer ${token}`,
      };
    }

    return options;
  }

  //TODO: GET
  static async get(url, params = {}) {
    const language = store.getState()?.other?.lang;
    try {
      return await axios
        .get(url, {
          headers: {
            get: this.generateHeader(),
          },
          params: {...params, lang: language},
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }

  //TODO: POST
  static async post(url, body, params = {}) {
    const language = store.getState()?.other?.lang;
    try {
      return await axios
        .post(url, body, {
          headers: {
            post: this.generateHeader(),
          },
          params: {...params, lang: language},
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }

  //TODO: FORM_DATA
  static async postFormData(url, formData, params = {}) {
    const language = store.getState()?.other?.lang;
    try {
      return await axios
        .post(url, formData, {
          headers: {
            post: this.generateHeader('form-data'),
          },
          params: {...params, lang: language},
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }

  //TODO: PUT
  static async put(url, data) {
    try {
      return await axios
        .put(url, data, {
          headers: this.generateHeader(),
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }

  //TODO: PATCH
  static async patch(url, data) {
    try {
      return await axios
        .patch(url, data, {
          headers: this.generateHeader(),
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }

  //TODO: DELETE
  static async delete(url) {
    try {
      return await axios
        .delete(url, {
          headers: this.generateHeader(),
        })
        .then(response => response.data);
    } catch (error) {
      throw error.response;
    }
  }
}
