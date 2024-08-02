import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

import "aos/dist/aos.css";
import AOS from "aos";
import { Divider } from "@nextui-org/react";

import { Button } from "@/components/ui/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { UserRoundPlus, Home, Book, Box } from "lucide-react";
import { Music } from "lucide-react";
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
import { Description } from "@radix-ui/react-toast";
import { useInView } from "react-intersection-observer";
import AgendaAcara from "@/components/AgendaAcara";
import Biaya from "@/components/Biaya";
import Gallery from "@/components/Gallery";
import Pelaksanaan from "@/components/Pelaksanaan";
export default function Detail() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalImage, setModalImage] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const containerRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [name, setName] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [totalPrice, setTotalPrice] = useState(180000);

  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const scrollInterval = setInterval(function () {
    window.scrollBy(0, 1000);
  }, 2000);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 1.5, duration: 1 },
    }),
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy(0, 1000);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          audioRef.current.volume = 0.5;
          setIsPlaying(true);
          console.log("Audio is playing");
        }
      } catch (error) {
        console.error("Error playing audio: ", error);
        // Handle cases where autoplay is blocked
      }
    };

    playAudio();

    // Reload audio on refresh
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, []);

  const { toast } = useToast();
  useEffect(() => {
    if (autoScroll) {
      const container = containerRef.current;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [autoScroll]);

  const paragraphs = [
    "Setiap langkah dan setiap pelatihan yang kita jalani bersama sebagai anggota Pramuka adalah jejak-jejak kecil yang membentuk kenangan abadi dalam hidup kita. Saat kita mengenang masa-masa tersebut, kita tidak hanya melihat kembali pada pelajaran yang dipelajari atau tantangan yang dihadapi, tetapi juga pada kebersamaan yang terjalin, persahabatan yang tumbuh, dan semangat yang mengalir dalam setiap aktivitas.",
    "Mungkin kakak ingat bagaimana hujan deras tak menghalangi kita untuk melanjutkan perjalanan, atau bagaimana malam yang dingin dipenuhi dengan cerita-cerita hangat di sekitar api unggun. Setiap momen itu adalah cermin dari semangat juang dan kekompakan yang membentuk karakter kita.",
    "Di bawah bendera Pramuka, kita belajar arti sejati dari solidaritas, tanggung jawab, dan keberanian. Kita menemukan bahwa dalam setiap rintangan, ada kesempatan untuk tumbuh, dan dalam setiap kebersamaan, ada kehangatan yang tak ternilai. Kenangan-kenangan itu, baik besar maupun kecil, adalah harta yang tidak bisa diukur dengan materi.",
    "Mari kita simpan kenangan-kenangan itu dengan penuh rasa syukur, karena setiap pengalaman yang kita lalui sebagai Pramuka adalah bagian tak terpisahkan dari perjalanan hidup kita. Setiap senyuman, tawa, dan pelukan hangat yang kita bagikan selama masa-masa itu adalah pengingat bahwa meski waktu berlalu, semangat Pramuka dan persahabatan yang kita bangun akan selalu hidup dalam hati kita.",
  ];

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };
  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    onOpen();
  };

  useEffect(() => {
    const validNumberOfPeople = numberOfPeople > 0 ? numberOfPeople : 1;
    setTotalPrice(180000 + (validNumberOfPeople - 1) * 35000);
  }, [numberOfPeople]);

  const handleSave = async (e) => {
    e.preventDefault();

    const newData = {
      daftar_nama: name,
      daftar_kehadiran: selectedStatus,
      daftar_total_harga: totalPrice,
      daftar_total_pendaftar: numberOfPeople,
    };

    const { data, error } = await supabase
      .from("pendaftaran")
      .insert([newData]);
    if (error) {
      console.error(error.message);
    } else {
      toast({
        title: "Berhasil",
        description: "Anda Sukses Mendaftar!!",
        variant: "success",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };
  const targetDate = new Date("2024-09-01T07:00:00"); // Tanggal dan waktu target

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
      <audio
        ref={audioRef}
        src="/pramuka.mp3"
        preload="auto"
        autoPlay
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
        }}
      />
      <main
        className="bg-[#E2E9C5] w-[450px] relative flex flex-col items-center p-6 min-h-screen"
        ref={scrollRef}
      >
        <div className="mt-8"></div>
        <h1 className="  font-montserrat text-2xl font-semibold text-center">
          PRAMUKA
        </h1>
        <p className="font-montserrat text-2xl font-semibold mb-4">
          SMKN 7 BALEENDAH
        </p>
        <section
          data-aos="zoom-in"
          className="relative  flex flex-col items-center mb-12 w-[290px] bg-white p-6 rounded-lg shadow-lg"
        >
          <div
            data-aos="zoom-in"
            className="flex justify-center items-center mb-6"
          >
            <div
              data-aos="zoom-in"
              data-aos-delay="500"
              className="relative z-10"
            >
              <Image
                src="/ambalan.png"
                alt="Logo"
                height={160}
                width={160}
                className="object-contain"
              />
              <Divider />
              <h1 className="text-center font-montserrat text-md mt-4">
                Pandu Memories 2
              </h1>
            </div>
          </div>
        </section>
        {/* <h1
   
          className="w-80 text-2xl font-semibold font-montserrat text-center"
        >
          Pandu Memories 2, SMKN 7 BALEENDAH TAHUN 2024
        </h1> */}
        <div className="flex justify-center items-center mb-6">
          <Card className="w-72 ">
            <div className="flex justify-between m-4 ">
              <p>Pangkalan</p>
              <p>SMKN 7 BALEENDAH</p>
            </div>
            <div className="flex justify-between m-4 ">
              <p>Gugus Depan</p>
              <p>11.157 - 11.158</p>
            </div>

            <div className="flex justify-between m-4 ">
              <p>Ambalan</p>
              <p>RAA. Wiranata Kusumah</p>
            </div>
            <div className="flex justify-between m-4 ">
              <p>.</p>
              <p className="">RD. Dewi Sartika</p>
            </div>
          </Card>
        </div>
        <p
          data-aos="zoom-in"
          className="font-violet font-semibold font-lg mt-2"
        >
          ─ MINGGU, 1 SEPTEMBER 2024 ─
        </p>
        <div className="mt-4 w-full max-w-md relative">
          <h2 className="text-xl font-bold text-center mb-4" data-aos="zoom-in">
            Countdown:
          </h2>
          <div className="grid grid-cols-4 gap-3 relative z-10">
            <Card
              data-aos="zoom-in"
              className="p-2 text-center shadow-md bg-[#3C4321]"
              data-aos-delay="100"
            >
              <p className="text-xl font-bold text-gray-200">{timeLeft.days}</p>
              <p className="text-sm text-gray-200">Days</p>
            </Card>
            <Card
              data-aos="zoom-in"
              className="p-2 text-center shadow-md bg-[#3C4321]"
              data-aos-delay="200"
            >
              <p className="text-xl text-gray-200 font-bold">
                {timeLeft.hours}
              </p>
              <p className="text-sm text-gray-200">Hours</p>
            </Card>
            <Card
              data-aos="zoom-in"
              className="p-2 text-center shadow-md bg-[#3C4321]"
              data-aos-delay="300"
            >
              <p className="text-xl font-bold text-gray-200">
                {timeLeft.minutes}
              </p>
              <p className="text-sm text-gray-200">Minutes</p>
            </Card>
            <Card
              data-aos="zoom-in"
              className="p-2 text-center shadow-md bg-[#3C4321]"
              data-aos-delay="400"
            >
              <p className="text-xl font-bold text-gray-200">
                {timeLeft.seconds}
              </p>
              <p className="text-sm text-gray-200">Seconds</p>
            </Card>
          </div>

          <div></div>
        </div>
      </main>
      <Divider className="" />
      <section className="w-[450px] relative flex flex-col items-center p-6 min-h-screen bg-gray-50">
        <div className="mt-[100px]"></div>
        <div className="w-72 text-center mb-6">
          <h1 className="font-montserrat text-2xl font-semibold">PENGANTAR</h1>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 relative z-10">
          <motion.div
            ref={ref}
            variants={containerVariants}
            animate={inView ? "visible" : "hidden"}
            initial="hidden"
            className="whitespace-pre-wrap text-justify"
          >
            {paragraphs.map((paragraph, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                custom={index}
                className="mb-4 font-violet text-sm"
              >
                <p>{paragraph}</p>
              </motion.div>
            ))}
            <Divider />
            <h4 className="text-center font-violet mt-8">
              Untuk mengenang semua itu kami menantikan kehadiran kakak kakak
              purna Ambalan untuk hadir pada kegiatan “Pandu Memories 2”.
            </h4>
          </motion.div>
        </div>
        {/* <img
          src="/pola3.png"
          alt="Decorative Leaf"
          className="absolute bottom-0 left-0 w-32 h-32 object-cover -rotate-90 z-0"
        /> */}
      </section>
      <Divider />

      <Divider />
      <Pelaksanaan />
      <AgendaAcara />
      <Divider />
      <Biaya />
      <Gallery />
      <section className="w-[450px] relative flex flex-col items-center p-6 h-[600px] bg-[#E2E9C5]">
        <div className="mt-20"></div>
        <Image src="/ambalan.png" className="" width={250} />
        <div>
          <h1 className="font-montserrat text-md text-center mt-8 text-[#3a3a3a] font-medium">
            Merupakan Suatu Kebahagiaan dan Kehormatan bagi Kami, Apabila
            Bapak/Ibu/Saudara/i, Berkenan Hadir di Acara kami
          </h1>

          <p className="mt-12 text-center font-serif"> - Terima Kasih -</p>
        </div>
      </section>
      {/*NAVIGATION */}
      <div className="fixed bottom-0 w-[450px] bg-white border-t border-gray-200 shadow-lg  z-50">
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
          <Button
            onClick={toggleMusic}
            className="bg-[#E2E9C5] text-black hover:bg-[#c0c4aa] active:bg-[#a1a587]"
          >
            <Music />
          </Button>
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
                  Pandu Memories 2.
                </p>

                <div className="mt-4"></div>

                <div className="grid grid-cols-1 gap-8">
                  <form onSubmit={handleSave}>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Nama Lengkap
                    </label>
                    <Input
                      id="name"
                      fullWidth
                      clearable
                      placeholder="Nama Lengkap"
                      className="mb-4"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium mb-2"
                    >
                      Status Kehadiran
                    </label>
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

                    <label
                      htmlFor="numberOfPeople"
                      className="block text-sm font-medium mb-2"
                    >
                      Jumlah Orang
                    </label>
                    <Input
                      id="numberOfPeople"
                      type="number"
                      min="1"
                      fullWidth
                      placeholder="Jumlah Orang"
                      className="mb-4"
                      value={numberOfPeople}
                      onChange={(e) =>
                        setNumberOfPeople(parseInt(e.target.value))
                      }
                    />
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-bold">Total Harga:</span>
                      <span className="text-lg font-bold">
                        Rp {totalPrice.toLocaleString()}
                      </span>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#5f6d33] hover:bg-[#374118] "
                    >
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
