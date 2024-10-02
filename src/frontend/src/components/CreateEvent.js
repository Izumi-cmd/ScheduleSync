import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "../styles/components/input.css";
const validationSchema = Yup.object().shape({
  title: Yup.string().required("タイトルは必須です。"),
  date: Yup.string().required("日付は必須です。"),
  time: Yup.string().required("時間は必須です。"),
  description: Yup.string(),
  maxParticipants: Yup.number().positive("参加者数は正の整数で入力してください。"),
  hasPassword: Yup.boolean(),
  password: Yup.string().when("hasPassword", {
    is: true,
    then: Yup.string().required("パスワードは必須です。"),
  }),
});

export const CreateEvent = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // TODO: イベントの作成APIを呼び出す
      console.log(values);

      toast.success("イベントが作成されました。");
    } catch (error) {
      toast.error("イベントの作成に失敗しました。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-event container">
      <h2 className="create-event__title container__title">新しいイベントを作成する</h2>
      <Formik
        initialValues={{
          title: "",
          date: "",
          time: "",
          description: "",
          maxParticipants: "",
          hasPassword: false,
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className="create-event__form container__actions"
      >
        {({ isSubmitting, values }) => (
          <Form className="create-event__form">
            <div className="create-event__form-group">
              <label htmlFor="title" className="create-event__form-label">
                イベント名
              </label>
              <Field
                type="text"
                name="title"
                placeholder="イベント名"
                className="create-event__input"
              />
              <ErrorMessage name="title" component="div" className="create-event__error" />
            </div>
            <div className="create-event__form-group">
              <label htmlFor="description" className="create-event__form-label">
                説明
              </label>
              <Field
                type="text"
                name="description"
                placeholder="説明"
                className="create-event__input"
              />
              <ErrorMessage name="description" component="div" className="create-event__error" />
            </div>
            {/* @TODO:
            日付に基づいた時間を設定できる。
            調整機能のため複数設定ができる。
            デザインがダサい */}
            <div className="create-event__form-group">
              <label htmlFor="date" className="create-event__form-label">
                日付
              </label>
              <Field type="date" name="date" className="create-event__input" />
              <ErrorMessage name="date" component="div" className="create-event__error" />
            </div>
            <div className="create-event__form-group">
              <label htmlFor="time" className="create-event__form-label">
                時間
              </label>
              <Field type="time" name="time" className="create-event__input" />
              <ErrorMessage name="time" component="div" className="create-event__error" />
            </div>

            <div className="create-event__form-group">
              <label htmlFor="maxParticipants" className="create-event__form-label">
                参加人数
              </label>
              <Field
                type="number"
                name="maxParticipants"
                placeholder="最大参加者数"
                className="create-event__input"
                min={1}
              />
              <ErrorMessage
                name="maxParticipants"
                component="div"
                className="create-event__error"
              />
            </div>
            <div className="create-event__form-group">
              <label
                htmlFor="hasPassword"
                className="create-event__form-label create-event__form-label--checkbox"
              >
                パスワードを使用する
              </label>
              <Field type="checkbox" name="hasPassword" className="create-event__checkbox" />
            </div>

            {values.hasPassword && (
              <div className="create-event__form-group">
                <label htmlFor="password" className="create-event__form-label">
                  パスワード
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="パスワード"
                  className="create-event__input"
                />
                <ErrorMessage name="password" component="div" className="create-event__error" />
              </div>
            )}
            <button type="submit" className="create-event__submit btn" disabled={isSubmitting}>
              {isSubmitting ? "作成中..." : "イベントを作成"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEvent;
