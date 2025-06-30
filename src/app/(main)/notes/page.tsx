import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Notebook } from "lucide-react";
import React from "react";

export default function NotesPage() {
  const notes: [] | undefined = [];

  return (
    <div className="container xl:max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Memos</h1>
        <div className="flex gap-3">
          {/* note */}
          <Bot />
          <Notebook />
        </div>
      </div>

      {notes === undefined ? (
        <LoadingSkeleton />
      ) : notes.length === 0 ? (
        <EmptyView />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Actual notes go here */}
        </div>
      )}
    </div>
  );
}

function EmptyView() {
  return (
    <div className="text-center py-10">
      <p className="text-muted-foreground">
        No memos yet. Write down your first one
      </p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[
        ...Array(6).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        )),
      ]}
    </div>
  );
}
