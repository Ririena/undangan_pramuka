import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/config/supabase";
import { Card, Divider } from "@nextui-org/react";
import {Spinner} from "@nextui-org/react";
export default function Admin() {
  const [dataPendaftar, setDataPendaftar] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <main className="bg-[#E2E9C5] w-[450px] flex justify-center items-center min-h-screen">
        <Spinner size="lg"/>
      </main>
    );
  }

  // Function to format price to Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

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
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {pendaftar.daftar_nama}
                  </h2>
                  <Divider />
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
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No registrants found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
