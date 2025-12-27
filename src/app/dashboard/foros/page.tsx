"use client";
import Loading from "@/src/components/Loading";
import { handleAxiosError } from "@/utils/errorHandler";
import { useCallback, useEffect, useState } from "react";
import { getForos } from "@/src/service/foros.service";
import FiltrarForos from "./components/FiltrarForos";
import { BsFillPostcardFill } from "react-icons/bs";
import CardForo from "./components/CardForo";
import { Foro } from "@/src/interfaces/foros.interface";
import { useDisclosure } from "@heroui/react";
import ModalEliminarForo from "./components/crudForo/ModalEliminarForo";
import ModalForoSelect from "./components/ModalForoSelect";

export default function foros() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [foros, setForos] = useState<Foro[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectForo, setSelectForo] = useState<Foro | null>(null);
  const [colorForo, setColorForo] = useState<string>("");
  const [selectModal, setSelectModal] = useState("");

  const getFindForos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getForos();

      setForos(res);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getFindForos();
  }, [getFindForos]);

  return (
    <div className="w-full p-4 overflow-x-hidden overflow-y-auto">
      <div className="flex flex-col  mb-4">
        <div className="flex gap-2">
          <BsFillPostcardFill className="text-2xl" />
          <h2 className="text-xl font-bold">Foros</h2>
        </div>
        <FiltrarForos />
      </div>
      {loading && <Loading />}{" "}
      <section className="flex flex-wrap justify-center gap-4">
        {foros.map((foro, index) => (
          <CardForo
            key={foro.id}
            foro={foro}
            index={index}
            setSelectForo={setSelectForo}
            onOpen={onOpen}
            setColorForo={setColorForo}
            setSelectModal={setSelectModal}
          />
        ))}
      </section>
      {selectModal === "eliminar" && selectForo && (
        <ModalEliminarForo
          key={selectForo.id}
          open={isOpen}
          onClose={() => onOpenChange()}
          getFindForos={getFindForos}
          foro={selectForo}
        />
      )}
      {selectModal === "foro" && selectForo && (
        <ModalForoSelect
          key={selectForo.id}
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          selectForo={selectForo}
          colorForo={colorForo}
        />
      )}
    </div>
  );
}
