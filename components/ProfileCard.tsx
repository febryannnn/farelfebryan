import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import "./ProfileCard.css";

type ProfileCardProps = {
  avatarUrl?: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: React.ReactNode;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
};

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180
};

const clamp = (v: number, min = 0, max = 100) =>
  Math.min(Math.max(v, min), max);

const round = (v: number, precision = 3) =>
  parseFloat(v.toFixed(precision));

const adjust = (
  v: number,
  fMin: number,
  fMax: number,
  tMin: number,
  tMax: number
) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

const ProfileCardComponent = ({
  avatarUrl = "",
  iconUrl = "",
  grainUrl = "",
  innerGradient,
  behindGlowEnabled = true,
  behindGlowColor,
  behindGlowSize,
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick
}: ProfileCardProps) => {
  const wrapRef = useRef < HTMLDivElement > (null);
  const shellRef = useRef < HTMLDivElement > (null);

  /* ============================
     TILT ENGINE (typed clean)
  ============================ */

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null;

    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      wrap.style.setProperty("--pointer-x", `${percentX}%`);
      wrap.style.setProperty("--pointer-y", `${percentY}%`);
      wrap.style.setProperty(
        "--rotate-x",
        `${round(-(percentX - 50) / 5)}deg`
      );
      wrap.style.setProperty(
        "--rotate-y",
        `${round((percentY - 50) / 4)}deg`
      );
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;

      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const k = 1 - Math.exp(-dt / 0.14);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(step);
    };

    return {
      setTarget(x: number, y: number) {
        targetX = x;
        targetY = y;
        start();
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
      }
    };
  }, [enableTilt]);

  /* ============================
     POINTER EVENTS
  ============================ */

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!shellRef.current || !tiltEngine) return;

      const rect = shellRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      tiltEngine.setTarget(x, y);
    },
    [tiltEngine]
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine || !shellRef.current) return;

    const shell = shellRef.current;

    shell.addEventListener("pointermove", handlePointerMove);

    return () => {
      shell.removeEventListener("pointermove", handlePointerMove);
      tiltEngine.cancel();
    };
  }, [enableTilt, tiltEngine, handlePointerMove]);

  /* ============================
     STYLE MEMO
  ============================ */

  const cardStyle = useMemo < React.CSSProperties > (
    () => ({
      ["--icon" as any]: iconUrl ? `url(${iconUrl})` : "none",
      ["--grain" as any]: grainUrl ? `url(${grainUrl})` : "none",
      ["--inner-gradient" as any]:
        innerGradient ?? DEFAULT_INNER_GRADIENT,
      ["--behind-glow-color" as any]:
        behindGlowColor ?? "rgba(125, 190, 255, 0.67)",
      ["--behind-glow-size" as any]: behindGlowSize ?? "50%"
    }),
    [iconUrl, grainUrl, innerGradient, behindGlowColor, behindGlowSize]
  );

  return (
    <div
      ref={wrapRef}
      className={`pc-card-wrapper ${className}`}
      style={cardStyle}
    >
      {behindGlowEnabled && <div className="pc-behind" />}

      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-content pc-avatar-content">
              <img
                className="avatar"
                src={avatarUrl}
                alt={`${name} avatar`}
              />

              {showUserInfo && (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      <img
                        src={miniAvatarUrl || avatarUrl}
                        alt={`${name} mini avatar`}
                      />
                    </div>

                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>

                  <button
                    className="pc-contact-btn"
                    onClick={onContactClick}
                  >
                    {contactText}
                  </button>
                </div>
              )}
            </div>

            <div className="pc-content">
              <div className="pc-details">
                <h3>{name}</h3>
                <p>{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(ProfileCardComponent);