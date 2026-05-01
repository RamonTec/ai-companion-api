import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { RegisterIaModelDto } from "./application/dtos/register-ia-model.dto.js";
import { RegisterIaModelUseCase } from "./application/use-cases/register-ia-model.use-case.js";
import { UpdateIaModelUseCase } from "./application/use-cases/update-ia-model.use-case.js";
import { UpdateIaModelDto } from "./application/dtos/update-ia-model.dto.js";
import { GetIaModelDetailUseCase } from "./application/use-cases/get-ia-model-detail.use-case.js";
import { FilterIaModelsDto } from "./application/dtos/filter-ai-models.dto.js";
import { GetIaModelsUseCase } from "./application/use-cases/filter-ai-models.use-case.js";
import { AuthGuard } from "@/common/guards/auth.guard.js";
import { Role, Roles } from "@/common/decorators/roles.decorator.js";
import { RolesGuard } from "@/common/guards/role.guard.js";

@Controller('ia-models')
export class IaModelsController {
    constructor(
        private readonly iaModelRegisterUseCase: RegisterIaModelUseCase,
        private readonly iaModelUpdateUseCase: UpdateIaModelUseCase,
        private readonly iaModelFindUseCase: GetIaModelDetailUseCase,
        private readonly iaModelFindAllUseCase: GetIaModelsUseCase,
    ) { }

    @UseGuards(AuthGuard)
    @Post('')
    register(@Body() dto: RegisterIaModelDto) {
        return this.iaModelRegisterUseCase.execute(dto);
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateIaModelDto) {
        return this.iaModelUpdateUseCase.execute(id, dto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.iaModelFindUseCase.execute(id);
    }

    @UseGuards(AuthGuard)
    @Get('')
    filter(@Query() query: FilterIaModelsDto) {
        return this.iaModelFindAllUseCase.execute(query);
    }

}