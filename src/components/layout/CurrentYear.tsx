import { cacheLife } from "next/cache";

/** Ano do copyright: valor em cache, revalidado diariamente (Cache Components exige tratar `new Date()`). */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
