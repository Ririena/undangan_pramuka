import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Image } from "@nextui-org/image";
import "aos/dist/aos.css";
import AOS from "aos";
import { Divider } from "@nextui-org/divider";

export default function Detail() {
  const targetDate = new Date("2024-08-25T08:00:00"); // Tanggal dan waktu target

  useEffect(() => {
    AOS.init({ duration: 1000 });
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
          Reuni Alumni Pramuka, SMKN 7 BALEENDAH TAHUN 2024
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
      <section className="w-[450px] relative flex flex-col items-center p-6 min-h-screen bg-green-50">
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
        <img
          src="/pola3.png"
          alt="Decorative Leaf"
          className="absolute bottom-0 left-0 w-32 h-32 object-cover -rotate-90 z-0"
        />
      </section>
    </>
  );
}
