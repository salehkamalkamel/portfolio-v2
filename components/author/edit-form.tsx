"use client";
import { Author } from "@/db/schema";
import { authorFormSchema } from "@/lib/validations/authors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
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
import z from "zod";
import Link from "next/link";
import { useTransition } from "react";
import { updateAuthor } from "@/server/authors-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditAuthorForm({ author }: { author: Author }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof authorFormSchema>>({
    resolver: zodResolver(authorFormSchema),
    defaultValues: {
      name: author.name,
      role: author.role,
      bio: author.bio ?? undefined,
      resourceLabel: author.resourceLabel ?? undefined,
      imageUrl: author.imageUrl ?? undefined,
      resourceUrl: author.resourceLinks ? author.resourceLinks[0] : undefined,
    },
  });

  function onSubmit(data: z.infer<typeof authorFormSchema>) {
    startTransition(async () => {
      const response = await updateAuthor(author.id, data);

      if (!response?.success) {
        toast.error("Failed to update author. Please try again.");
        console.error("Update Author Error:", response.message);
      } else {
        toast.success("Author updated successfully!");
        router.push("/admin/authors");
      }
    });
  }
  return (
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
              <FieldLabel className="text-white">Avatar Initials</FieldLabel>
              <Input
                {...field}
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-purple-500"
                placeholder="e.g., SK"
              />
              <FieldDescription className="text-neutral-500">
                Author Image URL{" "}
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                  <FieldLabel className="text-white">Link Label</FieldLabel>
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
          {isPending ? "Updating..." : "Update Author"}
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
  );
}
