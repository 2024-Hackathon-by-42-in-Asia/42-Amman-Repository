"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    (<motion.div
      ref={ref}
      className={cn("tw-relative tw-w-full tw-max-w-4xl tw-mx-auto tw-h-full", className)}>
      <div className="tw-absolute tw--left-4 md:tw--left-20 tw-top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="tw-ml-[27px] tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-netural-200 tw-shadow-sm tw-flex tw-items-center tw-justify-center">
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor://   colors = { first: '#a68469', second: '#c26c27' },

                scrollYProgress.get() > 0 ? "white" : "var(--emerald-500)",
              borderColor:
                scrollYProgress.get() > 0 ? "white" : "var(--emerald-600)",
            }}
            className="tw-h-2 tw-w-2 tw- tw-rounded-full tw-border tw-border-neutral-300 tw-bg-white" />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          // Set the SVG height
          height={svgHeight}
          className="tw- tw-ml-4 tw-block"
          aria-hidden="true">
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:tw-hidden"
            transition={{
              duration: 10,
            }}></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              // set y1 for gradient
              y1={y1}
              // set y2 for gradient
              y2={y2}>
              <stop stopColor="#a35b21" stopOpacity="0"></stop>
              <stop stopColor="#a35b21"></stop>
              <stop offset="0.325" stopColor="#a68469"></stop>
              <stop offset="1" stopColor="#c26c27" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>)
  );
};
