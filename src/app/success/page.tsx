import React from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SearchParams } from "@/types/search-params";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { work_area } = await searchParams;

  return (
    <main className="container mx-auto px-6 py-4 max-w-2xl">
      <div className="flex justify-center items-center min-h-svh">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CheckCircle2 />
            </EmptyMedia>
            <EmptyTitle>Submission Successful</EmptyTitle>
            <EmptyDescription>
              You have submitted your survey successfully
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/?work_area=${work_area}`}>Create Survey</Link>
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </div>
    </main>
  );
}
