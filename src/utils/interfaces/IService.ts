export interface IService {
  type: "IService";
  id: string;
  host: string;
  service: string;
  protocol: string;
  port: number;
  privilege_user: string;
}
