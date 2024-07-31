import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Image } from "@nextui-org/image";
import "aos/dist/aos.css";
import AOS from "aos";
import { Divider } from "@nextui-org/react";
import { CalendarDays } from "lucide-react";
import { Timer } from "lucide-react";
import { MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { Card as Cardn } from "@nextui-org/react";
import BottomNavigation from "../components/BottomNavigation";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { UserRoundPlus, Home, Book, Box } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { status } from "./../json/data";
import { supabase } from "@/config/supabase";
export default function Detail() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalImage, setModalImage] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");
  const [name, setName] = useState("");

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    onOpen();
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const newData = {
      daftar_nama: name,
      daftar_kehadiran: selectedStatus,
      daftar_total_harga: 180000,
    };

    const { data, error } = await supabase
      .from("pendaftaran")
      .insert([newData]);
    if (error) {
      console.error(error.message);
    } else {
      alert("Success");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };
  const targetDate = new Date("2024-08-25T08:00:00"); // Tanggal dan waktu target

  useEffect(() => {
    AOS.init();
  }, []);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown(); // Initial call
    const intervalId = setInterval(updateCountdown, 1000); // Update countdown every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <>
      <main className="bg-[#6eacda] w-[450px] relative flex flex-col items-center p-6 min-h-screen">
        <div className=""></div>
        <h1 className="mt-[100px]  font-montserrat text-2xl font-semibold text-center">
          PRAMUKA
        </h1>
        <p className="font-montserrat text-2xl font-semibold mb-4">
          SMKN 7 BALEENDAH
        </p>
        <section
          data-aos="zoom-in"
          className="relative  flex flex-col items-center mb-12 bg-white p-6 rounded-lg shadow-lg"
        >
          <div
            data-aos="zoom-in"
            className="flex justify-center items-center mb-6"
          >
            <Card data-aos="zoom-in" className="relative z-10">
              <Image
                src="/logo.png"
                alt="Logo"
                height={160}
                width={160}
                className="object-contain rotate-6"
              />
            </Card>
          </div>
        </section>
        <h1
          data-aos="zoom-in"
          className="w-80 text-2xl font-semibold font-montserrat text-center"
        >
          Pandu Memories 2, SMKN 7 BALEENDAH TAHUN 2024
        </h1>
        <p
          data-aos="zoom-in"
          className="font-violet font-semibold font-lg mt-2"
        >
          ─ MINGGU, 25 AGUSTUS 2024 ─
        </p>
        <div className="mt-4 w-full max-w-md relative">
          <h2 className="text-xl font-bold text-center mb-4" data-aos="zoom-in">
            Countdown:
          </h2>
          <div className="grid grid-cols-4 gap-4 relative z-10">
            <Card
              className="p-4 text-center shadow-md bg-[#03346E]"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-2xl font-bold text-gray-200">
                {timeLeft.days}
              </p>
              <p className="text-sm text-gray-200">Days</p>
            </Card>
            <Card
              className="p-4 text-center shadow-md bg-[#03346E]"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <p className="text-2xl text-gray-200 font-bold">
                {timeLeft.hours}
              </p>
              <p className="text-sm text-gray-200">Hours</p>
            </Card>
            <Card
              className="p-4 text-center shadow-md bg-[#03346E]"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <p className="text-2xl font-bold text-gray-200">
                {timeLeft.minutes}
              </p>
              <p className="text-sm text-gray-200">Minutes</p>
            </Card>
            <Card
              className="p-4 text-center shadow-md bg-[#03346E]"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <p className="text-2xl font-bold text-gray-200">
                {timeLeft.seconds}
              </p>
              <p className="text-sm text-gray-200">Seconds</p>
            </Card>
          </div>
          <img
            src="/pola3.png"
            alt="Decorative Leaf"
            className="absolute bottom-0 left-0 w-32 h-32 object-cover -rotate-90 z-0"
          />
          <div>
            <img
              src="/pola3.png"
              alt="Decorative Leaf"
              className="absolute bottom-0 right-0 w-32 h-32 object-cover rotate-180 z-0"
            />
          </div>
        </div>
      </main>
      <Divider className="" />
      <section className="w-[450px] relative flex flex-col items-center p-6 min-h-screen bg-gray-50">
        <div className="mt-[100px]"></div>
        <div className="w-72 text-center mb-6">
          <h1 className="font-montserrat text-2xl font-semibold">PENGANTAR</h1>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 relative z-10">
          <div className="whitespace-pre-wrap text-justify">
            <p className="font-violet indent-6 text-sm mb-4">
              Setiap langkah dan setiap pelatihan yang kita jalani bersama
              sebagai anggota Pramuka adalah jejak-jejak kecil yang membentuk
              kenangan abadi dalam hidup kita. Saat kita mengenang masa-masa
              tersebut, kita tidak hanya melihat kembali pada pelajaran yang
              dipelajari atau tantangan yang dihadapi, tetapi juga pada
              kebersamaan yang terjalin, persahabatan yang tumbuh, dan semangat
              yang mengalir dalam setiap aktivitas.
            </p>
            <p className="font-violet indent-6 text-sm mb-4">
              Mungkin kakak ingat bagaimana hujan deras tak menghalangi kita
              untuk melanjutkan perjalanan, atau bagaimana malam yang dingin
              dipenuhi dengan cerita-cerita hangat di sekitar api unggun. Setiap
              momen itu adalah cermin dari semangat juang dan kekompakan yang
              membentuk karakter kita.
            </p>
            <p className="font-violet indent-6 text-sm mb-4">
              Di bawah bendera Pramuka, kita belajar arti sejati dari
              solidaritas, tanggung jawab, dan keberanian. Kita menemukan bahwa
              dalam setiap rintangan, ada kesempatan untuk tumbuh, dan dalam
              setiap kebersamaan, ada kehangatan yang tak ternilai.
              Kenangan-kenangan itu, baik besar maupun kecil, adalah harta yang
              tidak bisa diukur dengan materi.
            </p>
            <p className="font-violet indent-6 text-sm mb-4">
              Mari kita simpan kenangan-kenangan itu dengan penuh rasa syukur,
              karena setiap pengalaman yang kita lalui sebagai Pramuka adalah
              bagian tak terpisahkan dari perjalanan hidup kita. Setiap
              senyuman, tawa, dan pelukan hangat yang kita bagikan selama
              masa-masa itu adalah pengingat bahwa meski waktu berlalu, semangat
              Pramuka dan persahabatan yang kita bangun akan selalu hidup dalam
              hati kita.
            </p>
            <Divider />
            <h4 className="text-center font-violet mt-8">
              Untuk mengenang semua itu kami menantikan kehadiran kakak kakak
              purna Ambalan untuk hadir pada kegiatan “Pandu Memories 2”.
            </h4>
          </div>
        </div>
        {/* <img
          src="/pola3.png"
          alt="Decorative Leaf"
          className="absolute bottom-0 left-0 w-32 h-32 object-cover -rotate-90 z-0"
        /> */}
      </section>
      <Divider />
      <section className="w-[450px]  flex flex-col items-center p-6 min-h-screen bg-[#E2E2B6]">
        <div className=" relative">
          <img
            src="/objek5.png"
            alt="Decorative Leaf"
            className="w-full h-full rotate-2"
          />
        </div>
        <div className="w-72 text-center mb-6">
          <h1 className="font-montserrat text-2xl font-bold">PELAKSANAAN</h1>
        </div>
        <Card className="relative w-96 h-[550px]">
          <section>
            <div className="mt-10">
              <h1 className="text-center font-montserrat font-bold text-2xl">
                Pandu Memories 2,
              </h1>
              <p className="text-center font-montserrat font-bold text-2xl">
                SMKN 7 BALEENDAH
              </p>
              <Divider />
            </div>
            <p className="text-center text-lg font-semibold mt-2">
              Detail Acara
            </p>

            <div className="whitespace-pre-wrap flex justify-center items-center m-4">
              <table className="table-fixed w-full">
                <tbody>
                  <tr>
                    <td>
                      <CalendarDays />
                    </td>
                    <td className="font-montserrat font-medium">
                      Minggu, 25 Agustus 2024
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Timer />
                    </td>
                    <td className="font-montserrat font-medium">
                      08.00 Sampai Dengan Selesai
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <MapPinned />
                    </td>
                    <td className="font-montserrat font-medium">
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
              src="/objek2.png"
              alt="Decorative Leaf"
              className="absolute bottom-0 h-[200px]  object-cover "
            />

            <img
              src="/objek2.png"
              alt="Decorative Leaf"
              className="absolute bottom-0 right-0 h-[200px]  object-cover "
            />
          </section>
        </Card>
      </section>
      <Divider />
      <section className="w-[450px] flex flex-col items-center p-6 min-h-screen bg-gray-50">
        <h1 className="font-montserrat text-4xl font-light mt-[100px] mb-6">
          Agenda Acara
        </h1>
        <section className="relative max-w-[920px] w-full">
          {/* Vertical Line */}
          <div className="absolute inset-0 flex justify-center items-start">
            <div className="w-[2px] h-[450px] bg-black"></div>
          </div>

          {/* Text Containers */}
          <div className="relative z-10 flex justify-between items-start pt-[50px] px-8">
            {/* Left Text */}
            <div className="flex-1 flex flex-col pr-4">
              <p className="font-montserrat text-lg mb-4">
                PROSESI PENYAMBUTAN
              </p>
              <Divider className="border-black border-1" />
            </div>

            {/* Right Text */}
            <div className="flex-1 flex flex-col items-start pl-4">
              <div className="mt-40">
                <p className="font-montserrat text-lg mb-4">PROSESI INTI</p>
              </div>
              <Divider className="border-black border-1" />
              <h1 className="font-noto text-md">-Pembukaan</h1>
              <h1 className="font-noto text-md">-Sambutan</h1>
              <h1 className="font-noto text-md">-Fun Game</h1>
              <h1 className="font-noto text-md">
                -Penampilan Seni dan Hiburan
              </h1>
              <h1 className="font-noto text-md">-Story of us</h1>
              <h1 className="font-noto text-md">-Penutupan dan Doa</h1>
              {/* Add more paragraphs as needed */}
            </div>
          </div>
        </section>

        <section className="relative mt-8">
          <img
            src="/6.png"
            alt="Decorative Leaf"
            className="absolute bottom-0 right-0 object-cover h-60 w-60"
          />
          <img
            src="/objek3.png"
            alt="Decorative Leaf"
            className="absolute bottom-0 right-0 object-cover w-32 h-32"
          />
          <img
            src="/objek2.png"
            alt="Decorative Leaf"
            className="absolute bottom-0 left-0 w-32 h-42 object-cover"
          />
        </section>
      </section>

      <Divider />
      <section className="w-[450px] relative flex flex-col items-center p-6 min-h-screen bg-[#E2E9C5]">
        <h1 className="font-montserrat text-4xl font-light mt-[100px] mb-6 text-center text-[#3a3a3a]">
          Biaya
        </h1>

        <Card className="w-[300px] bg-white p-6 shadow-lg rounded-lg border border-gray-300 mb-6">
          <h2 className="font-montserrat text-lg text-center text-gray-700 mb-4">
            Kakak kakak mohon bantuan untuk mengirimkan donasi sebesar 180.000 /
            orang (Kaos, Scraft, name tag, snack, makan dan souvenir)
          </h2>
        </Card>

        <Divider className="my-6 border-black border-1" />

        <div className="w-full max-w-[350px]">
          <h2 className="font-montserrat text-2xl font-semibold mb-4 text-center text-[#3a3a3a]">
            NARA HUBUNG
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {/* Contact Card 1 */}
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

            {/* Contact Card 2 */}
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
            {/* Bank Account Card 1 */}
            <Card className="bg-[#f3f6f9] p-4 shadow-md rounded-lg border border-[#c4c4c4] flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <CreditCard className="w-8 h-8 mr-2" />
                <p className="font-montserrat text-lg text-gray-800">
                  Rek 0115468170101 a.n Rani Prastuti, S.Pd
                </p>
              </div>
            </Card>

            {/* Bank Account Card 2 */}
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
      <section className="w-[450px] relative flex flex-col items-center p-6 min-h-screen bg-gray-50">
        <h2 className="font-montserrat text-4xl font-bold mb-4 text-center text-[#3a3a3a] mt-[50%]">
          Our Gallery
        </h2>
        <div className="mt-20"></div>
        <section className="grid grid-cols-1 gap-8">
          <Cardn>
            <Image
              onClick={() => openModal("/ALBUM_1.jpg")}
              src="/ALBUM_1.jpg"
              alt="Album 1"
              objectFit="cover"
            />
          </Cardn>
          <Cardn onClick={() => openModal("/ALBUM_2.jpg")}>
            <Image src="/ALBUM_2.jpg" alt="Album 2" objectFit="cover" />
          </Cardn>
          <Cardn onClick={() => openModal("/ALBUM_3.jpg")}>
            <Image src="/ALBUM_3.jpg" alt="Album 3" objectFit="cover" />
          </Cardn>
        </section>
      </section>
      <section className="w-[450px] relative flex flex-col items-center p-6 h-[600px] bg-[#E2E9C5]">
        <div className="mt-20"></div>
        <Image src="/logo.png" className="rotate-[10deg]" width={300} />
        <div>
          <h1 className="font-montserrat text-md text-center mt-8 text-[#3a3a3a] font-medium">
            Merupakan Suatu Kebahagiaan dan Kehormatan bagi Kami, Apabila
            Bapak/Ibu/Saudara/i, Berkenan Hadir di Acara kami
          </h1>

          <p className="mt-12 text-center font-serif"> - Terima Kasih -</p>
        </div>
      </section>
      {/*NAVIGATION */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 shadow-lg lg:hidden z-50">
        <div className="flex justify-between items-center py-2 px-4 bg-gradient-to-t from-gray-100 to-white">
          <Link
            href="/"
            className="text-center flex-1 flex flex-col items-center"
          >
            <Home className="text-gray-600" size={24} />
            <p className="text-sm text-gray-600 mt-1">Home</p>
          </Link>
          <Link
            className="text-center flex-1 flex flex-col items-center"
            onPress={onOpen}
          >
            <UserRoundPlus />
            <p className="text-sm text-gray-600 mt-1">Daftar</p>
          </Link>
          <Link
            href="/plot"
            className="text-center flex-1 flex flex-col items-center"
          >
            <Book className="text-gray-600" size={24} />
            <p className="text-sm text-gray-600 mt-1">Plot</p>
          </Link>
          <Link
            href="/items"
            className="text-center flex-1 flex flex-col items-center"
          >
            <Box className="text-gray-600" size={24} />
            <p className="text-sm text-gray-600 mt-1">Items</p>
          </Link>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-sm font-montserrat font-medium">
                  Konfirmasikan Kehadiran Anda Kepemiliki Acara
                </h1>
                <Divider />
              </ModalHeader>
              <ModalBody>
                <p className="text-sm font-montserrat text-center">
                  Pemilik acara mengharapkan konfirmasi kehadiranmu di acara
                  Musrenbang RKPD Kota Serang Tahun 2024
                </p>

                <div className="mt-4"></div>

                <div className="grid grid-cols-1 gap-8">
                  <form
                    onSubmit={handleSave}
                    className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 mb-6"
                  >
                    <h2 className="text-xl font-bold mb-4">Pendaftaran</h2>
                    <div className="mb-4">
                      <Input
                        type="text"
                        label="Nama"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <Select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        items={status}
                        label="Status"
                        placeholder="Kehadiran"
                        className="max-w-full"
                      >
                        {(status) => <SelectItem>{status.label}</SelectItem>}
                      </Select>
                    </div>
                    <div className="mb-4">
                      <Textarea
                        label="Catatan"
                        placeholder="Tambahkan catatan tambahan jika ada..."
                      />
                    </div>
                    <Button type="submit" color="primary" className="w-full">
                      Simpan
                    </Button>
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* NAVIGATION MODAL */}
    </>
  );
}
