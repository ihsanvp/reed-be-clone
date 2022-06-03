import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Fragment } from "react";
import SmoothScroll from "components/SmoothScroll";
import Scrollbar from "components/Scrollbar";
import Navbar from "components/Navbar";
import AppScrollProvider from "contexts/AppScroll/AppScrollProvider";
import Portal from "components/Portal";
import NavbarProvider from "providers/NavbarProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <NavbarProvider>
        {/* <Navbar /> */}
        <SmoothScroll
          viscosity={2}
          damping={15}
          mass={0.5}
          stiffness={50}
          portal={
            <Fragment>
              <Navbar offset={10} elevation={10} zIndex={999} />
              <Scrollbar className="rounded-sm bg-primary" zIndex={9999} />
              <div id="portal"></div>
            </Fragment>
          }
        >
          <Component {...pageProps} />
        </SmoothScroll>
        {/* <Component {...pageProps} /> */}
      </NavbarProvider>
    </Fragment>
  );
}

export default MyApp;
