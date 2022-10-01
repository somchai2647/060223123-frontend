import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content="ร้านหนอนหนังสือ" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="assets/css/bootstrap.css" />

                    {/* jQuery */}
                    <script src="assets/js/jquery-2.0.0.min.js" type="text/javascript"></script>
                    <script src="assets/js/bootstrap.bundle.min.js" type="text/javascript"></script>
                    {/* Font awesome 5 */}
                    <link href="assets/fonts/fontawesome/css/all.min.css" type="text/css" rel="stylesheet" />

                    {/* custom style */}
                    <link href="assets/css/ui.css" rel="stylesheet" type="text/css" />
                    <link href="assets/css/responsive.css" rel="stylesheet" media="only screen and (max-width: 1200px)" />

                    {/* custom javascript */}
                    <script src="assets/js/script.js" type="text/javascript"></script>

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}