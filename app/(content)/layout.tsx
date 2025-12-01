import Breadcrumb from "@/components/breadcrumb";
import BreadcrumbSkeleton from "@/components/breadcrumb-skeleton";
import { ReactNode, Suspense } from "react";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<BreadcrumbSkeleton />}>
        <Breadcrumb />
      </Suspense>
      {children}
    </>
  );
}
