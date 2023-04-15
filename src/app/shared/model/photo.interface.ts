export interface Photo {
  id:          number;
  title:       string;
  description: string;
  likes:       number;
  photo:       string;
  userID:      number;
  createdAt:   Date;
  updatedAt:   Date;
}
