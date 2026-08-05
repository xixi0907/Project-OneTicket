export type EvidenceLevel = 'A' | 'B';
export type EntityType = 'person' | 'organization' | 'theater' | 'event';
export type RelationStatus = 'linked' | 'unlinked';

export interface Association {
  id: string;
  name: string;
  type: EntityType;
  relation: string;
  evidence: EvidenceLevel;
  uri: string;
  image?: string;
}

export interface WorkItem {
  title: string;
  performers: Array<{ name: string; role: string }>;
  synopsis?: string;
}

export interface TicketSummary {
  nid: string;
  title: string;
  date: string;
  year: string;
  venue: string;
  parentVenue: string;
  genres: string[];
  plays: string[];
  relationStatus: RelationStatus;
  relationCount: number;
  featured?: boolean;
}

export interface TicketDetail extends TicketSummary {
  description: string;
  sourceLabel: string;
  sourceUri?: string;
  works: WorkItem[];
  associations: Association[];
}

export interface TicketQuery {
  keyword?: string;
  year?: string;
  genre?: string;
  venue?: string;
  relationStatus?: RelationStatus | 'all';
}

export interface PersonSummary {
  id: string;
  name: string;
  identity: string;
  image?: string;
  relatedTicketIds: string[];
  evidence: EvidenceLevel;
  uri: string;
}

export interface PersonDetail extends PersonSummary {
  biography?: string;
  organizations: string[];
  relatedTickets: TicketSummary[];
}

export interface VenueSummary {
  id: string;
  name: string;
  alias?: string;
  district?: string;
  relatedTicketCount: number;
  imageCount: number;
  sourceUri?: string;
  position: { x: number; y: number };
}

export interface PassportState {
  personaId: string | null;
  savedTickets: string[];
  viewedTickets: string[];
  metPeople: string[];
  visitedVenues: string[];
  stamps: string[];
}
