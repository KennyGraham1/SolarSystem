import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOPICS, topicBySlug } from "@/components/learn/topics";
import { LearnTopicPage, topicMetadata } from "@/components/learn/LearnTopicPage";

type Params = { topic: string };
type Props = { params: Promise<Params> };

export function generateStaticParams(): Params[] {
  return TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const t = topicBySlug(topic);
  return t ? topicMetadata(t) : { title: "Not found" };
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const t = topicBySlug(topic);
  if (!t) notFound();
  return <LearnTopicPage topic={t} />;
}
