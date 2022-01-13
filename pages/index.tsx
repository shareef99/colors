import Head from "next/head";
import { Fragment } from "react";

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
      <main>
        <p className="text-3xl font-bold underline">
          A website to help choose color schema for your website/blog
        </p>
      </main>
    </Fragment>
  );
}
