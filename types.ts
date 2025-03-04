import type { mistake_period, user, user_mistake } from "@prisma/client";

interface Mistake {
  user_id: number;
  items: { id: number; name: string }[];
}

export interface Home_Props {
  mistake_period: mistake_period;
  users: user[];
  mistakes: Mistake[];
}

interface MistakePeriod extends mistake_period {
  mistakes: user_mistake[];
}

interface UserMistakes {
  user_id: number;
  user_name: string;
  mistakes: { id: number; name: string }[];
}

export interface Mistake_By_Id_Props {
  mistake_period: MistakePeriod;
  user_mistakes: UserMistakes[];
  users: user[];
}

export interface UserRanking {
  user_id: number;
  user_name: string;
  mistakes: { id: number; name: string; date: Date }[];
}

export interface Ranking_Props {
  users: UserRanking[];
}
