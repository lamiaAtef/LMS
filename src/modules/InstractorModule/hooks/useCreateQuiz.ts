import { useState } from "react";
import { QUIZ_URLS } from "../../../config/api.endPoint";
import { axiosInstance } from "../../../config/httpClient";
import type { Quiz } from "../type";

type QuizForm = Quiz & { date: string; time: string };

export const useCreateQuiz = () => {

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: QuizForm) => {

    const schadule = `${data.date}T${data.time}:00`;
    const { date, time, ...rest } = data;
    const finalData = { ...rest, schadule };

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        QUIZ_URLS.CREATE_QUIZ,
        finalData
      );

      return response.data;

    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
};