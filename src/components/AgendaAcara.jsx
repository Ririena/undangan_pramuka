import React from "react";
import { Divider } from "@nextui-org/react";
import { Zoom } from "react-awesome-reveal";
import { useInView } from "react-intersection-observer";

export default function AgendaAcara() {
  const { ref: refLeft, inView: inViewLeft } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: refRight, inView: inViewRight } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <section className="w-[450px] flex flex-col items-center p-6 h-[1200px] bg-gray-50">
        <Zoom
          delay={100}
          duration={1000}
          className={inViewLeft ? "animate" : "animate-reverse"}
        >
          <h1 className="font-montserrat text-4xl font-light mt-[100px] mb-6">
            Agenda Acara
          </h1>
        </Zoom>
        <section className="relative max-w-[920px] w-full">
          {/* Vertical Line */}
          <div className="absolute inset-0 flex justify-center items-start">
            <div className="w-[2px] h-[1015px] bg-black"></div>
          </div>

          {/* Text Containers */}
          <div className="relative z-10 flex justify-between items-start pt-[50px] px-8">
            {/* Left Text */}
            <div className="flex-1 flex flex-col pr-4" ref={refLeft}>
              <Zoom
                duration={1000}
                className={inViewLeft ? "animate" : "animate-reverse"}
              >
                <p className="font-montserrat text-lg mb-4">ACARA PEMBUKA</p>
              </Zoom>
              <Divider className="border-black border-1" />
              <Zoom
                duration={1000}
                className={inViewLeft ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">07.00 - 07.30</p>
                <p className="font-violet">Persiapan Panitia</p>
              </Zoom>
              <Divider className="mt-2" />
              <Zoom
                duration={1000}
                className={inViewLeft ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">07.30 - 08.00</p>
                <p className="font-violet">Registrasi Panitia</p>
              </Zoom>
              <Divider className="mt-2" />
              <Zoom
                duration={1000}
                className={inViewLeft ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">07.80 - 08.30</p>
                <p className="font-violet">Prosesi Penyambutan</p>
              </Zoom>
              <div className="flex flex-col space-y-1 mt-2">
                <Zoom
                  duration={1000}
                  className={inViewLeft ? "animate" : "animate-reverse"}
                >
                  <p className="font-violet text-sm">- Semaphore</p>
                </Zoom>
                <Zoom
                  duration={1000}
                  className={inViewLeft ? "animate" : "animate-reverse"}
                >
                  <p className="font-violet text-sm">- Kujang</p>
                </Zoom>
              </div>
              <Divider className="mt-2" />
            </div>

            {/* Right Text */}
            <div
              className="flex-1 flex flex-col items-start pl-4"
              ref={refRight}
            >
              <div className="mt-[350px]">
                <Zoom
                  duration={1000}
                  className={inViewRight ? "animate" : "animate-reverse"}
                >
                  <p className="font-montserrat text-lg mb-4">PROSESI INTI</p>
                </Zoom>
              </div>
              <Divider className="border-black border-1" />
              <Zoom
                duration={1000}
                className={inViewRight ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">08.30 - 09.00</p>
                <p className="font-violet">Persiapan Panitia</p>
              </Zoom>
              <Divider className="mt-2" />
              <Zoom
                duration={1000}
                className={inViewRight ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">09.00 - 09.30</p>
                <p className="font-violet">Intermeso</p>
              </Zoom>
              <Divider className="mt-2" />
              <Zoom
                duration={1000}
                className={inViewRight ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">09.30 - 11.00</p>
                <p className="font-violet">Sharing Our Memories</p>
              </Zoom>
              <Divider className="mt-2" />
              <Zoom
                duration={1000}
                className={inViewRight ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">11.00 - 12.00</p>
                <p className="font-violet">Photo Studi</p>
              </Zoom>
              <Divider className="mt-2" />
              <Zoom
                duration={1000}
                className={inViewRight ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">12.00 - 12.30</p>
                <p className="font-violet">Isoma</p>
              </Zoom>
              <Divider className="mt-2" />
              <Zoom
                duration={1000}
                className={inViewRight ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">12.30 - 13.00</p>
                <p className="font-violet">Mystery Box</p>
              </Zoom>
              <Divider className="mt-2" />
              <Zoom
                duration={1000}
                className={inViewRight ? "animate" : "animate-reverse"}
              >
                <p className="font-violet">13.00 - Selesai</p>
                <p className="font-violet">Champs Group</p>
              </Zoom>
              <Divider className="mt-2" />
              {/* Add more paragraphs as needed */}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
