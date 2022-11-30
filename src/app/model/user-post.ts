
export class UserPost {

    fullname: string;
    company: string;
    title: string;
    body: string;

    constructor(fullname: string, company: string, title: string, body: string) { 
        this.fullname = fullname;
        this.company = company;
        this.title = title;
        this.body = body;
    }
}