export default async function CandidatesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>Evaluation: {id}</div>;
}
