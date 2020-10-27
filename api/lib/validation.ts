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

const ROUNDTRIP_REGEX = /^http(s)?:\/\/(www\.)?maus\.to/i;

function assertNonRoundtripLink(url: string) {
  if (ROUNDTRIP_REGEX.test(url)) {
    throw new Error("The link may not link to maus.to");
  }
}

export function validateSubmission(data: any): LinkSubmission {
  if (!data) {
    throw new Error("No data provided");
  }

  const isValid = ajv.validate(LINK_SCHEMA, data);

  if (!isValid) {
    throw new ValidationError(ajv.errors);
  }

  const submission = data as LinkSubmission;

  assertNonRoundtripLink(submission.url);

  if (!submission.slug) {
    submission.slug = slugger();
  } else {
    submission.slug = submission.slug.toLowerCase();
  }

  return submission;
}
