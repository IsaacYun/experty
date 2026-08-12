"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Mic2, Play, Radio } from "lucide-react";
import type { ExpertActivity, ExpertProfile } from "@/data/experts";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/section";

const icons = { 영상: Play, 기사: Radio, 도서: BookOpen, 강연: Mic2 };

function ExpertHeader({ expert }: { expert: ExpertProfile }) {
  const bookingHref = `/${expert.slug}/inquiry`;
  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10 text-white">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        <Link href={`/${expert.slug}`} className="text-lg font-bold tracking-[-0.01em]" aria-label={`${expert.name} 홈페이지`}>{expert.brandName ?? expert.name}</Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-white/70 md:flex" aria-label="페이지 메뉴">
          <a href="#about" className="transition-colors hover:text-white">소개</a>
          <a href="#activity" className="transition-colors hover:text-white">최근 활동</a>
          <a href="#booking" className="transition-colors hover:text-white">섭외 안내</a>
        </nav>
        <Link href={bookingHref} className="text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">섭외 문의</Link>
      </div>
    </header>
  );
}

function ExpertFooter({ expert }: { expert: ExpertProfile }) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {expert.brandName ?? expert.name}. All rights reserved.</p>
        <Link href="/" className="w-fit transition-colors hover:text-ink-700">Powered by experty</Link>
      </div>
    </footer>
  );
}

function ActivityCard({ activity }: { activity: ExpertActivity }) {
  const Icon = icons[activity.type];
  const inner = (
    <article className="group h-full overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-ink-950/[.06]">
      {activity.thumbnail ? (
        <div className="relative aspect-video overflow-hidden bg-surface-2">
          <Image src={activity.thumbnail.src} alt={activity.thumbnail.alt} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-[1.035]" sizes="(min-width: 768px) 50vw, 100vw" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink-950/70 to-transparent px-4 pb-3 pt-10 text-xs font-semibold text-white">
            <span>{activity.type}</span>
            {activity.type === "영상" ? <span className="flex items-center gap-1.5"><Play className="h-3.5 w-3.5 fill-current" /> 영상 보기</span> : null}
          </div>
        </div>
      ) : null}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-400"><span>{activity.date}</span><span aria-hidden>·</span><span>{activity.type}</span>{!activity.thumbnail ? <Icon className="ml-auto h-4 w-4 text-brand" aria-hidden /> : null}</div>
        <h3 className="mt-3 text-lg font-bold leading-snug tracking-[-0.018em] text-ink-950">{activity.title}</h3>
        <p className="mt-2 text-sm leading-6 text-ink-500">{activity.description}</p>
        <p className="mt-5 flex items-center gap-1 text-xs font-medium text-ink-400">출처 · {activity.sourceName}{activity.sourceUrl ? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /> : null}</p>
      </div>
    </article>
  );
  return activity.sourceUrl ? <a href={activity.sourceUrl} target="_blank" rel="noreferrer" className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4">{inner}</a> : inner;
}

export function ExpertSite({ expert }: { expert: ExpertProfile }) {
  const bookingHref = `/${expert.slug}/inquiry`;
  const hasProfileImage = Boolean(expert.profileImage);
  return <div className="overflow-x-clip bg-[#fbfbfa]">
    <ExpertHeader expert={expert} />
    <main>
      <section id="about" className="relative isolate overflow-hidden bg-navy-900 pb-16 pt-32 text-white md:pb-24 md:pt-40">
        <div aria-hidden className="absolute right-[-10%] top-[-20%] -z-10 h-[32rem] w-[32rem] rounded-full bg-brand/25 blur-3xl" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
        <div className="mx-auto grid max-w-6xl items-end gap-12 px-5 md:grid-cols-[1.12fr_.88fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs font-bold tracking-[.14em] text-brand-soft">{expert.category}</p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.12] tracking-[-0.012em] text-white md:text-7xl">{expert.brandName ?? expert.name}</h1>
            <p className="mt-5 text-lg font-semibold leading-7 text-white/80">{expert.title}</p>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/65 md:text-base">{expert.bio}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3"><Link href={bookingHref}><Button size="lg">섭외 문의하기 <ArrowUpRight className="h-4 w-4" /></Button></Link><span className="inline-flex h-12 items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white/75">{expert.responseTime}</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .1, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-md">
            {hasProfileImage && expert.profileImage ? <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 bg-navy-800 shadow-2xl shadow-black/25"><Image src={expert.profileImage.src} alt={expert.profileImage.alt} fill unoptimized className="object-cover object-top" sizes="(min-width: 768px) 33vw, 90vw" /><a href={expert.profileImage.sourceUrl} target="_blank" rel="noreferrer" className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/75 to-transparent px-5 pb-4 pt-12 text-xs font-medium text-white/70">사진 출처 · {expert.profileImage.sourceName} <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></a></div> : <div className="flex aspect-[4/5] flex-col justify-between rounded-[2rem] border border-white/15 bg-white/10 p-7"><span className="text-sm font-bold tracking-[.1em] text-brand-soft">EXPERT PROFILE</span><div><p className="text-5xl font-bold leading-[1.12] tracking-[-0.012em]">{expert.name}</p><p className="mt-3 text-sm leading-6 text-white/65">프로필 사진은 전문가가 직접 등록할 수 있습니다.</p></div><div className="border-t border-white/15 pt-5 text-sm font-medium text-white/75">{expert.areas.join(" · ")}</div></div>}
          </motion.div>
        </div>
      </section>
      <section className="border-b border-line bg-white"><div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line px-5 md:grid-cols-4"><div className="py-6"><span className="text-xs font-bold text-ink-400">FIELD</span><b className="mt-1 block text-base text-ink-950">{expert.areas[0]}</b></div><div className="py-6 pl-5"><span className="text-xs font-bold text-ink-400">FORMAT</span><b className="mt-1 block text-base text-ink-950">강연·방송·자문</b></div><div className="hidden py-6 pl-5 md:block"><span className="text-xs font-bold text-ink-400">RESPONSE</span><b className="mt-1 block text-base text-ink-950">{expert.responseTime}</b></div><div className="hidden py-6 pl-5 md:block"><span className="text-xs font-bold text-ink-400">LOCATION</span><b className="mt-1 block text-base text-ink-950">{expert.areas[1] ?? "협의"}</b></div></div></section>
      <section id="activity" className="mx-auto max-w-6xl px-5 py-20 md:py-28"><FadeIn><p className="text-sm font-bold text-brand">RECENT ACTIVITY</p><h2 className="mt-3 max-w-2xl text-4xl font-bold leading-[1.12] tracking-[-0.018em] text-ink-950 md:text-5xl">최근에 나눈 이야기와<br />공개된 활동</h2><p className="mt-5 max-w-xl text-[15px] leading-7 text-ink-500">영상, 기사, 저서, 강연을 통해 다루는 주제와 전달 방식을 미리 확인할 수 있습니다.</p></FadeIn><div className="mt-10 grid gap-4 md:grid-cols-2">{expert.activities.map((activity, index) => <FadeIn key={`${activity.type}-${activity.title}`} delay={index * .05}><ActivityCard activity={activity} /></FadeIn>)}</div></section>
      <section className="bg-surface py-20 md:py-28"><div className="mx-auto max-w-6xl px-5"><FadeIn><p className="text-sm font-bold text-brand">BOOKING TOPICS</p><h2 className="mt-3 text-4xl font-bold leading-[1.12] tracking-[-0.018em] text-ink-950 md:text-5xl">섭외 가능한 주제</h2></FadeIn><div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">{expert.topics.map((topic, index) => <FadeIn key={topic.title} className="bg-white" delay={index * .05}><div className="min-h-52 p-7 transition-colors hover:bg-brand-50 md:p-8"><span className="text-sm font-bold text-brand">0{index + 1}</span><h3 className="mt-7 text-xl font-bold leading-snug tracking-[-0.018em] text-ink-950">{topic.title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-ink-500">{topic.description}</p></div></FadeIn>)}</div></div></section>
      <section id="booking" className="mx-auto max-w-6xl px-5 py-20 md:py-28"><FadeIn><div className="rounded-[2rem] bg-brand p-8 text-white md:flex md:items-center md:justify-between md:p-12"><div><p className="text-sm font-bold text-white/70">BOOKING INQUIRY</p><h2 className="mt-3 text-3xl font-bold leading-[1.12] tracking-[-0.018em] md:text-5xl">행사 정보를 남겨주시면<br />빠르게 확인하겠습니다.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/75">강연, 방송, 인터뷰, 컨설팅의 일정·장소·예산·활용 범위를 함께 알려주세요.</p></div><Link href={bookingHref} className="mt-7 inline-flex md:mt-0"><Button variant="white" size="lg">섭외 문의 시작 <ArrowUpRight className="h-4 w-4" /></Button></Link></div></FadeIn></section>
    </main>
    <ExpertFooter expert={expert} />
  </div>;
}
