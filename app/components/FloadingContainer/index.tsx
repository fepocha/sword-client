import { PropsWithChildren } from 'react';
import { useMeasure, useMountedState } from 'react-use';

export function FloatingContainer({
  children
}: PropsWithChildren<unknown>) {
  const [ref, { height: buttonHeight }] = useMeasure<HTMLDivElement>();
  const isMounted = useMountedState();

  return (
    <>
      <div className="fixed left-0 bottom-0 w-full px-4 pt-[20px] pb-[30px] bg-gradient-to-b from-transparent to-white-mid">
        <div ref={ref} className="max-w-[580px] mx-auto">
          {children}
        </div>
      </div>
      {isMounted() && buttonHeight && (
        <div style={{ height: buttonHeight + 50 }} />
      )}
    </>
  );
}
