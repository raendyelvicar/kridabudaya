export interface KBClientSubmitModel {
  name: string;
  file: Express.Multer.File;
  description: string;
  website: string;
  contact_email: string;
  phone_number: string;
}
