import type { PersonDetail, PersonSummary, TicketDetail, TicketQuery, TicketSummary, VenueSummary } from '../types';
import { mockPeople, mockTickets, mockVenues } from './mock';

export interface TicketRepository {
  list(query?: TicketQuery): Promise<TicketSummary[]>;
  getById(nid: string): Promise<TicketDetail | null>;
  random(query?: TicketQuery): Promise<TicketSummary | null>;
}

export interface CultureRepository {
  listPeople(keyword?: string): Promise<PersonSummary[]>;
  getPersonById(id: string): Promise<PersonDetail | null>;
  listVenues(): Promise<VenueSummary[]>;
}

class MockRepository implements TicketRepository, CultureRepository {
  async list(query: TicketQuery = {}) {
    const keyword = query.keyword?.trim().toLowerCase();
    return mockTickets.filter((ticket) => {
      const searchable = [ticket.title, ticket.venue, ticket.parentVenue, ...ticket.genres, ...ticket.plays, ...ticket.associations.map((item) => item.name)].join(' ').toLowerCase();
      return (!keyword || searchable.includes(keyword)) &&
        (!query.year || ticket.year === query.year) &&
        (!query.genre || ticket.genres.includes(query.genre)) &&
        (!query.venue || ticket.parentVenue === query.venue) &&
        (!query.relationStatus || query.relationStatus === 'all' || ticket.relationStatus === query.relationStatus);
    });
  }

  async getById(nid: string) { return mockTickets.find((ticket) => ticket.nid === nid) ?? null; }
  async random(query: TicketQuery = {}) {
    const pool = await this.list(query);
    return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }
  async listPeople(keyword = '') {
    const needle = keyword.trim().toLowerCase();
    return mockPeople.filter((person) => !needle || person.name.toLowerCase().includes(needle));
  }
  async getPersonById(id: string) { return mockPeople.find((person) => person.id === id) ?? null; }
  async listVenues() { return mockVenues; }
}

// 后端接入时新增 ApiRepository 并在此处替换实例，页面组件无需改写。
export const repository = new MockRepository();
