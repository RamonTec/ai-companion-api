import { IaModel } from "@/ia-models/domain/ia-models.js";
import { IaModelRepository } from "@/ia-models/domain/ports.js";

export class GetIaModelDetailUseCase {
    constructor(private readonly iaModelRepo: IaModelRepository) { }

    async execute(id: string): Promise<IaModel> {
        return await this.iaModelRepo.findById(id);
    }
}