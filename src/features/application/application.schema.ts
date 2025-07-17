import { z } from 'zod';

export const applicationFormSchema = z.object({
  cv: z.instanceof(File, { message: 'File phải là file ảnh *' }).refine(
    (file) => {
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
    },
    { message: 'File phải là ảnh PDF *' },
  ),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
