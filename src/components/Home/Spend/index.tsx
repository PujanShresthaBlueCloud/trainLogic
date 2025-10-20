"use client";
import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@iconify/react";

const Spend: FC = () => {
  const ref = useRef(null);

  const [isModalOpen, setIsVideoOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsVideoOpen(true);
  };

  const closeModal = (): void => {
    setIsVideoOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);
  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div ref={ref}>
          <div className="text-center">
            <h2 className="md:text-35 sm:text-28 text-24 text-midnight_text font-semibold mb-5 dark:text-white">
              We help you bring AI to life 
              <span className="text-primary ml-2">without the tech headaches</span>
            </h2>
            <p className="text-17 text-muted dark:text-white/60 mx-1 lg:mx-64 mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative overflow-hidden mt-14">
              <Image
                src="/images/spend/spend.png"
                alt="image"
                width={550}
                height={350}
                className="rounded-lg w-full"
              />
              <button
                className="text-midnight_text absolute z-1 top-40% md:left-1/2 left-45% rounded-full hover:text-primary py-4 px-3 bg-white cursor-pointer"
                onClick={openModal}
              >
                <Icon icon="solar:play-bold" width="24" height="16" />
              </button>
              {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
                  <div className="bg-white dark:bg-darkmode rounded-lg sm:m-0 m-4">
                    <div className="overlay flex items-center justify-between border-b border-solid border-border dark:border-dark_border p-5  dark:border-darkborder">
                      <h3 className="text-midnight_text dark:text-white">
                        Video
                      </h3>
                      <button
                        onClick={closeModal}
                        className="bg-[url('/images/icon/closed.svg')] bg-no-repeat bg-contain w-5 h-5 inline-block dark:invert"
                      ></button>
                    </div>
                    <iframe
                      height="400"
                      className="p-4 md:w-50 w-full"
                      src="https://www.youtube.com/embed/zzBxZeOTuDw?si=o8O6J_Z9OjdCbtcq"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spend;
