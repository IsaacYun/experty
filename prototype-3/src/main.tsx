import { FormEvent, MouseEvent, ReactNode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import {
  ArrowUpRight, Bell, CalendarDays, Check, ChevronRight, Clock3,
  Copy, ExternalLink, Grid2X2, Link2, Menu, MoreHorizontal, Plus,
  Search, Settings2, Sparkles, UserRound, X
} from 'lucide-react'
import './styles.css'

type Screen = 'home' | 'inquiry' | 'dashboard'

const inquiries = [
  { org: '메트릭스 인사이트', title: '2026 투자 전략 포럼 기조연설', date: '8월 21일 (목)', tag: '신규', color: 'orange' },
  { org: 'SBS 비즈', title: '아침 경제 라이브 출연 문의', date: '8월 18일 (월)', tag: '검토 중', color: 'blue' },
  { org: '성수 커뮤니티', title: '창업가를 위한 부동산 인사이트', date: '8월 27일 (수)', tag: '협상 중', color: 'violet' },
]

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const go = (next: Screen) => { setScreen(next); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <>
    <header className="site-header">
      <button className="brand" onClick={() => go('home')} aria-label="Experty 홈"><span className="brand-mark">e</span>experty</button>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="주 메뉴">
        <button onClick={() => go('home')}>서비스 소개</button>
        <button onClick={() => go('inquiry')}>섭외 문의</button>
        <button className="nav-login" onClick={() => go('dashboard')}>전문가 센터 <ArrowUpRight size={15} /></button>
      </nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기">{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {screen === 'home' && <Home onGo={go} />}
    {screen === 'inquiry' && <Inquiry submitted={submitted} setSubmitted={setSubmitted} />}
    {screen === 'dashboard' && <Dashboard />}
  </>
}

function Home({ onGo }: { onGo: (s: Screen) => void }) {
  return <main>
    <section className="hero">
      <div className="orb orb-left" /><div className="orb orb-right" />
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
        <span className="eyebrow"><Sparkles size={14} /> INDEPENDENT EXPERTS</span>
        <h1>전문가의 시간은<br /><em>전문성</em>에 쓰여야 하니까</h1>
        <p>흩어진 섭외 문의와 일정을 한곳에서.<br />나만의 링크로, 소속사 수준의 운영을 시작하세요.</p>
        <div className="hero-actions">
          <button className="button primary" onClick={() => onGo('dashboard')}>무료로 시작하기 <ArrowUpRight size={18} /></button>
          <button className="button ghost" onClick={() => onGo('inquiry')}>섭외 페이지 보기 <ChevronRight size={18} /></button>
        </div>
        <p className="live-note"><span /> 방금 전, 새로운 섭외 문의가 도착했어요</p>
      </motion.div>
      <PointerDashboard />
    </section>

    <section className="trust-strip"><span>복잡한 커뮤니케이션 대신</span><strong>문의 · 일정 · 확정</strong><span>을 한 번에 관리하세요</span></section>

    <Reveal className="section system-section">
      <div className="section-heading"><span className="eyebrow">ONE LINK, ONE SYSTEM</span><h2>섭외가 들어오는 순간부터<br /><em>확정되는 날</em>까지</h2><p>누락 없이, 과한 소통 없이. 필요한 흐름만 깔끔하게 연결합니다.</p></div>
      <div className="steps-grid">
        <Step n="01" icon={<Link2 />} title="나만의 섭외 링크" text="전문 분야와 최근 활동을 담은 페이지를 만들고, 어디에서나 공유하세요." />
        <Step n="02" icon={<Bell />} title="한눈에 보는 문의" text="섭외 조건을 빠짐없이 받고, 새 문의와 진행 상황을 놓치지 마세요." />
        <Step n="03" icon={<CalendarDays />} title="일정까지 한 번에" text="충돌을 확인하고 확정된 섭외만 캘린더에 정확히 기록합니다." />
      </div>
    </Reveal>

    <Reveal className="section profile-showcase">
      <div className="profile-card"><div className="profile-top"><div className="avatar">김</div><div><b>김도현</b><p>경제 · 투자 전문가</p></div><MoreHorizontal size={20} /></div><h3>숫자 너머의 흐름을<br />쉽게 설명합니다.</h3><div className="chip-row"><span>기업 강연</span><span>방송 출연</span><span>포럼</span></div><button onClick={() => onGo('inquiry')}>섭외 문의하기 <ArrowUpRight size={17} /></button></div>
      <div className="showcase-copy"><span className="eyebrow">YOUR PUBLIC PAGE</span><h2>전문성은 드러내고,<br /><em>문의는 간결하게</em></h2><p>내 소개, 주제, 최근 활동을 한 장에 담습니다. 문의하는 사람에게는 꼭 필요한 정보만, 당신에게는 충분한 맥락만 전달됩니다.</p><button className="text-link" onClick={() => onGo('inquiry')}>공개 페이지 미리보기 <ArrowUpRight size={17} /></button></div>
    </Reveal>

    <section className="cta-section"><span className="eyebrow">START NOW</span><h2>오늘부터 섭외 업무를<br /><em>가볍게</em> 만들어보세요.</h2><p>첫 8주 파일럿 동안 모든 기능을 무료로 경험할 수 있어요.</p><button className="button primary" onClick={() => onGo('dashboard')}>내 전문가 페이지 만들기 <ArrowUpRight size={18} /></button></section>
    <Footer />
  </main>
}

function Step({ n, icon, title, text }: { n: string, icon: ReactNode, title: string, text: string }) { return <article className="step"><div className="step-icon">{icon}</div><span>STEP {n}</span><h3>{title}</h3><p>{text}</p><i><ChevronRight size={17} /></i></article> }

function PointerDashboard() {
  const reduceMotion = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 110, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 110, damping: 18 })
  const tilt = useSpring(useMotionValue(0), { stiffness: 100, damping: 18 })
  function move(event: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - .5
    const py = (event.clientY - rect.top) / rect.height - .5
    x.set(px * 16); y.set(py * 12); tilt.set(px * 1.25)
  }
  function leave() { x.set(0); y.set(0); tilt.set(0) }
  return <motion.div className="hero-dashboard" onMouseMove={move} onMouseLeave={leave} initial={reduceMotion ? false : { opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .12 }}>
    <motion.div style={{ x, y, rotate: tilt }}><MiniDashboard /></motion.div>
  </motion.div>
}

function Reveal({ className, children }: { className: string, children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  return <motion.section ref={ref} className={className} initial={reduceMotion ? false : { opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .62, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.section>
}

function MiniDashboard() { return <div className="mini-window"><div className="window-top"><span className="dots"><i /><i /><i /></span><span>app.experty.kr</span></div><div className="mini-body"><aside><b><span className="brand-mark">e</span>experty</b><div className="side-user"><span>김</span><small>김도현</small></div><p className="active"><Grid2X2 size={13} /> 홈</p><p><Bell size={13} /> 문의 관리 <b>3</b></p><p><CalendarDays size={13} /> 일정</p></aside><div className="mini-content"><header><div><small>안녕하세요, 김도현 님</small><h3>오늘의 섭외 현황</h3></div><Bell size={16} /></header><div className="mini-stats"><div><small>새 문의</small><b>03</b><em>+2 이번 주</em></div><div><small>이번 달 확정</small><b>08</b><em>일정 충돌 없음</em></div><div><small>평균 응답</small><b>12<small>시간</small></b><em>목표보다 빨라요</em></div></div><div className="mini-table"><header><b>최근 문의</b><small>전체 보기 →</small></header><p><span className="mini-avatar">메</span><b>메트릭스 인사이트</b><small>기조연설 · 8/21</small><em>신규</em></p><p><span className="mini-avatar blue">S</span><b>SBS 비즈</b><small>방송 출연 · 8/18</small><em className="blue-tag">검토 중</em></p></div></div></div></div> }

function Inquiry({ submitted, setSubmitted }: { submitted: boolean, setSubmitted: (v: boolean) => void }) {
  function submit(e: FormEvent) { e.preventDefault(); setSubmitted(true) }
  return <main className="inquiry-page"><section className="inquiry-intro"><span className="eyebrow">EXPERTY INQUIRY</span><h1>좋은 제안이라면,<br /><em>빠르게</em> 듣고 싶습니다.</h1><p>아래 내용을 남겨주시면 확인 후 영업일 기준<br />48시간 이내에 답변드리겠습니다.</p><div className="expert-mini"><span className="avatar">김</span><div><b>김도현</b><small>경제 · 투자 전문가</small></div><Check size={15} /></div></section><section className="form-panel">{submitted ? <div className="success"><div><Check size={26} /></div><span className="eyebrow">MESSAGE RECEIVED</span><h2>문의가<br />전달되었습니다.</h2><p>확인 메일을 보내드렸어요.<br />김도현 전문가가 곧 답변드릴게요.</p><button className="button primary" onClick={() => setSubmitted(false)}>새 문의 작성하기</button></div> : <form onSubmit={submit}><header><span>섭외 문의</span><small>필수 항목 <b>*</b></small></header><div className="field-row"><label>담당자 성함 <b>*</b><input required placeholder="성함을 입력해주세요" /></label><label>소속 / 회사명 <b>*</b><input required placeholder="회사 또는 기관명" /></label></div><label>이메일 <b>*</b><input required type="email" placeholder="example@company.com" /></label><label>섭외 유형 <b>*</b><select defaultValue=""><option value="" disabled>선택해주세요</option><option>기업 강연</option><option>방송 출연</option><option>행사 · 포럼</option><option>인터뷰 · 콘텐츠</option></select></label><div className="field-row"><label>희망 일정<input type="date" /></label><label>예상 사례비<input placeholder="협의 가능" /></label></div><label>문의 내용 <b>*</b><textarea required placeholder="행사 목적, 주제, 예상 시간 등 구체적인 내용을 남겨주세요." /></label><label className="consent"><input required type="checkbox" /><span>개인정보 수집 및 이용에 동의합니다. <u>내용 보기</u></span></label><button className="button primary submit">문의 보내기 <ArrowUpRight size={18} /></button></form>}</section></main>
}

function Dashboard() { const [copied, setCopied] = useState(false); return <main className="dashboard-page"><aside className="dashboard-side"><button className="brand"><span className="brand-mark">e</span>experty</button><div className="workspace"><span className="avatar">김</span><div><b>김도현</b><small>프로 워크스페이스</small></div><ChevronRight size={15} /></div><nav><a className="selected"><Grid2X2 size={17} /> 홈</a><a><Bell size={17} /> 문의 관리 <b>3</b></a><a><CalendarDays size={17} /> 일정</a><a><UserRound size={17} /> 공개 페이지</a></nav><div className="side-bottom"><a><Settings2 size={17} /> 설정</a><div className="plan"><span>PRO PLAN</span><b>파일럿 이용 중</b><small>8월 31일까지</small></div></div></aside><section className="dashboard-main"><header className="dash-header"><div className="mobile-logo"><span className="brand-mark">e</span>experty</div><div className="dash-search"><Search size={16} /><input placeholder="문의, 일정 검색" /></div><button className="icon-button"><Bell size={18} /><i /></button><button className="profile-button">김</button></header><div className="dash-content"><div className="dashboard-title"><div><p>2026년 8월 8일, 금요일</p><h1>좋은 아침이에요, 김도현 님 <span>👋</span></h1></div><button className="button primary small"><Plus size={17} /> 일정 추가</button></div><div className="stats"><article><span>새로운 문의</span><b>3</b><p><i className="up">↑</i> 지난주보다 2건 많아요</p><div className="stats-icon"><Bell /></div></article><article><span>이번 달 확정</span><b>8<small>건</small></b><p><i>•</i> 일정 충돌 없이 진행 중</p><div className="stats-icon peach"><CalendarDays /></div></article><article><span>평균 첫 응답</span><b>12<small>시간</small></b><p><i className="up">↓</i> 목표 응답 시간 이내예요</p><div className="stats-icon purple"><Clock3 /></div></article></div><div className="dash-grid"><section className="inquiry-list"><header><div><h2>최근 도착한 문의 <b>3</b></h2><p>답변이 필요한 새로운 섭외 요청이에요.</p></div><button>전체 보기 <ChevronRight size={16} /></button></header>{inquiries.map(i => <article key={i.org}><span className="company-initial">{i.org[0]}</span><div className="inquiry-data"><b>{i.org}</b><p>{i.title}</p><span>{i.date}</span></div><span className={`status ${i.color}`}>{i.tag}</span><button className="more"><MoreHorizontal size={19} /></button></article>)}</section><section className="schedule-card"><header><h2>다가오는 일정</h2><button><CalendarDays size={16} /></button></header><div className="calendar-date"><button>‹</button><b>8월</b><button>›</button></div><div className="days"><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span></div><div className="day-numbers"><span>4</span><span>5</span><span>6</span><span>7</span><b>8</b><span>9</span><span>10</span></div><div className="event"><span /><div><small>8월 12일 · 오후 2:00</small><b>한빛증권 경제 전망 세미나</b></div></div></section></div><section className="share-card"><div><span className="eyebrow">MY EXPERTY PAGE</span><h2>내 섭외 링크를 공유해보세요.</h2><p>링크 하나로 프로필과 문의 양식을 함께 전달할 수 있어요.</p></div><div className="share-url"><Link2 size={17} /><span>experty.kr/kimdohyun</span><button onClick={() => { navigator.clipboard?.writeText('experty.kr/kimdohyun'); setCopied(true); setTimeout(() => setCopied(false), 1500) }}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? '복사됨' : '복사'}</button><ExternalLink size={17} /></div></section></div></section></main> }

function Footer() { return <footer><button className="brand"><span className="brand-mark">e</span>experty</button><p>소속사 없이 활동하는 전문가를 위한 섭외 운영 시스템</p><div><a>이용약관</a><a>개인정보처리방침</a><a>문의하기</a></div><small>© 2026 Experty. All rights reserved.</small></footer> }

export default App

const appWindow = window as typeof window & { __expertyRoot?: ReturnType<typeof createRoot> }
const appRoot = appWindow.__expertyRoot ?? createRoot(document.getElementById('root')!)
appWindow.__expertyRoot = appRoot
appRoot.render(<App />)
