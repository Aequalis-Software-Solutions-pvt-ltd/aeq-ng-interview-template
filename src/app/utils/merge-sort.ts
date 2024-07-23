function mergeArrays<T>(left: T[], right: T[], isAsc: boolean, sortBy: keyof T): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if ((left[leftIndex][sortBy] < right[rightIndex][sortBy] && isAsc) || (left[leftIndex][sortBy] > right[rightIndex][sortBy] && !isAsc)) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}
// Merge Sort function  
export function mergeSort<T>(arr: T[], isAsc: boolean, sortBy: keyof T): T[] {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return mergeArrays(mergeSort(left, isAsc, sortBy), mergeSort(right, isAsc, sortBy), isAsc, sortBy);
}
