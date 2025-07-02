"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import CreateNoteButton from "./create-note-button";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import NoteItem from "./note-item";
import { AIChatButton } from "./ask-ai-button";

export default function NotesPage() {
  const notes = useQuery(api.notes.getUserNotes);

  return (
    <div className="container mx-auto space-y-8 xl:max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <div className="flex items-center gap-3">
          <AIChatButton />
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
          {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyView() {
  return (
    <div className="py-10 text-center">
      <p className="text-muted-foreground">
        No notes yet. Write down your first one
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
