import { create } from 'zustand';
import { ArticleType } from '../types';

interface ArticleState {
  articles: ArticleType[];
  addArticle: (newArticle: ArticleType) => void;
  reset: () => void;
}

const initalState: ArticleState = {
  articles: [],
  addArticle: () => {},
  reset: () => {},
};

const useArticleStore = create<ArticleState>((set) => ({
  ...initalState,
  addArticle: (newArticle) => {
    set((state) => {
      return { ...state, articles: [...state.articles, newArticle] };
    });
  },
  reset: () => set(initalState),
}));

export default useArticleStore;
