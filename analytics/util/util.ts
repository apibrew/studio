export function sampleArray<T>(array: T[], sampleSize: number, sortKeyFunc: (elem: T) => number): T[] {
    if (sampleSize < 2) {
        throw new Error("Sample size must be at least 2 to include first and last elements.");
    }
    if (array.length <= sampleSize) {
        return array.slice().sort((a, b) => sortKeyFunc(a) - sortKeyFunc(b)); // Return the whole sorted array if it's smaller than or equal to the sample size
    }

    const firstElement = array[0];
    const lastElement = array[array.length - 1];

    // Get the elements in between
    const middleElements = array.slice(1, -1);

    // Shuffle the middle elements
    for (let i = middleElements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middleElements[i], middleElements[j]] = [middleElements[j], middleElements[i]];
    }

    // Select random elements from the shuffled middle elements
    const selectedMiddleElements = middleElements.slice(0, sampleSize - 2);

    // Combine first, selected middle, and last elements
    const result = [firstElement, ...selectedMiddleElements, lastElement];

    // Sort the result array using the provided sortKeyFunc
    return result.sort((a, b) => sortKeyFunc(a) - sortKeyFunc(b));
}
