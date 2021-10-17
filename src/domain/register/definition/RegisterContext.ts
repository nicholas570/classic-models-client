export interface RegisterContext {
  login?: string;
  password?: string;
  consent?: boolean;
  invalidMessage?: string;
  invalidLogin?: boolean;
  invalidConsent?: boolean;
}
