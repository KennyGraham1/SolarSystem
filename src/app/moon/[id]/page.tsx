import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOONS, isBodyId, type BodyId } from "@/lib/planets";
import { BodyPage, bodyMetadata } from "@/components/planet/BodyPage";

type Params = { id: string };
type Props = { params: Promise<Params> };

const isMoonId = (id: string): id is BodyId => isBodyId(id) && MOONS.some((b) => b.id === id);

export function generateStaticParams(): Params[] {
  return MOONS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return isMoonId(id) ? bodyMetadata(id) : { title: "Not found" };
}

export default async function MoonPage({ params }: Props) {
  const { id } = await params;
  if (!isMoonId(id)) notFound();
  return <BodyPage id={id} />;
}
