"use client";

import { motion } from "framer-motion";

export default function FooterScene() {
    return (
        <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
            {/* Reverse Portal */}
            <motion.div
                initial={{ scale: 1, opacity: 1 }}
                whileInView={{ scale: 0, opacity: 0 }}
                transition={{ duration: 3, ease: "easeIn" }}
                viewport={{ margin: "-200px" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-[500px] border-[5px] border-neon-blue rounded-full blur-[2px] shadow-[0_0_50px_#00f3ff,inset_0_0_50px_#00f3ff] mix-blend-screen"
                style={{ background: 'radial-gradient(circle, rgba(0,243,255,0.2) 0%, rgba(5,5,5,1) 70%)' }}
            />

            <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 2 }}
                viewport={{ once: true }}
                className="z-10 text-3xl md:text-5xl font-creepster text-[#00f3ff] text-center drop-shadow-[0_0_15px_#00f3ff] max-w-2xl px-4 uppercase tracking-[0.2em]"
            >
                The dimension closes... <br /> until next year.
            </motion.h2>

            <div className="absolute bottom-10 left-0 w-full text-center text-xs font-mono text-gray-500">
                © {new Date().getFullYear()} SDC Fest'26. All reality streams reserved.
            </div>
        </div>
    );
}
