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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "convex/react";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const noteFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title cannot be empty.",
  }),
  body: z.string().min(1, {
    message: "Body cannot be empty.",
  }),
});

type CreateNoteDialogProps = {
  dialogOpen: boolean;
  onDialogOpenChange: (dialogOpen: boolean) => void;
};

export default function CreateNoteButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        className="cursor-pointer items-center justify-center"
      >
        <Plus />
        Create
      </Button>
      <CreateNoteDialog
        dialogOpen={dialogOpen}
        onDialogOpenChange={setDialogOpen}
      />
    </>
  );
}

function CreateNoteDialog({
  dialogOpen,
  onDialogOpenChange,
}: CreateNoteDialogProps) {
  const createNote = useAction(api.notesActions.createNote);

  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof noteFormSchema>) {
    try {
      await createNote({
        title: values.title,
        body: values.body,
      });
      toast.success("Note created successfully");
      form.reset();
      onDialogOpenChange(false);
    } catch (error) {
      console.error("Error creating note.", error);
      toast.error("Failed to create note. Please try again.");
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={onDialogOpenChange}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle className="mb-6">Create New Note</DialogTitle>
          <DialogDescription>
            Write down what you want and then click save.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Note title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea className="max-h-[250px]" placeholder="Note body" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
