import React from 'react';

function DotLoader() {
  return (
    <div className="relative w-24 h-8 inline-block">
      <div className="grid grid-cols-3 gap-1 w-full h-full absolute -top-full">
        <div
          className="animate-dotLoading rounded-full w-full h-full"
          style={{ animationDelay: '-0.16s' }}
        />
        <div className="animate-dotLoading rounded-full w-full h-full" />
        <div
          className="animate-dotLoading rounded-full w-full h-full"
          style={{ animationDelay: '0.16s' }}
        />
      </div>
    </div>
  );
}

export default DotLoader;
