"use client";
import Loading from "@/src/components/Loading";
import { handleAxiosError } from "@/utils/errorHandler";
import { Button } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";

import { getBanner } from "@/src/service/banner.service";
import { Banner } from "@/src/interfaces/banner.interface";
import SwiperBanner from "./components/SwiperBanner";
import ModalAgregarBanner from "./components/ModalAgregarBanner";
import ModalEditarBanner from "./components/ModalEditarBanner";
import ModalEliminarBanner from "./components/ModalEliminarNotificacion";

export default function BannerPage() {
  const [openModal, setOpenModal] = useState(false);
  const [selectModal, setSelectModal] = useState("");
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  const gfindBanner = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getBanner();
      setBanners(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    gfindBanner();
  }, [gfindBanner]);

  const handleNew = () => {
    setSelectedBanner(null);
    setOpenModal(true);
    setSelectModal("nueva_notificacion");
  };
  return (
    <div className="w-full p-4 overflow-x-hidden overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Banners </h2>
        <Button onPress={handleNew}>Agregar Banner</Button>
      </div>
      {loading && <Loading />}{" "}
      <SwiperBanner
        banners={banners}
        setSelectModal={setSelectModal}
        setSelectedBanner={setSelectedBanner}
        setOpenModal={setOpenModal}
      />
      {selectModal === "nueva_notificacion" && (
        <ModalAgregarBanner
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindBanner={gfindBanner}
        />
      )}
      {selectModal === "editar" && selectedBanner && (
        <ModalEditarBanner
          key={selectedBanner.id}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindBanner={gfindBanner}
          selectedBanner={selectedBanner}
        />
      )}
      {selectModal === "eliminar" && selectedBanner && (
        <ModalEliminarBanner
          key={selectedBanner.id}
          open={openModal}
          onClose={() => setOpenModal(false)}
          gfindBanner={gfindBanner}
          selectedBanner={selectedBanner}
        />
      )}
    </div>
  );
}
