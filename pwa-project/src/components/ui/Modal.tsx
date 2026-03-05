import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useModalScroll } from "@/lib/useModalScroll";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const scrollRef = useModalScroll(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
          {/* خلفية معتمة - لا تستجيب للمس */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            style={{ touchAction: "none" }}
          />

          {/* النافذة المنبثقة */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative z-10 w-full max-w-[430px] max-h-[90dvh] flex flex-col rounded-t-[2rem] border-t border-border bg-card text-card-foreground shadow-2xl",
              className
            )}
          >
            {/* مقبض */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
            </div>

            {/* الرأس */}
            <div className="flex items-center justify-between px-6 py-3 shrink-0">
              <h2 className="text-xl font-bold text-foreground">{title}</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* المحتوى - طبقة لمس مستقلة */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 pb-10"
              style={{
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
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
