import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import "./App.css";

import musicFile from "./music/music_for_videos-wedding-march-music-box-163683 (1).mp3";
import play from "./img/circle-play-solid-full.svg";
import pause from "./img/circle-pause-solid-full.svg";
import cake from "./img/afec371b0d00-wedding-cake-t.webp";
import restaurant from "./img/2774127.f80979f42a4b357703de1f25eaa02d87.jpg";

function App() {
    const [timeLeft, setTimeLeft] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // ✅ weddingDate endi stable (eslint xato bermaydi)
    const weddingDate = useMemo(
        () => new Date(2026, 4, 1, 18, 0, 0).getTime(),
        []
    );

    // ✅ countdown fix
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

    // ✅ music toggle (clean)
    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) audio.pause();
        else audio.play();

        setIsPlaying(prev => !prev);
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    };

    return (
        <div className="app">

            {/* AUDIO */}
            <audio ref={audioRef} loop>
                <source src={musicFile} type="audio/mp3" />
            </audio>

            {/* HERO */}
            <motion.section className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h1 initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                    SHAXZOD
                </motion.h1>

                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}>
                    &
                </motion.span>

                <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                    MARJONA
                </motion.h1>

                <motion.p className="date" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
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
            <motion.section className="section sec" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <motion.div
                    className={`music ${isPlaying ? "playing" : ""}`}
                    onClick={toggleMusic}
                    whileTap={{ scale: 0.9 }}
                >
                    <img src={isPlaying ? pause : play} alt="music" />
                </motion.div>

                <p className="music_p">Musiqa</p>

                <h2>TO‘Y TAKLIFNOMASI</h2>
                <p>
                    Sizni hayotimizdagi eng muhim kunga taklif qilamiz.
                    Ushbu quvonchli lahzani siz bilan baham ko‘rish biz uchun sharaf.
                </p>

                <div className="line"></div>

                <motion.div
                    key={timeLeft}
                    className="timer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
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
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
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

                <motion.div className="location-card" whileHover={{ y: -8, scale: 1.01 }}>
                    <div className="map-preview">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps?q=Grand%20Hall%20Tashkent&output=embed"
                        />
                    </div>

                    <div className="location-info">
                        <h3>Grand Hall</h3>
                        <p>Toshkent</p>

                        <img className="restaurant" src={restaurant} alt="restaurant" />

                        <button onClick={() => window.open("https://www.google.com/maps?q=Grand+Hall+Tashkent")}>
                            📍 Open Map
                        </button>
                    </div>
                </motion.div>
            </motion.section>

            {/* TIMELINE */}
            <motion.section className="section sec4" variants={fadeUp} initial="hidden" whileInView="show">
                <h2 className="ser">TO‘Y DASTURI</h2>

                <div className="timeline">
                    <div className="time-item"><div className="time">17:00</div><div>Mehmonlar</div></div>
                    <div className="time-item"><div className="time">18:00</div><div>Boshlanish</div></div>
                    <div className="time-item"><div className="time">19:00</div><div>Marosim</div></div>
                    <div className="time-item"><div className="time">22:00</div><div>Tort 🎂</div></div>
                </div>
            </motion.section>

            {/* FOOTER */}
            <motion.section className="section" variants={fadeUp} initial="hidden" whileInView="show">
                <h2>Sizni kutamiz ❤️</h2>
                <p>+998 99 123 45 67</p>
            </motion.section>

        </div>
    );
}

export default App;