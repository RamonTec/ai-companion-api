import { Module } from "@nestjs/common";
import { RegisterIaModelUseCase } from "./application/use-cases/register-ia-model.use-case.js";
import { IaModelRepository } from "./domain/ports.js";
import { IaModelsController } from "./ia-models.controller.js";
import { IaModelAdapterImpl } from "./infra/providers/ia-model-adapter.impl.js";

@Module({
    controllers: [IaModelsController],
    providers: [
        { provide: IaModelRepository, useClass: IaModelAdapterImpl },
        RegisterIaModelUseCase,
    ],
    exports: [],
})
export class IaModelModule { }