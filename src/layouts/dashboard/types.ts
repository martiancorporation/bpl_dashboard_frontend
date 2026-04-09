// src/components/dashboard/types.ts

export interface Totals {
  totalEnquiries: number;
  last24HoursEnquiries: number;
  last7DaysEnquiries: number;
}

export interface LeaderStat {
  leader: string;
  count: number;
}

export interface GenderStat {
  gender: "male" | "female" | "other";
  count: number;
}

export interface AgeGroupStat {
  age_group: "18-25" | "26-35" | "36-50" | "50+";
  count: number;
}

export interface CasteStats {
  muslim?: number;
  yadav?: number;
  obc?: number;
  dalit?: number;
  others?: number;
}

export interface IssueStat {
  issue: string;
  count: number;
}

export interface MoodStat {
  mood: string;
  count: number;
}

export interface AnalyticsData {
  totals: Totals;
  leaders: LeaderStat[];
  gender: GenderStat[];
  age_groups: AgeGroupStat[];
  caste: CasteStats;
  issues: IssueStat[];
  mood: MoodStat[];
}

export interface CommonProps {
  loading?: boolean;
  analytics?: AnalyticsData | null;
}
