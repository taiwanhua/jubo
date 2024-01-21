import { kebabCase } from "lodash-es";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import type { SystemRelevanceTypeEnum } from "@/backend/constant/value";

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
  count: number;
}

export async function unassign({
  // locals,
  args,
  args: { type, fixed },
}: Params): Promise<Return> {
  // const updatedUser = locals.updatedUser;

  const res = await prisma.$transaction(async (tx) => {
    const fixedWhere = fixed.reduce((acc, column) => {
      let keyName = `${kebabCase(column)}`;
      const lastIndex = keyName.lastIndexOf("s");
      keyName = keyName.substring(0, lastIndex);
      acc[keyName] = { in: args[column] };
      return acc;
    }, {});

    const { count } = await tx.system_relevance.deleteMany({
      where: {
        type,
        ...fixedWhere,
      },
    });

    return count;
  });

  return { count: res };
}
