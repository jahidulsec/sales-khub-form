"use server";

import { FormType } from "@/components/form/user-form";
import { prisma } from "@/db/client";

export const submitUserForm = async (data: FormType) => {
  try {
    const { work_area, ...rest } = data;

    // check previous submission on of work area
    const previousSubmit = await prisma.user_form.findFirst({
      where: { work_area },
    });

    if (previousSubmit) throw new Error("You already submitted");

    const form = await prisma.user_form.create({
      data: {
        work_area: work_area as string,
        ...rest,
      },
    });

    return {
      success: true,
      message: "Your survey data is submitted successfully",
      data: form,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: (error as Error).message ?? "Something went wrong",
    };
  }
};
