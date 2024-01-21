import { v4 as uuidv4 } from "uuid";
import type {
  Prisma,
  system_relevance as SystemRelevance,
} from "@prisma/client";
import { kebabCase } from "lodash-es";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import type { SystemRelevanceTypeEnum } from "@/backend/constant/value";
import { fillEmptyArray } from "@/utils/api/fillEmptyArray";

type FixedColumn = "firstIds" | "secondIds" | "thirdIds";
interface Args {
  fixed: FixedColumn[];
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

export async function reassign({
  locals,
  args,
  args: { firstIds, secondIds, thirdIds, type, fixed },
}: Params): Promise<Return> {
  const updatedUser = locals.updatedUser;

  const res = await prisma.$transaction(async (tx) => {
    const fixedWhere = fixed.reduce((acc, column) => {
      let keyName = `${kebabCase(column)}`;
      const lastIndex = keyName.lastIndexOf("s");
      keyName = keyName.substring(0, lastIndex);
      acc[keyName] = { in: args[column] };
      return acc;
    }, {});

    await tx.system_relevance.deleteMany({
      where: {
        type,
        ...fixedWhere,
      },
    });

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

    const promises = combinations.map((data) =>
      tx.system_relevance.create({ data }),
    );

    const createRelevances = await Promise.all(promises);
    return createRelevances;
  });

  return { data: res, count: res.length };
}
