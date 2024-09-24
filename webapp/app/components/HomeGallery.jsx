"use client";
import { DirectionAwareHover } from '@/components/ui/direction-aware-hover';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useEffect, useState } from 'react';
import Image from 'next/image';


const HomeGallery = ({ images }) => {

  const columnsCountBreakPoints = { 350: 1, 750: 2, 900: 3 };

  return (
    <section id="home-gallery" className="tw-py-5">
      <div className="tw-container tw-mx-auto">
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
          <Masonry gutter={4}>
            {images.map((profile, id) => (
              <div key={id} className="tw-relative tw-overflow-hidden">
                <img
                  src={profile.url}
                  className="tw-w-full tw-transition-transform tw-duration-300 tw-ease-in-out tw-shadow-md hover:tw-transform hover:tw-scale-105 hover:tw-shadow-lg"
                  alt={profile.name}
                />
                <div className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-opacity-0 hover:tw-opacity-100 tw-transition-opacity tw-duration-300 tw-ease-in-out">
                  <span className="tw-text-white tw-text-xl tw-font-bold tw-text-center">
                    {profile.name}
                  </span>
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
};

export default HomeGallery;
