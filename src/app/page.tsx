"use client";

import Threads from "@/Backgrounds/Threads/Threads";
import CardSwap, { Card } from "@/Components/CardSwap/CardSwap";
import ChatBot from "@/Components/ChatBot";
import SplashScreen from "@/Components/SplashScreen";
import BlurText from "@/TextAnimations/BlurText/BlurText";
import TrueFocus from "@/TextAnimations/TrueFocus/TrueFocus";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BiLogoTypescript } from "react-icons/bi";
import { RiNextjsFill, RiReactjsFill, RiTailwindCssFill } from "react-icons/ri";
import ScrambledText from "@/TextAnimations/ScrambledText/ScrambledText";

export default function Home() {
  const [showMain, setShowMain] = useState<boolean>(false);
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showMain) return;

    const sections = [
      { id: "home", ref: homeRef },
      { id: "about", ref: aboutRef },
      { id: "bot", ref: botRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("id");
            if (sectionId && window.location.hash !== `#${sectionId}`) {
              history.replaceState(null, "", `#${sectionId}`);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [showMain]);

  return (
    <>
      {!showMain && <SplashScreen onFinish={() => setShowMain(true)} />}
      {showMain && (
        <>
          <div
            id="home"
            ref={homeRef}
            style={{
              width: "100%",
              height: "650px",
              position: "relative",
            }}
          >
            <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 flex flex-col gap-5 z-20 items-center w-full">
              <BlurText
                text="Ahmad Mufid Risqi"
                delay={100}
                animateBy="letters"
                direction="top"
                className="text-5xl lg:text-[5rem] font-bold text-white"
              />
              <TrueFocus
                sentence="Developer Designer Creator"
                manualMode
                blurAmount={5}
                borderColor="green"
                animationDuration={0.5}
              />
            </div>
            <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
          </div>
          <div
            id="about"
            ref={aboutRef}
            className="w-full grid grid-cols-1 lg:grid-cols-2 items-center px-10 mt-16"
            style={{ height: "600px", position: "relative" }}
          >
            <div className="flex flex-col gap-5">
              <span className="flex items-center gap-3">
                <BlurText
                  text="About This Project"
                  delay={100}
                  animateBy="letters"
                  direction="top"
                  className="text-xl lg:text-5xl font-semibold text-white"
                />
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "160px" }}
                  className="w-40 h-0.5 bg-muted-foreground mt-4"
                  viewport={{ once: true }}
                />
              </span>
              <ScrambledText
                radius={100}
                duration={1.2}
                speed={0.5}
                scrambleChars={".:"}
                style={{ fontSize: "1rem", margin: 0 }}
              >
                Chatbot untuk mata kuliah Information Retrieval (IR) ini
                merupakan proyek yang dirancang untuk membantu pengguna dalam
                mencari informasi dari sebuah dataset menggunakan pertanyaan
                dalam bentuk bahasa alami. Chatbot ini dibangun dengan
                menerapkan konsep-konsep dasar IR seperti tokenisasi,
                penghapusan stopword, stemming, dan perhitungan TF-IDF untuk
                menentukan relevansi dokumen terhadap query yang diberikan.
                Proyek ini bertujuan untuk mengintegrasikan teori IR ke dalam
                aplikasi nyata yang interaktif, serta memberikan pengalaman
                pencarian informasi yang efisien dan intuitif bagi pengguna.
              </ScrambledText>
              <span className="flex items-center gap-3">
                <BlurText
                  text="Tech Stack"
                  delay={100}
                  animateBy="letters"
                  direction="top"
                  className="text-xl lg:text-3xl font-semibold text-white mt-5"
                />
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "80px" }}
                  className="w-20 h-0.5 bg-muted-foreground mt-6"
                  viewport={{ once: true }}
                />
              </span>
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  <RiReactjsFill className="w-10 h-10 text-blue-300" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  <RiNextjsFill className="w-10 h-10" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  <BiLogoTypescript className="w-10 h-10 text-blue-500" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  <RiTailwindCssFill className="w-10 h-10 text-cyan-300" />
                </motion.div>
              </div>
            </div>
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
            >
              <Card className="border-4">
                <h3 className="px-2 py-3 bg-background border-b-2 border-white rounded-t-xl flex items-center gap-2">
                  Next JS
                </h3>
                <div className="w-full h-80 m-3 rounded-xl flex items-center justify-center bg-black">
                  <RiNextjsFill className="w-40 h-40" />
                </div>
              </Card>
              <Card className="border-4">
                <h3 className="px-2 py-3 bg-background border-b-2 border-white rounded-t-xl flex items-center gap-2">
                  Tailwind CSS
                </h3>
                <div className="w-full h-80 m-3 rounded-xl flex items-center justify-center bg-black">
                  <RiTailwindCssFill className="w-40 h-40 text-cyan-300" />
                </div>
              </Card>
              <Card className="border-4">
                <h3 className="px-2 py-3 bg-background border-b-2 border-white rounded-t-xl flex items-center gap-2">
                  TypeScript
                </h3>
                <div className="w-full h-80 m-3 rounded-xl flex items-center justify-center bg-black">
                  <BiLogoTypescript className="w-40 h-40 text-blue-500" />
                </div>
              </Card>
            </CardSwap>
          </div>
          <div
            id="bot"
            ref={botRef}
            className="w-full px-10 py-20 bg-black mt-80"
          >
            <span className="flex items-center gap-3 mb-20">
              <BlurText
                text="Chatbot"
                delay={100}
                animateBy="letters"
                direction="top"
                className="text-2xl lg:text-5xl font-semibold text-white text-center"
              />
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "160px" }}
                className="w-40 h-0.5 bg-muted-foreground mt-4"
                viewport={{ once: true }}
              />
            </span>
            <ChatBot />
          </div>
        </>
      )}
    </>
  );
}
