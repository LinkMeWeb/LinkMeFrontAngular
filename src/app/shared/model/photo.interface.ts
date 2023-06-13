export interface Photo {
  id:          number;
  title:       string;
  description: string;
  likes:       number;
  photo:       string;
  user_id:     number;
  created_at:   Date;
  updated_at:   Date;
}
