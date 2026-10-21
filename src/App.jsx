import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Portal from "./pages/Portal";
import Internships from "./pages/Internships";
import InternshipDetails from "./pages/InternshipDetails";
import SecureRoute from "./components/SecureRoute";
import "./styles/style.css";
import "./styles/portal.css";

export default function App() {
  const [route, setRoute] = useState(
    window.location.hash.slice(1) || "/"
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

  if (route === "/") {
    return <Home />;
  }

  if (route === "/internships") {
    return <Internships />;
  }

  const detailsMatch = route.match(/^\/internship\/([^/]+)$/);

  if (detailsMatch) {
    return (
      <InternshipDetails
        key={detailsMatch[1]}
        id={detailsMatch[1]}
      />
    );
  }

  
  
const studentRoutes = [
  "/dashboard",
  "/profile",
  "/resume",
  "/applications",
  "/saved",
  "/recent",
  "/compare",
  "/career",
  "/notifications",
  "/calendar"
];

const isStudentRoute =
  studentRoutes.includes(route) ||
  route.startsWith("/apply/");

const isRecruiterRoute =
  route === "/recruiter" ||
  route === "/post";

if (isStudentRoute) {
  return (
    <SecureRoute allowedRoles={["student"]}>
      <Portal route={route} />
    </SecureRoute>
  );
}

if (isRecruiterRoute) {
  return (
    <SecureRoute allowedRoles={["recruiter"]}>
      <Portal route={route} />
    </SecureRoute>
  );
}

if (route === "/admin") {
  return (
    <SecureRoute allowedRoles={["admin"]}>
      <Portal route={route} />
    </SecureRoute>
  );
}

return <Portal route={route} />;

}