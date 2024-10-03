import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ja";
import { toast } from "react-toastify";
import DateTimeModal from "./common/DateTimeModal";
import "../styles/components/input.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("ja");

const localizer = momentLocalizer(moment);

const messages = {
  time: "時間",
  date: "日付",
  agenda: "予定",
  week: "週",
  day: "日",
  month: "月",
  previous: "前",
  next: "次",
  today: "今日",
};

export const CreateEvent = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelect = ({ start, end }) => {
    setSelectedEvent({ start, end, title: "イベントを作成する" });
    setIsModalOpen(true);
  };

  const handleModalSave = (dateTime) => {
    if (selectedEvent.id) {
      // 既存のイベントを編集
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id
          ? { ...event, start: dateTime, end: moment(dateTime).add(1, "hour").toDate() }
          : event
      );
      setEvents(updatedEvents);
    } else {
      // 新しいイベントを追加
      const newEvent = {
        id: Date.now(), // 一意のIDを生成
        start: dateTime,
        end: moment(dateTime).add(1, "hour").toDate(),
      };
      setEvents([...events, newEvent]);
    }
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && selectedEvent.id) {
      const updatedEvents = events.filter((event) => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      setSelectedEvent(null);
      setIsModalOpen(false);
      toast.success("イベントが削除されました。");
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // TODO: イベントの作成APIを呼び出す
      console.log({ ...values, events });
      toast.success("イベントが作成されました。");
    } catch (error) {
      toast.error("イベントの作成に失敗しました。");
    } finally {
      setSubmitting(false);
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#3174ad",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return { style };
  };

  return (
    <div className="create-event container">
      <h3 className="create-event__title container__title">イベントを作成する</h3>
      <Formik
        initialValues={{
          title: "",
          description: "",
          maxParticipants: "",
          hasPassword: false,
          password: "",
        }}
        validationSchema={Yup.object().shape({
          description: Yup.string(),
          maxParticipants: Yup.number().positive("参加者数は正の整数で入力してください。"),
          hasPassword: Yup.boolean(),
          password: Yup.string().when("hasPassword", {
            is: true,
            then: Yup.string().required("パスワードは必須です。"),
          }),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="create-event__form">
            <div className="create-event__form-group">
              <label className="create-event__form-label">イベント日時</label>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={handleSelect}
                onSelectEvent={handleEventClick}
                defaultView="week"
                views={["week", "day"]}
                step={15}
                timeslots={4}
                messages={messages}
                formats={{
                  timeGutterFormat: "HH:mm",
                  eventTimeRangeFormat: ({ start, end }, culture, local) =>
                    `${local.format(start, "HH:mm", culture)} - ${local.format(
                      end,
                      "HH:mm",
                      culture
                    )}`,
                }}
                min={moment().startOf("day").toDate()}
                max={moment().endOf("day").toDate()}
                firstDayOfWeek={0}
                eventPropGetter={eventStyleGetter}
              />
            </div>

            <button
              type="submit"
              className="create-event__submit btn"
              disabled={isSubmitting || events.length === 0}
            >
              {isSubmitting ? "作成中..." : "イベントを作成"}
            </button>
          </Form>
        )}
      </Formik>

      <DateTimeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        onDelete={handleDeleteEvent}
        initialDateTime={selectedEvent ? selectedEvent.start : new Date()}
        isExistingEvent={selectedEvent && selectedEvent.id}
      />
    </div>
  );
};

export default CreateEvent;
