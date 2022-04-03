import React, { HTMLAttributes, PropsWithChildren } from 'react';

interface TypewriterTextProps extends HTMLAttributes<HTMLElement> {
  type: 'h1' | 'h2' | 'h3' | 'span';
}

function TypewriterText({
  type = 'h1',
  className,
  children,
  ...props
}: PropsWithChildren<TypewriterTextProps>) {
  return (
    <div className="inline-block">
      {React.createElement(
        type,
        {
          className: `${className} border-r-4 border-orange-dark tracking-widest animate-typing overflow-hidden whitespace-nowrap`,
          ...props,
        },
        children
      )}{' '}
    </div>
  );
}

export default TypewriterText;
