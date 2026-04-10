"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useEffect, useState } from "react";

import { LIC_MAIN_SERVICE_BOXES } from "@/lib/licMainServices";

const MOBILE_MAX_PX = 1023;

export function LicMainServices() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`);
    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) setOpenIndex(null);
    };
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
    }
    return () => {
      if (typeof mq.removeEventListener === "function") {
        mq.removeEventListener("change", onChange);
      }
    };
  }, []);

  const activateBox = (boxIndex: number, target: EventTarget | null) => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`);
    if (!mq.matches) return;
    if (target instanceof HTMLElement && target.closest("a")) return;
    setOpenIndex((prev) => (prev === boxIndex ? null : boxIndex));
  };

  const handleBoxClick = (boxIndex: number, event: MouseEvent<HTMLElement>) => {
    activateBox(boxIndex, event.target);
  };

  const handleBoxKeyDown = (
    boxIndex: number,
    event: KeyboardEvent<HTMLElement>,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    activateBox(boxIndex, event.target);
  };

  return (
    <>
      {LIC_MAIN_SERVICE_BOXES.map((box, boxIndex) => (
        // biome-ignore lint/a11y/useSemanticElements: Box contains <a> links; <button> cannot wrap interactive descendants.
        <div
          key={box.title}
          role="button"
          tabIndex={0}
          className={`main__right--box${openIndex === boxIndex ? " is-open" : ""}`}
          onClick={(event) => handleBoxClick(boxIndex, event)}
          onKeyDown={(event) => handleBoxKeyDown(boxIndex, event)}
        >
          <div className="box__wrapper">
            <h3 className="box-h3">{box.title}</h3>
            <img className="box-img" src={box.imageSrc} alt={box.imageAlt} />
          </div>
          <div className="box__overlay" aria-hidden="true">
            <h4 className="box__overlay-title">{box.overlayTitle}</h4>
            <p className="box__overlay-text">{box.overlayText}</p>
            <ul className="box__overlay-links">
              {box.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}
