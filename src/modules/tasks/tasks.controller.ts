import { Controller, Post, Body, UseGuards, Request, Req, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDefinitionDto } from "./dto/create-task-definition.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('tasks')
export class TasksController{
  constructor(private readonly tasksService: TasksService){}

  @Post('definitions')
  @UseGuards(JwtAuthGuard)
  createDefinition(@Body() createTaskDefinitionDto: CreateTaskDefinitionDto, @Request() req){
    const userId = req.user.id;
    return this.tasksService.createDefinition(createTaskDefinitionDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() filterDto: GetTasksFilterDto){
    return this.tasksService.findAllInstances(filterDto.houseId, filterDto.status);
  }
}