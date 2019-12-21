import { Topic, Code, Note, Link, Image } from "../client-lib/models";
import { topicsToKeys } from "./StateHelpers";

export type InitialState = {
  content: {
    topics: { data: any; keys: number[]; loading: boolean };
    selectedTopic: number;
    notes: Array<Note>;
    videos: Array<any>;
    article_snippets: Array<any>;
    codes: Array<Code>;
    images: Array<Image>;
    links: Array<Link>;
  };
  user: any;
};

export const initialState: InitialState = {
  content: {
    topics: { data: {}, keys: [], loading: true },
    selectedTopic: null,
    notes: [],
    videos: [],
    codes: [],
    article_snippets: [],
    images: [],
    links: []
  },
  user: {}
};

const contentReducer = (state: any, action: any) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case "FETCHING_TOPICS":
      return {
        ...state,
        topics: {
          data: { ...state.topics.data },
          keys: [...state.topics.keys],
          loading: true
        }
      };
    case "SET_TOPICS":
      const { data, keys } = topicsToKeys(action.payload);
      return { ...state, topics: { data, keys, loading: false } };
    case "SET_SELECTED_TOPIC":
      return { ...state, selectedTopic: action.payload };
    case "SET_SNIPPETS":
      return { ...state, article_snippets: action.payload };
    case "ADD_SNIPPET":
      return {
        ...state,
        article_snippets: [action.payload, ...state.article_snippets]
      };
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.payload] };
    case "SET_VIDEOS":
      return { ...state, videos: action.payload };
    case "ADD_VIDEO":
      return { ...state, videos: [...state.videos, action.payload] };
    case "SET_CODES":
      return { ...state, codes: action.payload };
    case "ADD_CODE":
      return {
        ...state,
        codes: [...state.codes, action.payload]
      };
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload
      };
    case "ADD_IMAGE":
      return {
        ...state,
        images: [...state.images, action.payload]
      };
    case "SET_LINKS":
      return {
        ...state,
        links: action.payload
      };
    case "ADD_LINK":
      return {
        ...state,
        links: [action.payload, ...state.links]
      };
    default:
      return state;
  }
};

export const navigationReducer = (state: any, action: any) => {
  switch (action.type) {
    case "NAVIGATE":
      return { ...state };
  }
};

export const reducer = ({ content, navigation }, action: any) => ({
  content: contentReducer(content, action),
  navigation: navigationReducer(navigation, action)
});
