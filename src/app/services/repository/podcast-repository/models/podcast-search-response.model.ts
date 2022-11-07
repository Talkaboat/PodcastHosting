
export interface PodcastSearchResponse {
  id: number;
  title: string;
  author?: string;
  image: string;
  episodes: number;
  description: string;
  isLoading?: boolean;
}

/*
        public int Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public int Episodes { get; set; }
        public string Description { get; set; }
*/
