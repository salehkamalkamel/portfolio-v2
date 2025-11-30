"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postFormSchema, PostFormValues } from "@/lib/validations/posts";
import { Author } from "@/db/schema";
import { createPost } from "@/server/blog-actions";
import { toast } from "sonner";

const categories = [
  "Performance",
  "React",
  "JavaScript",
  "TypeScript",
  "Web Design",
  "Tools",
  "Career",
];
export default function AddBlogForm({ authors }: { authors: Author[] }) {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "Performance",
      authorId: authors[0]?.id.toString() || "",
      coverImageUrl: "",
      seoTitle: "",
      seoDescription: "",
      canonicalUrl: "",
      readTime: 3,
      isFeatured: false,
    },
  });

  const handleTitleChange = (
    value: string,
    onChange: (value: string) => void
  ) => {
    onChange(value);
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  function onSubmit(data: PostFormValues) {
    startTransition(async () => {
      const response = await createPost({ ...data, tags });
      if (!response?.success) {
        toast.error("Failed to create post. Please check the form for errors.");
        throw new Error(
          response?.error || "Failed to create post. Please try again."
        );
      } else {
        toast.success("Post created successfully!");
        redirect("/admin/blog");
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="border border-neutral-800/40 rounded-xl p-8 bg-neutral-900/30">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-emerald-400 border-b border-neutral-800/40 pb-2">
              Basic Information
            </h2>
            <FieldGroup className="space-y-6">
              {/* Title */}
              <Controller
                disabled={isPending}
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">Title</FieldLabel>
                    <Input
                      value={field.value}
                      onChange={(e) =>
                        handleTitleChange(e.target.value, field.onChange)
                      }
                      className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-emerald-500"
                      placeholder="Enter post title"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Author and Category row */}
              <div className="grid md:grid-cols-2 gap-6">
                <Controller
                  disabled={isPending}
                  name="authorId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-white">Author</FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-neutral-800/50 border-neutral-700/50 text-white focus:border-emerald-500">
                          <SelectValue placeholder="Select author" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 border-neutral-700">
                          {authors.map((author) => (
                            <SelectItem
                              key={author.id}
                              value={author.id.toString()}
                              className="text-white hover:bg-neutral-700"
                            >
                              {author.name} - {author.role}
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
                <Controller
                  disabled={isPending}
                  name="category"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-white">Category</FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-neutral-800/50 border-neutral-700/50 text-white focus:border-emerald-500">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-800 border-neutral-700">
                          {categories.map((cat) => (
                            <SelectItem
                              key={cat}
                              value={cat}
                              className="text-white hover:bg-neutral-700"
                            >
                              {cat}
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
              </div>

              {/* Excerpt */}
              <Controller
                disabled={isPending}
                name="excerpt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">
                      Excerpt (Optional)
                    </FieldLabel>
                    <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-emerald-500">
                      <InputGroupTextarea
                        {...field}
                        placeholder="Brief summary of the post"
                        rows={2}
                        className="bg-transparent border-0 text-white placeholder-neutral-500 resize-none focus:ring-0"
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="text-neutral-500 tabular-nums text-xs">
                          {field.value?.length || 0}/500
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Cover Image URL */}
              <Controller
                disabled={isPending}
                name="coverImageUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">
                      Cover Image URL (Optional)
                    </FieldLabel>
                    <Input
                      {...field}
                      className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-emerald-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-emerald-400 border-b border-neutral-800/40 pb-2">
              Content
            </h2>
            <FieldGroup className="space-y-6">
              <Controller
                disabled={isPending}
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">Content</FieldLabel>
                    <FieldDescription className="text-neutral-500 mb-3">
                      Write your post using Markdown.
                      <br />
                      Supported: # H1, ## H2, ### H3, **bold**, [links], lists.
                    </FieldDescription>
                    <textarea
                      {...field}
                      rows={14}
                      className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg p-4 text-white placeholder-neutral-500 focus:border-emerald-500 focus:outline-none resize-y font-mono text-sm"
                      placeholder={
                        "# Heading\nSome **bold text**.\n- List item\n- Another one"
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Tags */}
              <Field>
                <FieldLabel className="text-white">Tags (Optional)</FieldLabel>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    className="flex-1 bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-emerald-500"
                    placeholder="Add tag and press Enter"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-neutral-700 text-white hover:bg-neutral-600"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-emerald-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </Field>

              {/* Read Time */}
              <Controller
                disabled={isPending}
                name="readTime"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">
                      Reading Time (minutes)
                    </FieldLabel>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 3)
                      }
                      min={1}
                      className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-emerald-500 w-32"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          {/* SEO Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-emerald-400 border-b border-neutral-800/40 pb-2">
              SEO Settings (Optional)
            </h2>
            <FieldGroup className="space-y-6">
              <Controller
                disabled={isPending}
                name="seoTitle"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">SEO Title</FieldLabel>
                    <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-emerald-500">
                      <Input
                        {...field}
                        className="bg-transparent border-0 text-white placeholder-neutral-500 focus:ring-0"
                        placeholder="Custom title for search engines"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText className="text-neutral-500 tabular-nums text-xs">
                          {field.value?.length || 0}/256
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                disabled={isPending}
                name="seoDescription"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">
                      SEO Description
                    </FieldLabel>
                    <InputGroup className="bg-neutral-800/50 border-neutral-700/50 focus-within:border-emerald-500">
                      <InputGroupTextarea
                        {...field}
                        placeholder="Custom description for search engines"
                        rows={2}
                        className="bg-transparent border-0 text-white placeholder-neutral-500 resize-none focus:ring-0"
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="text-neutral-500 tabular-nums text-xs">
                          {field.value?.length || 0}/320
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                disabled={isPending}
                name="canonicalUrl"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-white">
                      Canonical URL
                    </FieldLabel>
                    <Input
                      {...field}
                      className="bg-neutral-800/50 border-neutral-700/50 text-white placeholder-neutral-500 focus:border-emerald-500"
                      placeholder="https://example.com/original-post"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          {/* Publishing Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-emerald-400 border-b border-neutral-800/40 pb-2">
              Publishing
            </h2>
            <FieldGroup className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Controller
                  disabled={isPending}
                  name="isFeatured"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="text-white">
                        Featured Post
                      </FieldLabel>
                      <FieldDescription className="text-neutral-500 text-sm mb-2">
                        Show this post prominently on the blog
                      </FieldDescription>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="w-5 h-5 rounded border-neutral-700 bg-neutral-800 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="text-neutral-300">
                          Mark as featured
                        </span>
                      </label>
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </div>

          <div className="flex gap-4 pt-4 border-t border-neutral-800/40">
            <Button
              disabled={isPending}
              type="submit"
              className="bg-emerald-500 text-black hover:bg-emerald-400"
            >
              {isPending ? "Creating..." : "Create Post"}
            </Button>
            {/* <Button
              type="button"
              onClick={() => {
                form.handleSubmit(onSubmit)();
              }}
              className="bg-neutral-700 text-white hover:bg-neutral-600"
            >
              Save as Draft
            </Button> */}
            <Link href="/admin/blog">
              <Button
                disabled={isPending}
                type="button"
                variant="outline"
                className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 bg-transparent"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
