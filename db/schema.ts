import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  integer,
  serial,
  varchar,
  jsonb,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
// =========================================
// 1. AUTH (Better Auth)
// =========================================
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role").default("user"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// =========================================
// 2. PORTFOLIO (PROJECTS)
// =========================================

export const projects = pgTable("project", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  brief: text("brief").notNull(),
  description: text("description").notNull(),
  slug: text("slug").unique(), // for urls: myportfolio.com/work/my-cool-project
  stack: text("stack").notNull(),
  // Performance Tip: Storing simple arrays as JSONB is faster than a join table
  technologies: jsonb("technologies").$type<string[]>().default([]),

  thumbnailUrl: text("thumbnail_url"),
  liveUrl: text("live_url"),
  repoUrl: text("repo_url"),

  problem: text("problem").notNull(),
  solution: text("solution").notNull(),

  featured: boolean("featured").default(false),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Project = typeof projects.$inferSelect;
/**
 * -----------------------------------------------------------
 * AUTHORS TABLE
 * -----------------------------------------------------------
 */
export const authors = pgTable("authors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  slug: varchar("slug", { length: 128 }).unique().notNull(),
  role: varchar("role", { length: 128 }).notNull().default("Author"),
  bio: text("bio"),
  imageUrl: varchar("image_url", { length: 256 }),

  resourceLinks: jsonb("resource_links").$type<string[]>().default([]),
  resourceLabel: varchar("resource_label", { length: 128 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export type Author = typeof authors.$inferSelect;

// Define the relationship: One Author can have Many Posts
export const authorsRelations = relations(authors, ({ many }) => ({
  posts: many(posts),
}));

// =========================================
// 4. BLOG SYSTEM
// =========================================

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Basic content
  title: varchar("title", { length: 256 }).notNull(),
  slug: varchar("slug", { length: 256 }).unique().notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),

  // Author & categorization
  category: varchar("category", { length: 128 }).notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  authorId: uuid("author_id")
    .notNull()
    .references(() => authors.id, { onDelete: "cascade" }),

  // Media
  coverImageUrl: varchar("cover_image_url", { length: 256 }),

  // SEO
  seoTitle: varchar("seo_title", { length: 256 }),
  seoDescription: varchar("seo_description", { length: 320 }),
  canonicalUrl: varchar("canonical_url", { length: 256 }),

  // Publishing controls
  readTime: integer("read_time").default(3),
  isFeatured: boolean("is_featured").default(false),

  // Timestamps
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export type Post = typeof posts.$inferSelect;

export const comments = pgTable(
  "comment",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
    likesCount: integer("likes_count").default(0),
    parentId: uuid("parent_id").references((): any => comments.id, {
      onDelete: "cascade",
    }),

    // Relations
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: uuid("postId")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    // Indexing postId makes fetching comments for a blog fast
    postIdx: index("comment_post_idx").on(table.postId),
  })
);

export const postLikes = pgTable(
  "post_like",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    postId: uuid("postId")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.postId] }),
  })
);

export const commentLikes = pgTable(
  "comment_like",
  {
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    commentId: uuid("commentId")
      .notNull()
      .references(() => comments.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.commentId] }),
  })
);

// =========================================
// 5. DRIZZLE RELATIONS (For nice API queries)
// =========================================

// This allows you to do: db.query.posts.findMany({ with: { comments: true } })

export const postLikesRelations = relations(postLikes, ({ one }) => ({
  user: one(user, {
    fields: [postLikes.userId],
    references: [user.id],
  }),
  post: one(posts, {
    fields: [postLikes.postId],
    references: [posts.id],
  }),
}));

export const commentLikesRelations = relations(commentLikes, ({ one }) => ({
  user: one(user, {
    fields: [commentLikes.userId],
    references: [user.id],
  }),
  comment: one(comments, {
    fields: [commentLikes.commentId],
    references: [comments.id],
  }),
}));

export const usersRelations = relations(user, ({ many }) => ({
  comments: many(comments),
  postLikes: many(postLikes),
  commentLikes: many(commentLikes),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(authors, {
    fields: [posts.authorId],
    references: [authors.id],
  }),

  comments: many(comments),

  postLikes: many(postLikes),
}));

// Update this section
export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(user, {
    fields: [comments.userId],
    references: [user.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  commentLikes: many(commentLikes),
  // 👇 Add self-referencing relations here
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "children", // Name of the *many* side on the parent
  }),
  children: many(comments, {
    relationName: "children", // Name of the *one* side on the children
  }),
}));

export const schema = {
  user,
  posts,
  authors,
  session,
  account,
  comments,
  projects,
  postLikes,
  commentLikes,
  verification,
};
