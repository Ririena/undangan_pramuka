import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";
import { Button } from "./ui/button";
import "aos/dist/aos.css";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <main className="bg-[#6eacda] relative flex flex-col items-center p-6 min-h-screen pb-12">
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
            <Card className="w-48 h-32">
              <Image
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain rotate-6"
              />
            </Card>
          </div>

          {/* Grid of Two Cards */}
          <div className="mt-6 w-full max-w-4xl">
            <div className="grid grid-cols-2 gap-12">
              <img
                src="/RAAR.png"
                alt="Acara 1"
                className="object-cover w-full h-full rounded-lg"
              />
              <img
                src="/RDSR.png"
                alt="Acara 2"
                className="object-cover w-full h-full rounded-lg"
              />
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
            className="text-lg text-center mb-6 capitalize font-violet"
            data-aos="zoom-in"
          >
            Yang terhormat : kakak kakak Purna Ambalan
          </p>
        </section>

        <h1 className="text-2xl font-montserrat" data-aos="zoom-in">
          Kepada
        </h1>
        <p
          className="font-nanugothic font-semibold text-3xl"
          data-aos="zoom-in"
        >
          Alumni Pramuka
        </p>

        <img
          src="/pola3.png"
          alt="Decorative Leaf"
          className="absolute bottom-0 left-0 w-32 h-32 object-cover -rotate-90"
        />
        <div>
          <img
            src="/pola3.png"
            alt="Decorative Leaf"
            className="absolute bottom-0 right-0 w-32 h-32 object-cover rotate-180"
          />
        </div>

        <div className="w-full flex justify-center mt-6">
          <Button
            onClick={() => navigate("/detail")}
            className="w-72 p-6 rounded-full hover:bg-black hover:text-white transform transition-transform duration-200 hover:-translate-y-1 active:bg-black active:text-white active:translate-y-1"
            variant="outline"
          >
            Buka Undangan
          </Button>
        </div>
      </main>
    </>
  );
}
