import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = [];

    create(task: TaskDto){
        this.tasks.push(task);
        console.log(this.tasks);
    }

    findById(id:string): TaskDto{
        const foundTask = this.tasks.filter (t => t.id === id);

        if (foundTask.length){
            return foundTask[0];
        }
        throw new NotFoundException(`a task com esse id ${id} n existe`)
    }


    update (task: TaskDto){
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);
         
        if (taskIndex >= 0){
            this.tasks[taskIndex] = task;
            return;
    }

    throw new HttpException (`task with id ${task.id} nout found`, HttpStatus.BAD_REQUEST);
}

    delete(id: string){
        let   taskIndex = this.tasks.findIndex( t => t.id === id);
                if (taskIndex >=0){
                    this.tasks.splice(taskIndex, 1);
                    return
                }
                throw new HttpException( `task with id ${id} not found`, HttpStatus.BAD_REQUEST);
    }

}