import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Notebook } from "lucide-react";
import React from "react";
import CreateNoteButton from "./create-note-button";

export default function NotesPage() {
  const notes: [] | undefined = [];

  return (
    <div className="container mx-auto xl:max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Memos</h1>
        <div className="flex gap-3 items-center">
          {/* note */}
          <Bot />
          <CreateNoteButton />
        </div>
      </div>

      {notes === undefined ? (
        <LoadingSkeleton />
      ) : notes.length === 0 ? (
        <EmptyView />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Actual notes go here */}
        </div>
      )}
    </div>
  );
}

function EmptyView() {
  return (
    <div className="py-10 text-center">
      <p className="text-muted-foreground">
        No memos yet. Write down your first one
      </p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
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
