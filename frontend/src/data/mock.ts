import type { Association, PersonDetail, TicketDetail, VenueSummary } from '../types';

const relation = (id: string, name: string, type: Association['type'], evidence: Association['evidence'], uri: string, image?: string): Association => ({
  id,
  name: name.replace(/@(chs|en|cht)$/i, ''),
  type,
  evidence,
  uri,
  image,
  relation: evidence === 'A' ? '戏单详情直接关联' : type === 'theater' ? '场馆名称经人工审核匹配' : '名称线索经人工审核匹配',
});

const cases: TicketDetail[] = [
  {
    nid: '1954', title: '长生殿：中国昆剧全本', date: '2007-05-29', year: '2007', venue: '兰心大戏院', parentVenue: '兰心大戏院',
    genres: ['昆曲'], plays: ['长生殿'], relationStatus: 'linked', relationCount: 11, featured: true,
    description: '该演出记录包含《长生殿》剧目、参演人物与演出机构等开放数据字段。', sourceLabel: '上海图书馆戏单开放数据', sourceUri: 'http://data.library.sh.cn/',
    works: [{ title: '长生殿', performers: [{ name: '蔡正仁', role: '参演人员' }, { name: '张静娴', role: '参演人员' }] }],
    associations: [
      relation('wtzsszzxqfbs667n', '唐斯复', 'person', 'A', 'http://data.library.sh.cn/entity/person/wtzsszzxqfbs667n', 'https://img.library.sh.cn/person/wtzsszzxqfbs667n.jpg'),
      relation('z8o31q4dp6j75igt', '杨宪益', 'person', 'A', 'http://data.library.sh.cn/entity/person/z8o31q4dp6j75igt', 'https://img.library.sh.cn/person/z8o31q4dp6j75igt.jpg'),
      relation('gbd4c1386oi5f489', '沈斌', 'person', 'A', 'http://data.library.sh.cn/entity/person/gbd4c1386oi5f489', 'https://img.library.sh.cn/person/gbd4c1386oi5f489.jpg'),
      relation('yiz55l68yjd6mmke', '蔡正仁', 'person', 'A', 'http://data.library.sh.cn/entity/person/yiz55l68yjd6mmke', 'https://img.library.sh.cn/person/yiz55l68yjd6mmke.jpg'),
      relation('2b72lpi2kpgx8byu', '上海昆剧团', 'organization', 'B', 'http://data.library.sh.cn/entity/organization/2b72lpi2kpgx8byu'),
    ],
  },
  {
    nid: '2687', title: '美琪大戏院·四月琪遇季', date: '时间未标注', year: '未标注', venue: '美琪大戏院', parentVenue: '美琪大戏院',
    genres: ['话剧', '越剧', '舞剧'], plays: ['商鞅', '杜甫', '南海十三郎', '双飞翼', '朱鹮'], relationStatus: 'linked', relationCount: 8, featured: true,
    description: '开放数据记录了多个剧目、参演人物及美琪大戏院场馆线索。', sourceLabel: '上海图书馆戏单开放数据',
    works: [{ title: '商鞅', performers: [{ name: '卢昂', role: '参演人员' }] }, { title: '双飞翼', performers: [{ name: '钱惠丽', role: '参演人员' }] }],
    associations: [
      relation('a1scg26iibtoso3p', '唐栋', 'person', 'A', 'http://data.library.sh.cn/entity/person/a1scg26iibtoso3p', 'https://img.library.sh.cn/person/a1scg26iibtoso3p.jpg'),
      relation('ht5nuz1kesq4p69w', '张家声', 'person', 'A', 'http://data.library.sh.cn/entity/person/ht5nuz1kesq4p69w', 'https://img.library.sh.cn/person/ht5nuz1kesq4p69w.jpg'),
      relation('y9xif8a8mx8llwgy', '陈坪', 'person', 'A', 'http://data.library.sh.cn/entity/person/y9xif8a8mx8llwgy', 'https://img.library.sh.cn/person/y9xif8a8mx8llwgy.jpg'),
      relation('faxjacqku1ktugml', '美琪大戏院', 'theater', 'B', 'http://data.library.sh.cn/entity/theater/faxjacqku1ktugml'),
    ],
  },
  {
    nid: '1777', title: '梦·红船', date: '2015-11-24', year: '2015', venue: '上海市人民大舞台', parentVenue: '人民大舞台',
    genres: ['粤剧'], plays: ['梦·红船'], relationStatus: 'linked', relationCount: 2, featured: true,
    description: '该戏单记录了粤剧《梦·红船》及两位直接关联人物。', sourceLabel: '上海图书馆戏单开放数据',
    works: [{ title: '梦·红船', performers: [{ name: '尹洪波', role: '参演人员' }, { name: '梁郁南', role: '参演人员' }] }],
    associations: [
      relation('71y7mg9ptbxbm2as', '尹洪波', 'person', 'A', 'http://data.library.sh.cn/entity/person/71y7mg9ptbxbm2as', 'https://img.library.sh.cn/person/71y7mg9ptbxbm2as.jpg'),
      relation('0705hqyz7de8dwhq', '梁郁南', 'person', 'A', 'http://data.library.sh.cn/entity/person/0705hqyz7de8dwhq', 'https://img.library.sh.cn/person/0705hqyz7de8dwhq.jpg'),
    ],
  },
  {
    nid: '2739', title: '“迎新春”周燕萍现代交响京剧、独唱音乐会', date: '2008-01-02', year: '2008', venue: '上海音乐厅', parentVenue: '上海音乐厅',
    genres: ['京剧', '其他'], plays: ['杜鹃山', '沙家浜', '赤桑镇', '智取威虎山', '红灯记'], relationStatus: 'linked', relationCount: 2, featured: true,
    description: '戏单包含现代交响京剧与独唱音乐会相关的剧目和场馆线索。', sourceLabel: '上海图书馆戏单开放数据',
    works: [{ title: '杜鹃山', performers: [{ name: '童薇薇', role: '参演人员' }] }],
    associations: [
      relation('c65k6mb402cjguod', '童薇薇', 'person', 'A', 'http://data.library.sh.cn/entity/person/c65k6mb402cjguod', 'https://img.library.sh.cn/person/c65k6mb402cjguod.jpg'),
      relation('86ac5nfcwmcff6pj', '上海音乐厅', 'theater', 'B', 'http://data.library.sh.cn/entity/theater/86ac5nfcwmcff6pj'),
    ],
  },
  {
    nid: '1923', title: '王柔桑；越剧专场', date: '2008-03-05', year: '2008', venue: '天蟾逸夫舞台', parentVenue: '天蟾逸夫舞台',
    genres: ['越剧'], plays: ['梁祝', '拜月亭', '宝玉夜祭', '罗衫案', '孔雀东南飞'], relationStatus: 'linked', relationCount: 9, featured: true,
    description: '该戏单汇集越剧专场剧目、演出人物及上海越剧院机构线索。', sourceLabel: '上海图书馆戏单开放数据',
    works: [{ title: '梁祝', performers: [{ name: '童薇薇', role: '参演人员' }] }],
    associations: [
      relation('l1n5izao1838clpb', '刘如曾', 'person', 'A', 'http://data.library.sh.cn/entity/person/l1n5izao1838clpb', 'https://img.library.sh.cn/person/l1n5izao1838clpb.jpg'),
      relation('c65k6mb402cjguod', '童薇薇', 'person', 'A', 'http://data.library.sh.cn/entity/person/c65k6mb402cjguod', 'https://img.library.sh.cn/person/c65k6mb402cjguod.jpg'),
      relation('gm1duf15ccxhxvoy', '上海越剧院', 'organization', 'B', 'http://data.library.sh.cn/entity/organization/gm1duf15ccxhxvoy'),
      relation('7h231aq7rjfvslbj', '徐进', 'person', 'B', 'http://data.library.sh.cn/entity/person/7h231aq7rjfvslbj', 'https://img.library.sh.cn/person/7h231aq7rjfvslbj.jpg'),
      relation('1jl1r6tvnatfwput', '范瑞娟', 'person', 'B', 'http://data.library.sh.cn/entity/person/1jl1r6tvnatfwput', 'https://img.library.sh.cn/person/1jl1r6tvnatfwput.jpg'),
      relation('2s9eu9vdbj3c9t7d', '袁雪芬', 'person', 'B', 'http://data.library.sh.cn/entity/person/2s9eu9vdbj3c9t7d', 'https://img.library.sh.cn/person/2s9eu9vdbj3c9t7d.jpg'),
    ],
  },
];

const unlinked: TicketDetail = {
  nid: '1726', title: '天津京剧院赴沪演出传统经典名剧', date: '2013-11-05', year: '2013', venue: '上海天蟾逸夫舞台', parentVenue: '天蟾逸夫舞台',
  genres: ['京剧'], plays: ['雅观楼', '六月雪·坐监', '铁笼山'], relationStatus: 'unlinked', relationCount: 0,
  description: '2013天蟾九十年九十戏，全国戏曲优秀剧目演出月相关演出记录。', sourceLabel: '上海图书馆戏单开放数据',
  works: [
    { title: '雅观楼', performers: [{ name: '黄齐峰', role: '李存孝' }, { name: '白相龙', role: '孟觉海' }] },
    { title: '六月雪·坐监', performers: [{ name: '吕洋', role: '窦娥' }, { name: '韩庆', role: '禁婆' }] },
  ],
  associations: [],
};

export const mockTickets = [...cases, unlinked];

const personMap = new Map<string, PersonDetail>();
for (const ticket of cases) {
  for (const item of ticket.associations.filter((entry) => entry.type === 'person')) {
    const current = personMap.get(item.id);
    if (current) {
      if (!current.relatedTicketIds.includes(ticket.nid)) current.relatedTicketIds.push(ticket.nid);
      if (!current.relatedTickets.some((entry) => entry.nid === ticket.nid)) current.relatedTickets.push(ticket);
      continue;
    }
    personMap.set(item.id, {
      id: item.id, name: item.name, identity: '开放数据关联人物', image: item.image, evidence: item.evidence, uri: item.uri,
      relatedTicketIds: [ticket.nid], relatedTickets: [ticket], organizations: [], biography: undefined,
    });
  }
}

export const mockPeople = Array.from(personMap.values());
export const mockVenues: VenueSummary[] = [
  { id: 'g2n5f6cpkqkaxygj', name: '兰心大戏院', relatedTicketCount: 26, imageCount: 26, position: { x: 22, y: 62 }, sourceUri: 'http://data.library.sh.cn/entity/theater/g2n5f6cpkqkaxygj' },
  { id: 'faxjacqku1ktugml', name: '美琪大戏院', relatedTicketCount: 16, imageCount: 16, position: { x: 44, y: 30 }, sourceUri: 'http://data.library.sh.cn/entity/theater/faxjacqku1ktugml' },
  { id: '2ti54blfkeh3tik1', name: '人民大舞台', relatedTicketCount: 10, imageCount: 10, position: { x: 68, y: 67 }, sourceUri: 'http://data.library.sh.cn/entity/theater/2ti54blfkeh3tik1' },
  { id: '86ac5nfcwmcff6pj', name: '上海音乐厅', relatedTicketCount: 16, imageCount: 16, position: { x: 82, y: 34 }, sourceUri: 'http://data.library.sh.cn/entity/theater/86ac5nfcwmcff6pj' },
];
