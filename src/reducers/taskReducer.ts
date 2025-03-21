import { Post } from '../types';

interface Action {
  type: string;
  payload: any;
}

const taskReducer = (state: { posts: Post[] }, action: Action) => {
  switch (action.type) {
    case 'SET_POST':
      return {
        ...state,
        posts: action.payload
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case 'TOGGLE_POST':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.id ? action.payload : post
        )
      };
    default:
      return state;
  }
};

export default taskReducer;