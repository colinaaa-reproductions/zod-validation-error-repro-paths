import { z } from "zod/v4";
import { createErrorMap, fromZodError } from "zod-validation-error/v4";

const baz = z.number().min(1).optional();

const bar = z.strictObject({
  baz,
});

const foo = z.strictObject({
  bar: z.literal(false).or(bar).optional(),
});

const schema = z.object({
  foo,
});

const result = schema.safeParse({
  foo: {
    bar: {
      baz: 0,
    },
  },
});

const validationError = fromZodError(result.error, {
    error: createErrorMap(),
});
console.log(validationError.message);
console.log(validationError.details);
