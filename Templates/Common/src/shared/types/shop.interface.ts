export interface ShopFields {
  id: string;
  name: string;
  telegramId: string;
  type: string;
  inDraft: boolean;
  design_id: number;
  templateId: string;
  description: string;
  mediaUrl: string;
  functionalities: Array<number>;
  configuration: {
    email: string;
    phoneNumber: string;
    location: string;
  };
}
