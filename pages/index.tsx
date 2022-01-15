import Head from "next/head";
import { Fragment } from "react";
import Main from "../components/Main";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>Good Colors | Shareef</title>
        <meta
          name="description"
          content="A website to help choose color schema for your website"
        />
      </Head>
      <Main />
    </Fragment>
  );
}
