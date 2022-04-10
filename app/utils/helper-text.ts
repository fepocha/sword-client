export const getMaxLimitHelperText = (fieldName: string, max: number) => `A ${fieldName} should be ${max} characters long`;

export const getMinMaxLimitHelperText = (
  fieldName: string,
  { min = 0, max }: { min?: number; max: number; },
) => `Your ${fieldName} should be ${min} to ${max} characters long`;
