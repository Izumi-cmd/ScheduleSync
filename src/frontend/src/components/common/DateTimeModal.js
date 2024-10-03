import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import moment from "moment";

const DateTimeModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialStart,
  initialEnd,
  isExistingEvent,
}) => {
  const [startDateTime, setStartDateTime] = useState(
    moment(initialStart).format("YYYY-MM-DDTHH:mm")
  );
  const [endDateTime, setEndDateTime] = useState(
    moment(initialEnd || moment(initialStart).add(1, "hour")).format("YYYY-MM-DDTHH:mm")
  );

  useEffect(() => {
    if (isOpen) {
      setStartDateTime(moment(initialStart).format("YYYY-MM-DDTHH:mm"));
      setEndDateTime(
        moment(initialEnd || moment(initialStart).add(1, "hour")).format("YYYY-MM-DDTHH:mm")
      );
    }
  }, [isOpen, initialStart, initialEnd]);

  const roundToNearestHalfHour = (time) => {
    const minutes = time.minutes();
    return time.minutes(minutes - (minutes % 30)).seconds(0);
  };

  const handleStartChange = (e) => {
    const newStart = roundToNearestHalfHour(moment(e.target.value));
    setStartDateTime(newStart.format("YYYY-MM-DDTHH:mm"));

    if (newStart.isAfter(moment(endDateTime))) {
      setEndDateTime(newStart.add(30, "minutes").format("YYYY-MM-DDTHH:mm"));
    }
  };

  const handleEndChange = (e) => {
    const newEnd = roundToNearestHalfHour(moment(e.target.value));
    if (newEnd.isSameOrAfter(moment(startDateTime).add(30, "minutes"))) {
      setEndDateTime(newEnd.format("YYYY-MM-DDTHH:mm"));
    } else {
      setEndDateTime(moment(startDateTime).add(30, "minutes").format("YYYY-MM-DDTHH:mm"));
    }
  };

  const handleSave = () => {
    onSave(moment(startDateTime).toDate(), moment(endDateTime).toDate());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="modal-title">{isExistingEvent ? "日時を編集" : "新しい日時を追加"}</h2>
      <p className="datetime-info">
        時間は30分単位で選択してください。選択した時間は自動的に調整される場合があります。
      </p>
      <div className="datetime-inputs">
        <div className="datetime-inputs__group">
          <label htmlFor="start-datetime">開始日時:</label>
          <input
            id="start-datetime"
            type="datetime-local"
            value={startDateTime}
            onChange={handleStartChange}
            className="create-event__input"
            step="1800"
          />
        </div>
        <div className="datetime-inputs__group">
          <label htmlFor="end-datetime">終了日時:</label>
          <input
            id="end-datetime"
            type="datetime-local"
            value={endDateTime}
            onChange={handleEndChange}
            className="create-event__input"
            step="1800"
          />
        </div>
      </div>
      <div className="modal-actions">
        <button onClick={handleSave} className="btn btn-primary">
          保存
        </button>
        {isExistingEvent && (
          <button onClick={onDelete} className="btn btn-danger">
            削除
          </button>
        )}
        <button onClick={onClose} className="btn btn-secondary">
          キャンセル
        </button>
      </div>
    </Modal>
  );
};

export default DateTimeModal;
