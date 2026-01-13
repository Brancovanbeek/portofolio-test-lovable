import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.description}>
        Oeps! Deze pagina bestaat niet.
      </p>
      <Link to="/" className={styles.link}>
        Terug naar home
      </Link>
    </div>
  );
};

export default NotFound;
