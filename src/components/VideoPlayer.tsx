import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ hlsUrl }: { hlsUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [poster, setPoster] = useState<string>(""); // url del poster

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(videoRef.current);

      // Opcional: capturar primer frame como preimagen
      videoRef.current.addEventListener("loadeddata", () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current!.videoWidth;
        canvas.height = videoRef.current!.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
          setPoster(canvas.toDataURL("image/png")); // Poster como base64
        }
      });
    }
  }, [hlsUrl]);

  return (
    <video
      ref={videoRef}
      controls
      poster={poster} // asigna el poster
      style={{ width: "100%", borderRadius: "10px" }}
    />
  );
}
