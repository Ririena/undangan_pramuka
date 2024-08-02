import React from "react";
import { Card } from "@nextui-org/react";
import { Button } from "./ui/button";
import { Divider } from "@nextui-org/react";
import { CreditCard } from "lucide-react";
import { Slide } from "react-awesome-reveal";

export default function Biaya() {
  return (
    <>
      <section className="w-[450px] relative flex flex-col items-center p-6 min-h-screen bg-[#E2E9C5]">
        <Slide duration={800} delay={100} direction="up">
          <h1 className="font-montserrat text-4xl font-light mt-[100px] mb-6 text-center text-[#3a3a3a]">
            Biaya
          </h1>
        </Slide>

          <Card className="w-[300px] bg-white p-6 shadow-lg rounded-lg border border-gray-300 mb-6">
            <h2 className="font-montserrat text-lg text-center text-gray-700 mb-4">
              Kakak kakak mohon bantuan untuk mengirimkan donasi sebesar Rp.
              180.000 / orang (Kaos, Scraft, name tag, snack, makan dan
              souvenir)
            </h2>
          </Card>

          <Card className="w-[300px] bg-white p-6 shadow-lg rounded-lg border border-gray-300 mb-6">
            <h2 className="font-montserrat text-lg text-center text-gray-700 mb-4">
              Apabila membawa istri/suami/anak maka donasi bertambah sebesar Rp.
              35.000 per orang,- (makan, snack)
            </h2>
          </Card>

        <Divider className="my-6 border-black border-1" />

        <div className="w-full max-w-[350px]">
          <h2 className="font-montserrat text-2xl font-semibold mb-4 text-center text-[#3a3a3a]">
            NARA HUBUNG
          </h2>
          <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white p-4 shadow-md rounded-lg border border-gray-200 flex flex-col items-center">
              <img
                src="/photo.png"
                alt="Ajila Dwi Sastra"
                className="w-24 h-24 rounded-full mb-3 object-cover border-4 border-[#5f6d33]"
              />
              <p className="font-montserrat text-lg text-gray-800 mb-1">
                Ajila Dwi Sastra
              </p>
              <Button
                onClick={() => window.open("https://wa.me/6285900268702")}
                className="bg-[#5f6d33] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#374118]"
              >
                +62 859-0026-8702
              </Button>
            </Card>

            <Card className="bg-white p-4 shadow-md rounded-lg border border-gray-200 flex flex-col items-center">
              <img
                src="/photo.png"
                alt="Haikal Adelia Putra"
                className="w-24 h-24 rounded-full mb-3 object-cover border-4 border-[#5f6d33]"
              />
              <p className="font-montserrat text-lg text-gray-800 mb-1">
                Haikal Adelia Putra
              </p>
              <Button
                onClick={() => window.open("https://wa.me/6282128436309")}
                className="bg-[#5f6d33] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#374118]"
              >
                +62 821-2843-6309
              </Button>
            </Card>
          </div>
        </div>

        <Divider className="my-6 border-black border-1" />

        <div className="w-full max-w-[350px]">
          <h2 className="font-montserrat text-2xl font-semibold mb-4 text-center text-[#3a3a3a]">
            Rekening
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-[#f3f6f9] p-4 shadow-md rounded-lg border border-[#c4c4c4] flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <CreditCard className="w-8 h-8 mr-2" />
                <p className="font-montserrat text-lg text-gray-800">
                  Rek 0115468170101 a.n Rani Prastuti, S.Pd
                </p>
              </div>
            </Card>

            <Card className="bg-[#f3f6f9] p-4 shadow-md rounded-lg border border-[#c4c4c4] flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <CreditCard className="w-8 h-8 mr-2" />
                <p className="font-montserrat text-lg text-gray-800">
                  Rek 7045171108 a.n Daniel Rizkyawan
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
