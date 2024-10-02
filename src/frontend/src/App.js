import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import CreateEvent from "./components/CreateEvent";
import JoinEvent from "./components/JoinEvent";

function App() {
  return (
    <div className="App">
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/join-event" element={<JoinEvent />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

// @todo: ルーティングエラー時の404ページを作成する
// @todo: ローディング画面を作成する
export default App;
