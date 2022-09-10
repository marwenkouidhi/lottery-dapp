// ./pages/_document.js

import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class SpecialDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Lottery</title>
          <link rel="icon" type="image/png" sizes="32x32" href="/lottery.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gray-100 text-slate-900 dark:bg-slate-900  dark:text-white ">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default SpecialDocument;
