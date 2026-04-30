import { Body, Controller, Post } from "@nestjs/common";
import { RegisterIaModelDto } from "./application/dtos/register-ia-model.dto.js";
import { RegisterIaModelUseCase } from "./application/use-cases/register-ia-model.use-case.js";

@Controller('ia-models')
export class IaModelsController {
    constructor(
        private readonly iaModelRegisterUseCase: RegisterIaModelUseCase,
    ) { }

    @Post('')
    register(@Body() dto: RegisterIaModelDto) {
        return this.iaModelRegisterUseCase.execute(dto);
    }

}