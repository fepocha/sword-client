import classNames from 'classnames';
import React, { HTMLAttributes, PropsWithChildren } from 'react';

interface TitleProps extends HTMLAttributes<HTMLElement> {
  type: 'h1' | 'h2';
}

function Title({
  type = 'h1',
  className,
  children,
  ...props
}: PropsWithChildren<TitleProps>) {
  return (
    <>
      {React.createElement(
        type,
        {
          className: classNames(
            className,
            {
              'main-title': type === 'h1',
              'sub-title': type === 'h2',
            }
            ),
          ...props,
        },
        children
      )}
    </>
  );
}

export default Title;
