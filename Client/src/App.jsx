import { useEffect } from "react";
import "./App.css";
import Pages from "./Pages/Pages";

const telegram = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    telegram.ready();
  }, []);

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();
    telegram.MainButton.onClick(() => {
      alert("Buyurtmangiz qabul qilindi!");
      telegram.MainButton.hide();
    });
  };

  return (
    <>
      <Pages />
    </>
  );
}

export default App;
