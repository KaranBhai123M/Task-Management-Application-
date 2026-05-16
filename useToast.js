import { useState, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const notify = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  return { toast, notify };
}
