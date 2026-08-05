import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowRight, BookOpen, Building2, Check, ChevronRight, CircleHelp, Compass, Database, ExternalLink,
  Filter, Heart, Home, Landmark, Map, Menu, Search, ShieldCheck, Sparkles, Stamp, Ticket, UserRound,
  UsersRound, X,
} from 'lucide-react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { repository } from './data/repository';
import { usePassport } from './passport';
import type { Association, PersonDetail, PersonSummary, RelationStatus, TicketDetail, TicketQuery, TicketSummary, VenueSummary } from './types';

const navItems = [
  ['/', '首页'], ['/lobby', '戏票大厅'], ['/tickets', '全部戏单'], ['/people', '人物后台'],
  ['/shanghai', '虚拟上海'], ['/passport', '我的护照'], ['/about', '项目说明'],
] as const;

const personaOptions = [
  { id: 'ink', name: '墨羽', role: '好奇的史料观察者', color: '#2c2925' },
  { id: 'cinnabar', name: '绛雪', role: '热爱舞台的追光者', color: '#a32924' },
  { id: 'jade', name: '青禾', role: '城市空间漫游者', color: '#50736a' },
  { id: 'gold', name: '砚秋', role: '戏曲唱腔收藏者', color: '#9a753f' },
  { id: 'plum', name: '照影', role: '人物故事寻访者', color: '#765468' },
  { id: 'blue', name: '临川', role: '剧目脉络整理者', color: '#48677c' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { state } = usePassport();
  return (
    <div className="app-shell">
      <div className="grain" aria-hidden="true" />
      <header className="site-header">
        <Link className="brand" to="/" aria-label="一票入场首页">
          <span className="brand-seal">票</span>
          <span><strong>一票入场</strong><small>ONE TICKET · SHANGHAI STAGE</small></span>
        </Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="打开导航">{open ? <X /> : <Menu />}</button>
        <nav className={open ? 'nav-open' : ''} aria-label="主导航">
          {navItems.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
        </nav>
        <Link className="passport-pill" to="/passport"><Stamp size={17} /><span>{state.stamps.length}</span></Link>
      </header>
      <main>{children}</main>
      <footer>
        <div><span className="brand-seal small">票</span><strong>一票入场</strong></div>
        <p>从一张馆藏戏单出发，连接演出、人物、机构、剧院与上海城市文化。</p>
        <p className="footer-note">当前为前端 V0.1 演示，史实与关联均以开放数据及人工审核结果为准。</p>
      </footer>
    </div>
  );
}

function PageHeader({ eyebrow, title, intro, aside }: { eyebrow: string; title: string; intro: string; aside?: ReactNode }) {
  return <header className="page-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p></div>{aside}</header>;
}

function EvidenceBadge({ level }: { level: 'A' | 'B' }) {
  return <span className={`evidence-badge evidence-${level.toLowerCase()}`}><ShieldCheck size={14} />{level} 级证据</span>;
}

function TicketVisual({ ticket, compact = false }: { ticket: TicketSummary; compact?: boolean }) {
  return (
    <div className={`ticket-visual ${compact ? 'compact' : ''}`}>
      <div className="ticket-main">
        <span className="ticket-kicker">上海舞台文化 · 数字戏票</span>
        <strong>{ticket.title}</strong>
        <div className="ticket-meta"><span>{ticket.date}</span><span>{ticket.parentVenue}</span><span>{ticket.genres.join(' · ')}</span></div>
        <small>NID {ticket.nid} · 依据上海图书馆开放数据生成</small>
      </div>
      <div className="ticket-stub"><span>一票入场</span><b>{ticket.nid}</b></div>
    </div>
  );
}

function Avatar({ name, image, size = 'normal' }: { name: string; image?: string; size?: 'normal' | 'large' }) {
  const [failed, setFailed] = useState(false);
  return <div className={`avatar ${size === 'large' ? 'avatar-large' : ''}`}>{image && !failed ? <img src={image} alt={`${name}的开放数据照片`} onError={() => setFailed(true)} /> : <span>{name.slice(0, 1)}</span>}</div>;
}

function TicketCard({ ticket }: { ticket: TicketSummary }) {
  return (
    <article className="ticket-card">
      <div className="ticket-card-top"><span>{ticket.date}</span><span className={ticket.relationStatus}>{ticket.relationStatus === 'linked' ? `已点亮 ${ticket.relationCount} 条线索` : '暂无确认关联'}</span></div>
      <TicketVisual ticket={ticket} compact />
      <div className="ticket-card-copy"><div className="tag-row">{ticket.genres.map((genre) => <span key={genre}>{genre}</span>)}</div><p>{ticket.plays.slice(0, 3).join(' · ')}</p></div>
      <Link className="text-link" to={`/tickets/${ticket.nid}`}>查看戏单 <ArrowRight size={16} /></Link>
    </article>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-curtain left" /><div className="hero-curtain right" />
        <div className="hero-copy reveal"><span className="eyebrow light">上海图书馆开放数据 · 舞台文化互动体验</span><h1>一票入场</h1><p className="hero-line">请选择你的戏票，进入一场真实的上海演出。</p><p className="hero-sub">从 834 张馆藏戏单出发，沿着演员、剧院、机构与剧种，读懂一段段舞台文脉。</p>
          <div className="hero-actions"><Link className="button primary light-button" to="/persona">开始舞台漫游 <ArrowRight size={18} /></Link><Link className="button ghost light-ghost" to="/tickets">浏览全部戏单</Link></div>
        </div>
        <div className="stage-device reveal delay-2"><div className="spotlight" /><div className="stage-person"><span /><i /></div><div className="oversized-ticket"><span>ADMIT ONE</span><strong>一票入场</strong><small>SHANGHAI · 834</small></div></div>
        <div className="scroll-cue">向下探索 <ChevronRight size={15} /></div>
      </section>
      <section className="three-realms content-section">
        <div className="section-heading"><span className="eyebrow">一票三境</span><h2>从舞台，到后台，再走进城市</h2></div>
        <div className="realm-grid">
          <article><span>01</span><Ticket /><h3>舞台</h3><p>从戏单题名、时间、剧目与角色，读懂一场真实演出。</p></article>
          <article><span>02</span><UsersRound /><h3>后台</h3><p>循着已审核关系，认识参与演出的人物与机构。</p></article>
          <article><span>03</span><Landmark /><h3>城市</h3><p>把原始地点放回场馆与上海文化空间中观察。</p></article>
        </div>
      </section>
      <section className="data-ribbon"><div><strong>834</strong><span>张馆藏戏单</span></div><div><strong>561</strong><span>张具有确认关联</span></div><div><strong>1,537</strong><span>条已核验关系</span></div><div><strong>309</strong><span>位人物有开放照片</span></div></section>
      <section className="entry-split content-section">
        <div className="entry-card wander"><Compass /><span className="eyebrow">普通观众</span><h2>领一张票，慢慢走进去</h2><p>选一个漫游者形象，让偶遇和收藏成为你自己的舞台护照。</p><Link className="button primary" to="/persona">开始漫游</Link></div>
        <div className="entry-card research"><Search /><span className="eyebrow">研究与查询</span><h2>带着问题，直接查找</h2><p>按题名、演员、剧院、剧种、年代与关联状态定位戏单。</p><Link className="button ghost" to="/tickets">进入戏单长廊</Link></div>
      </section>
    </>
  );
}

function PersonaPage() {
  const { state, setPersona } = usePassport();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(state.personaId ?? personaOptions[0].id);
  return <section className="page content-section"><PageHeader eyebrow="P02 · 先成为漫游者" title="选一个舞台分身" intro="不做复杂捏脸，只用服装、发型和颜色表达你进入这个世界的方式。" />
    <div className="persona-grid">{personaOptions.map((persona) => <button key={persona.id} className={`persona-card ${selected === persona.id ? 'selected' : ''}`} onClick={() => setSelected(persona.id)}><div className="persona-figure" style={{ '--persona-color': persona.color } as CSSProperties}><span /><i /></div><strong>{persona.name}</strong><p>{persona.role}</p>{selected === persona.id && <b className="selected-mark"><Check size={15} /> 已选择</b>}</button>)}</div>
    <div className="sticky-actions"><button className="button ghost" onClick={() => navigate('/lobby')}>暂时跳过</button><button className="button primary" onClick={() => { setPersona(selected); navigate('/lobby'); }}>确认形象，领取戏票 <ArrowRight size={18} /></button></div>
  </section>;
}

function LobbyPage() {
  const [ticket, setTicket] = useState<TicketSummary | null>(null);
  const [query, setQuery] = useState<TicketQuery>({});
  useEffect(() => { repository.random().then(setTicket); }, []);
  const draw = () => repository.random(query).then(setTicket);
  return <section className="page content-section"><PageHeader eyebrow="P03 · 虚拟戏票大厅" title="今晚，领哪一张戏票？" intro="随机抽取，或按年代、剧种和场馆缩小范围。领到的不是数据库记录，而是一场演出的入口。" />
    <div className="lobby-layout"><aside className="filter-panel"><span className="eyebrow">领票方式</span><button className="filter-choice active" onClick={() => { setQuery({}); repository.random().then(setTicket); }}><Sparkles size={17} />随机抽取</button><select aria-label="按年代" onChange={(e) => setQuery((q) => ({ ...q, year: e.target.value }))}><option value="">按年代</option><option>2007</option><option>2008</option><option>2013</option><option>2015</option></select><select aria-label="按剧种" onChange={(e) => setQuery((q) => ({ ...q, genre: e.target.value }))}><option value="">按剧种</option><option>昆曲</option><option>京剧</option><option>越剧</option><option>粤剧</option></select><button className="button ghost full" onClick={draw}>按条件抽取</button><Link className="text-link centered" to="/tickets">查看全部 834 张</Link></aside>
      <div className="lobby-stage">{ticket ? <><TicketVisual ticket={ticket} /><div className="lobby-actions"><button className="button ghost" onClick={draw}>换一张</button><Link className="button primary" to={`/tickets/${ticket.nid}`}>持票入场 <ArrowRight size={18} /></Link></div></> : <div className="empty-state"><CircleHelp /><h3>没有找到符合条件的戏票</h3><p>调整年代或剧种后再试一次。</p></div>}</div></div>
  </section>;
}

function TicketsPage() {
  const [query, setQuery] = useState<TicketQuery>({ relationStatus: 'all' });
  const [tickets, setTickets] = useState<TicketSummary[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => { repository.list(query).then(setTickets); }, [query]);
  const set = (key: keyof TicketQuery, value: string) => setQuery((current) => ({ ...current, [key]: value }));
  return <section className="page content-section"><PageHeader eyebrow="P04 · 全量检索入口" title="戏票长廊" intro="当前以前端样例数据演示检索和筛选；后端接入后将在同一界面呈现全部 834 张馆藏戏单。" aside={<div className="result-count"><strong>{tickets.length}</strong><span>条样例结果</span></div>} />
    <div className="search-bar"><Search size={20} /><input aria-label="搜索戏单" placeholder="搜索戏单、剧目、演员、剧院、剧种或机构" value={query.keyword ?? ''} onChange={(e) => set('keyword', e.target.value)} /><button onClick={() => setFiltersOpen(!filtersOpen)}><Filter size={18} />筛选</button></div>
    <div className="catalog-layout"><aside className={`filter-panel catalog-filters ${filtersOpen ? 'show' : ''}`}><div className="filter-title"><strong>筛选</strong><button onClick={() => setFiltersOpen(false)}><X /></button></div><label>年代<select value={query.year ?? ''} onChange={(e) => set('year', e.target.value)}><option value="">全部年代</option>{['2007', '2008', '2013', '2015', '未标注'].map((x) => <option key={x}>{x}</option>)}</select></label><label>剧种<select value={query.genre ?? ''} onChange={(e) => set('genre', e.target.value)}><option value="">全部剧种</option>{['昆曲', '京剧', '越剧', '粤剧', '话剧', '舞剧'].map((x) => <option key={x}>{x}</option>)}</select></label><label>母场馆<select value={query.venue ?? ''} onChange={(e) => set('venue', e.target.value)}><option value="">全部场馆</option>{['兰心大戏院', '美琪大戏院', '人民大舞台', '上海音乐厅', '天蟾逸夫舞台'].map((x) => <option key={x}>{x}</option>)}</select></label><label>关联状态<select value={query.relationStatus ?? 'all'} onChange={(e) => setQuery((q) => ({ ...q, relationStatus: e.target.value as RelationStatus | 'all' }))}><option value="all">全部</option><option value="linked">有确认关联</option><option value="unlinked">暂无确认关联</option></select></label><button className="text-button" onClick={() => setQuery({ relationStatus: 'all' })}>清除筛选</button></aside>
      <div className="catalog-results">{tickets.length ? <div className="ticket-grid">{tickets.map((ticket) => <TicketCard key={ticket.nid} ticket={ticket} />)}</div> : <div className="empty-state"><Search /><h3>没有找到戏单</h3><p>试试清除筛选，或换一个关键词。</p></div>}</div></div>
  </section>;
}

function AssociationCard({ item }: { item: Association }) {
  const { meetPerson, visitVenue } = usePassport();
  const route = item.type === 'person' ? `/people/${item.id}` : item.type === 'theater' ? '/shanghai' : undefined;
  const content = <><Avatar name={item.name} image={item.image} /><div><small>{item.type === 'person' ? '人物' : item.type === 'theater' ? '场馆' : '机构'}</small><strong>{item.name}</strong><EvidenceBadge level={item.evidence} /></div><ChevronRight /></>;
  if (!route) return <article className="association-card">{content}</article>;
  return <Link className="association-card" to={route} onClick={() => item.type === 'person' ? meetPerson(item.id) : visitVenue(item.id)}>{content}</Link>;
}

function TicketDetailPage() {
  const { nid = '' } = useParams();
  const [ticket, setTicket] = useState<TicketDetail | null | undefined>();
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const { state, toggleTicket, viewTicket } = usePassport();
  useEffect(() => { repository.getById(nid).then((data) => { setTicket(data); if (data) viewTicket(data.nid); }); }, [nid]);
  if (ticket === undefined) return <section className="page content-section"><div className="loading-skeleton" /></section>;
  if (!ticket) return <NotFound />;
  const persons = ticket.associations.filter((item) => item.type === 'person');
  const venues = ticket.associations.filter((item) => item.type === 'theater');
  const saved = state.savedTickets.includes(ticket.nid);
  return <section className="page content-section ticket-detail-page"><div className="detail-hero"><TicketVisual ticket={ticket} /><div className="detail-intro"><span className={`status-chip ${ticket.relationStatus}`}>{ticket.relationStatus === 'linked' ? `已点亮 ${ticket.relationCount} 条文化线索` : '当前暂未检出可确认关联'}</span><h1>{ticket.title}</h1><p>{ticket.description}</p><dl><div><dt>时间</dt><dd>{ticket.date}</dd></div><div><dt>原始地点</dt><dd>{ticket.venue}</dd></div><div><dt>母场馆</dt><dd>{ticket.parentVenue}</dd></div><div><dt>剧种</dt><dd>{ticket.genres.join('、')}</dd></div></dl><button className={`button ${saved ? 'ghost' : 'primary'}`} onClick={() => toggleTicket(ticket.nid)}><Heart size={18} fill={saved ? 'currentColor' : 'none'} />{saved ? '已加入舞台护照' : '加入舞台护照'}</button></div></div>
    <div className="detail-grid"><section className="detail-section works"><span className="eyebrow">这一晚演了什么</span><h2>剧目与演出人物</h2>{ticket.works.map((work, index) => <article key={`${work.title}-${index}`}><div className="work-index">{String(index + 1).padStart(2, '0')}</div><div><h3>{work.title}</h3><div className="performer-list">{work.performers.map((p) => <span key={`${p.name}-${p.role}`}><b>{p.name}</b> · {p.role}</span>)}</div>{work.synopsis && <p>{work.synopsis}</p>}</div></article>)}</section>
      {ticket.relationStatus === 'linked' ? <><section className="detail-section"><span className="eyebrow">走进人物后台</span><h2>已确认人物</h2><div className="association-grid">{persons.map((item) => <AssociationCard key={item.id} item={item} />)}</div></section>{venues.length > 0 && <section className="detail-section venue-callout"><Landmark /><div><span className="eyebrow">散场后</span><h2>去这座剧院看看</h2><p>{ticket.venue} 已匹配到经过人工审核的场馆实体。</p></div><AssociationCard item={venues[0]} /></section>}<section className="detail-section evidence"><div><span className="eyebrow">文化关系与证据</span><h2>这些线索如何被点亮？</h2><p>仅展示通过人工审核的关联。点击查看关系类型、证据等级、数据来源和开放数据 URI。</p></div><button className="button ghost" onClick={() => setEvidenceOpen(true)}>查看证据 <ShieldCheck size={18} /></button></section></> : <section className="detail-section unlinked-panel"><CircleHelp /><span className="eyebrow">当前未检出可确认关联</span><h2>戏单仍然值得被完整阅读</h2><p>这并不代表它没有研究价值，只表示当前开放数据和审核结果尚不能建立可靠的外部关联。</p><div className="recommend-row"><Link to={`/tickets?year=${ticket.year}`}>同年代戏单</Link><Link to={`/tickets?genre=${ticket.genres[0]}`}>同剧种戏单</Link><Link to="/lobby">随机领取下一张</Link></div><small>以上为基于戏单字段的推荐，不是已经核验的文化关联。</small></section>}
    </div>
    {evidenceOpen && <div className="drawer-backdrop" onClick={() => setEvidenceOpen(false)}><aside className="evidence-drawer" onClick={(e) => e.stopPropagation()}><button className="drawer-close" onClick={() => setEvidenceOpen(false)}><X /></button><span className="eyebrow">证据抽屉</span><h2>已审核文化关系</h2><p>共展示 {ticket.associations.length} 条前端样例关联；后端接入后将呈现该戏单全部关系。</p>{ticket.associations.map((item) => <article key={`${item.id}-${item.type}`}><div><strong>{item.name}</strong><EvidenceBadge level={item.evidence} /></div><dl><div><dt>关系类型</dt><dd>{item.relation}</dd></div><div><dt>数据来源</dt><dd>{ticket.sourceLabel}</dd></div></dl><a href={item.uri} target="_blank" rel="noreferrer">查看开放数据 URI <ExternalLink size={14} /></a></article>)}</aside></div>}
  </section>;
}

function PeoplePage() {
  const [keyword, setKeyword] = useState('');
  const [people, setPeople] = useState<PersonSummary[]>([]);
  useEffect(() => { repository.listPeople(keyword).then(setPeople); }, [keyword]);
  return <section className="page content-section backstage"><PageHeader eyebrow="P06 · 人物后台" title="灯亮之前，他们在这里" intro="从已确认人物继续探索戏单、剧目、机构和场馆。无开放照片时统一使用剪影。" />
    <div className="search-bar"><Search /><input aria-label="搜索人物" placeholder="搜索人物姓名" value={keyword} onChange={(e) => setKeyword(e.target.value)} /></div><div className="people-grid">{people.map((person) => <Link key={person.id} className="person-card" to={`/people/${person.id}`}><Avatar name={person.name} image={person.image} size="large" /><EvidenceBadge level={person.evidence} /><h3>{person.name}</h3><p>{person.identity}</p><span>关联样例戏单 {person.relatedTicketIds.length} 张</span><b>进入人物详情 <ArrowRight size={16} /></b></Link>)}</div>
  </section>;
}

function PersonDetailPage() {
  const { id = '' } = useParams();
  const [person, setPerson] = useState<PersonDetail | null | undefined>();
  const { meetPerson } = usePassport();
  useEffect(() => { repository.getPersonById(id).then((data) => { setPerson(data); if (data) meetPerson(data.id); }); }, [id]);
  if (person === undefined) return <section className="page content-section"><div className="loading-skeleton" /></section>;
  if (!person) return <NotFound />;
  return <section className="page content-section"><div className="person-hero"><Avatar name={person.name} image={person.image} size="large" /><div><span className="eyebrow">P07 · 人物详情</span><h1>{person.name}</h1><p>{person.identity}</p><EvidenceBadge level={person.evidence} /><a href={person.uri} target="_blank" rel="noreferrer">开放数据来源 <ExternalLink size={14} /></a></div></div>
    <div className="person-detail-grid"><section><span className="eyebrow">人物说明</span><h2>开放数据中的人物</h2><p>{person.biography ?? '当前前端样例尚未接入完整人物小传；后端接入后将按开放数据真实覆盖情况展示简介、生卒、职业、经历和相关机构。'}</p><div className="missing-note"><CircleHelp /><span>未提供的字段不会由 AI 自动补写为确定事实。</span></div></section><section><span className="eyebrow">人物戏单时间线</span><h2>出现在哪些馆藏戏单中</h2><div className="timeline">{person.relatedTickets.map((ticket) => <Link key={ticket.nid} to={`/tickets/${ticket.nid}`}><time>{ticket.date}</time><span /><div><strong>{ticket.title}</strong><small>{ticket.parentVenue} · {ticket.genres.join('、')}</small></div></Link>)}</div></section></div>
  </section>;
}

function ShanghaiPage() {
  const [venues, setVenues] = useState<VenueSummary[]>([]);
  const [selected, setSelected] = useState<VenueSummary | null>(null);
  const { visitVenue } = usePassport();
  useEffect(() => { repository.listVenues().then((data) => { setVenues(data); setSelected(data[0] ?? null); }); }, []);
  return <section className="page content-section"><PageHeader eyebrow="P08 · 试点页面" title="虚拟上海" intro="先以 4 座资料较完整的已核验影剧院组织舞台文化空间。地图坐标尚未接入，因此当前采用概念节点图，不冒用真实坐标。" />
    <div className="shanghai-layout"><div className="culture-map"><div className="river-line" />{venues.map((venue) => <button key={venue.id} className={selected?.id === venue.id ? 'active' : ''} style={{ left: `${venue.position.x}%`, top: `${venue.position.y}%` }} onClick={() => { setSelected(venue); visitVenue(venue.id); }}><span /><b>{venue.name}</b></button>)}<div className="map-person"><span /><i /></div></div>{selected && <aside className="venue-info"><span className="eyebrow">场馆信息卡</span><h2>{selected.name}</h2><p>已匹配上海图书馆开放数据中的影剧院实体。</p><dl><div><dt>相关戏票</dt><dd>{selected.relatedTicketCount} 张</dd></div><div><dt>历史图片</dt><dd>{selected.imageCount} 张</dd></div></dl>{selected.sourceUri && <a href={selected.sourceUri} target="_blank" rel="noreferrer">查看数据来源 <ExternalLink size={14} /></a>}<Link className="button primary full" to="/tickets">从场馆重新领票</Link></aside>}</div>
  </section>;
}

function PassportPage() {
  const { state } = usePassport();
  const persona = personaOptions.find((item) => item.id === state.personaId);
  const stampNames = ['戏票印章', '人物印章', '剧院印章', '剧种印章', '年代印章', '漫游者印章'];
  return <section className="page content-section"><PageHeader eyebrow="P10 · 浏览器本地记录" title="我的舞台护照" intro="你的形象、浏览轨迹与收集印章保存在当前浏览器中；V0.1 不要求注册登录。" />
    <div className="passport-book"><aside><div className="persona-mini" style={{ '--persona-color': persona?.color ?? '#2c2925' } as CSSProperties}><span /><i /></div><h2>{persona?.name ?? '尚未选择形象'}</h2><p>{persona?.role ?? '从选择一个漫游者形象开始。'}</p><dl><div><dt>看过</dt><dd>{state.viewedTickets.length} 张戏单</dd></div><div><dt>认识</dt><dd>{state.metPeople.length} 位人物</dd></div><div><dt>到访</dt><dd>{state.visitedVenues.length} 座场馆</dd></div></dl><Link className="button ghost full" to="/persona">{persona ? '更换形象' : '选择形象'}</Link></aside><section><span className="eyebrow">已获得印章</span><div className="stamp-grid">{stampNames.map((stampName) => <div key={stampName} className={state.stamps.includes(stampName) ? 'unlocked' : ''}><Stamp /><strong>{stampName}</strong><small>{state.stamps.includes(stampName) ? '已点亮' : '待解锁'}</small></div>)}</div><div className="passport-actions"><Link className="button ghost" to="/lobby">继续漫游</Link><button className="button primary" disabled>生成漫游纪念册 · 预留</button></div></section></div>
  </section>;
}

function AboutPage() {
  const process = ['戏单数据获取', '数据清洗', 'AI 候选关联', '人工审核', 'A/B 证据分级', '机器可读数据', '网站呈现'];
  return <section className="page content-section"><PageHeader eyebrow="P12 · 项目说明" title="为什么从一张戏单出发？" intro="一张戏单连接演出、人物、机构、剧院和上海城市文化；网站同时说明这些连接从哪里来、为什么可信。" />
    <div className="about-lead"><BookOpen /><div><h2>戏单不是终点，而是一扇入口</h2><p>《一票入场》以真实馆藏戏单为入口，不把开放数据做成静态字段表，而是将可核验信息组织成可漫游、可查询、可回溯的文化体验。</p></div></div>
    <section className="process-section"><span className="eyebrow">数据如何变成网站内容</span><div className="process-flow">{process.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < process.length - 1 && <ArrowRight />}</div>)}</div></section>
    <div className="principle-grid"><article><ShieldCheck /><h3>A/B 证据与来源</h3><p>A 级为直接 URI 关联，B 级为经人工审核的推断关联。页面保留来源和开放数据 URI。</p></article><article><Sparkles /><h3>AI 使用边界</h3><p>AI 用于辅助候选、内容组织和总结，不替代证据，不补写不存在的事实、照片或历史场景。</p></article><article><Database /><h3>完整保留 834 张</h3><p>561 张有确认关联，273 张暂无确认关联。两类数据都保留，后者不会被隐藏或弱化为无效数据。</p></article></div>
  </section>;
}

function NotFound() {
  return <section className="not-found content-section"><span>404</span><h1>这一场暂未开演</h1><p>你访问的页面不存在，返回戏票大厅重新领取一张吧。</p><Link className="button primary" to="/lobby">返回戏票大厅</Link></section>;
}

export default function App() {
  return <AppShell><ScrollToTop /><Routes><Route path="/" element={<HomePage />} /><Route path="/persona" element={<PersonaPage />} /><Route path="/lobby" element={<LobbyPage />} /><Route path="/tickets" element={<TicketsPage />} /><Route path="/tickets/:nid" element={<TicketDetailPage />} /><Route path="/people" element={<PeoplePage />} /><Route path="/people/:id" element={<PersonDetailPage />} /><Route path="/shanghai" element={<ShanghaiPage />} /><Route path="/passport" element={<PassportPage />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<NotFound />} /></Routes></AppShell>;
}
