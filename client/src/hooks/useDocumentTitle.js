import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} | ShopEase` : 'ShopEase';
    return () => {
      document.title = previous;
    };
  }, [title]);
};

export default useDocumentTitle;
