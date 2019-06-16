const axios = require("axios");

class NobodySurf {
  constructor() {
    this.request = axios.create({
      baseURL: "https://api.nobodysurf.com",
      headers: {
        "User-Agent": "NobodySurf/3.0.10/30010"
      }
    });
    this.accessToken = null;

    this.request.interceptors.request.use(
      axiosConfig => {
        Object.assign(axiosConfig.headers, {
          Authorization: `Bearer ${this.accessToken}`
        });
        return axiosConfig;
      },
      error => Promise.reject(error)
    );

    this.request.interceptors.response.use(undefined, async error => {
      const response = error.response;

      if (response) {
        if (
          response.status === 403 ||
          (response.status === 401 &&
            error.config &&
            !error.config.__isRetryRequest)
        ) {
          try {
            await this.getAccessToken();
          } catch (authError) {
            // refreshing has failed, but report the original error, i.e. 401
            return Promise.reject(error);
          }

          // retry the original request
          error.config.__isRetryRequest = true;
          return this.request(error.config);
        }
      }

      return Promise.reject(error);
    });
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async getAccessToken() {
    try {
      const login = await this.request({
        method: "GET",
        url: "/v1/access_token",
        params: {
          uuid: "4517e070-44f5-4819-a1fd-e0537059e157",
          receipt: "free"
        }
      });
      this.setAccessToken(login.data.access_token);
      return login.data;
    } catch (err) {
      console.log("error with getAccessToken", err);
    }
  }

  async getPlaylists() {
    try {
      const playlists = await this.request({
        url: "/v1/playlist",
        method: "GET"
      });
      return playlists.data;
    } catch (err) {
      console.log("error with getPlaylists", err);
    }
  }

  async getPlaylistById(playlistId) {
    try {
      const playlist = await this.request({
        url: `/v1/contents/list/${playlistId}`,
        params: {
          order: 1,
          page: 1,
          limit: 20
        },
        method: "GET"
      });
      return playlist.data;
    } catch (err) {
      console.log("error with getPlaylistById", err);
    }
  }

  async getPlaylistById(playlistId) {
    try {
      const playlist = await this.request({
        url: `/v1/contents/list/${playlistId}`,
        params: {
          order: 1,
          page: 1,
          limit: 20
        },
        method: "GET"
      });
      return playlist.data;
    } catch (err) {
      console.log("error with getPlaylistById", err);
    }
  }

  async getVideoDetails(videoId) {
    try {
      const video = await this.request({
        url: `/v2/contents/${videoId}`,
        method: "GET"
      });
      return video.data;
    } catch (err) {
      console.log("error with getVideoDetails", err);
    }
  }

  async getVideoUrl(videoId) {
    try {
      const video = await this.request({
        url: `/v1/contents/video/${videoId}`,
        params: {
          f: 0
        },
        method: "GET"
      });
      return video.data;
    } catch (err) {
      console.log("error with getVideoUrl", err);
    }
  }
}

module.exports = NobodySurf;
