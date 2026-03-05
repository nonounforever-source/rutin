import { useEffect, useRef } from "react";

export function useModalScroll(isOpen: boolean) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // حفظ موضع الصفحة وتجميدها
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      // إعادة الصفحة لحالتها
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (!el) return;

    let startY = 0;

    const onStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const onMove = (e: TouchEvent) => {
      const dy = e.touches[0].clientY - startY;
      const atTop = el.scrollTop <= 0 && dy > 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight && dy < 0;
      if (atTop || atBottom) {
        e.preventDefault();
      }
      e.stopPropagation();
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
    };
  }, [isOpen]);

  return scrollRef;
}
