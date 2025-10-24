'use client';

import Image from 'next/image';
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
  const [isCompact, setIsCompact] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const boundsRef = useRef({ start: 0, range: 1 });
  const rafRef = useRef<number | undefined>(undefined);
  const [highlightBase, setHighlightBase] = useState({ width: 0, height: 0 });
  const [targetSize, setTargetSize] = useState({ width: 0, height: 0 });
  const highlightBaseRef = useRef({ width: 0, height: 0 });
  const targetSizeRef = useRef({ width: 0, height: 0 });
  const initialCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const stageVectorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const finalVectorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const finalChatRef = useRef<HTMLDivElement>(null);
  const debugStepRef = useRef(-1);

  const updateFinalTarget = () => {
    const chat = finalChatRef.current;
    if (!chat) {
      return;
    }
    const initial = initialCenterRef.current;
    if (initial.x === 0 && initial.y === 0) {
      return;
    }

    const rect = chat.getBoundingClientRect();
    const nextSize = {
      width: rect.width,
      height: rect.height,
    };
    const sizeChanged =
      Math.abs(targetSizeRef.current.width - nextSize.width) > 0.5 ||
      Math.abs(targetSizeRef.current.height - nextSize.height) > 0.5;
    if (sizeChanged) {
      targetSizeRef.current = nextSize;
      setTargetSize(nextSize);
    }

    finalVectorRef.current = {
      x: rect.left + rect.width / 2 - initial.x,
      y: rect.top + rect.height / 2 - initial.y,
    };
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      const next = window.innerWidth <= 900;
      setIsCompact((prev) => (prev === next ? prev : next));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (isCompact) {
      progressRef.current = 0;
      setProgress((prev) => (prev === 0 ? prev : 0));
      if (highlightBaseRef.current.width !== 0 || highlightBaseRef.current.height !== 0) {
        highlightBaseRef.current = { width: 0, height: 0 };
      }
      if (initialCenterRef.current.x !== 0 || initialCenterRef.current.y !== 0) {
        initialCenterRef.current = { x: 0, y: 0 };
      }
      stageVectorRef.current = { x: 0, y: 0 };
      finalVectorRef.current = { x: 0, y: 0 };
      targetSizeRef.current = { width: 0, height: 0 };
      setHighlightBase((prev) => (prev.width === 0 && prev.height === 0 ? prev : { width: 0, height: 0 }));
      setTargetSize((prev) => (prev.width === 0 && prev.height === 0 ? prev : { width: 0, height: 0 }));
      return;
    }

    const updateProgress = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const { start, range } = boundsRef.current;
      const raw = range <= 0 ? 0 : (scrollY - start) / range;
      const next = clamp(raw);

      progressRef.current = next;
      setProgress((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));

      updateFinalTarget();

      if (process.env.NODE_ENV !== 'production') {
        const snapshot = Math.round(next * 20);
        if (snapshot !== debugStepRef.current) {
          debugStepRef.current = snapshot;
          const stage = stageVectorRef.current;
          const final = finalVectorRef.current;
          const hasFinal = Math.abs(final.x) > 0.001 || Math.abs(final.y) > 0.001;
          const travelTarget = hasFinal
            ? Math.max(final.y, stage.y)
            : stage.y;
          const travelProgress = smoothStep(0.08, 0.84, next);
          const highlightY = travelTarget * travelProgress;
          console.log('[transition-debug]', {
            progress: Number((snapshot / 20).toFixed(2)),
            stageVectorY: Number(stage.y.toFixed(2)),
            finalVectorY: Number(final.y.toFixed(2)),
            travelTarget: Number(travelTarget.toFixed(2)),
            highlightY: Number(highlightY.toFixed(2)),
          });
        }
      }
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
        const stageTargetY = stageRect.top + stageRect.height * 0.5;
        const highlightCenterX = highlightRect.left + highlightRect.width / 2;
        const highlightCenterY = highlightRect.top + highlightRect.height / 2;

        if (progressRef.current < 0.02 || (initialCenterRef.current.x === 0 && initialCenterRef.current.y === 0)) {
          const nextInitial = {
            x: highlightCenterX,
            y: highlightCenterY,
          };
          if (
            Math.abs(initialCenterRef.current.x - nextInitial.x) > 0.5 ||
            Math.abs(initialCenterRef.current.y - nextInitial.y) > 0.5
          ) {
            initialCenterRef.current = nextInitial;
          } else if (initialCenterRef.current.x === 0 && initialCenterRef.current.y === 0) {
            initialCenterRef.current = nextInitial;
          }
          const baseDimensions = {
            width: highlightRect.width,
            height: highlightRect.height,
          };
          const baseChanged =
            Math.abs(highlightBaseRef.current.width - baseDimensions.width) > 0.5 ||
            Math.abs(highlightBaseRef.current.height - baseDimensions.height) > 0.5;
          if (baseChanged) {
            highlightBaseRef.current = baseDimensions;
            setHighlightBase(baseDimensions);
          }
        } else if (highlightBaseRef.current.width === 0 || highlightBaseRef.current.height === 0) {
          const baseDimensions = {
            width: highlightRect.width,
            height: highlightRect.height,
          };
          highlightBaseRef.current = baseDimensions;
          setHighlightBase(baseDimensions);
        }

        const stageHeight = stageRect.height;
        const stageVector = {
          x: stageTargetX - initialCenterRef.current.x,
          y: stageTargetY - initialCenterRef.current.y,
        };
        stageVectorRef.current = stageVector;

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
          const nextSize = {
            width: chatRect.width,
            height: chatRect.height,
          };
          const hasChanged =
            targetSizeRef.current.width !== nextSize.width ||
            targetSizeRef.current.height !== nextSize.height;
          if (hasChanged) {
            targetSizeRef.current = nextSize;
            setTargetSize(nextSize);
          }
          const downwardBias = stageHeight * 0.28;
          finalVectorRef.current = {
            x: chatRect.left + chatRect.width / 2 - initialCenterRef.current.x,
            y:
              chatRect.top + chatRect.height / 2 - initialCenterRef.current.y + downwardBias,
          };
        } else {
          const desiredWidth = Math.min(720, Math.max(highlightRect.width * 1.9, stageRect.width * 0.68));
          const desiredHeight = Math.max(highlightRect.height * 0.78, 90);
          if (targetSizeRef.current.width === 0 || targetSizeRef.current.height === 0) {
            const nextSize = {
              width: desiredWidth,
              height: desiredHeight,
            };
            targetSizeRef.current = nextSize;
            setTargetSize(nextSize);
          }
         finalVectorRef.current = stageVectorRef.current;
        }

        const currentFinal = finalVectorRef.current;
        if (Math.abs(currentFinal.x) > 0.001 || Math.abs(currentFinal.y) > 0.001) {
          const minDownward = stageVector.y + stageHeight * 0.75;
          if (currentFinal.y <= minDownward) {
            finalVectorRef.current = {
              x: currentFinal.x,
              y: minDownward,
            };
          }
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
    let fontsCancelled = false;
    const fontFaceSet = (document as Document & { fonts?: FontFaceSet }).fonts;
    fontFaceSet?.ready.then(() => {
      if (fontsCancelled) {
        return;
      }
      highlightBaseRef.current = { width: 0, height: 0 };
      setHighlightBase({ width: 0, height: 0 });
      updateBounds();
    });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateBounds);

    return () => {
      fontsCancelled = true;
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBounds);
    };
  }, [isCompact]);

  if (isCompact) {
    return (
      <div className={styles.compactWrapper}>
        <section className={styles.compactSection} aria-label="Feel better transition">
          <h2 className={styles.compactHeading}>
            Your mood can improve in <span>1 conversation.</span>
          </h2>
          <div className={styles.compactChatCard}>
            <div className={styles.compactMic} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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
            <div className={styles.compactPrompt}>Feel better</div>
          </div>
          <div className={styles.compactSummary}>
            <div className={styles.compactGraph}>
              <Image src="/serin-graph.png" alt="Mood improvement graph" width={160} height={120} priority />
            </div>
            <div className={styles.compactStat}>67%</div>
          </div>
        </section>
      </div>
    );
  }

  const leadingFade = 1 - smoothStep(0.2, 0.34, progress);
  const trailingFade = 1 - smoothStep(0.26, 0.38, progress);
  const leadingLift = lerp(0, -24, smoothStep(0.2, 0.36, progress));
  const trailingLift = lerp(0, -28, smoothStep(0.26, 0.4, progress));  const highlightStretch = smoothStep(0.14, 0.58, progress);
  const labelMorph = smoothStep(0.24, 0.72, progress);
  const highlightChatReveal = smoothStep(0.65, 0.9, progress);

  const highlightGlow = lerp(20, 60, highlightStretch);
  const highlightDepth = lerp(32, 78, highlightStretch);
  const highlightBorder = Math.max(0, lerp(1.4, 0.2, highlightStretch));

  const finalReveal = smoothStep(0.68, 0.94, progress);

  const stageVector = stageVectorRef.current;
  const finalVector = finalVectorRef.current;
  const hasFinal =
    Math.abs(finalVector.x) > 0.001 || Math.abs(finalVector.y) > 0.001;
  const travelTarget = hasFinal
    ? { x: finalVector.x, y: Math.max(finalVector.y, stageVector.y) }
    : stageVector;
  const travelProgress = smoothStep(0.08, 0.95, progress);

  const highlightTranslateX = travelTarget.x * travelProgress;
  const highlightTranslateY = travelTarget.y * travelProgress;

  const highlightWidth =
    highlightBase.width > 0 && targetSize.width > 0
      ? lerp(highlightBase.width, targetSize.width, highlightStretch)
      : undefined;
  const highlightHeight =
    highlightBase.height > 0 && targetSize.height > 0
      ? lerp(highlightBase.height, targetSize.height, highlightStretch)
      : undefined;
  const highlightRadius = highlightHeight ? highlightHeight / 2 : undefined;

  const highlightOpacity = 1 - smoothStep(0.96, 1, progress);

  const highlightStyle: React.CSSProperties = {
    borderWidth: `${highlightBorder}px`,
    borderColor: `rgba(120, 102, 255, ${Math.max(0, 0.55 - highlightStretch * 0.4)})`,
    background:
      highlightStretch > 0.02
        ? `linear-gradient(135deg, rgba(122, 100, 255, ${0.94}) 0%, rgba(74, 47, 217, ${0.98}) 100%)`
        : 'linear-gradient(135deg, #7C65FF 0%, #5632E4 100%)',
    boxShadow: `0 ${highlightGlow}px ${highlightDepth}px rgba(25, 10, 94, ${0.24 + highlightStretch * 0.35})`,
    transform: `translate(${highlightTranslateX}px, ${highlightTranslateY}px)`,
    width: highlightWidth ? `${highlightWidth}px` : undefined,
    height: highlightHeight ? `${highlightHeight}px` : undefined,
    borderRadius: highlightRadius ? `${highlightRadius}px` : undefined,
    opacity: highlightOpacity,
  };

  const highlightLabelScale = lerp(1, 0.58, labelMorph);
  const highlightLabelLift = lerp(0, -10, labelMorph);
  const highlightLabelOpacity = 1 - smoothStep(0.74, 0.92, progress);
  const highlightLabelStyle: React.CSSProperties = {
    transform: `translateY(${highlightLabelLift}px) scale(${highlightLabelScale})`,
    opacity: highlightLabelOpacity,
  };

  const chatStyle: React.CSSProperties = {
    transform: `translateY(${lerp(32, 0, highlightChatReveal)}px)`,
    opacity: highlightChatReveal,
    visibility: highlightChatReveal > 0.02 ? 'visible' : 'hidden',
  };

  const placeholderStyle: React.CSSProperties = {
    transform: `translateY(${lerp(18, 0, highlightChatReveal)}px)`,
    opacity: highlightChatReveal,
  };

  const micProgress = smoothStep(0.6, 0.84, progress);
  const micStyle: React.CSSProperties = {
    transform: `scale(${0.7 + micProgress * 0.3})`,
    opacity: highlightChatReveal,
  };

  const finalLayoutScale = lerp(0.98, 1, finalReveal);
  const finalLayoutOpacity = finalReveal;
  const finalLayoutVisible = finalLayoutOpacity > 0.02;
  const finalLayoutStyle: React.CSSProperties = {
    opacity: finalLayoutOpacity,
    visibility: finalLayoutVisible ? 'visible' : 'hidden',
    transform: `translate(-50%, -50%) scale(${finalLayoutScale})`,
    pointerEvents: finalLayoutOpacity > 0.88 ? 'auto' : 'none',
  };

  const finalHeadingStyle: React.CSSProperties = {
    transform: `translateY(${lerp(24, 0, finalReveal)}px)`,
    opacity: smoothStep(0.75, 1, finalReveal),
  };

  const finalStatStyle: React.CSSProperties = {
    transform: `translateY(${lerp(32, 0, finalReveal)}px)`,
    opacity: smoothStep(0.78, 1, finalReveal),
  };

  const finalChatStyle: React.CSSProperties = {
    transform: 'translateY(0)',
    opacity: smoothStep(0.96, 1, progress),
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
                    Feel better
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
              <span>Your mood can improve</span>
              <span>in 1 conversation</span>
            </h2>

            <div className={styles.finalStatRow} style={finalStatStyle}>
              <div className={styles.finalGraph}>
                <Image src="/serin-graph.png" alt="Mood improvement graph" width={200} height={160} priority />
              </div>
              <div className={styles.finalStatValue}>67%</div>
            </div>
            <div
              ref={finalChatRef}
              className={styles.finalChatBar}
              style={finalChatStyle}
              aria-hidden={finalReveal < 0.1}
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
              <span className={styles.finalChatPlaceholder}>Feel better</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
