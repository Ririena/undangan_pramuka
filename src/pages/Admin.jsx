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
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortAttendance, setSortAttendance] = useState(""); // State untuk sort by attendance
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const [yearFilter, setYearFilter] = useState("");

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

  const filteredAndSortedData = [...dataPendaftar]
    .filter((pendaftar) => {
      if (sortAttendance === "hadir" && pendaftar.daftar_kehadiran !== "hadir")
        return false;
      if (
        sortAttendance === "tidak hadir" &&
        pendaftar.daftar_kehadiran !== "tidak hadir"
      )
        return false;
      if (
        yearFilter &&
        pendaftar.daftar_angkatan_tahun &&
        pendaftar.daftar_angkatan_tahun.toString() !== yearFilter
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      const fieldA =
        sortField === "name"
          ? a.daftar_nama
          : sortField === "date"
          ? new Date(a.daftar_created_at)
          : sortField === "attendance"
          ? a.daftar_kehadiran
          : undefined;
      const fieldB =
        sortField === "name"
          ? b.daftar_nama
          : sortField === "date"
          ? new Date(b.daftar_created_at)
          : sortField === "attendance"
          ? b.daftar_kehadiran
          : undefined;

      if (sortField === "attendance") {
        const attendancePriority = { "tidak hadir": 1, hadir: 2 }; // Prioritas untuk kehadiran
        return (
          (attendancePriority[fieldA] - attendancePriority[fieldB]) *
          (sortOrder === "asc" ? 1 : -1)
        );
      }

      if (sortOrder === "asc") {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

  const totalRegistrants = filteredAndSortedData.filter(
    (pendaftar) => pendaftar.daftar_kehadiran === "hadir"
  ).length;

  const totalAttendance = filteredAndSortedData.filter(
    (pendaftar) => pendaftar.daftar_kehadiran === "hadir"
  ).length;
  const totalAbsence = filteredAndSortedData.filter(
    (pendaftar) => pendaftar.daftar_kehadiran === "tidak hadir"
  ).length;
  const totalRevenue = filteredAndSortedData
    .filter((pendaftar) => pendaftar.daftar_kehadiran === "hadir")
    .reduce((sum, pendaftar) => {
      const harga = parseFloat(pendaftar.daftar_total_harga) || 0; // Convert to number
      return sum + harga;
    }, 0);

  const totalPendaftarHadir = filteredAndSortedData
    .filter((pendaftar) => pendaftar.daftar_kehadiran === "hadir")
    .reduce((sum, pendaftar) => {
      const totalPendaftar = parseInt(pendaftar.daftar_total_pendaftar) || 0;
      return sum + totalPendaftar;
    }, 0);

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
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Total Data
            </h2>
            <Divider className="mb-2" />
            <p className="text-gray-600">
              <strong>Total Pendaftar Per Group:</strong> {totalRegistrants}
            </p>
            <p className="text-gray-600">
              <strong>Total Pendaftar Keseluruhan:</strong>{" "}
              {totalPendaftarHadir}
            </p>
            <p className="text-gray-600">
              <strong>Total Dana Keseluruhan:</strong>{" "}
              {formatRupiah(totalRevenue)}
            </p>
            <p className="text-gray-600">
              <strong>Total Hadir(Per Group):</strong> {totalAttendance}
            </p>
            <p className="text-gray-600">
              <strong>Total Tidak Hadir(Per Group):</strong> {totalAbsence}
            </p>
          </div>
        </div>

        {/* Sorting Options */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Sorting</h2>
          <Divider className="mb-2" />
          <div className="flex justify-between items-center">
            <div>
              <label htmlFor="sortField" className="mr-2 text-gray-700">
                Sort by:
              </label>
              <select
                id="sortField"
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg p-2"
              >
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="attendance">Attendance</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortOrder" className="mr-2 text-gray-700">
                Order:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg p-2"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <label htmlFor="sortAttendance" className="mr-2 text-gray-700">
                Attendance:
              </label>
              <select
                id="sortAttendance"
                value={sortAttendance}
                onChange={(e) => setSortAttendance(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg p-2"
              >
                <option value="">All</option>
                <option value="hadir">Hadir</option>
                <option value="tidak hadir">Tidak Hadir</option>
              </select>
            </div>
            <div>
              <label htmlFor="yearFilter" className="mr-2 text-gray-700">
                Filter by Angkatan:
              </label>
              <input
                type="number"
                id="yearFilter"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg p-2"
                placeholder="Enter year"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          {filteredAndSortedData.length > 0 ? (
            <ul className="w-full space-y-4">
              {filteredAndSortedData.map((pendaftar) => (
                <li
                  key={pendaftar.id}
                  className="relative bg-white shadow-md rounded-lg p-4"
                >
                  <h2 className="text-lg font-semibold">
                    {pendaftar.daftar_nama}
                  </h2>
                  <Divider className="mt-1" />
                  <p className="text-gray-600">
                    Angkatan Tahun:{" "}
                    {pendaftar.daftar_angkatan_tahun
                      ? pendaftar.daftar_angkatan_tahun
                      : "-"}
                  </p>
                  <p className="text-gray-600">
                    Tanggal Daftar:{" "}
                    {new Date(pendaftar.daftar_created_at).toLocaleString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }
                    )}
                  </p>
                  {pendaftar.daftar_kehadiran === "hadir" && (
                    <>
                      <p className="text-gray-600">
                        Harga: {formatRupiah(pendaftar.daftar_total_harga)}
                      </p>
                    </>
                  )}

                  <p className="text-gray-600 capitalize">
                    Kehadiran: {pendaftar.daftar_kehadiran}
                  </p>
                  {pendaftar.daftar_kehadiran === "hadir" && (
                    <p className="text-gray-600 capitalize">
                      Total Pendaftar: {pendaftar.daftar_total_pendaftar}
                    </p>
                  )}
                  <Divider className="mb-4" />
                  <Button
                    className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700"
                    onClick={() => {
                      setDeleteId(pendaftar.id);
                      onOpen();
                    }}
                  >
                    Aksi Delete
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No registrants found.</p>
          )}
        </div>
      </div>

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
