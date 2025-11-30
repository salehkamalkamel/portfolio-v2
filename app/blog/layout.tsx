import type React from "react";
export const metadata = {
  title: "Blog | Saleh Kamal - Web Developer",
  description:
    "Articles about web performance, frontend optimization, and modern web development.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
