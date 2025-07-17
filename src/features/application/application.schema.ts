import { z } from 'zod';

export const applicationFormSchema = z.object({
  cv: z.instanceof(File, { message: 'File phải là file PDF *' }).refine(
    (file) => {
      return ['application/pdf'].includes(file.type);
    },
    { message: 'CV phải là file PDF *' },
  ),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
