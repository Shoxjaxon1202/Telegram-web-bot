import { useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card";

import { getData } from "./constants/db";

const courses = getData();

const telegram = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    telegram.ready();
  }, []);

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();
    telegram.MainButton.onClick(() => {
      // Sotib olish tugmasini bosganda ishlaydigan kod
      alert("Buyurtmangiz qabul qilindi!");
      telegram.MainButton.hide();
    });
  };

  return (
    <>
      <h1>Shoxjaxon kurslar</h1>
      <div className="cards_container">
        {courses?.map((course) => (
          <Card key={course?.id} course={course} />
        ))}
        <button onClick={onCheckout} className="submit">
          Buyurtma berish
        </button>
      </div>
    </>
  );
}

export default App;
