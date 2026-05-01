import { IaModel, FilterIaModels } from "@/ia-models/domain/ia-models.js";
import { IaModelRepository } from "@/ia-models/domain/ports.js";

export class GetIaModelsUseCase {
    constructor(private readonly iaModelRepo: IaModelRepository) { }

    async execute(dto: FilterIaModels): Promise<IaModel[]> {
        return await this.iaModelRepo.find(dto);
    }
}