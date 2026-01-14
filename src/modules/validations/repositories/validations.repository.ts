import { CreateValidationDto } from "../dto/create-validation.dto";
import { Validation } from "../entities/validation.entity";

export abstract class ValidationsRepository {
    
    abstract create(data: CreateValidationDto, validatorId: string): Promise<Validation>;

    abstract findByTaskInstanceId(taskIntanceId: string): Promise<Validation[]>;

}