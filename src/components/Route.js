import { useEffect, useState } from "react";

//location.pathname.match(/\/pokemon\/(\d+)/)

const Route = ({ path, children }) => {
  const [mypath, setPath] = useState(window.location.pathname);
  useEffect(() => {
    //detect change
    const urlChange = () => {
      let match = window.location.pathname.match(/\/pokemon\/(\d+)/);
      window.scrollTo(0, 0);
      if (match) {
        ///pokemon is found
        setPath("/pokemon");
      } else {
        if (window.location.pathname === "/") {
          setPath("/");
        } else {
          setPath("page-not-found");
        }
      }
    };

    urlChange();

    window.addEventListener("popstate", urlChange);
    return () => {
      window.removeEventListener("popstate", urlChange);
    };
  }, []);

  return path === mypath ? children : null;
};

export default Route;
