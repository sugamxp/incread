import { GET_ARTICLES_POCKET } from "../actions/types";

const initialState = {
  api_url: process.env.REACT_APP_API_URL,
  incread_articles_imported: 0,
  username: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES_POCKET:
      return {
        ...state,
        incread_articles_imported: 1
      };
    default:
      return state;
  }
}
