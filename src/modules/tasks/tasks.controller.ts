import { Controller, Post, Body, UseGuards, Request, Req, Get, Query, Param, Patch, Delete } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDefinitionDto } from "./dto/create-task-definition.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { TaskStatus } from "./enums/task-status.enum";
import { UpdateTaskDefinitionDto } from "./dto/update-task-definition.dto";
import { UpdateTaskInstanceDto } from "./dto/update-task-instance.dto";

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

  @Get('house/:houseId')
  findAllByHouse(
    @Param('houseId') houseId: string,
    @Query('status') status?: TaskStatus,
  ) {
    return this.tasksService.listHouseTasks(houseId, status);
  }

  @Get('definitions/:id')
  findDefintion(@Param('id') id: string){
    return this.tasksService.findOneDefinition(id);
  }

  @Patch('definitions/:id')
  updateDefinition(@Param('id') id: string, @Body() dto: UpdateTaskDefinitionDto){
    return this.tasksService.updateDefinition(id, dto);
  }

  @Delete('definitions/:id')
  removeDefinition(@Param('id') id: string){
    return this.tasksService.removeDefinition(id);
  }

  @Patch('instances/:id')
  updateInstance(@Param('id') id: string, @Body() dto: UpdateTaskInstanceDto) {
    return this.tasksService.updateInstance(id, dto);
  }

}