import { IaModel, IaModelCreate } from "@/ia-models/domain/ia-models.js";
import { IaModelRepository } from "@/ia-models/domain/ports.js";

export class RegisterIaModelUseCase {
    constructor(private readonly iaModelRepo: IaModelRepository) { }

    async execute(data: IaModelCreate): Promise<IaModel> {
        return await this.iaModelRepo.register(data);
    }
}