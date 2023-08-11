import Script from 'next/script'
 
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://unpkg.com/maplibre-gl@3.3.0/dist/maplibre-gl.js" />
    </>
  )
}