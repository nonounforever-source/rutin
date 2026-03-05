import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    // تجميد الخلفية
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const onTouchStart = (e: TouchEvent) => {
      startYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const scrollTop = scrollEl.scrollTop;
      const scrollHeight = scrollEl.scrollHeight;
      const clientHeight = scrollEl.clientHeight;
      const currentY = e.touches[0].clientY;
      const direction = currentY - startYRef.current;

      // منع السحب للأسفل عند أعلى النافذة
      if (direction > 0 && scrollTop <= 0) {
        e.preventDefault();
        return;
      }

      // منع السحب للأعلى عند أسفل النافذة
      if (direction < 0 && scrollTop + clientHeight >= scrollHeight) {
        e.preventDefault();
        return;
      }
    };

    scrollEl.addEventListener("touchstart", onTouchStart, { passive: true });
    scrollEl.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      scrollEl.removeEventListener("touchstart", onTouchStart);
      scrollEl.removeEventListener("touchmove", onTouchMove);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {/* خلفية معتمة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              touchAction: "none",
            }}
          />

          {/* النافذة المنبثقة */}
          <motion.div
            ref={contentRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: "430px", // عرض iPhone 15
              maxHeight: "90dvh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "2rem 2rem 0 0",
              overflow: "hidden",
              boxShadow: "0 -4px 60px rgba(0,0,0,0.3)",
            }}
            className={cn("bg-card text-card-foreground border-t border-border", className)}
          >
            {/* مقبض السحب */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px", paddingBottom: "4px", flexShrink: 0 }}>
              <div style={{ width: "48px", height: "6px", borderRadius: "999px", background: "rgba(128,128,128,0.3)" }} />
            </div>

            {/* الرأس */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 24px 16px",
              flexShrink: 0,
            }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700" }} className="text-foreground">{title}</h2>
              <button
                onClick={onClose}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                }}
                className="bg-secondary text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* المحتوى القابل للتمرير */}
            <div
              ref={scrollRef}
              style={{
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                padding: "0 24px 40px",
                flex: 1,
              }}
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
