import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { ArticleType } from '../types';

export interface ArticleState {
  articles: ArticleType[];
}

const initialState: ArticleState = {
  articles: [],
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    addArticle: (state, action: PayloadAction<ArticleType>) => {
      state.articles = _.uniqBy([...state.articles, action.payload], 'guid');
    },
    resetArticles: (state) => {
      state.articles = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addArticle, resetArticles } = articleSlice.actions;

export default articleSlice.reducer;
