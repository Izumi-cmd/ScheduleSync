import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/button.css";

export const Home = () => {
  return (
    <div className="home container">
      <h2 className="home__title container__title">スケジュールを調整しましょう。</h2>
      <p className="home__lead container__lead">
        ScheduleSyncは、イベントのスケジュールを調整するためのサービスです。
        <br />
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
      </p>
      <div className="home__actions container__actions">
        <div className="home__contents">
          <p className="home__description">
            イベントを作成して、参加者のスケジュールを調整しましょう。
          </p>
          <Link to="/create-event" className="btn home__create-button">
            イベントを作成する
          </Link>
        </div>
        <div className="home__contents">
          <p className="home__description">以下のボタンから調整に参加しましょう。</p>
          <Link to="/join-event" className="btn home__join-button">
            イベントに参加する
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
