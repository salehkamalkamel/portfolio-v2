import EditForm from "@/components/projects/edit-form";
import { getProjectById } from "@/server/projects-actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;
  const project = await getProjectById(projectId);
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Project not found.</p>
      </div>
    );
  }
  return <EditForm existingProject={project} projectId={projectId} />;
}
