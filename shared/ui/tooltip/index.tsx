import React, { ReactNode, useEffect, useRef, useState } from 'react';

type TooltipTypes = {
  children: ReactNode | ((props: { toggle: (value?: boolean) => void; target: React.RefObject<HTMLDivElement> }) => ReactNode);
  content: any;
};

export default function Tooltip({ children, content }: TooltipTypes) {
  const [show, setShow] = useState<boolean>(false);
  const target = useRef<HTMLDivElement | null>(null);

  function toggle(value?: boolean): void | null {
    if (value === undefined) {
      setShow((s: boolean) => !s);
    } else {
      setShow(value);
    }
  }

  useEffect(() => {
    if (target.current) {
      target.current.onmouseover = () => toggle(true);
      target.current.onmouseout = () => toggle(false);
    }
  }, [target.current]);

  return (
    <div className="relative inline-block">
      {typeof children !== 'function' ? (
        <div ref={target}>
          {children}
        </div>
      ) : (
        children({ toggle, target })
      )}
      {show && (
        <div className="absolute text-sm bg-secondary-400 p-2 w-[278px] rounded-md text-white right-0 bottom-full z-10">
          <h1>{content}</h1>
        </div>
      )}
    </div>
  );
}
