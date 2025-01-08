export type NumberOrNull = string | null;
export type StringOrNull = string | null;
export interface ArguThunk {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface UserState {
  uid: NumberOrNull;
  name: any;
  email: StringOrNull;
  loading: boolean;
  authStatus: string;
  status: { type: StringOrNull; message: StringOrNull };
  alert: boolean;
}

export enum AuthStatus {
  loggedIn = "logged_in",
  loggedOut = "logged_out",
  loading = "loading",
}
export enum SignupMsgType {
  sucsses = "sucsses",
  error = "error",
}

export enum Collections {
  users = "users",
  wishlist = "wish-list",
}

export interface NavLinks {
  label: string;
  href: string;
  icon?: any;
}
