"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import Markdown from "@/components/markdown";

type NotePreviewDialogProps = {
  note: Doc<"notes">;
};

export const NotePreviewDialog = ({ note }: NotePreviewDialogProps) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("noteId") === note._id;

  const deleteNote = useMutation(api.notes.deleteNote);
  const [isDeletePending, setIsDeletePending] = useState(false);

  function handleCloseDialog() {
    window.history.pushState(null, "", window.location.pathname);
  }

  async function handleDelete() {
    if (isDeletePending) return;
    setIsDeletePending(true);

    try {
      await deleteNote({ noteId: note._id });
      toast.success("Note deleted");
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to delete note", error);
      toast.error("Failed to delete note. Please try again");
    } finally {
      setIsDeletePending(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[625px] max-h-[500px] flex flex-col">
        <DialogDescription className="sr-only"></DialogDescription>
        <DialogHeader>
          <DialogTitle className="mt-3">{note.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-3 whitespace-pre-line overflow-y-auto">
          <Markdown>{note.body}</Markdown>
        </div>
        <DialogFooter className="mt-6">
          <Button
            className="gap2 cursor-pointer hover:bg-red-700"
            onClick={handleDelete}
            disabled={isDeletePending}
          >
            <Trash2 size={16} />
            {isDeletePending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
