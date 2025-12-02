"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { z } from "zod";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { createAuthor } from "@/server/authors-actions";
import { authorFormSchema } from "@/lib/validations/authors";
import { useTransition } from "react";
import { toast } from "sonner";

export default function AddAuthorPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof authorFormSchema>>({
    resolver: zodResolver(authorFormSchema),
    defaultValues: {
      name: "",
      role: "",
      bio: "",
      imageUrl: "",
      resourceLabel: "",
      resourceUrl: "",
    },
  });

  function onSubmit(data: z.infer<typeof authorFormSchema>) {
    startTransition(async () => {
      const result = await createAuthor(data);
      if (result?.error) {
        toast.error("Failed to create author. Please try again.");
        console.error(result.error);
      } else {
        toast.success("Author created successfully!");
        router.push("/admin/authors");
      }
    });
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-neutral-800/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold">Add New Author</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="border border-neutral-800/40 rounded-xl p-8 bg-neutral-900/30">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup className="space-y-6">
              {/* Name and Role row */}
              <div className="grid md:grid-cols-2 gap-6">
                <Controller
                  disabled={isPending}
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-white">Name</FieldLabel>
                      <Input
                        {...field}
                        className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-purple-500"
                        placeholder="Author name"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  disabled={isPending}
                  name="role"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-white">Role</FieldLabel>
                      <Input
                        {...field}
                        className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-purple-500"
                        placeholder="e.g., Frontend Developer"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Avatar */}
              <Controller
                disabled={isPending}
                name="imageUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">
                      Image URL (optional)
                    </FieldLabel>
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                      className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-purple-500"
                      placeholder="Auto-generated from name if empty"
                    />
                    <FieldDescription className="text-neutral-500">
                      Add Image URL{" "}
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Bio */}
              <Controller
                disabled={isPending}
                name="bio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">Bio</FieldLabel>
                    <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-purple-500">
                      <InputGroupTextarea
                        {...field}
                        placeholder="Short bio about the author"
                        rows={4}
                        className="bg-transparent border-0 text-white placeholder-neutral-500 resize-none focus:ring-0"
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="text-neutral-500 tabular-nums text-xs">
                          {field.value?.length || 0}/500 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Resource Link Section */}
              <div className="border-t border-neutral-800/40 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Resource Link
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Controller
                    disabled={isPending}
                    name="resourceLabel"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-white">
                          Link Label
                        </FieldLabel>
                        <Input
                          {...field}
                          className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-purple-500"
                          placeholder="e.g., YouTube Channel"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    disabled={isPending}
                    name="resourceUrl"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-white">Link URL</FieldLabel>
                        <Input
                          {...field}
                          type="url"
                          className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-purple-500"
                          placeholder="https://..."
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>
            </FieldGroup>

            <div className="flex gap-4 pt-4 border-t border-neutral-800/40">
              <Button
                disabled={isPending}
                type="submit"
                className="bg-purple-500 text-white hover:bg-purple-400"
              >
                {isPending ? "Creating..." : "Create Author"}
              </Button>
              <Link href="/admin/authors">
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
