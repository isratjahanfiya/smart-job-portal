import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Portal from "./pages/Portal";
import Internships from "./pages/internships";
import InternshipDetails from "./pages/internshipDetails";
import Jobs from "./pages/Jobs";

import "./styles/style.css";
import "./styles/portal.css";

export default function App() {
  const [route, setRoute] = useState(
    () => window.location.hash.slice(1) || "/"
  );

  useEffect(() => {
    function handleRoute() {
      setRoute(window.location.hash.slice(1) || "/");
      window.scrollTo(0, 0);
    }

    window.addEventListener("hashchange", handleRoute);

    return () => {
      window.removeEventListener("hashchange", handleRoute);
    };
  }, []);

  const [pathname, queryString = ""] = route.split("?");
  const params = new URLSearchParams(queryString);

  if (pathname === "/") {
    return <Home />;
  }

  if (pathname === "/jobs") {
    const filter = params.get("filter") || "all";

    return <Jobs key={filter} filter={filter} />;
  }

  if (pathname === "/internships") {
    return <Internships />;
  }

  const detailsMatch = pathname.match(
    /^\/internship\/([^/]+)$/
  );

  if (detailsMatch) {
    return (
      <InternshipDetails
        key={detailsMatch[1]}
        id={detailsMatch[1]}
      />
    );
  }

  return <Portal route={route} />;
}