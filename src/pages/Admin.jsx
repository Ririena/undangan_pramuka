import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/config/supabase";
import {
  Divider,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";

export default function Admin() {
  const [dataPendaftar, setDataPendaftar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null); 
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRegistrants() {
      try {
        const { data, error } = await supabase.from("pendaftaran").select("*");

        if (error) {
          console.error("Error fetching registrants:", error.message);
        } else {
          setDataPendaftar(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching registrants:", error.message);
      }
    }

    fetchRegistrants();
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

  
  const deleteRegistrant = async () => {
    console.log(`Deleting registrant with id: ${deleteId}`);
    try {
      const { error } = await supabase
        .from("pendaftaran")
        .delete()
        .eq("id", deleteId);

      if (error) {
        console.error("Error deleting registrant:", error.message);
      } else {
        console.log("Registrant deleted successfully");
        setDataPendaftar(
          dataPendaftar.filter((pendaftar) => pendaftar.id !== deleteId)
        );
      }
    } catch (error) {
      console.error("Error deleting registrant:", error.message);
    } finally {
      onOpenChange(false); 
    }
  };

  
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  if (loading) {
    return (
      <main className="bg-[#E2E9C5] w-[450px] flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </main>
    );
  }

  return (
    <main className="bg-[#E2E9C5] w-[450px] relative flex flex-col items-center p-6 min-h-screen">
      <div className="fixed top-0 w-[450px] bg-white border-b border-gray-200 shadow-lg z-50">
        <div className="flex justify-center items-center py-2 px-4 bg-gradient-to-t from-gray-100 to-white">
          <h1 className="text-center font-montserrat text-2xl font-semibold">
            List Pendaftar
          </h1>
        </div>
      </div>
      <div className="mt-16 w-full">
        <div className="flex flex-col items-center">
          {dataPendaftar.length > 0 ? (
            <ul className="w-full space-y-4">
              {dataPendaftar.map((pendaftar) => (
                <li
                  key={pendaftar.id}
                  className="relative bg-white shadow-md rounded-lg p-4"
                >
                  <div className="absolute top-2 right-2">
                    <Button
                      className="bg-red-500 hover:bg-red-600 active:bg-red-700"
                      onClick={() => {
                        setDeleteId(pendaftar.id);
                        onOpen();
                      }}
                    >
                      Aksi Delete
                    </Button>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {pendaftar.daftar_nama}
                  </h2>
                  <Divider className="mt-2" />
                  <p className="text-gray-600">
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">
                      {pendaftar.daftar_kehadiran}{" "}
                    </span>
                    dalam acara
                  </p>
                  <p className="text-gray-600">
                    <strong>Total Harga:</strong>{" "}
                    {formatRupiah(pendaftar.daftar_total_harga)}
                  </p>
                  <p className="text-gray-600">
                    <strong>Dibuat Pada:</strong>{" "}
                    {new Date(pendaftar.daftar_created_at).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <strong>Total Pendaftar:</strong>{" "}
                    {pendaftar.daftar_total_pendaftar}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No registrants found.</p>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Delete Registrant</ModalHeader>
          <Divider />
          <ModalBody>
            Apakah Anda Yakin Ingin Menghapus Pendaftar Tersebut?
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              auto
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 active:bg-green-700"
              onClick={deleteRegistrant}
              color="error"
              auto
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
}
