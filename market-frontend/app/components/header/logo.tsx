import { Link, useLocation } from "@remix-run/react";

export const Logo = () => {
  return (
    <ConditionalNavLink>
      <h1 className="cursor-pointer select-none text-3xl lg:text-4xl">
        MarketApp
      </h1>
    </ConditionalNavLink>
  );
};

const ConditionalNavLink = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <>{ children }</>
      ) : (
        <Link to="/" prefetch="intent">{children}</Link>
      )}
    </>
  );
};
