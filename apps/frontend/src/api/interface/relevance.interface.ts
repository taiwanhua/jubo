export interface AssignRelevanceBody {
  type: string;
  firstIds?: string[];
  secondIds?: string[];
  thirdIds?: string[];
}

export interface ReassignRelevanceBody {
  assign: ReassignRelevanceBodyAssign;
  reassign: ReassignRelevanceBodyReassign;
}

export interface ReassignRelevanceBodyAssign {
  type: string;
  firstIds?: string[];
  secondIds?: string[];
  thirdIds?: string[];
}

export interface ReassignRelevanceBodyReassign {
  type: string;
  firstIds?: string[];
  secondIds?: string[];
  thirdIds?: string[];
}

export interface Relevance {
  id: string;
  type: string;
  firstId: string;
  secondId: string;
  thirdId: string;
  created_user: string;
  created_date: Date;
  updated_user: string;
  updated_ate: Date;
}

export interface UnassignRelevanceBody {
  type: string;
  firstIds?: string[];
  secondIds?: string[];
  thirdIds?: string[];
}

export interface ReassignRelevanceResponse {
  assign: Relevance[];
  unassign: number;
}
