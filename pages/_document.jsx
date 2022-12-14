import * as React from 'react';
import Script from 'next/script'
import Document, { Html, Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const originalRenderPage = ctx.renderPage

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            })

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="title" content="ระบบร้านขายหนังสือออนไลน์ ร้านหนอนหนังสือ" />
                    <meta name="description" content="ระบบร้านขายหนังสือออนไลน์ ร้านหนอนหนังสือ(เป็นส่วนหนึ่งของวิชา Database System 060223123)" />
                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://nohnbook.vercel.app/" />
                    <meta property="og:title" content="ระบบร้านขายหนังสือออนไลน์ ร้านหนอนหนังสือ" />
                    <meta property="og:description" content="ระบบร้านขายหนังสือออนไลน์ ร้านหนอนหนังสือ(เป็นส่วนหนึ่งของวิชา Database System 060223123)" />
                    <meta property="og:image" content="https://nohnbook.vercel.app/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://nohnbook.vercel.app/" />
                    <meta property="twitter:title" content="ระบบร้านขายหนังสือออนไลน์ ร้านหนอนหนังสือ" />
                    <meta property="twitter:description" content="ระบบร้านขายหนังสือออนไลน์ ร้านหนอนหนังสือ(เป็นส่วนหนึ่งของวิชา Database System 060223123)" />
                    <meta property="twitter:image" content="https://nohnbook.vercel.app/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />

                    <meta name="robots" content="index, follow" />
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

                    <link rel="icon" href="/the-nohn-books-logo-01.ico" />
                    <link rel="stylesheet" href="/assets/css/bootstrap.css" />

                    {/* Google Font */}
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={`true`} />
                    <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,400;0,600;1,200&display=swap" rel="stylesheet" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

                    {/* Font awesome 5 */}
                    <link href="/assets/fonts/fontawesome/css/all.min.css" type="text/css" rel="stylesheet" />

                    {/* custom style */}
                    <link href="/assets/css/ui.css" rel="stylesheet" type="text/css" />
                    <link href="/assets/css/responsive.css" rel="stylesheet" media="only screen and (max-width: 1200px)" />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <Script src="/assets/js/jquery-2.0.0.min.js" type="text/javascript" strategy="beforeInteractive"></Script>
                    <Script src="/assets/js/bootstrap.bundle.min.js" type="text/javascript" strategy="beforeInteractive"></Script>
                    <Script src="/assets/js/script.js" type="text/javascript" strategy="beforeInteractive"></Script>
                </body>
            </Html>
        );
    }
}