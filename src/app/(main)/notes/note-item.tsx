"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { NotePreviewDialog } from "./note-preview-dialog";

interface NoteItemProps {
  note: Doc<"notes">;
}

const NoteItem = ({ note }: NoteItemProps) => {
  function handleOpenNote() {
    // This way is faster than Router.push as normally used in Nextjs because we don't have to reload to ge new data.
    window.history.pushState(null, "", `?noteId=${note._id}`);
  }

  return (
    <>
      <Card
        className="cursor-pointer transition-shadow hover:shadow-md"
        onClick={handleOpenNote}
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground line-clamp-3 text-sm whitespace-pre-line">
            {note.body}
          </div>
        </CardContent>
      </Card>
      <NotePreviewDialog note={note} />
    </>
  );
};

export default NoteItem;
