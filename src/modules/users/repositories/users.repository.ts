import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UsersRepository {

    abstract create(data: CreateUserDto): Promise<User>;

    abstract findByEmail(email: string): Promise<User | null>;

    abstract findById(id: string): Promise<User | null>;

    abstract update(id: string, data: UpdateUserDto): Promise<User>;

    abstract delete(id: string): Promise<void>;
}