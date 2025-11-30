"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
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
import { slugify } from "@/lib/slugify";
import { createProject } from "@/server/projects-actions";
import { toast } from "sonner";

export default function AddProjectPage() {
  const router = useRouter();
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      brief: "",
      description: "",
      stack: "Frontend",
      technologies: [],
      thumbnailUrl: "",
      liveUrl: "",
      repoUrl: "",
      problem: "",
      solution: "",
      featured: false,
      published: true,
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
      const reponse = await createProject(projectData);
      if (reponse?.error) {
        toast.error(reponse.error);
        throw new Error(reponse.error);
      } else {
        toast.success("Project created successfully!");
      }
    });
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold">Add New Project</h1>
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
                        placeholder="High-performance e-commerce platform with optimized Core Web Vitals"
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
                    <FieldDescription className="text-neutral-500 text-sm mb-2">
                      Full project description
                    </FieldDescription>
                    <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-cyan-500">
                      <InputGroupTextarea
                        {...field}
                        placeholder="A comprehensive e-commerce solution built for..."
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
                <FieldDescription className="text-neutral-500 text-sm mb-2">
                  Add technologies used in this project
                </FieldDescription>
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
                        <FieldDescription className="text-neutral-500 text-sm mb-2">
                          What challenge or problem did this project solve?
                        </FieldDescription>
                        <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-cyan-500">
                          <InputGroupTextarea
                            {...field}
                            placeholder="The original platform had multiple performance issues..."
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
                        <FieldDescription className="text-neutral-500 text-sm mb-2">
                          How did you solve the problem?
                        </FieldDescription>
                        <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-cyan-500">
                          <InputGroupTextarea
                            {...field}
                            placeholder="Implemented a comprehensive performance optimization strategy..."
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
                {isPending ? "Creating..." : "Create Project"}
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
