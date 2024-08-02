import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Button } from "./ui/button";
import "aos/dist/aos.css";
import AOS from "aos";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

export default function Banner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Set a 1-second delay before hiding the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <div className="coverbg">
          <section className="w-[450px] relative flex flex-col min-h-screen items-center p-6">
            <div className="h-screen flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Spinner size="lg" color="success" />
                <h1 className="mt-4 text-lg font-semibold">Loading...</h1>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="coverbg">
          <main className="relative flex flex-col items-center p-6 min-h-screen pb-12">
            {/* Banner Section */}
            <section
              className="flex flex-col items-center mb-12 bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl"
              data-aos="zoom-in"
            >
              {/* Top Card */}
              <div
                className="flex justify-center items-center mb-6"
                data-aos="zoom-in"
              >
                <Image src="/ambalan.png" alt="Logo" className="h-32" />
              </div>

              {/* Grid of Two Cards */}
              <div className="mt-6 w-full max-w-4xl">
                <div className="grid grid-cols-2 gap-12">
                  <div className="flex flex-col items-center">
                    <img
                      src="/RAAR.png"
                      alt="Acara 1"
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <h1 className="mt-2 text-lg font-semibold">11.157</h1>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="/RDSR.png"
                      alt="Acara 2"
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <h1 className="mt-2 text-lg font-semibold">11.158</h1>
                  </div>
                </div>
              </div>

              {/* Event Title */}
              <p className="text-md mt-2 font-semibold">WE INVITED YOU TO</p>
              <h1
                className="text-xl font-bold text-center my-1 font-montserrat"
                data-aos="zoom-in"
              >
                Pandu Memories 2, Pramuka SMKN 7 BALEENDAH
              </h1>
              <Divider />

              <p
                className="text-md text-center mt-2 capitalize font-violet"
                data-aos=""
              >
                Yang terhormat
              </p>
              <p
                className="text-md text-center capitalize font-violet"
                data-aos=""
              >
                Kakak Kakak Purna Ambalan
              </p>
            </section>

            <h1
              className="text-2xl text-[#E2E9C5] font-semibold font-montserrat"
              data-aos="zoom-in"
            >
              Kepada
            </h1>
            <p className="font-serif text-[#E2E9C5] font-semibold text-3xl">
              Alumni Pramuka
            </p>

            <div></div>

            <div className="w-full flex justify-center mt-6">
              <Button
                onClick={() => navigate("/detail")}
                className="w-72 p-6 rounded-full transform transition-transform duration-200 hover:-translate-y-1 active:bg-[#5f6d33] active:text-white active:translate-y-1"
                variant="outline"
              >
                Buka Undangan
              </Button>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
