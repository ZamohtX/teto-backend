import {
    TaskDefinition as PrismaTaskDefinition,
    TaskInstance as PrismaTaskInstance,
    TaskFrequency as PrismaFrequency,
    TaskStatus as PrismaStatus
} from "@prisma/client";

import { TaskDefinition } from "../entities/task-definition.entity";  
import { TaskInstance } from "../entities/task-instance.entity";
import { TaskFrequency } from "../enums/task-frequency.enum";
import { TaskStatus } from "../enums/task-status.enum";


export class TaskMapper {
   //   ---- DEFINITIONS ----
   static toDomainDefinition(raw: PrismaTaskDefinition): TaskDefinition {
    return new TaskDefinition({
        id: raw.id,
        houseId: raw.houseId,
        title: raw.title,
        description: raw.description || undefined,
        weight: raw.weight,
        frequency: raw.frequency as unknown as TaskFrequency,
        interval: raw.interval,
        selectedDays: raw.selectedDays,
        startDate: raw.startDate,
        repeatCount: raw.repeatCount
    });
   }
   

   //   ---- INSTANCES ----

   static toDomainInstance(raw: PrismaTaskInstance & {taskDef: PrismaTaskDefinition}): TaskInstance {
        return new TaskInstance({
            id: raw.id,
            dueDate: raw.dueDate,
            completedAt: raw.completedAt || undefined,
            // @ts-ignore: Prisma as vezes retorna null onde definimos undefined
            proofPhotoUrl: raw.proofPhotoUrl || undefined,
            status: raw.status as unknown as TaskStatus,
            taskDefId: raw.taskDefId,
            assignedToId: raw.assignedToId || undefined,
            // Se veio o include do taskDef, mapeamos ele tambem
            taskDef: raw.taskDef ? TaskMapper.toDomainDefinition(raw.taskDef) : undefined
        })
   }


}