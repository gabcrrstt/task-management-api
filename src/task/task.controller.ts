import { Body, Controller, Get,Param, Delete, Post, Put, Query } from '@nestjs/common';
import { findALLParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @Post() // cria o id
    create(@Body() task: TaskDto) {
         this.taskService.create(task);
    }
    @Get('/:id') // procura o id
    findById(@Param('id')id:string): TaskDto{
        return this.taskService.findById(id);
    }

    @Get() // procura todos
    findAll(@Query() params: findALLParameters): TaskDto[]{
        return this.taskService.findAll(params);
    }

    @Put() // atualiza o id
    update(@Body() Task: TaskDto){
        this.taskService.update(Task);
    }
    @Delete('/:id') 
    remove(@Param('id')id:string){
        return this.taskService.remove(id);
    }

    

}
