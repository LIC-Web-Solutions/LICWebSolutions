"use client";

import { motion } from "motion/react";

import WorldMap from "@/components/ui/world-map";
import styles from "./world-map-demo.module.css";

export default function WorldMapDemo() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <p className={styles.title}>
          Remote{" "}
          <span className={styles.titleMuted}>
            {Array.from("Connectivity").map((word, idx) => (
              <motion.span
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed marketing string; order never changes
                key={idx}
                className={styles.char}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className={styles.lede}>
          Break free from traditional boundaries. Work from anywhere, at the
          comfort of your own studio apartment. Perfect for Nomads and
          Travellers.
        </p>
      </div>
      <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            },
            end: {
              lat: 34.0522,
              lng: -118.2437,
            },
          },
          {
            start: { lat: 64.2008, lng: -149.4937 },
            end: { lat: -15.7975, lng: -47.8919 },
          },
          {
            start: { lat: -15.7975, lng: -47.8919 },
            end: { lat: 38.7223, lng: -9.1393 },
          },
          {
            start: { lat: 51.5074, lng: -0.1278 },
            end: { lat: 28.6139, lng: 77.209 },
          },
          {
            start: { lat: 28.6139, lng: 77.209 },
            end: { lat: 43.1332, lng: 131.9113 },
          },
          {
            start: { lat: 28.6139, lng: 77.209 },
            end: { lat: -1.2921, lng: 36.8219 },
          },
        ]}
      />
    </div>
  );
}
