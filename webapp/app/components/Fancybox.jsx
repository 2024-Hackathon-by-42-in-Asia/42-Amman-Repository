'use client'
import { useEffect, useRef } from 'react';
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const Fancybox = ({ children, delegate = "[data-fancybox]", options = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  }, [delegate, options]);

  return <div ref={containerRef}>{children}</div>;
};

export default Fancybox;
