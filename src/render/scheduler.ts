const queue: (() => void)[] = [];

// WIP
const performWorkOnChild = (work: () => {}) => {
    queue.push(work);
}

