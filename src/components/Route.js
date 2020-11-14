import { useEffect, useState } from "react";

//location.pathname.match(/\/pokemon\/(\d+)/)

const Route = ({ path, children }) => {
  const [mypath, setPath] = useState(window.location.pathname);
  useEffect(() => {
    //detect change
    console.log("inside url change", path, mypath);

    const urlChange = () => {
      let match = window.location.pathname.match(/\/pokemon\/(\d+)/);
      console.log("matched", match);
      if (match) {
        ///pokemon is found
        console.log("/pokemon");
        setPath("/pokemon");
      } else {
        if (window.location.pathname === "/") {
          console.log("/");
          setPath("/");
        } else {
          console.log("does not exist");
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
