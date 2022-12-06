/*
  Typescript Code for the Address Model
  Author: Nikos Lardas
  Created: 12.2022
*/

import { Geo } from './geo';

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo
}