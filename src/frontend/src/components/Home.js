import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home container">
      <div className="home__content-head">
        <h2 className="home__content-head-title">スケジュールを調整する。</h2>
        <div className="home__content-lead">
          <p className="home__content-lead-text">
            ScheduleSyncは、イベントのスケジュールを調整するためのサービスです。
            <br />
            以下のボタンよりイベントを作成して、参加者のスケジュールを調整しましょう。
          </p>
        </div>
      </div>

      <div className="home__contents">
        <p className="home__description">
          イベントを作成して、参加者のスケジュールを調整しましょう。
        </p>
        <div className="home__buttons">
          <Link to="/create-event" className="btn create-event__button">
            イベントを作成する
          </Link>
        </div>
      </div>

      <div className="home__contents">
        <p className="home__description">
          イベントに参加する場合は、イベントコードを入力して参加しましょう。
        </p>
        <div className="home__buttons">
          <Link to="/join-event" className="btn join-event__button">
            イベントに参加する
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
