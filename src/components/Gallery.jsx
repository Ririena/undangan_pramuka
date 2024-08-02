import React from "react";
import { Card as Cardn } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Fade, Zoom } from "react-awesome-reveal";

export default function Gallery() {
  return (
    <>
      <section className="w-[450px] relative flex flex-col items-center p-6 min-h-screen bg-gray-50">
        <Fade duration={1000} delay={200}>
          <h2 className="font-montserrat text-4xl font-bold mb-4 text-center text-[#3a3a3a] mt-[50%]">
            Our Gallery
          </h2>
        </Fade>

        <div className="mt-20"></div>

        <section className="grid grid-cols-1 gap-8">
          <Zoom duration={1000} delay={800} level={0.5}>
            <Cardn>
              <Image src="/ALBUM_1.jpg" alt="Album 1" />
            </Cardn>
          </Zoom>

          <Zoom duration={1000} delay={900} level={0.5}>
            <Cardn>
              <Image src="/ALBUM_2.jpg" alt="Album 2" />
            </Cardn>
          </Zoom>

          <Zoom duration={1000} delay={1000} level={0.5}>
            <Cardn>
              <Image src="/ALBUM_3.jpg" alt="Album 3" />
            </Cardn>
          </Zoom>
          <Zoom duration={1000} delay={1100} level={0.5}>
            <Cardn>
              <Image src="/ALBUM_4.jpg" alt="Album 4" />
            </Cardn>
          </Zoom>
        </section>
      </section>
    </>
  );
}
