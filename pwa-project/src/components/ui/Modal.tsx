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
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    const scrollEl = scrollRef.current;

    // منع تحرك الخلفية نهائياً
    const preventTouch = (e: TouchEvent) => e.preventDefault();

    // السماح بالسحب داخل المحتوى فقط
    const allowScroll = (e: TouchEvent) => e.stopPropagation();

    overlay?.addEventListener("touchmove", preventTouch, { passive: false });
    scrollEl?.addEventListener("touchmove", allowScroll, { passive: true });

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      overlay?.removeEventListener("touchmove", preventTouch);
      scrollEl?.removeEventListener("touchmove", allowScroll);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 max-h-[90dvh] rounded-t-[2rem] border-t border-border shadow-2xl bg-card text-card-foreground flex flex-col",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between px-6 pt-6 shrink-0">
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-full bg-secondary p-2 hover:bg-secondary/80 text-foreground"
              >
                <X size={20} />
              </button>
            </div>
            <div
              ref={scrollRef}
              className="overflow-y-auto px-6 pb-8"
              style={{ overscrollBehavior: "contain" }}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
