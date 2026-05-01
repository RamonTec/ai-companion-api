import { PartialType } from "@nestjs/swagger";
import { RegisterIaModelDto } from "./register-ia-model.dto.js";

export class UpdateIaModelDto extends PartialType(RegisterIaModelDto) { }