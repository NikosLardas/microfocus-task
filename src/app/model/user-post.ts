/*
  Typescript Code for the User Post Model
  Author: Nikos Lardas
  Created: 12.2022
*/

export class UserPost {

    fullname: string;
    company: string;
    title: string;
    body: string;
    website: string;

    constructor(fullname: string, company: string, title: string, body: string, website: string) { 
        this.fullname = fullname;
        this.company = company;
        this.title = title;
        this.body = body;
        this.website = website;
    }
}