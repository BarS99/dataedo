export interface User {
  gender: string;
  name: UserName;
  location: Location;
  email: string;
  login: UserLogin;
  dob: UserAge;
  registered: UserAge;
  phone: string;
  cell: string;
  id: UserID;
  picture: UserPicture;
  nat: string;
}

export interface UserAge {
  date: Date;
  age: number;
}

export interface UserID {
  name: string;
  value: string;
}

export interface UserLocation {
  street: UserStreet;
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: UserCoordinates;
  timezone: UserTimezone;
}

export interface UserCoordinates {
  latitude: string;
  longitude: string;
}

export interface UserStreet {
  number: number;
  name: string;
}

export interface UserTimezone {
  offset: string;
  description: string;
}

export interface UserLogin {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}
