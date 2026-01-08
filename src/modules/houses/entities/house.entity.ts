export class House {
    id: string;
    name: string;
    inviteCode: string;
    createdAt: Date;
    updatedAt: Date;
    
    constructor(partial: Partial<House>){
        Object.assign(this, partial);
    }
}
