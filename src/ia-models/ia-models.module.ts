import { Module } from "@nestjs/common";
import { RegisterIaModelUseCase } from "./application/use-cases/register-ia-model.use-case.js";
import { IaModelRepository } from "./domain/ports.js";
import { IaModelsController } from "./ia-models.controller.js";
import { IaModelAdapterImpl } from "./infra/providers/ia-model-adapter.impl.js";
import { UpdateIaModelUseCase } from "./application/use-cases/update-ia-model.use-case.js";
import { GetIaModelDetailUseCase } from "./application/use-cases/get-ia-model-detail.use-case.js";
import { GetIaModelsUseCase } from "./application/use-cases/filter-ai-models.use-case.js";

@Module({
    controllers: [IaModelsController],
    providers: [
        { provide: IaModelRepository, useClass: IaModelAdapterImpl },
        RegisterIaModelUseCase,
        UpdateIaModelUseCase,
        GetIaModelDetailUseCase,
        GetIaModelsUseCase,
    ],
    exports: [],
})
export class IaModelModule { }