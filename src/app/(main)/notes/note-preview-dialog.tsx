"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useSearchParams } from "next/navigation";

type NotePreviewDialogProps = {
  note: Doc<"notes">;
};

export const NotePreviewDialog = ({ note }: NotePreviewDialogProps) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("noteId") === note._id;

  function handleCloseDialog() {
    window.history.pushState(null, "", window.location.pathname);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{note.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 whitespace-pre-wrap">{note.body}</div>
        <DialogFooter className="mt-6">
          <Button className="gap2 cursor-pointer hover:bg-red-700">
            <Trash2 size={16} />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
