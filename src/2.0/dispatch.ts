import type { Update } from "./types";

import { assert } from "./util/assert";
import { performUpdates } from "./perform-updates";
import { performCommits } from "./perform-commits";
import { performEffects } from "./perform-effects";

let updateInProgress = false;
let dispatchForbidden = false;
const updateQueue: Array<(update: Update) => void> = [];

let update: Update | undefined

export const getCurrentUpdate = () => update!

const drainUpdateQueue = () => {
  updateInProgress = true;

  update = { needsUpdate:[], needsCommit: [], needsEffects: [] };

  let current = updateQueue.shift();

  while (typeof current !== "undefined") {
    current(update);

    performUpdates(update);

    current = updateQueue.shift();
  }

  performCommits(update);

  const { needsEffects } = update

  setTimeout(() => {
    dispatchForbidden = false;

    performEffects(needsEffects);

    if (updateQueue.length) {
      drainUpdateQueue();
    }

    console.log("update finished", update);

    updateInProgress = false;
  });
};

export const dispatch = (update: (update: Update) => void) => {
  assert(!dispatchForbidden, "dispatch not allowed during render");

  updateQueue.push(update);

  if (!updateInProgress) {
    drainUpdateQueue();
  }
};
