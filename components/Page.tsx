import CONFIG from "config";
import Head from "next/head";
import { Fragment, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title?: string;
}

export default function Page(props: Props) {
  return (
    <Fragment>
      <Head>
        <title>{props.title || CONFIG.title}</title>
      </Head>
      <div style={{ paddingTop: "calc(4.5rem + 20px)" }}>{props.children}</div>
    </Fragment>
  );
}
