import { Link } from "@remix-run/react";

export const Logo = () => {
  return (
    <Link to="/">
      <h1 className="cursor-pointer text-3xl lg:text-4xl">MarketApp</h1>
    </Link>
  );
};
