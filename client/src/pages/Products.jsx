import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as productService from '../services/productService';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import useDebounce from '../hooks/useDebounce';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Products = () => {
  useDocumentTitle('Products');
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const debouncedKeyword = useDebounce(keyword, 400);
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const [data, setData] = useState({ products: [], categories: [], pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productService
      .getProducts({ keyword: debouncedKeyword, category, sort, page, limit: 8 })
      .then(setData)
      .catch(() => setData({ products: [], categories: [], pages: 1, total: 0 }))
      .finally(() => setLoading(false));

    const params = {};
    if (debouncedKeyword) params.keyword = debouncedKeyword;
    if (category !== 'All') params.category = category;
    if (sort !== 'newest') params.sort = sort;
    if (page !== 1) params.page = page;
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword, category, sort, page]);

  const handleCategorySelect = (c) => {
    setCategory(c);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl font-semibold mb-6">All Products</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar
          value={keyword}
          onChange={(v) => {
            setKeyword(v);
            setPage(1);
          }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2.5 rounded-lg border border-brand-100 bg-white text-sm outline-none focus:border-brand-400"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="mb-8">
        <CategoryFilter categories={data.categories} selected={category} onSelect={handleCategorySelect} />
      </div>

      {loading ? (
        <LoadingSpinner label="Loading products" />
      ) : (
        <>
          <p className="text-sm text-ink/50 mb-4">{data.total} product(s) found</p>
          <ProductGrid products={data.products} />
          <Pagination page={data.page || page} pages={data.pages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Products;
