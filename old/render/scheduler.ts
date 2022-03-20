import { VDOMChild } from "../vdom";
import { ChildInstance } from "./types";

let isUpdating = true

interface Update {
    needsUpdate: Set<ChildInstance>
    wasUpdated: Set<ChildInstance>
}

let currentUpdate: Update | undefined;
let currentDispatch: () => | undefined;

const update = (child: ChildInstance, vdom: VDOMChild) => {
    const next = (children: ChildInstance[]) => {
        update(child, vdom)
    }

    if (typeof currentUpdate === 'undefined') {
        currentUpdate = {
            needsUpdate: new Set([child]),
            wasUpdated: new Set()
        }
    }
}

const beginUpdate = (id: string) => {
    const nodes: Record<string, ChildInstance> = {};
    const needsUpdate: ChildInstance[] = [];
    const wasUpdated: ChildInstance[] = [];

    const performWorkOnChild = (work: () => {}) => {
        
    }
    
}

