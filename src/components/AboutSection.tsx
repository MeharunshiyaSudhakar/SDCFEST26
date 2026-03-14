"use client";

import { motion } from "framer-motion";
import { Users, MapPin, Calendar } from "lucide-react";

export default function AboutSection() {
    const schedule = [
        { time: "09:00 AM", title: "Inauguration / Portal Opens", type: "tech" },
        { time: "10:30 AM", title: "Code Clash (Round 1)", type: "tech" },
        { time: "12:00 PM", title: "Shark Tank & Project Presentation", type: "mixed" },
        { time: "02:00 PM", title: "IPL Auction", type: "non-tech" },
        { time: "04:30 PM", title: "Valedictory / Dimension Closes", type: "mixed" }
    ];

    const organizers = [
        { name: "Eleven", role: "Psychokinetic Engineer", image: "https://i.pravatar.cc/150?img=1" },
        { name: "Dustin", role: "Comm-Tech Master", image: "https://i.pravatar.cc/150?img=11" },
        { name: "Mike", role: "Strategist", image: "https://i.pravatar.cc/150?img=12" },
    ];

    return (
        <div className="py-20 px-4 md:px-20 max-w-6xl mx-auto space-y-32">
            {/* About */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <h2 className="text-5xl font-orbitron text-neon-blue mb-8 tracking-[0.5em] uppercase">SDC Symposium</h2>
                
            </motion.div>

            {/* Schedule Timeline */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="relative border-l-4 border-neon-blue ml-4 md:ml-1/2 md:translate-x-[-2px] space-y-12">
                    {schedule.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: idx % 2 === 0 ? -50 : 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className={`relative flex items-center w-full ${idx % 2 === 0 ? 'justify-start md:justify-end md:pr-10' : 'justify-start md:pl-10'}`}
                        >
                            <div className="absolute left-[-12px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 bg-[#050505] border-4 border-neon-blue rounded-full z-10 shadow-[0_0_15px_#00f3ff]"></div>
                            <div className="bg-glass p-6 w-[90%] md:w-5/12 border border-[#00f3ff55] rounded-md hover:shadow-[0_0_20px_#00f3ff55] transition-shadow ml-6 md:ml-0">
                                <span className="text-neon-red font-orbitron text-lg block mb-2 uppercase tracking-widest">{item.time}</span>
                                <h3 className="text-xl font-bold font-orbitron text-white uppercase tracking-wider">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Organizers */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-orbitron text-neon-purple mb-12 flex items-center justify-center gap-4 uppercase tracking-widest">
                    <Users className="text-neon-purple" size={40} /> Sector Command
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {organizers.map((org, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, rotateY: 10 }}
                            className="bg-glass p-8 rounded-xl border border-neon-purple text-center relative overflow-hidden group"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Scanline effect over image */}
                            <div className="relative inline-block mb-4 h-32 w-32 rounded-full overflow-hidden border-2 border-neon-purple shadow-[0_0_20px_#9d00ff]">
                                <img src={org.image} alt={org.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#9d00ff55] opacity-50 block mix-blend-screen group-hover:animate-pulse"></div>
                            </div>
                            <h3 className="text-2xl font-orbitron text-white mb-2 uppercase tracking-widest">{org.name}</h3>
                            <p className="text-neon-purple font-mono uppercase tracking-widest text-xs">{org.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Contact Map */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
            >
                <h2 className="text-4xl font-orbitron text-neon-orange mb-12 flex items-center justify-center gap-4 uppercase tracking-widest">
                    <MapPin className="text-neon-orange" size={40} /> Signal Origin Coordinates
                </h2>
                <div className="w-full h-[400px] border border-neon-orange bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-glass rounded-xl shadow-[0_0_30_#ff5e0044] flex items-center justify-center flex-col relative overflow-hidden">
                    {/* Radar effect */}
                    <div className="absolute w-[800px] h-[800px] border border-neon-orange/20 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute w-[400px] h-[400px] border border-neon-orange/40 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>

                    <MapPin size={60} className="text-neon-orange animate-bounce drop-shadow-[0_0_15px_#ff5e00] z-10" />
                    <h3 className="text-2xl font-orbitron z-10 mt-6 tracking-[0.5em] text-shadow-[0_0_10px_#ffffff] uppercase text-white">[ Coordinates Encrypted ]</h3>
                    <p className="text-[#ff5e00] font-mono mt-4 z-10 tracking-[0.3em] uppercase text-xs animate-pulse">Transmission Pending...</p>
                </div>
            </motion.div>
        </div>
    );
}
