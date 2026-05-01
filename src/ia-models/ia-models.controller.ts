import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { RegisterIaModelDto } from "./application/dtos/register-ia-model.dto.js";
import { RegisterIaModelUseCase } from "./application/use-cases/register-ia-model.use-case.js";
import { UpdateIaModelUseCase } from "./application/use-cases/update-ia-model.use-case.js";
import { UpdateIaModelDto } from "./application/dtos/update-ia-model.dto.js";

@Controller('ia-models')
export class IaModelsController {
    constructor(
        private readonly iaModelRegisterUseCase: RegisterIaModelUseCase,
        private readonly iaModelUpdateUseCase: UpdateIaModelUseCase,
    ) { }

    @Post('')
    register(@Body() dto: RegisterIaModelDto) {
        return this.iaModelRegisterUseCase.execute(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateIaModelDto) {
        return this.iaModelUpdateUseCase.execute(id, dto);
    }

}