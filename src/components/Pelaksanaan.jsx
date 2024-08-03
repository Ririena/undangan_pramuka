import React from "react";
import { Divider } from "@nextui-org/react";
import { Timer, MapPinned, CalendarDays } from "lucide-react";
import { Card } from "./ui/card";
import { Zoom } from "react-awesome-reveal";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

export default function Pelaksanaan() {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });

  const position = [-7.01494, 107.65147];
  return (
    <>
      <div>
        <section className="w-[450px] flex flex-col items-center p-6 min-h-screen bg-[#E2E2B6]">
          <div className="relative">
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
          <Card className="relative w-96 h-[600px] bg-[#4B3A1C] z-10">
            <section>
              <div className="mt-8 text-[#E2E9C5]">
                <h1 className="text-center font-montserrat font-bold text-2xl">
                  Pandu Memories 2,
                </h1>
                <p className="text-center font-montserrat font-bold text-2xl">
                  SMKN 7 BALEENDAH
                </p>
                <Divider />
              </div>
              <p className="text-center text-[#E2E9C5] text-lg font-semibold mt-2">
                Detail Acara
              </p>
              <div className="whitespace-pre-wrap flex justify-center items-center m-4">
                <table className="table-fixed w-full">
                  <tbody>
                    <tr className="flex items-center space-x-4 py-2">
                      <td className="w-10">
                        <CalendarDays color="#E2E9C5" className="w-6 h-6" />
                      </td>
                      <td className="flex-1">
                        <div className="flex flex-col">
                          <span className="font-montserrat font-medium text-[#E2E9C5]">
                            Hari / tanggal:
                          </span>
                          <span className="font-montserrat font-medium text-[#E2E9C5]">
                            Minggu, 01 September 2024
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="flex items-center space-x-4 py-2">
                      <td className="w-10">
                        <Timer color="#E2E9C5" className="w-6 h-6" />
                      </td>
                      <td className="flex-1">
                        <div className="flex flex-col">
                          <span className="font-montserrat font-medium text-[#E2E9C5]">
                            Pukul:
                          </span>
                          <span className="font-montserrat font-medium text-[#E2E9C5]">
                            07.00 Sampai Dengan Selesai
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="flex items-center space-x-4 py-2">
                      <td className="w-10">
                        <MapPinned color="#E2E9C5" className="w-6 h-6" />
                      </td>
                      <td className="flex-1">
                        <div className="flex flex-col">
                          <span className="font-montserrat font-medium text-[#E2E9C5]">
                            Tempat:
                          </span>
                          <span className="font-montserrat font-medium text-[#E2E9C5]">
                            SMK NEGERI 7 BALEENDAH
                          </span>
                        </div>
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
          <div className="mt-12 w-full max-w-md px-4 z-0">
            <Zoom>
              <h1 className="font-montserrat text-2xl font-bold text-center mb-4">
                Lokasi
              </h1>
            </Zoom>
            <div className="flex justify-center map-container">
              <MapContainer
                center={position}
                zoom={15}
                className="z-0"
                style={{ height: "400px", width: "400px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>SMKN 7 BALEENDAH</Popup>
                  <Tooltip permanent direction="top">
                    SMKN 7 BALEENDAH
                  </Tooltip>
                </Marker>
              </MapContainer>
            </div>
            <div className="mb-12"></div>
          </div>
        </section>
      </div>
    </>
  );
}
