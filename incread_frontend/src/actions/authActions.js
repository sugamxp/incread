import { GET_ARTICLES_POCKET } from "./types";
import axios from "axios";

export const getArticlesPocket = (api_url, token) => async (dispatch) => {
  const res = await axios.post(
    `${api_url}/users/${token}/get_latest_articles/`
  );

  dispatch({
    type: GET_ARTICLES_POCKET,
    payload: res.data
  });
};
