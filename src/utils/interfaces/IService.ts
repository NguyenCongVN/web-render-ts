export interface IService {
  type: "IService";
  id: string;
  host: string;
  service: string;
  protocol: string;
  privilege_user: string;
}
