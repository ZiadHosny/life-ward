import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function ScrollingUpDuringRouting() {
  const { pathname } = useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
    document.body.style.scrollBehaviour = "default";
  };
  useEffect(() => {
    onTop();
  }, [pathname]);
  return null;
}
