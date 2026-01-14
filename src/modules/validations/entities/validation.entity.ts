export class Validation {
    id: string;
    approved: boolean;
    comment?: string;

    taskInstanceId: string;
    validatorId: string;

    createdAt: Date;

    constructor(partial: Partial<Validation>){
        Object.assign(this, partial);
    }
}

