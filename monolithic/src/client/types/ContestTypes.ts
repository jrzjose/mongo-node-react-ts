export interface Contest {
  id: string;
  categoryName: string;
  contestName: string;
}

export interface ContestsResponse {
  contests: Contest[];
}
