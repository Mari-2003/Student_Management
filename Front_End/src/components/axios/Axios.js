import axios from 'axios';

axios.interceptors.request.use(
    function (request) {
      const decryptToken = localStorage.getItem("accessToken");
      if (decryptToken) {
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${decryptToken}`,
          // 'Access-Control-Allow-Origin': '*',
        };
      }
      return request;
    },
    async function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    async function (successRes) {
      return successRes;
    },
    async function (error) {
      const { response } = error;
      if (response) {
        if (
          // response.data.status === 500 ||
          // response.data.status === 404 ||
          // response.data.status === 403 ||
          response.data.status === 401
        ) {
          window.localStorage.clear();
          window.sessionStorage.clear();
          window.location.href = "/choose";
        }
      }
      return Promise.reject(error);
    }
  );

  export const GET = async (url, params, response, error) => {
    try {
      const res = await axios.get(url, {
        params: params !== undefined ? params : {},
      });
      response(res);
    } catch (err) {
      error(err);
    }
  };
  
  export const POST = async (url, data, params, response, error) => {
    try {
        const res = await axios.post(url, data, {
            params: params !== undefined ? params : {},
        });
        response(res);
    } catch (err) {
        error(err);
    }
};
  
  export const PUT = async (url, data, params, response, error) => {
    try {
      const res = await axios.put(url, data, {
        params: params !== undefined ? params : {},
      });
      response(res);
    } catch (err) {
      error(err);
    }
  };
  
  export const DELETE = async (url, params, response, error) => {
    try {
      const res = await axios.delete(url, {
        params: params !== undefined ? params : {},
      });
      response(res);
    } catch (err) {
      error(err);
    }
  };

  export const GETAsync = async (url, params) => {
    try {
      const param = params !== undefined ? params : {};
      const response = await axios.get(url, {
        params: {
          ...param,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  