
export interface Hashtag {
  hashtag: string;
  reason: string;
}

export interface GrowthIdea {
  title: string;
  description: string;
}

export interface SuggestionResponse {
  hashtags: Hashtag[];
  growthIdeas: GrowthIdea[];
}
