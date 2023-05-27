export interface UserUpdate {
    id?:        number;
    name?:      string;
    email?:     string;
    nickname?:  string;
    password?:  string;
    photo_path?:  File;
    about?:     string;
    photos?:    any[];
    createdAt?: Date;
    updatedAt?: Date;
}
