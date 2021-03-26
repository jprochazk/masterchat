import { fetchChat, fetchContext, ReloadContinuationType } from "..";

it("can fetch initial chat", async () => {
  const context = await fetchContext("QK75uDJ9eyk");
  if (!context.continuations || !context.metadata) {
    console.log("invalid request");
    return;
  }

  console.log(context);

  const res = await fetchChat({
    ...context.auth,
    continuation: context.continuations[ReloadContinuationType.All].token,
    isLiveChat: context.metadata.isLive,
  });

  expect(res).toHaveProperty("actions");

  if ("error" in res) {
    throw new Error(res.error.message);
  }

  console.log(res.actions[0]);

  expect(res.actions[0]).toHaveProperty("timestamp");
});