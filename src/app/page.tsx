import UserForm from "@/components/form/user-form";
import { SearchParams } from "@/types/search-params";
import React from "react";

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { work_area } = await searchParams;

  if (!work_area)
    return <main className="container mx-auto px-6">HomePage</main>;

  return (
    <main className="container mx-auto px-6 py-4 max-w-2xl">
      <div className="border rounded-md p-4">
        <h2 className="text-2xl font-semibold mb-10">Survey</h2>
        <UserForm />
      </div>
    </main>
  );
}
