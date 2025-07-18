import { z } from 'zod';

export const contractFormSchema = z.object({
  contract: z.instanceof(File, { message: 'Hợp dồng phải là file ảnh *' }).refine(
    (file) => {
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    },
    { message: 'Hợp dồng  là ảnh PDF *' },
  ),
});

export type ContractFormValues = z.infer<typeof contractFormSchema>;
