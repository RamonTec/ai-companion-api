import { IaModelRepository } from "@/ia-models/domain/ports.js";
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IaModelDocument } from "../db/ia-model.schema.js";
import { IaModelCreate, IaModel, IaModelUpdate, FilterIaModels } from "@/ia-models/domain/ia-models.js";

@Injectable()
export class IaModelAdapterImpl implements IaModelRepository {
    constructor(
        @Inject('IaModel')
        private iaModel: Model<IaModelDocument>,
    ) { }

    private mapToIaModelDomain(doc: IaModelDocument): IaModel {
        return {
            name: doc.name,
            description: doc.description,
            category: doc.category,
            personality: doc.personality,
            provider: doc.provider,
            providerModelId: doc.providerModelId,
            basePrompt: doc.basePrompt,
            temperature: doc.temperature,
            topP: doc.topP,
            voiceId: doc.voiceId,
            knowledgeBaseId: doc.knowledgeBaseId,
            requiredTier: doc.requiredTier,
            maxTokens: doc.maxTokens,
        };
    }

    async findById(id: string): Promise<IaModel> {
        const iaModel = await this.iaModel.findById(id);
        if (!iaModel) {
            throw new Error("IaModel not found");
        }
        return this.mapToIaModelDomain(iaModel);
    }

    async register(data: IaModelCreate) {
        const savedDocument = await this.iaModel.create(data);
        return this.mapToIaModelDomain(savedDocument);
    }

    async update(id: string, data: IaModelUpdate) {
        const savedDocument = await this.iaModel.findByIdAndUpdate(id, data, { new: true });
        if (!savedDocument) {
            throw new Error("IaModel not found");
        }
        return this.mapToIaModelDomain(savedDocument);
    }

    async find(dto: FilterIaModels): Promise<IaModel[]> {
        const iaModels = await this.iaModel.find({
            $or: [
                { name: dto.name },
                { category: dto.category },
                { personality: dto.personality },
            ],
        });
        return iaModels.map(this.mapToIaModelDomain);
    }
}
