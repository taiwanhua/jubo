import { v4 as uuidv4 } from "uuid";
import type {
  Prisma,
  system_relevance as SystemRelevance,
} from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import type { SystemRelevanceTypeEnum } from "@/backend/constant/value";
import { fillEmptyArray } from "@/utils/api/fillEmptyArray";

interface Args {
  type: SystemRelevanceTypeEnum;
  firstIds: string[];
  secondIds: string[];
  thirdIds: string[];
}
export interface Params {
  args: Args;
  locals: Locals;
}

export interface Return {
  data: SystemRelevance[];
  count: number;
}

export async function assign({
  locals,
  args: { firstIds, secondIds, thirdIds, type },
}: Params): Promise<Return> {
  const updatedUser = locals.updatedUser;
  const firstIdsFilled = fillEmptyArray(firstIds, "");
  const secondIdsFilled = fillEmptyArray(secondIds, "");
  const thirdIdsFilled = fillEmptyArray(thirdIds, "");

  const combinations: Prisma.system_relevanceCreateArgs["data"][] =
    firstIdsFilled.flatMap((firstId) =>
      secondIdsFilled.flatMap((secondId) =>
        thirdIdsFilled.map((thirdId) => ({
          id: uuidv4(),
          first_id: firstId,
          second_id: secondId,
          third_id: thirdId,
          type,
          enable: true,
          created_user: updatedUser,
          updated_user: updatedUser,
        })),
      ),
    );

  const res = await prisma.$transaction(async (tx) => {
    const promises = combinations.map((data) =>
      tx.system_relevance.create({ data }),
    );

    const createRelevances = await Promise.all(promises);
    return createRelevances;
  });

  return { data: res, count: res.length };
}
