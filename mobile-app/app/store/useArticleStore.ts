import { create } from 'zustand';
import { ArticleType } from '../types';

interface ArticleState {
  articles: ArticleType[];
  addArticle: (newArticle: ArticleType) => void;
}

const useArticleStore = create<ArticleState>((set) => ({
  articles: [],
  addArticle: (newArticle) => {
    set((state) => {
      return { ...state, articles: [...state.articles, newArticle] };
    });
  },
}));

export default useArticleStore;
