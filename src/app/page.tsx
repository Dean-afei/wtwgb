"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Home() {
  const audioRef = useRef<any>();

  useEffect(() => {
    // console.log(audioRef.current);
    // audioRef.current.play();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      这个世界会好吗
      <audio ref={audioRef} controls src="/audio/backgroundMusic.mp3"></audio>
      <button
        onClick={() => {
          audioRef.current.play();
        }}
      >
        play
      </button>
    </main>
  );
}
