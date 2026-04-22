import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import "./App.css";

import musicFile from "./music/music_for_videos-wedding-march-music-box-163683 (1).mp3";
import play from "./img/circle-play-solid-full.svg";
import pause from "./img/circle-pause-solid-full.svg";
import cake from "./img/afec371b0d00-wedding-cake-t.webp";
import restaurant from "./img/2774127.f80979f42a4b357703de1f25eaa02d87.jpg";
import ring from "./img/sandy-millar-unsplash-1400x933.webp"
function App() {
    const [timeLeft, setTimeLeft] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const weddingDate = useMemo(
        () => new Date(2026, 4, 1, 18, 0, 0).getTime(),
        []
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            if (distance < 0) {
                setTimeLeft("Boshlanmoqda 🎉");
                clearInterval(interval);
            } else {
                const d = Math.floor(distance / (1000 * 60 * 60 * 24));
                const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
                const m = Math.floor((distance / (1000 * 60)) % 60);

                setTimeLeft(`${d} kun • ${h} soat • ${m} min`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [weddingDate]);

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) audio.pause();
        else audio.play();

        setIsPlaying(prev => !prev);
    };

    // HERO TEXT ANIMATION
    const textAnim = {
        hidden: { opacity: 0, y: 50 },
        show: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.8,
                ease: "easeOut"
            }
        })
    };

    // SECTION ANIMATION
    const fadeUp = {
        hidden: { opacity: 0, y: 80 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="app">

            <audio ref={audioRef} loop>
                <source src={musicFile} type="audio/mp3" />
            </audio>

            {/* HERO */}
            <motion.section className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <motion.h1 custom={1} variants={textAnim} initial="hidden" animate="show">
                    SHAXZOD
                </motion.h1>

                <motion.span custom={2} variants={textAnim} initial="hidden" animate="show">
                    &
                </motion.span>

                <motion.h1 custom={3} variants={textAnim} initial="hidden" animate="show">
                    MARJONA
                </motion.h1>

                <motion.p
                    className="date"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    01 MAY 2026
                </motion.p>

                <motion.div
                    className="scroll"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    ↓ scroll
                </motion.div>

            </motion.section>

            {/* INFO */}
            <motion.section className="section sec" variants={fadeUp} initial="hidden" whileInView="show">

                <motion.div
                    className={`music ${isPlaying ? "playing" : ""}`}
                    onClick={toggleMusic}
                    whileTap={{ scale: 0.9 }}
                >
                    <img src={isPlaying ? pause : play} alt="music" />
                </motion.div>

                <p className="music_p">Musiqa</p>

                {/* ✨ TITLE ANIMATION */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    TO‘Y TAKLIFNOMASI
                </motion.h2>

                {/* ✨ TEXT ANIMATION */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Hurmatli mehominimiz <br />
                    Sizni aziz farzandlarimiz <br />
                    Shaxzod va Marjonalarning nikoh to'ylari munosabati bilan 1-may kuni taklif etamiz
                </motion.p>

                <div className="line"></div>

                {/* ✨ TIMER ANIMATION */}
                <motion.div
                    key={timeLeft}
                    className="timer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileInView={{ scale: [1, 1.05, 1] }}
                >
                    {timeLeft}
                </motion.div>

            </motion.section>

            {/* WEDDING DAY */}
            <motion.section className="section sec" variants={fadeUp} initial="hidden" whileInView="show">

                <h2>WEDDING DAY</h2>

                <motion.img
                    className="cake"
                    src={cake}
                    alt="cake"
                    animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="calendar">
                    <div className="cal-header">MAY 2026</div>

                    <div className="cal-grid">
                        {["Du", "Se", "Cho", "Pa", "Ju", "Sha", "Yak"].map(d => (
                            <div key={d} className="day-name">{d}</div>
                        ))}

                        {[...Array(4)].map((_, i) => <div key={i}></div>)}

                        {Array.from({ length: 31 }, (_, i) => (
                            <div key={i} className={`day ${i + 1 === 1 ? "active" : ""}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

            </motion.section>

            {/* LOCATION */}
            <motion.section className="section sec" variants={fadeUp} initial="hidden" whileInView="show">

                <h2>LOKATSIYA</h2>

                <motion.div
                    className="location-card"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                >

                    <div className="map-preview">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps?q=Grand%20Hall%20Tashkent&output=embed"
                        />
                    </div>

                    <div className="location-info">

                        <h3>Grand Hall</h3>
                        <p>Toshkent</p>

                        <motion.img
                            className="restaurant"
                            src={restaurant}
                            alt="restaurant"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        />

                        <button onClick={() => window.open("https://www.google.com/maps?q=Grand+Hall+Tashkent")}>
                            📍 Open Map
                        </button>

                    </div>
                </motion.div>

            </motion.section>

            {/* TIMELINE */}
            <motion.section className="section sec" variants={fadeUp} initial="hidden" whileInView="show">

                <h2 className="ser">TO‘Y DASTURI</h2>

                <div className="timeline">

                    {[
                        ["17:00", "Mehmonlar"],
                        ["18:00", "Boshlanish"],
                        ["19:00", "Marosim"],
                        ["22:00", "Tort 🎂"]
                    ].map(([time, event], i) => (
                        <motion.div
                            className="time-item"
                            key={i}
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <div className="time">{time}</div>
                            <div>{event}</div>


                        </motion.div>
                    ))}

                </div>
                <img className="ring" src={ring} alt=""/>
            </motion.section>

            {/* FOOTER */}
            <motion.section className="section sec" variants={fadeUp} initial="hidden" whileInView="show">

                <h1>Shaxzod & Marjona</h1>
                <h2>Sizni kutamiz ❤️</h2>
                <p>+998 99 123 45 67</p>

            </motion.section>

        </div>
    );
}

export default App;