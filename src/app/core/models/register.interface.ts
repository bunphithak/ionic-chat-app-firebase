import { AuthInterface } from './auth.interface';

export interface RegisterInterface extends AuthInterface {
    name: string;
    fullName: string;
    phone: string;
    address: string;
}
