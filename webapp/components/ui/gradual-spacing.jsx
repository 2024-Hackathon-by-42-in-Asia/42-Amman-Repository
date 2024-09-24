'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ny } from '@/lib/utils';

export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}) {
  // Split the text into lines based on the backslash character
  const lines = text.split('\\');

  return (
    <div className="tw-flex tw-flex-col tw-justify-center">
      <AnimatePresence>
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="tw-flex tw-justify-center tw-space-x-1">
            {line.split('').map((char, charIndex) => (
              <motion.p
                key={`${lineIndex}-${charIndex}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={framerProps}
                transition={{ duration, delay: (lineIndex * 100 + charIndex) * delayMultiple }}
                className={ny("tw-drop-shadow-sm", className)}
              >
                {char === ' ' ? <span>&nbsp;</span> : char}
              </motion.p>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
