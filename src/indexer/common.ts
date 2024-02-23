import { env } from "@/env";
import { PublicClient, createPublicClient, http } from "viem";
import { polygon } from "viem/chains";

export const BLOCKS_PER_QUERY = 100_000n as const;

export const MRCRYPTO_ADDRESS =
  "0x175BCa235261dF2f40f639CB5E34856868545A15" as const;

const ALCHEMY_URL = env.RPC_URL;
const transport = http(ALCHEMY_URL);

export const bigIntMax = (...args: bigint[]) =>
  args.reduce((m, e) => (e > m ? e : m));
export const bigIntMin = (...args: bigint[]) =>
  args.reduce((m, e) => (e < m ? e : m));

const client: PublicClient = createPublicClient({
  chain: polygon,
  transport,
});

export { client };
