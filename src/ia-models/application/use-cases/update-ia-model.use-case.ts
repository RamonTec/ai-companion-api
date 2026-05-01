import { IaModel, IaModelUpdate } from "@/ia-models/domain/ia-models.js";
import { IaModelRepository } from "@/ia-models/domain/ports.js";

export class UpdateIaModelUseCase {
    constructor(private readonly iaModelRepo: IaModelRepository) { }

    async execute(id: string, data: IaModelUpdate): Promise<IaModel> {
        return await this.iaModelRepo.update(id, data);
    }
}