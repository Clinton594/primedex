import React from "react";
import { Link } from "react-router-dom";
import routes from "../constants/routes";

export default function Footer() {
  return (
    <>
      <section>
        <div className="block sliceimg2 remove-bottom p-0">
          <div className="bottomline s2">
            <span>© 2022 GaraSwap Protocol</span> |{" "}
            <span>
              <Link to={routes.admin}>Admin</Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
