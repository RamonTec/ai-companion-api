import { IaModel, IaModelCreate } from "./ia-models.js";

export abstract class IaModelRepository {
    abstract register(data: IaModelCreate): Promise<IaModel>;
}