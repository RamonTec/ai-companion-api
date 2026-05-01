import { IaModel, IaModelCreate, IaModelUpdate } from "./ia-models.js";

export abstract class IaModelRepository {
    abstract register(data: IaModelCreate): Promise<IaModel>;
    abstract update(id: string, data: IaModelUpdate): Promise<IaModel>;
    abstract findById(id: string): Promise<IaModel>;
}