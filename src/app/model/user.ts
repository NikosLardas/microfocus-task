/*
  Typescript Code for the User Model
  Author: Nikos Lardas
  Created: 12.2022
*/

import { Company } from './company';
import { Address } from './address';


export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}