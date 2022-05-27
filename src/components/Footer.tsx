import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import routes from "../constants/routes";
import { IStore } from "../types";

export default function Footer() {
  const { presale } = useSelector((store: IStore) => store);
  const [route, setRoute] = useState({ url: routes.presale, title: "Presale" });

  useEffect(() => {
    const links = {
      admin: { url: routes.admin, title: "Admin" },
      presale: { url: routes.presale, title: "Presale" },
    };
    const goto = window.location.pathname === "/admin" ? "presale" : "admin";
    setRoute(links[goto]);
  }, [presale.isAdmin]);

  return (
    <>
      <section>
        <div className="block sliceimg2 remove-bottom p-0">
          <div className="bottomline s2">
            <span>© 2022 GaraSwap Protocol</span> |{" "}
            {presale.isAdmin && (
              <span>
                <Link to={route.url}>{route.title}</Link>
              </span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
