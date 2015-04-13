var findPivot = function(integerList){
	/*	
		Resolving edge cases: return -1 if
		- integerList is not an array
		- integerList has fewer than 3 integers
	*/
	if( integerList.constructor !== Array || integerList.length < 3 ){
		return -1;
	}
	
	/*
		Step 1:
		Find the total value of the integers in the array
		NOTE: If any value is not an integer, return -1
	*/
	var totalValue = 0;
	for(var i=0; i<integerList.length; i++){
		if(typeof integerList[i] === 'number' && (integerList[i]%1) === 0){
			totalValue += integerList[i];
		} else {
			return -1;
		}
	}

	/*
		Step 2:
		Working from the left of the array to the right, look for the pivot point:
		- If the left sum is greater than the right sum, the pivot point does not exist
		- If the left sum is equal to the right sum, the current index is the pivot point
		- If the left sum is less than the right sum, continue to the right
	*/
	var currentIndex = 0,
		leftSum = 0,
		rightSum = totalValue - leftSum - integerList[currentIndex];
		
	while(currentIndex < integerList.length){
		if(leftSum > rightSum) {
			return -1;
		} else if(leftSum == rightSum) {
			return currentIndex;
		} else {
			leftSum += integerList[currentIndex];
			currentIndex += 1;
			rightSum -= integerList[currentIndex];
		}
	}
}