export interface User {
  id?:        number;
  name?:      string;
  email?:     string;
  nickname?:  string;
  password?:  string;
  photo_path?: string;
  about?:     string;
  photos?:    any[];
  created_at?: Date;
  apdated_at?: Date;
}
