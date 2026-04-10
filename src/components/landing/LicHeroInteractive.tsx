"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TITLES = [
  "Disciplined Design",
  "Long-term conviction",
  "Exceptional service",
  "Value",
] as const;

const ROTATION_MS = 10_000;

export function LicHeroInteractive() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | undefined>(undefined);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== undefined) {
      window.clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const startRotation = useCallback(() => {
    clearTimer();
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % TITLES.length);
    }, ROTATION_MS);
  }, [clearTimer]);

  useEffect(() => {
    startRotation();
    return clearTimer;
  }, [startRotation, clearTimer]);

  const selectPanel = (panelIndex: number) => {
    setIndex(panelIndex);
    startRotation();
  };

  return (
    <div className="hero">
      <div className="hero__panels">
        {TITLES.map((title, panelIndex) => (
          <button
            key={title}
            type="button"
            className={`panel${panelIndex === index ? " active" : ""}`}
            aria-pressed={panelIndex === index}
            aria-label={`Hero highlight ${panelIndex + 1} of ${TITLES.length}`}
            onClick={() => selectPanel(panelIndex)}
          />
        ))}
      </div>

      <div className="hero__container">
        <h1 className="hero__title">
          {TITLES[index]}
          <br />
          for your website.
        </h1>
        <div className="hero__booking">
          <a href="#"> Start with a website template</a>
        </div>
      </div>
    </div>
  );
}
