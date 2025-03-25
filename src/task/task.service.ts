import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { findALLParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    create (task: TaskDto) {
        this.tasks.push(task);
        console.log(this.tasks);
    }
    findById(id: string): TaskDto{
        const foundTask = this.tasks.filter(t=> t.id === id);

        if (foundTask.length > 0) {
            return foundTask[0];
        }
        throw new HttpException(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);

    }
    findAll(params: findALLParameters):TaskDto[]{ // retorna tudo
        return this.tasks.filter(t => {
            let match = true;

            if(params.title != undefined && !t.title.includes(params.title)){
                match = false;
            }
            if(params.status != undefined && !t.status.includes(params.status)){
                match = false;
            }
            return match;
        });
    }

    update(task: TaskDto) {
        let taskIndex = this.tasks.findIndex(t => t.id === task.id); // retorna o index se for verdadeiro
         
        if(taskIndex >= 0){
            this.tasks[taskIndex] = task;
            return;
        }
        throw new HttpException(`Task with ID ${task.id} not found`, HttpStatus.BAD_REQUEST);
    }
   
    remove(id:string){
        let taskIndex = this.tasks.findIndex(t => t.id === id); // retorna o index se for verdadeiro

        if(taskIndex >= 0){
            this.tasks.splice(taskIndex, 1); //splice: remove o item do array
            return;
        }
        throw new NotFoundException(`Task with ID ${id} not found`);
    }


}
