
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/user",
  withCredentials: true,
});

const DOCAPI = axios.create({
  baseURL: "http://localhost:5000/api/v1/doctor",
  withCredentials: true,
});

// Attach access token to outgoing requests
const attachToken = (instance, storageKey) => {
  instance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem(storageKey);

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

attachToken(API, "accessToken");
attachToken(DOCAPI, "doctorAccessToken");

// Handle expired access tokens independently
const setupRefreshInterceptor = ({
  instance,
  refreshUrl,
  storageKey,
  responseTokenKey,
}) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        originalRequest.url?.includes("/refresh-token")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Use plain axios to avoid triggering this interceptor recursively
        const res = await axios.post(
          refreshUrl,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data[responseTokenKey];

        if (!newAccessToken) {
          throw new Error(
            `Refresh response is missing "${responseTokenKey}"`
          );
        }

        sessionStorage.setItem(storageKey, newAccessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        sessionStorage.removeItem(storageKey);
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }
  );
};

// User refresh configuration
setupRefreshInterceptor({
  instance: API,
  refreshUrl: "http://localhost:5000/api/v1/user/refresh-token",
  storageKey: "accessToken",
  responseTokenKey: "accessToken",
});

// Doctor refresh configuration
setupRefreshInterceptor({
  instance: DOCAPI,
  refreshUrl: "http://localhost:5000/api/v1/doctor/refresh-token",
  storageKey: "doctorAccessToken",
  responseTokenKey: "doctorAccessToken",
});

export { API, DOCAPI };
export default { API, DOCAPI };
