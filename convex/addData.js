import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { data }) => {
  await db.insert("nodesNedges", { data });
});
