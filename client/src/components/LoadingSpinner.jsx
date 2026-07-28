import React from 'react';

const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-[3px]',
};

const LoadingSpinner = ({ size = 'md', label = 'Loading' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10" role="status" aria-live="polite">
    <span
      className={`${sizeMap[size]} rounded-full border-brand-200 border-t-brand-500 animate-spin`}
    />
    <span className="text-sm text-ink/60">{label}...</span>
  </div>
);

export default LoadingSpinner;
