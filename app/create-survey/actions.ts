"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Answer, Question } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createSurvey = async (data: any) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error("Invalid user data");
  }

  //   const questions = data.questions.map((question: Question) => ({
  //     title: question.title,
  //   }));

  //   await db.survey.create({
  //     data: {
  //       title: data.title,
  //       userId: user.id,
  //       questions: {
  //         create: questions,
  //       },
  //     },
  //   });

  //   const answers = data.questions.answers.map((answer: Answer) => ({
  //     answer: answer.answer,
  //     questionId: answer.questionId,
  //   }));

  //   await db.answer.create({ data: answers });

  //   revalidatePath("/dashboard");

  return { success: true };
};
