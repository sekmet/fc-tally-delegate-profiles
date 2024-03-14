import { sql } from "@vercel/postgres";

import { isEmpty } from "./isEmpty";
import { detectInputType } from "./parseInput";

export async function daoSearch(dao_or_chainid: string) {
  const daoSearchType = detectInputType(String(dao_or_chainid));
  console.log("dao_or_chainid:", dao_or_chainid, daoSearchType);

  // default dao (arbitrum) if dao slug or chainId not defined
  let daoId = "eip155:42161";
  let governorId = "eip155:42161:0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9";

  if (
    daoSearchType === "numbers" &&
    dao_or_chainid !== null &&
    dao_or_chainid !== undefined
  ) {
    const _daoId = `eip155:${dao_or_chainid.trim()}`;
    const { rows } = await sql`
      SELECT e.*, c.chain_id, g.governor_id
      FROM tally_entities e
      LEFT JOIN tally_chain_ids c ON e.id = c.entity_id
      LEFT JOIN tally_governor_ids g ON e.id = g.entity_id
      WHERE c.chain_id = ${_daoId};
      `;
    const row_0 = rows[0] ?? {};
    console.log("FOUNDED DAO:", row_0);
    if (!isEmpty(row_0)) {
      daoId = row_0.chain_id;
      governorId = row_0.governor_id;
    }
  }

  if (
    (daoSearchType === "letters" || daoSearchType === "mixed") &&
    dao_or_chainid !== null &&
    dao_or_chainid !== undefined
  ) {
    const _daoId = dao_or_chainid.trim();
    const { rows } = await sql`
      SELECT e.*, c.chain_id, g.governor_id
      FROM tally_entities e
      LEFT JOIN tally_chain_ids c ON e.id = c.entity_id
      LEFT JOIN tally_governor_ids g ON e.id = g.entity_id
      WHERE e.slug = ${_daoId};
      `;
    const row_0 = rows[0] ?? {};
    console.log("FOUNDED DAO:", row_0);
    if (!isEmpty(row_0)) {
      daoId = row_0.chain_id;
      governorId = row_0.governor_id;
    }
  }

  return {
    daoId,
    governorId,
  };
}
