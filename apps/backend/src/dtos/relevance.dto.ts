import { z } from "zod";

const countUndefinedOrEmpty = (
  stringArray: (string[] | undefined)[],
): number => {
  return stringArray.reduce((acc, cur) => {
    if (cur === undefined || cur.length === 0) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const relevanceDto = z.object({
  type: z.string(),
  first_id: z.string().optional(),
  second_id: z.string().optional(),
  third_id: z.string().optional(),
});

const relevancesDto = z.object({
  type: z.string(),
  first_ids: z.array(z.string()).optional(),
  second_ids: z.array(z.string()).optional(),
  third_ids: z.array(z.string()).optional(),
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

export const createRelevanceDto = relevanceDto;

export type CreateRelevanceDto = z.infer<typeof createRelevanceDto>;

export const updateRelevanceDto = relevanceDto;

export type UpdateRelevanceDto = z.infer<typeof updateRelevanceDto>;

export const assignRelevanceDto = relevancesDto.superRefine(
  (
    { first_ids: firstIds, second_ids: secondIds, third_ids: thirdIds },
    refinementContext,
  ) => {
    const count = countUndefinedOrEmpty([firstIds, secondIds, thirdIds]);

    if (count > 1) {
      refinementContext.addIssue(assignIssue);
    }
  },
);

export type AssignRelevanceDto = z.infer<typeof unassignRelevanceDto>;

export const unassignRelevanceDto = relevancesDto.superRefine(
  (
    { first_ids: firstIds, second_ids: secondIds, third_ids: thirdIds },
    refinementContext,
  ) => {
    const count = countUndefinedOrEmpty([firstIds, secondIds, thirdIds]);

    if (count > 2) {
      refinementContext.addIssue(unassignIssue);
    }
  },
);

export type UnassignRelevanceDto = z.infer<typeof unassignRelevanceDto>;

export const reassignRelevanceDto = z
  .object({
    unassign: relevancesDto,
    assign: relevancesDto,
  })
  .superRefine(({ unassign, assign }, refinementContext) => {
    const assignCount = countUndefinedOrEmpty([
      assign.first_ids,
      assign.second_ids,
      assign.third_ids,
    ]);

    const unassignCount = countUndefinedOrEmpty([
      unassign.first_ids,
      unassign.second_ids,
      unassign.third_ids,
    ]);

    if (assignCount > 1) {
      refinementContext.addIssue(assignIssue);
    }

    if (unassignCount > 2) {
      refinementContext.addIssue(unassignIssue);
    }
  });

export type ReassignRelevanceDto = z.infer<typeof reassignRelevanceDto>;
