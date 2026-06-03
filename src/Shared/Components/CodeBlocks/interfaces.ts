const FORMATS_TYPE = {
  JSON: 'json',
  JS: 'javascript',
} as const;

type FormatType = (typeof FORMATS_TYPE)[keyof typeof FORMATS_TYPE];

export { FORMATS_TYPE };
export type { FormatType };
