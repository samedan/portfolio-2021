import "../styles/main.scss";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} appProps="Hello form _app" />;
};

export default App;
