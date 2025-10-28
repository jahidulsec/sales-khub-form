"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { Button, ButtonProps } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { submitUserForm } from "@/actions/user-form";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const FormSchema = z.object({
  email: z.email("Enter your email"),
  question_1: z.string("Enter your answer").min(1, "At least 1 character"),
  question_2: z.string("Enter your answer").min(1, "At least 1 character"),
  question_3: z.string("Enter your answer").min(1, "At least 1 character"),
  question_4: z.string("Enter your answer").min(1, "At least 1 character"),
  question_5: z.string("Enter your answer").min(1, "At least 1 character"),
  question_6: z.string("Enter your answer").min(1, "At least 1 character"),
  question_7: z.string("Enter your answer").min(1, "Select a option"),
  question_8: z.string("Enter your answer").min(1, "Select a option"),
  work_area: z.string().optional(),
});

export type FormType = z.infer<typeof FormSchema>;

export default function UserForm() {
  const [isOther, setIsOther] = useState(false);
  const form = useForm<FormType>({ resolver: zodResolver(FormSchema) });

  const searchParams = useSearchParams();

  async function onSubmit(values: FormType) {
    values.work_area = searchParams.get("work_area") ?? "";

    const res = await submitUserForm(values);

    console.log(values);

    if (res.success) {
      form.reset();
    }

    toast[res.success ? "success" : "error"](res.message);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-14"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How many doctors do you cover in your area?</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What is the Total Number of Uncovered Doctors in your area?
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                How many doctors in your area are currently uncovered?
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                How many prospect doctors (doctors who are not core or support
                for any brand) are there in your area?
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_5"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                How many intern doctors are there in your area?
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_6"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                What is the highest number of doctors covered by a competitor in
                your area?
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_7"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you encountered any barriers in reaching doctors in your
                area?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  {...field}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <Radio value="yes" label="Yes" />
                  <Radio value="no" label="No" />
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="question_8"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Which factor do you think most affects doctor coverage in your
                area? (Select one)
              </FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    if (value === "0") {
                      setIsOther(true);
                      field.onChange(""); // clear previous value
                    } else {
                      setIsOther(false);
                      field.onChange(value);
                    }
                  }}
                  value={isOther ? "0" : field.value}
                >
                  <Radio value="1" label="Doctor's availability" />
                  <Radio
                    value="2"
                    label="Competition from other pharmaceutical companies"
                  />
                  <Radio
                    value="3"
                    label="Internal workload and territory size"
                  />
                  <Radio value="4" label="Relationships with doctors" />

                  <div className="flex items-center gap-3">
                    <Radio value="0" label="Other" />
                    {isOther && (
                      <Input
                        placeholder="Please specify"
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value}
                      />
                    )}
                  </div>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormButton isPending={form.formState.isSubmitting}>Save</FormButton>
      </form>
    </Form>
  );
}

const Radio = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="flex items-center gap-3 text-sm">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value}>{label}</Label>
    </div>
  );
};

const FormButton = ({
  children,
  isPending,
  ...props
}: ButtonProps & { isPending?: boolean }) => {
  return (
    <Button type="submit" {...props} disabled={isPending || props.disabled}>
      {isPending && <Spinner />}
      {children}
    </Button>
  );
};
