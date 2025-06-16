import { z } from "zod";
import { fromZodError } from "zod-validation-error";

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

const validationError = fromZodError(result.error);
console.log(validationError.message);
console.log(validationError.details);
