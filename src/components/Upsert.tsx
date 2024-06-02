"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Projects } from "@/data/data";
import { useState } from "react";

interface UpsertProps {
  date: Date;
}

const formSchema = z.object({
  startTime: z.string().min(1, {
    message: "Start time is required.",
  }),
  endTime: z.string().min(1, {
    message: "End time is required.",
  }),
  pause: z.string().min(0),
  //   pause: z.coerce.number().int().min(0, {
  //     message: "Pause is required.",
  //   }),
  projectId: z.string(),
  notes: z.string(),
});

export default function Upsert({ date }: UpsertProps) {
  const [selectedProject, setSelectedProject] = useState(Projects[0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
      pause: "",
      projectId: selectedProject ? selectedProject.id : "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Label className=" font-semibold hover:underline cursor-pointer uppercase">
          Edit
        </Label>
      </DialogTrigger>
      <DialogContent className=" w-[90%] md:max-w-fit">
        <DialogHeader>
          <DialogTitle>Edit John's Time: </DialogTitle>
          <DialogDescription>
            {`Date: ${format(date, "dd.MM.yyyy")}`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className=" min-w-full">
                    <FormLabel className=" text-xs">Start time</FormLabel>
                    <FormControl>
                      <Input type="time" placeholder="00:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">End time</FormLabel>
                    <FormControl>
                      <Input type="time" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pause"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Pause</FormLabel>
                    <FormControl>
                      <Input type="time" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Project</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedProject.name} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Projects.map((project: any) => (
                          <SelectItem key={project?.id} value={project?.id}>
                            {project?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-xs">Notes</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Add a note" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=" flex items-center justify-center md:justify-end gap-4 mt-4">
              <DialogClose asChild>
                <Button variant="outline" className=" w-full md:w-[130px]">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className=" w-full md:w-[130px]">
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
