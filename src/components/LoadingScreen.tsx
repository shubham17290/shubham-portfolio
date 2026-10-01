"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SEEN_KEY = "sm-loading-seen";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(SEEN_KEY);
    } catch {
      seen = true;
    }
    if (seen) return;
    const showTimer = setTimeout(() => setShow(true), 0);
    const hideTimer = setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage unavailable */
      }
    }, 1400);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b]"
        >
          <motion.span
            animate={{ scale: [1, 1.08, 1], opacity: [1, 0.85, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-black"
          >
            SM
          </motion.span>
          <div className="mt-6 h-[3px] w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-white via-emerald-400 to-violet-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
