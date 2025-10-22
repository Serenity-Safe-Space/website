'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './TransitionSection.module.css';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothStep = (start: number, end: number, value: number) => {
  if (end === start) {
    return 0;
  }
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

export const TransitionSection: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const boundsRef = useRef({ start: 0, range: 1 });
  const rafRef = useRef<number>();
  const [highlightBase, setHighlightBase] = useState({ width: 0, height: 0 });
  const [targetSize, setTargetSize] = useState({ width: 0, height: 0 });
  const highlightBaseRef = useRef({ width: 0, height: 0 });
  const initialCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const stageVectorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const finalVectorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const finalChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const { start, range } = boundsRef.current;
      const raw = range <= 0 ? 0 : (scrollY - start) / range;
      const next = clamp(raw);

      setProgress((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
    };

    const updateBounds = () => {
      const wrapper = wrapperRef.current;
      const stage = stageRef.current;
      const highlight = highlightRef.current;
      if (!wrapper) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const offsetTop = rect.top + (window.scrollY || window.pageYOffset || 0);
      const height = rect.height;
      const range = Math.max(1, height - window.innerHeight);

      boundsRef.current = {
        start: offsetTop,
        range,
      };

      if (stage && highlight) {
        const stageRect = stage.getBoundingClientRect();
        const highlightRect = highlight.getBoundingClientRect();
        const stageTargetX = stageRect.left + stageRect.width / 2;
        const stageTargetY = stageRect.top + stageRect.height * 0.58;
        const highlightCenterX = highlightRect.left + highlightRect.width / 2;
        const highlightCenterY = highlightRect.top + highlightRect.height / 2;

        const initialCenter = initialCenterRef.current;
        if (initialCenter.x === 0 && initialCenter.y === 0) {
          initialCenterRef.current = {
            x: highlightCenterX,
            y: highlightCenterY,
          };
        }

        const stageVector = {
          x: stageTargetX - initialCenterRef.current.x,
          y: stageTargetY - initialCenterRef.current.y,
        };
        stageVectorRef.current = stageVector;
        if (finalVectorRef.current.x === 0 && finalVectorRef.current.y === 0) {
          finalVectorRef.current = stageVector;
        }

        if (highlightBaseRef.current.width === 0 || highlightBaseRef.current.height === 0) {
          const baseDimensions = {
            width: highlightRect.width,
            height: highlightRect.height,
          };
          highlightBaseRef.current = baseDimensions;
          setHighlightBase(baseDimensions);
        }

        const chatRect = finalChatRef.current?.getBoundingClientRect();

        if (chatRect) {
          setTargetSize({
            width: chatRect.width,
            height: chatRect.height,
          });
          finalVectorRef.current = {
            x: chatRect.left + chatRect.width / 2 - initialCenterRef.current.x,
            y: chatRect.top + chatRect.height / 2 - initialCenterRef.current.y,
          };
        } else {
          const desiredWidth = Math.min(720, Math.max(highlightRect.width * 1.9, stageRect.width * 0.68));
          const desiredHeight = Math.max(highlightRect.height * 0.78, 90);
          if (targetSize.width === 0 || targetSize.height === 0) {
            setTargetSize({
              width: desiredWidth,
              height: desiredHeight,
            });
          }
          finalVectorRef.current = stageVectorRef.current;
        }
      }

      updateProgress();
    };

    const handleScroll = () => {
      if (rafRef.current != null) {
        return;
      }
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = undefined;
        updateProgress();
      });
    };

    updateBounds();
    if ('fonts' in document) {
      (document as any).fonts.ready.then(() => {
        highlightBaseRef.current = { width: 0, height: 0 };
        setHighlightBase({ width: 0, height: 0 });
        updateBounds();
      });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateBounds);

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  const leadingFade = 1 - smoothStep(0.2, 0.34, progress);
  const trailingFade = 1 - smoothStep(0.26, 0.38, progress);
  const leadingLift = lerp(0, -24, smoothStep(0.2, 0.36, progress));
  const trailingLift = lerp(0, -28, smoothStep(0.26, 0.4, progress));

  const highlightDetach = smoothStep(0.22, 0.38, progress);
  const highlightStretch = smoothStep(0.28, 0.64, progress);
  const highlightChatReveal = smoothStep(0.5, 0.78, progress);

  const highlightGlow = lerp(24, 68, highlightStretch);
  const highlightDepth = lerp(38, 82, highlightStretch);
  const highlightBorder = Math.max(1, lerp(3, 0.6, highlightStretch));

  const finalReveal = smoothStep(0.68, 0.94, progress);

  const stageVector = stageVectorRef.current;
  const finalVector = finalVectorRef.current;
  const alignProgress = smoothStep(0.6, 0.95, progress);

  const baseTranslateX = stageVector.x * highlightDetach;
  const baseTranslateY = stageVector.y * highlightDetach;
  const alignmentTranslateX = (finalVector.x - stageVector.x) * alignProgress;
  const alignmentTranslateY = (finalVector.y - stageVector.y) * alignProgress;
  const highlightTranslateX = baseTranslateX + alignmentTranslateX;
  const highlightTranslateY = baseTranslateY + alignmentTranslateY;

  const highlightWidth =
    highlightBase.width > 0 && targetSize.width > 0
      ? lerp(highlightBase.width, targetSize.width, highlightStretch)
      : undefined;
  const highlightHeight =
    highlightBase.height > 0 && targetSize.height > 0
      ? lerp(highlightBase.height, targetSize.height, highlightStretch)
      : undefined;
  const highlightRadius = highlightHeight ? highlightHeight / 2 : undefined;

  const baseWidth = highlightBase.width || 0;
  const baseHeight = highlightBase.height || 0;
  const highlightOpacity = 1 - smoothStep(0.65, 0.95, finalReveal);

  const widthOffset =
    highlightWidth != null && baseWidth > 0 ? (highlightWidth - baseWidth) / 2 : 0;
  const heightOffset =
    highlightHeight != null && baseHeight > 0 ? (highlightHeight - baseHeight) / 2 : 0;

  const highlightStyle: React.CSSProperties = {
    borderWidth: `${highlightBorder}px`,
    borderColor: `rgba(255, 235, 94, ${Math.max(0, 0.85 - highlightStretch * 0.75)})`,
    background:
      highlightStretch > 0.02
        ? `linear-gradient(135deg, rgba(76, 37, 160, ${0.56 + highlightStretch * 0.32}) 0%, rgba(48, 16, 135, ${0.48 + highlightStretch * 0.44}) 100%)`
        : 'rgba(255, 240, 138, 0.12)',
    boxShadow: `0 ${highlightGlow}px ${highlightDepth}px rgba(13, 0, 77, ${0.18 + highlightStretch * 0.45})`,
    transform: `translate(${highlightTranslateX - widthOffset}px, ${highlightTranslateY - heightOffset}px)`,
    width: highlightWidth ? `${highlightWidth}px` : undefined,
    height: highlightHeight ? `${highlightHeight}px` : undefined,
    borderRadius: highlightRadius ? `${highlightRadius}px` : undefined,
    opacity: highlightOpacity,
  };

  const highlightLabelStyle: React.CSSProperties = {
    opacity: 1 - highlightChatReveal,
    transform: `translateY(${lerp(0, -24, highlightDetach)}px)`,
  };

  const chatStyle: React.CSSProperties = {
    opacity: highlightChatReveal,
  };

  const placeholderStyle: React.CSSProperties = {
    opacity: smoothStep(0.56, 0.8, progress),
  };

  const micStyle: React.CSSProperties = {
    opacity: smoothStep(0.6, 0.84, progress),
    transform: `scale(${0.8 + smoothStep(0.6, 0.84, progress) * 0.2})`,
  };

  const sendStyle: React.CSSProperties = {
    opacity: smoothStep(0.64, 0.88, progress),
    transform: `scale(${0.8 + smoothStep(0.64, 0.88, progress) * 0.2})`,
  };

  const finalLayoutStyle: React.CSSProperties = {
    opacity: finalReveal,
    transform: 'translate(-50%, -50%)',
    pointerEvents: finalReveal > 0.88 ? 'auto' : 'none',
  };

  const finalHeadingStyle: React.CSSProperties = {
    transform: `translateY(${lerp(28, 0, finalReveal)}px)`,
  };

  const finalStatStyle: React.CSSProperties = {
    transform: `translateY(${lerp(36, 0, finalReveal)}px)`,
  };

  const finalChatOpacity = smoothStep(0.7, 0.95, finalReveal);

  const finalChatStyle: React.CSSProperties = {
    transform: 'translateY(0)',
    opacity: finalChatOpacity,
  };

  return (
    <div ref={wrapperRef} className={styles.transitionWrapper}>
      <section className={styles.transitionSection} aria-label="Feel better transition">
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.textContainer}>
            <h2 className={styles.initialText}>
              <span className={styles.leadingText} style={{ opacity: leadingFade, transform: `translateY(${leadingLift}px)` }}>
                You can
              </span>
              <span
                ref={highlightRef}
                className={styles.highlightShell}
                style={highlightStyle}
              >
                <span className={styles.highlightLabel} style={highlightLabelStyle}>
                  Feel better
                </span>
                <div className={styles.highlightChat} style={chatStyle} aria-hidden={highlightChatReveal < 0.05}>
                  <div className={styles.highlightMic} style={micStyle}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 2.5C10.62 2.5 9.5 3.62 9.5 5V12.5C9.5 13.88 10.62 15 12 15C13.38 15 14.5 13.88 14.5 12.5V5C14.5 3.62 13.38 2.5 12 2.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M18.5 10V12.25C18.5 15.41 15.91 18 12.75 18H11.25C8.09 18 5.5 15.41 5.5 12.25V10H4V12.25C4 16.25 7.25 19.5 11.25 19.5V22H13.75V19.5C17.75 19.5 21 16.25 21 12.25V10H18.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className={styles.highlightInput} style={placeholderStyle}>
                    How are you feeling today?
                  </div>
                  <div className={styles.highlightArrow} style={sendStyle}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M8 5L18 12L8 19V5Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </span>
              <span className={styles.trailingText} style={{ opacity: trailingFade, transform: `translateY(${trailingLift}px)` }}>
                in one chat.
              </span>
            </h2>
          </div>

          <div className={styles.finalLayout} style={finalLayoutStyle}>
            <h2 className={styles.finalHeading} style={finalHeadingStyle}>
              Build a better future for yourself
            </h2>

            <div className={styles.finalStatRow} style={finalStatStyle}>
              <div className={styles.finalStatBadge}>
                <span>87%</span>
              </div>
              <p className={styles.finalStatCopy}>
                It&apos;s how your mood can improve in just one conversation.
              </p>
            </div>
            <div
              ref={finalChatRef}
              className={styles.finalChatBar}
              style={finalChatStyle}
              aria-hidden={finalChatOpacity < 0.1}
            >
              <div className={styles.finalChatMic}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2.5C10.62 2.5 9.5 3.62 9.5 5V12.5C9.5 13.88 10.62 15 12 15C13.38 15 14.5 13.88 14.5 12.5V5C14.5 3.62 13.38 2.5 12 2.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18.5 10V12.25C18.5 15.41 15.91 18 12.75 18H11.25C8.09 18 5.5 15.41 5.5 12.25V10H4V12.25C4 16.25 7.25 19.5 11.25 19.5V22H13.75V19.5C17.75 19.5 21 16.25 21 12.25V10H18.5Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className={styles.finalChatPlaceholder}>How are you feeling today?</span>
              <div className={styles.finalChatArrow}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5L18 12L8 19V5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
