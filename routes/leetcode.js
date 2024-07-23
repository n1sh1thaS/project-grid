/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  if (nums.length <= k) {
    for (let i = 0; i < nums.length; i++) {
      let num = nums[i];
      nums.splice(num, 1);
      if (nums.includes(num)) return true;
      nums.push(num);
    }
    return false;
  }

  let window = [];
  for (let i = 0; i <= k; i++) {
    if (window.includes(nums[i])) return true;
    window.push(nums[i]);
  }

  let p1 = 0;
  let p2 = k + 1;
  while (p2 < nums.length) {
    window.splice(nums[p1], 1);
    if (window.includes(nums[p2])) return true;
    window.push(nums[p2]);
    p1++;
    p2++;
  }
  return false;
};
