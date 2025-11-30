"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  projectFormSchema,
  ProjectFormValues,
} from "@/lib/validations/projects";
import { updateProject } from "@/server/projects-actions";
import { toast } from "sonner";
import { Project } from "@/db/schema";
import { redirect } from "next/navigation";

export default function EditForm({
  projectId,
  existingProject,
}: {
  projectId: string;
  existingProject: Project;
}) {
  const [isPending, startTransition] = useTransition();
  const [technologies, setTechnologies] = useState<string[]>(
    existingProject?.technologies || []
  );
  const [techInput, setTechInput] = useState("");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: existingProject?.title || "",
      brief: existingProject?.brief || "",
      description: existingProject?.description || "",
      stack: existingProject?.stack || "Frontend",
      technologies: existingProject?.technologies || [],
      thumbnailUrl: existingProject?.thumbnailUrl || "",
      liveUrl: existingProject?.liveUrl || "",
      repoUrl: existingProject?.repoUrl || "",
      problem: existingProject?.problem || "",
      solution: existingProject?.solution || "",
      featured: existingProject?.featured || false,
      published: existingProject?.published ?? true,
    },
  });

  const handleAddTech = () => {
    if (techInput && !technologies.includes(techInput)) {
      setTechnologies([...technologies, techInput]);
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  function onSubmit(data: ProjectFormValues) {
    const projectData = {
      ...data,
      technologies,
    };
    startTransition(async () => {
      const response = await updateProject(projectId, projectData);
      if (!response?.success) {
        toast.error(response?.message || "Failed to update project.");
        throw new Error(response?.message || "Failed to update project.");
      } else {
        toast.success("Project updated successfully.");
        redirect("/admin/projects");
      }
    });
  }

  if (!existingProject) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link
            href="/admin/projects"
            className="text-cyan-400 hover:text-cyan-300"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold">Edit Project</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="border border-neutral-800/40 rounded-xl p-8 bg-neutral-900/30">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup className="space-y-6">
              {/* Title */}
              <Controller
                disabled={isPending}
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">Title</FieldLabel>
                    <FieldDescription className="text-neutral-500 text-sm mb-2">
                      The project name (slug will be auto-generated)
                    </FieldDescription>
                    <Input
                      {...field}
                      className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-cyan-500"
                      placeholder="E-commerce Platform"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Brief */}
              <Controller
                disabled={isPending}
                name="brief"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">Brief</FieldLabel>
                    <FieldDescription className="text-neutral-500 text-sm mb-2">
                      A short summary (max 512 characters)
                    </FieldDescription>
                    <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-cyan-500">
                      <InputGroupTextarea
                        {...field}
                        placeholder="High-performance e-commerce platform..."
                        rows={2}
                        maxLength={512}
                        className="bg-transparent border-0 text-white placeholder-neutral-500 resize-none focus:ring-0"
                      />
                    </InputGroup>
                    <p className="text-xs text-neutral-500 mt-1">
                      {field.value?.length || 0}/512
                    </p>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Description */}
              <Controller
                disabled={isPending}
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">Description</FieldLabel>
                    <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-cyan-500">
                      <InputGroupTextarea
                        {...field}
                        placeholder="Full project description..."
                        rows={4}
                        className="bg-transparent border-0 text-white placeholder-neutral-500 resize-none focus:ring-0"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Stack */}
              <Controller
                disabled={isPending}
                name="stack"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">Stack</FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-neutral-800/50 border-neutral-700/50 text-white focus:border-cyan-500">
                        <SelectValue placeholder="Select stack" />
                      </SelectTrigger>
                      <SelectContent className="bg-neutral-800 border-neutral-700">
                        {[
                          "Frontend",
                          "Backend",
                          "Full-stack",
                          "Components",
                          "Mobile",
                          "DevOps",
                        ].map((stack) => (
                          <SelectItem
                            key={stack}
                            value={stack}
                            className="text-white hover:bg-neutral-700"
                          >
                            {stack}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Technologies */}
              <Field>
                <FieldLabel className="text-white">Technologies</FieldLabel>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    className="flex-1 bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-cyan-500"
                    placeholder="React, Next.js, TypeScript..."
                  />
                  <Button
                    type="button"
                    onClick={handleAddTech}
                    className="bg-neutral-700 text-white hover:bg-neutral-600"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="hover:text-cyan-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </Field>

              {/* URLs Section */}
              <div className="border-t border-neutral-800/40 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Links (Optional)
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <Controller
                    disabled={isPending}
                    name="thumbnailUrl"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-white text-sm">
                          Thumbnail URL
                        </FieldLabel>
                        <Input
                          {...field}
                          className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-cyan-500"
                          placeholder="https://..."
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    disabled={isPending}
                    name="liveUrl"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-white text-sm">
                          Live URL
                        </FieldLabel>
                        <Input
                          {...field}
                          className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-cyan-500"
                          placeholder="https://..."
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    disabled={isPending}
                    name="repoUrl"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-white text-sm">
                          Repository URL
                        </FieldLabel>
                        <Input
                          {...field}
                          className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-cyan-500"
                          placeholder="https://github.com/..."
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="border-t border-neutral-800/40 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Case Study
                </h3>
                <div className="space-y-6">
                  <Controller
                    disabled={isPending}
                    name="problem"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-white">Problem</FieldLabel>
                        <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-cyan-500">
                          <InputGroupTextarea
                            {...field}
                            placeholder="What challenge did this solve?"
                            rows={4}
                            className="bg-transparent border-0 text-white placeholder-neutral-500 resize-none focus:ring-0"
                          />
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    disabled={isPending}
                    name="solution"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-white">Solution</FieldLabel>
                        <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-cyan-500">
                          <InputGroupTextarea
                            {...field}
                            placeholder="How did you solve it?"
                            rows={4}
                            className="bg-transparent border-0 text-white placeholder-neutral-500 resize-none focus:ring-0"
                          />
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>

              {/* Visibility Options */}
              <div className="border-t border-neutral-800/40 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Visibility
                </h3>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Controller
                    disabled={isPending}
                    name="featured"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-cyan-500"
                        />
                        <label className="text-white text-sm">
                          Featured Project
                        </label>
                      </div>
                    )}
                  />
                  <Controller
                    disabled={isPending}
                    name="published"
                    control={form.control}
                    render={({ field }) => (
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-emerald-500"
                        />
                        <label className="text-white text-sm">Published</label>
                      </div>
                    )}
                  />
                </div>
              </div>
            </FieldGroup>

            <div className="flex gap-4 pt-4 border-t border-neutral-800/40">
              <Button
                disabled={isPending}
                type="submit"
                className="bg-cyan-500 text-black hover:bg-cyan-400"
              >
                {isPending ? "Updating..." : "Update Project"}
              </Button>
              <Link href="/admin/projects">
                <Button
                  disabled={isPending}
                  type="button"
                  className="bg-neutral-700 text-white hover:bg-neutral-600"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
