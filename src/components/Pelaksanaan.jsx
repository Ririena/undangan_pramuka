import React from "react";
import { Divider } from "@nextui-org/react";
import { Timer, MapPinned, CalendarDays } from "lucide-react";
import { Card } from "./ui/card";
import { Zoom } from "react-awesome-reveal";
export default function Pelaksanaan() {
  return (
    <>
      <div>
        <section className="w-[450px]  flex flex-col items-center p-6 min-h-screen bg-[#E2E2B6]">
          <div className=" relative">
            <img
              src="/objek5.png"
              alt="Decorative Leaf"
              className="w-full h-full rotate-2"
            />
          </div>
          <div className="w-72 text-center mb-6">
            <Zoom>
              <h1 className="font-montserrat text-2xl font-bold">
                PELAKSANAAN
              </h1>
            </Zoom>
          </div>
          <Card className="relative w-96 h-[550px] bg-[#4B3A1C] ">
            <section>
              <div className="mt-10 text-[#E2E9C5]">
                <h1 className="text-center font-montserrat font-bold text-2xl ">
                  Pandu Memories 2,
                </h1>
                <p className="text-center font-montserrat font-bold text-2xl ">
                  SMKN 7 BALEENDAH
                </p>
                <Divider />
              </div>
              <p className="text-center text-[#E2E9C5] text-lg font-semibold mt-2 ">
                Detail Acara
              </p>

              <div className="whitespace-pre-wrap flex justify-center items-center m-4">
                <table className="table-fixed w-full ">
                  <tbody>
                    <tr>
                      <td>
                        <CalendarDays color="#E2E9C5" className="" />
                      </td>
                      <td className="font-montserrat font-medium text-[#E2E9C5]">
                        Minggu, 25 Agustus 2024
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Timer color="#E2E9C5" />
                      </td>
                      <td className="font-montserrat font-medium  text-[#E2E9C5]">
                        07.00 Sampai Dengan Selesai
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <MapPinned color="#E2E9C5" />
                      </td>
                      <td className="font-montserrat font-medium text-[#E2E9C5]">
                        SMK NEGERI 7 BALEENDAH
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Divider className="" />
            </section>
            <section>
              <img
                src="/6.png"
                alt="Decorative Leaf"
                className="absolute bottom-0 right-0 object-cover h-56 w-[385px]"
              />
              <img
                src="/objek3.png"
                className="absolute bottom-0 left-24 object-cover h-32"
              />
              <img
                src="/objek2.png"
                alt="Decorative Leaf"
                className="absolute bottom-0 h-[200px] object-cover"
              />
              <img
                src="/objek2.png"
                alt="Decorative Leaf"
                className="absolute bottom-0 right-0 h-[200px] object-cover"
              />
            </section>
          </Card>
        </section>
      </div>
    </>
  );
}
