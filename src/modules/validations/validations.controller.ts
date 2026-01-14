import {Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ValidationsService } from "./validations.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateValidationDto } from "./dto/create-validation.dto";

@Controller('validations')
export class ValidationsController {
    constructor(private readonly validationsService: ValidationsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createValidationDto: CreateValidationDto, @Request() req){
        return this.validationsService.create(createValidationDto, req.user.id);
    }
}