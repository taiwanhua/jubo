import { z } from "zod";

const countUndefinedOrEmpty = (stringArray: (string[] | undefined)[]) => {
  return stringArray.reduce((acc, cur) => {
    if (cur === undefined || cur.length === 0) {
      acc++;
    }
    return acc;
  }, 0);
};

const referenceDto = z.object({
  type: z.string(),
  first_id: z.string().optional(),
  second_id: z.string().optional(),
  third_id: z.string().optional(),
});

const referencesDto = z.object({
  type: z.string(),
  first_id: z.array(z.string()).optional(),
  second_id: z.array(z.string()).optional(),
  third_id: z.array(z.string()).optional(),
});

const assignIssue = {
  code: z.ZodIssueCode.custom,
  message:
    "At least two required of first_id, second_id, third_id which need to have element",
  path: ["first_id or second_id or third_id"],
};

const unassignIssue = {
  code: z.ZodIssueCode.custom,
  message:
    "At least one required of first_id, second_id, third_id which need to have element",
  path: ["first_id or second_id or third_id"],
};

export const createReferenceDto = referenceDto;

export type CreateReferenceDto = z.infer<typeof createReferenceDto>;

export const updateReferenceDto = referenceDto;

export type UpdateReferenceDto = z.infer<typeof updateReferenceDto>;

export const assignReferenceDto = referencesDto.superRefine(
  ({ first_id, second_id, third_id }, refinementContext) => {
    const count = countUndefinedOrEmpty([first_id, second_id, third_id]);

    if (count > 1) {
      return refinementContext.addIssue(assignIssue);
    }
  },
);

export const unassignReferenceDto = referencesDto.superRefine(
  ({ first_id, second_id, third_id }, refinementContext) => {
    const count = countUndefinedOrEmpty([first_id, second_id, third_id]);

    if (count > 2) {
      return refinementContext.addIssue(unassignIssue);
    }
  },
);

export type UnassignReferenceDto = z.infer<typeof unassignReferenceDto>;

export const reassignReferenceDto = z
  .object({
    unassign: referencesDto,
    assign: referencesDto,
  })
  .superRefine(({ unassign, assign }, refinementContext) => {
    const assignCount = countUndefinedOrEmpty([
      assign.first_id,
      assign.second_id,
      assign.third_id,
    ]);

    const unassignCount = countUndefinedOrEmpty([
      unassign.first_id,
      unassign.second_id,
      unassign.third_id,
    ]);

    if (assignCount > 1) {
      return refinementContext.addIssue(assignIssue);
    }

    if (unassignCount > 2) {
      return refinementContext.addIssue(unassignIssue);
    }
  });

export type ReassignReferenceDto = z.infer<typeof reassignReferenceDto>;
