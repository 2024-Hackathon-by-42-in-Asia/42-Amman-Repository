import React from 'react';


const IframePage = () => {
  return (
    <div className="tw-h-screen tw-w-screen tw-p-1">
      <iframe
        src="project.html"
        className="tw-w-full tw-h-full tw-border-none"
        title="Full Page Iframe"
      />
    </div>
  );
};

export default IframePage;