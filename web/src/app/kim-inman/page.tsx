import { ExpertSite } from "@/components/expert-site";
import { getExpert } from "@/data/experts";

export default function KimInmanPage() {
  const expert = getExpert("kim-inman");

  if (!expert) return null;
  return <ExpertSite expert={expert} />;
}
