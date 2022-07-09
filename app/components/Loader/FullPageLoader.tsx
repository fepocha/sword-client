import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from '~/components/Loader/Spinner';
import DotLoader from '~/components/Loader/DotLoader';

interface FullPageLoaderProps {
  type: 'spinner' | 'dot';
  isLoading: boolean;
}

function FullPageLoader({ type, isLoading }: FullPageLoaderProps) {
  if (!isLoading || typeof window === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="absolute w-full h-full flex justify-center items-center top-0 left-0 backdrop-blur z-50">
      {type === 'spinner' && (
        <div className="w-16 h-16">
          <Spinner />
        </div>
      )}
      {type === 'dot' && <DotLoader />}
    </div>,
    document.body
  );
}

export default FullPageLoader;
