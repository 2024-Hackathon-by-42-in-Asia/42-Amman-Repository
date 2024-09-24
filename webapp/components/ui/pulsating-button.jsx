'use client';
import React from 'react'

export const PulsatingButton = ({
   text,
   pulseColor,
   backgroundColor,
   textColor,
   animationDuration,
   buttonWidth,
   buttonHeight,
}) => {
   const pulseKeyframes = {
      '--tw-pulse-color': pulseColor,
      'animation': `pulse ${animationDuration} linear infinite`,
   }

   return (
      (<div className="tw-flex tw-items-center tw-justify-center">
         <button
            className="tw-relative tw-block tw-flex tw-cursor-pointer tw-items-center tw-justify-center tw-text-center"
            style={{
               color: textColor,
               backgroundColor,
               width: buttonWidth,
               height: buttonHeight,
               borderRadius: '12px',
               ...pulseKeyframes,
            }}>
            <div>{text}</div>
            <style jsx>
               {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(var(--tw-pulse-color), 0);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(var(--tw-pulse-color), 0.5);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(var(--tw-pulse-color), 0);
            }
          }
          button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 20px;
            background: inherit;
            animation: inherit;
            transform: translate(-50%, -50%);
            z-index: -1;
          }
        `}
            </style>
         </button>
      </div>)
   );
}

export default PulsatingButton
