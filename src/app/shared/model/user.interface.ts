export interface User {
  id:        number;
  name:      string;
  email:     string;
  nickname:  string;
  password:  string;
  photoPath: string;
  about:     string;
  photos:    any[];
  createdAt: Date;
  updatedAt: Date;
}
