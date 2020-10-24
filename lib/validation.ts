import nanoid from "nanoid";
import Ajv, { ValidationError } from "ajv";

import { LinkSubmission } from "../lib/link";

export const LINK_SCHEMA = {
  type: "object",
  required: ["url"],
  properties: {
    url: {
      type: "string",
      pattern: "^http(s?)://",
    },
    slug: {
      minimum: 1,
      maximum: 100,
      pattern: "^\\w|-+$",
    },
  },
};

const ajv = new Ajv();
const slugger = nanoid.customAlphabet(
  "abcdefghijklmnopqrstuvwxyz0123456789",
  4
);

export function validateSubmission(data: any): LinkSubmission {
  if (!data) {
    throw new Error("No data provided");
  }

  const isValid = ajv.validate(LINK_SCHEMA, data);

  if (!isValid) {
    throw new ValidationError(ajv.errors);
  }

  const submission = data as LinkSubmission;

  if (!submission.slug) {
    submission.slug = slugger();
  } else {
    submission.slug = submission.slug.toLowerCase();
  }

  return submission;
}
