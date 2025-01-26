export interface KBCLientEntity {
  name: string; // Changed from String to string
  logo_fileid?: string; // Nullable string, consistent with Prisma model
  description?: string; // Nullable string
  website?: string; // Nullable string
  contact_email?: string; // Nullable string
  phone_number?: string; // Nullable string
}
