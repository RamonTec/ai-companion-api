import { IsString } from "class-validator";

export class SendMessageDto {
  
  @IsString()
  receiverId: string;

  @IsString()
  senderId: string;

  @String()
  message: string;


}