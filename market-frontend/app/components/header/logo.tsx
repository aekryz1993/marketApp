import { useLocation, useNavigate } from "@remix-run/react";

export const Logo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (location.pathname === "/" && location.search.length === 0) return;
    navigate("/");
  };

  return (
    <button onClick={handleNavigation}>
      <h1 className="cursor-pointer text-3xl lg:text-4xl">MarketApp</h1>
    </button>
  );
};
