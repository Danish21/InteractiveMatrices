$(document).ready(function(){

	////////////////////////////////////////////////Global variables
	// $("#myTable").
	$addButton = $("#addButton");
	$subtractButton = $("#subtractButton");
	$multiplyButton = $("#multiplyButton");
	$transposeButton = $("#transposeButton");
	$determinantButton2 = $("#determinant2by2Button");
	$determinantButton3 = $("#determinant3by3Button");
	$inverseButton2 = $("#inverse2by2Button");
	$inverseButton3 = $("#inverse3by3Button");
	$rrefButton = $("#rowEchelonFormButton");

	$resetButton =$("#resetButton");
	$updateMatrices= $("#updateMatrices"); //create Table button
	$calculateButton = $("#calculateButton");
	$animatedSolutionButton = $("#animatedSolutionButton");

	$dimensionInput = $(".dimensionInput");
	$dimensionInput1 = $(".dimensionInput1");
	$dimensionInput2 = $(".dimensionInput2");
	$AxBButton =$("#AxBButton");


	var state = 0;
	//0 for reset
	//1 for add 
	//2 for subtract
	//3 for multiply
	//4 for Transpose
	//5 for det2x2
	//6 for det3x3
	//7 for 2x2 Inverse
	//8 for 3x3 Inverse
	//9 for rref


	$tableLeft= ""; 
	$tableRight = "";
	$tableResults= "";
	$rowInput1 = $('#rowInput1'); //reading from row dimension box1
	$collumnInput1 = $("#collumnInput1");

	$rowInput2 = $('#rowInput2'); //reading from rowinput2
	$collumnInput2 = $("#collumnInput2");

	$xBox = $("#xBox"); //just multiply sign
	$equalBox = $("#equalBox"); //just stores equal sign
	$resultsBox =  $("#resultsBox"); //where results matrix is located

	$leftTableExists = false;
	$rightTableExists = false;
	$tableResultsExists = false;
	$multiplyBoxExists =false;
	$equalBoxExists =false;
	////////////////////////////////////////////////////////////Global Variables



	///////////////////////////////////////////////////////////Styling Logic
	function highlightRow(matrix, rowNumber, dimensionNumber){
		
		var rowLength = $("#rowInput"+ dimensionNumber).val();

		for(var j=1; j<=rowLength; j++){

			$("#"+matrix+rowNumber+j).css("background-color","yellow");

		}

		

	}

	function unHighlightRow(matrix, rowNumber, dimensionNumber){

		var rowLength = $("#rowInput"+ dimensionNumber).val();

		for(var j=1; j<=rowLength; j++){

			$("#"+matrix+rowNumber+j).css("background-color","white");

		}

	}

	function highlightCollumn(matrix, collumnNumber, dimensionNumber){
		
		var collumnLength = $("#collumnInput"+ dimensionNumber).val();

		for(var i=1; i<=collumnLength; i++){

			$("#"+matrix+i+collumnNumber).css("background-color","yellow");

		}

	}

	function unHighlightCollumn(matrix, collumnNumber, dimensionNumber){
		
		var collumnLength = $("#collumnInput"+ dimensionNumber).val();

		for(var i=1; i<=collumnLength; i++){

			$("#"+matrix+i+collumnNumber).css("background-color","white");

		}

	}

	function highlighCell(matrix, row, collumn){
		$("#"+matrix+row+collumn).css("background-color","yellow");
	}

	function highlighCellCustom(matrix, row, collumn, color){
		$("#"+matrix+row+collumn).css("background-color",color);
	}

	function unHighlightCell(matrix,row,collumn){
		$("#"+matrix+row+collumn).css("background-color","white");
	}


	function removeStyling(){
		if(state==1){
			$addButton.css("border","none");
		}else if(state==2){
			$subtractButton.css("border","none");
		}
		else if(state==3){
			$multiplyButton.css("border","none");
			$xBox.css("visibility","hidden");
			$equalBox.css("visibility","hidden");
		}
		else if(state==4){
			$transposeButton.css("border","none");
		}
		else if(state==5){
			$determinantButton2.css("border","none");
		}
		
		else if(state==6){
			$determinantButton3.css("border","none")
		}
		else if(state==7){
			$inverseButton2.css("border","none")
		}
		else if(state==8){
			$inverseButton3.css("border","none")
		}

		
	}
	function removeDimensionsReadOnly(){

		$rowInput1.prop('readonly', false);
		$collumnInput1.prop('readonly', false);
		$rowInput2.prop('readonly', false);
		$collumnInput2.prop('readonly', false);

	}
	function canAddSubtract(){
		if(  ($rowInput1.val() == $rowInput2.val()) &&  ($collumnInput1.val() == $collumnInput2.val()) ){
			return true;
		}
		return false;
	}

	function canMultiply(){
		if( $collumnInput1.val() == $rowInput2.val() ){
			return true;
		}

		return false;		
	}

	function canTranspose(){
		if( $collumnInput1.val() == $rowInput1.val() ){
			return true;
		}
		return false;
	}

	function leftMarixNotZero(){
		if( ($rowInput1.val()!=0)  && ($collumnInput1.val()!=0) ){
					return true;
		}
		return false;
	}

	function rightMatrixNotZero(){
		if( ($rowInput2.val()!=0)  && ($collumnInput2.val()!=0) ){
					return true;
		}
		return false;
	}
	function validDimensions(){

	}

	function makeDimensionsReadOnly(){
		$rowInput1.prop('readonly', true);
		$collumnInput1.prop('readonly', true);
		$rowInput2.prop('readonly', true);
		$collumnInput2.prop('readonly', true);
	}

	function makeRightDimensionsReadOnly(){
		$rowInput2.prop('readonly', true);
		$collumnInput2.prop('readonly', true);
	}

	function reset(){ // get rid of all tables
		
		removeStyling();
		$("#solutionBox").html('<h1 id="animationText"></h1>');
		 // if not multiply or determinant then replace readOnly
		removeDimensionsReadOnly();
		
		
		state =0;
		makeDimensionsAppear();

		if($leftTableExists){$("#myTable1").remove(); $leftTableExists=false;}
		if($rightTableExists){$("#myTable2").remove(); $rightTableExists=false;}
		$resultsBox.empty();

		$rowInput1.val(0); $rowInput2.val(0); $collumnInput1.val(0); $collumnInput2.val(0);
		
	}

	function clearResultsBox(){
		$resultsBox.empty();
	}

	function hideDimensionsInput(){
		$dimensionInput.css("visibility","hidden");
	}
	function makeDimensionsAppear(){
		$dimensionInput.css("visibility","visible");
	}
	function hideDimensions1Input(){
		$dimensionInput1.css("visibility","hidden");
	}
	function makeDimensions1Appear(){
		$dimensionInput1.css("visibility","visible");
	}
	function hideDimensions2(){
		$dimensionInput2.css("visibility","hidden");
	}
	function makeDimensions2Appear(){
		$dimensionInput2.css("visibility","visible");
	}


	function addLeftMatrix(){
		$("#myTable1").remove(); // empty current table because will create replacement

		$rowDim = $rowInput1.val();
		$collumnDim = $collumnInput1.val();
		////console.log($rowDim);
		////console.log($collumnDim);

		$tableLeft += '<table id ="myTable1" class="matrix">';

		for(var i=1; i <= $rowDim; i++){ //starting at one so coordinates line up
			
			$tableLeft += "<tr>";
			
			for( var j=1; j<= $collumnDim; j++){
				$tableLeft += '<td> <input class="matrixEntry" id="Left' + i + j + '"type="text">';
				$tableLeft += "</td>";
			}

			//for( var k=0; k< $collumnDim; k++){
			//	$tableLeft += "</td>";
			//}

			$tableLeft += "</tr>";
			

		}

		$tableLeft += "</table>";
		$("#tableBox1").append($tableLeft);
		$leftTableExists = true;
		$tableLeft="";
	}

	function makeLeftAugmented(){


		$("#myTable1").remove(); // empty current table because will create replacement

		$rowDim = parseInt($rowInput1.val());
		$collumnDim = parseInt($collumnInput1.val())+2;
		////console.log($rowDim);
		////console.log($collumnDim);

		$tableLeft += '<table id ="myTable1" class="matrix">';

		for(var i=1; i <= $rowDim; i++){ //starting at one so coordinates line up
			
			$tableLeft += "<tr>";
			

			for( var j=1; j<= $collumnDim; j++){
				
				if(j== ($collumnDim-1)  ){

					$tableLeft += '<td> </td>';

				}else{
					$tableLeft += '<td> <input class="matrixEntry" id="Left' + i + j + '"type="text">';
					$tableLeft += "</td>";
				}
			}


			//for( var k=0; k< $collumnDim; k++){
			//	$tableLeft += "</td>";
			//}

			$tableLeft += "</tr>";
			

		}

		$tableLeft += "</table>";
		$("#tableBox1").append($tableLeft);
		$leftTableExists = true;
		$tableLeft="";
	}


	function makeRightAugmented(){


		$("#myTable2").remove(); // empty current table
		// empty current table because will create replacement

		$rowDim = parseInt($rowInput2.val());
		$collumnDim = parseInt($collumnInput2.val())+2;
		////console.log($rowDim);
		////console.log($collumnDim);

		$tableRight += '<table id ="myTable2" class="matrix">';

		for(var i=1; i <= $rowDim; i++){ //starting at one so coordinates line up
			
			$tableRight += "<tr>";
			

			for( var j=1; j<= $collumnDim; j++){
				
				if(j== ($collumnDim-1)  ){

					$tableRight += '<td> </td>';

				}else{
					$tableRight += '<td> <input class="matrixEntry" id="right'+ i + j +'" type="text" >';
					$tableRight += "</td>";
				}
			}


			//for( var k=0; k< $collumnDim; k++){
			//	$tableRight += "</td>";
			//}

			$tableRight += "</tr>";
			

		}

		$tableRight += "</table>";
		$("#tableBox2").append($tableRight);
		$rightTableExists = true;
		$tableRight="";
	}

	function makeResultAugmented(){

		$("#myTable3").remove(); // empty current table because will create replacement

		$rowDim = parseInt($rowInput1.val());
		$collumnDim = parseInt($collumnInput1.val())+2;
		////console.log($rowDim);
		////console.log($collumnDim);

		$tableResults += '<table id ="myTable3" class="matrix">';

		for(var i=1; i <= $rowDim; i++){ //starting at one so coordinates line up
			
			$tableResults += "<tr>";
			

			for( var j=1; j<= $collumnDim; j++){
				
				if(j== ($collumnDim-1)  ){

					$tableResults += '<td> </td>';

				}else{
					$tableResults += '<td> <input class="matrixEntry" id="result' +i +j+ '" type="text" readonly>';
					$tableResults += "</td>";
				}
			}


			//for( var k=0; k< $collumnDim; k++){
			//	$tableResults += "</td>";
			//}

			$tableResults += "</tr>";
			

		}

		$tableResults += "</table>";
		$("#resultsBox").append($tableResults);
		$tableResultsExists =true;
		$tableResults="";




	}
	function addRightMatrix(){

		$("#myTable2").remove(); // empty current table

		$rowDim = $rowInput2.val();
		$collumnDim = $collumnInput2.val();
		////console.log($rowDim);
		////console.log($collumnDim);

		$tableRight += '<table id ="myTable2" class="matrix">';

		for(var i=1; i <= $rowDim; i++){
			
			$tableRight += "<tr>";
			
			for( var j=1; j<= $collumnDim; j++){
				$tableRight += '<td> <input class="matrixEntry" id="right'+ i + j +'" type="text" >';
				$tableRight += "</td>";
			}

			// for( var k=0; k< $collumnDim; k++){
			// 	// $tableRight += "</td>";
			// }

			$tableRight += "</tr>";
			

		}

		$tableRight += "</table>";
		$("#tableBox2").append($tableRight);
		$rightTableExists = true;
		$tableRight="";


	}

	function addResultsMatrix(rowDimension, collumnDimension){

		$("#myTable3").remove(); // empty current table

		$rowDim = rowDimension;
		$collumnDim = collumnDimension;
		

		$tableResults += '<table id ="myTable3" class="matrix">';

		for(var i=1; i <= $rowDim; i++){
			
			$tableResults += "<tr>";
			
			for( var j=1; j<= $collumnDim; j++){
				$tableResults += '<td> <input class="matrixEntry" id="result' +i +j+ '" type="text" readonly>';
				$tableResults += "</td>";
			}

			// for( var k=0; k< $collumnDim; k++){
			// 	// $tableResults += "</td>";
			// }

			$tableResults += "</tr>";
			

		}

		$tableResults += "</table>";
		$("#resultsBox").append($tableResults);
		$tableResultsExists =true;
		$tableResults="";

	}

	function copyLeftToResult(){

		var collumnCount = $collumnInput1.val();
		var rowCount = $rowInput1.val();

		for(var i= 1; i <= rowCount; i++){

			for(var j=1; j <=collumnCount; j++){

				var temp1 = parseFractions("#Left"+i+j);
				$("#result"+i+j).val(temp1);


			}

		}


	}

	function copyAugLeftToResult(){

		var collumnCount = parseInt($collumnInput1.val());
		var rowCount = parseInt($rowInput1.val());

		for(var i= 1; i <= rowCount; i++){

			for(var j=1; j <= (collumnCount+2); j++){
				if(j==(collumnCount+1)){continue;}
				var temp1 = parseFractions("#Left"+i+j);
				$("#result"+i+j).val(temp1);


			}

		}


	}

	function createDefaultMatrices(){
		addLeftMatrix();
		addRightMatrix();
		addResultsMatrix($rowInput1.val(), $collumnInput2.val());

	}

	/////////////////////////////////////////////////////////////////////////Styling Logic
	function parseFractions(inputId){
				//console.log(inputId);
				var inputString = $(inputId).val();
				
				var inputFrac = inputString.split("/");
				
				inputFrac[0]=parseFloat(inputFrac[0]);

				var output = inputFrac[0];
				
				if(typeof inputFrac[1] !== 'undefined'){
					inputFrac[1]=parseFloat(inputFrac[1]);
					output = inputFrac[0]/inputFrac[1];
				} 
				//console.log("ouput: "+ output);
				return output;

	}
	/////////////////////////////////////////////////////////////////////////Math Logic
	function switchRows(r1, r2 ){

		var collumnCount = $collumnInput1.val();

		for(var i =1; i<=collumnCount; i++){

			var temp1 = parseFractions("#result"+r1+i);
			var temp2 = parseFractions("#result"+r2+i);

			$("#result"+r1+i).val(temp2);
			$("#result"+r2+i).val(temp1);

		}

	}
	function rowEcheolonForm(){
		////console.log("hello");
		var rowCount = $rowInput1.val();
		var rowCountPlusOne = parseInt(rowCount) +1;
		var collumnCount = $collumnInput1.val();
		var collumnCountPlusOne = parseInt(collumnCount) +1;
		var lead = 1; //Pivot collumn

		copyLeftToResult();
		//1 2 3  -> 1 2 3 -> 1 2 3   ->  
		//2 4 6		2 4 6 	 0 0 0
		//7 8 9 	7 8 9    0 -6 -12


		for(var r=1; r<=rowCount; r++){

			if( (collumnCountPlusOne) <= lead){
				return;
			}


			var i = r;  //The pivot is always to the right of the 
			
			//Find the first row with the first collumn with a non zero entry
			////console.log(0);
			while(parseFractions("#result"+i+lead) == 0){ 

				i++; 
				
				////console.log("Outside and i: " + i +  " and r: "+r  + "and rowCount+1 = " );
				////console.log(rowCountPlusOne);
				if( (rowCountPlusOne) == i){ //if at the last row and everything in this collumn is zero then check the next collumn
					////console.log("Inside and i: " + i +  " and r: "+r );
					i=r; 
					lead++; 
					////console.log(lead)
					if( (collumnCountPlusOne) == lead){
						////console.log("result because full");
						return;
					}
				}

				
				////console.log(0);
			}
			////console.log("switchingRows " + r + " " + i);
			switchRows(i,r); //bring the row up and send the current row down
			////console.log(1);
			var val = parseFractions("#result"+r+lead); //Store the value of the pivot entry
			////console.log("val: "+ val + " and r " + r +  " and lead: " + lead);

			for(var j=1; j <= collumnCount; j++){ //Divide every entry in that collumn by val so the pivot entry is now one 
												//and the pivot collumn now store the multiples to multiple each row by,
												//which then subtracted from the cuur row will zero out everything below the pivot 
				////console.log(2);
				var temp1 = parseFractions("#result"+r+j) / val;

				////console.log("temp1: "+temp1);
				$("#result"+r+j).val(temp1);
			}

			for(var i =1; i <= rowCount; i++){ // Go through all the rows and subtract (each row * the multiple stored) from the curr row 
				if(i==r){
					continue; //Don't need to do anything to curr row
				}
				////console.log(3);
				val = parseFractions("#result"+i+lead); //Take the value from the curr pivot collumn of the row 

				for(var j =1; j <= collumnCount; j++){ 
					////console.log(4);
					var tempVal = parseFractions("#result"+i+j) - val*parseFractions("#result"+r+j);
					////console.log("tempVal: "+tempVal);
					$("#result"+i+j).val(tempVal);
				}
			}

			lead ++;
			//return;

		}


	}

	function ifPivotCollumn(r,c){

		var rowCount = parseInt($rowInput1.val());
		
		var collumnCount = parseInt( $collumnInput1.val() );
		
		var val = parseFractions("#result"+r+c);

		for(var i=1; i<=rowCount; i++){

			if(i==r){continue;}

			if(parseFractions("#result"+i+c)!=0){
				return false;
			}
		}

		return true;
	}


	function printAXBreduceSolutions(){

		$("#solutionBox").html ("");
		var rowCount = parseInt($rowInput1.val());
		var collumnCount = parseInt( $collumnInput1.val() );

		var freeVariablesList = [];
		for(var i=1; i<=collumnCount; i++){
			freeVariablesList[i]=false;
		}

		for(var r=1; r<=collumnCount; r++){
			//console.log("r:"+r);
			//console.log("In solution");

			
			var pivotCount = 0;
			var pivotLoc = 0;

			var freeVariables= [];
			var freeVariablesLoc=[];
			var amountOfFreeVariables = 0;
			

			for(var j=1; j<=collumnCount; j++ ){

				var val = parseFractions("#result"+r+j);

				if(val==1){
					if(ifPivotCollumn(r, j)){
						pivotLoc = j;
						pivotCount++;
					}else{
						freeVariables[amountOfFreeVariables] = val;
						freeVariablesLoc[amountOfFreeVariables] = j;
						amountOfFreeVariables++;
					}
				}
				else if(val!=0){
					freeVariables[amountOfFreeVariables] = val;
					freeVariablesLoc[amountOfFreeVariables] = j;
					amountOfFreeVariables++;
				}


			}

			if( (pivotCount>0) && (amountOfFreeVariables==0) ){
				console.log(1);
				//console.log("amountOfFreeVariables: " + amountOfFreeVariables)
				$("#solutionBox").append("<p>"+ "x"+ pivotLoc + " = " + parseFractions("#result"+r+ (collumnCount+2) ) +"</p>"  );

			}
			else if( (pivotCount>0) && (amountOfFreeVariables>0) ){
				console.log(1);
				$("#solutionBox").append ('<p id="p' +r+ '">' + "x"+ pivotLoc + " = " + parseFractions("#result"+r+ (collumnCount+2)  )+"</p>" );
				
				for(var i=0; i< amountOfFreeVariables; i++){
					if(freeVariables[i] > 0){
						$("#p"+r).append(  " - " +freeVariables[i] + "x"+ freeVariablesLoc[i]);
					}else{
						$("#p"+r).append(  " + " + (freeVariables[i] *-1) + "x"+ freeVariablesLoc[i]);
					}
					//console.log(freeVariablesLoc)
					if(freeVariablesList[freeVariablesLoc[i]]==false){
						$("#solutionBox").append ('<p>' + "x"+ freeVariablesLoc[i] + " = " + "x"+ freeVariablesLoc[i] +"</p>" );
						freeVariablesList[freeVariablesLoc] = true;
					}
				}

			}

			else if( (amountOfFreeVariables>0) ){
				//console.log(3);
				for(var i=0; i< amountOfFreeVariables; i++){

					$("#solutionBox").append( "<p>" + "+ " +freeVariables[i] + "x"+ freeVariablesLoc[i] +"</p>" );

				}

			} else{
				//console.log(4);
				//$("#solutionBox").append("<p> Nothing Printed </p>" );
			}



		}



	}

	function AXBReduce(){
		////console.log("hello");
		var rowCount = parseInt($rowInput1.val());
		var rowCountPlusOne = rowCount + 1;
		var collumnCount = parseInt( $collumnInput1.val() );
		var collumnCountPlusOne = collumnCount + 1;
		var lead = 1; //Pivot collumn

		copyAugLeftToResult();
		//1 2 3  -> 1 2 3 -> 1 2 3   ->  
		//2 4 6		2 4 6 	 0 0 0
		//7 8 9 	7 8 9    0 -6 -12


		for(var r=1; r<=rowCount; r++){

			if( (collumnCountPlusOne) <= lead){
				printAXBreduceSolutions();
				return;
			}


			var i = r;  //The pivot is always to the right of the 
			
			//Find the first row with the first collumn with a non zero entry
			////console.log(0);
			while(parseFractions("#result"+i+lead) == 0){ 

				i++; 
				
				////console.log("Outside and i: " + i +  " and r: "+r  + "and rowCount+1 = " );
				////console.log(rowCountPlusOne);
				if( (rowCountPlusOne) == i){ //if at the last row and everything in this collumn is zero then check the next collumn
					////console.log("Inside and i: " + i +  " and r: "+r );
					i=r; 
					lead++; 
					////console.log(lead)
					if( (collumnCountPlusOne) == lead){
						////console.log("result because full");
						printAXBreduceSolutions();
						return;
					}
				}

				
				////console.log(0);
			}
			////console.log("switchingRows " + r + " " + i);
			switchRows(i,r); //bring the row up and send the current row down
			////console.log(1);
			var val = parseFractions("#result"+r+lead); //Store the value of the pivot entry
			////console.log("val: "+ val + " and r " + r +  " and lead: " + lead);

			for(var j=1; j <= collumnCount+2; j++){ //Divide every entry in that collumn by val so the pivot entry is now one 
												//and the pivot collumn now store the multiples to multiple each row by,
												//which then subtracted from the cuur row will zero out everything below the pivot 
				////console.log(2);
				if(j==collumnCountPlusOne){continue;}
				var temp1 = parseFractions("#result"+r+j) / val;

				//console.log("temp1: "+temp1);
				$("#result"+r+j).val(temp1);
			}

			for(var i =1; i <= rowCount; i++){ // Go through all the rows and subtract (each row * the multiple stored) from the curr row 
				if(i==r){
					continue; //Don't need to do anything to curr row
				}
				////console.log(3);
				val = parseFractions("#result"+i+lead); //Take the value from the curr pivot collumn of the row 

				for(var j =1; j <= collumnCount+2; j++){ 
					////console.log(4);
					if(j == collumnCountPlusOne){continue;}

					var tempVal = parseFractions("#result"+i+j) - val*parseFractions("#result"+r+j);
					//console.log("tempVal: "+tempVal);
					$("#result"+i+j).val(tempVal);
				}



			}

			lead ++;
			//return;

		}

		//If a row has just one pivot collumns then we know the value of that variable and no other non zero entries
			//if a row has a pivot collumn, but other zero entries then we can solve for the pivot collumn in terms of the other varaibels
			//if there are no pivot collumns then we can leave it as free variables each some value
		
		printAXBreduceSolutions();

	}
	function scalarMultiply(matrix,scalar,rowDim,collumnDim){

		

		for(var i=1; i<=$rowDim; i++){

			for(var j=1; j<=$collumnDim; j++){
				//row i of left times collumn j of right
				var originalVal = parseFractions("#"+matrix+i+j);
			 	//var finalOutputFrac = new Fraction(finalOutput);
				$("#"+matrix+i+j).val(scalar * originalVal);
				
			}

		}

	}
	

	function addMatrices(){

		$rowDim = $rowInput1.val();
		$collumnDim = $collumnInput2.val();

		for(var i=1; i<=$rowDim; i++){

			for(var j=1; j<=$collumnDim; j++){
				//row i of left times collumn j of right
				var leftInput = parseFractions("#Left"+i+j);
				var rightInput = parseFractions("#right"+i+j);
			 	
			 	var finalOutput = leftInput + rightInput;
			 	//var finalOutputFrac = new Fraction(finalOutput);
				$("#result"+i+j).val(finalOutput);
				
			}

		}


	}

	
	function subtractMatrices(){
		$rowDim = $rowInput1.val();
		$collumnDim = $collumnInput2.val();

		for(var i=1; i<=$rowDim; i++){

			for(var j=1; j<=$collumnDim; j++){
				//row i of left times collumn j of right
				var leftInput = parseFractions("#Left"+i+j);
				var rightInput = parseFractions("#right"+i+j);
				var finalOutput = leftInput - rightInput;
				$("#result"+i+j).val(finalOutput);
			}

		}

	}


	function multiplyMatrices(){

		$rowDim = $rowInput1.val();
		$collumnDim = $collumnInput2.val();
		
		// $resultVal = $("#result11").val();
		// ////console.log($resultVal);

		// $("#result"+i+j).val(10);
		//////console.log("collumnInput1: " + $collumnInput1.val());
		
		for(var i=1; i<=$rowDim; i++){
			

			for(var j=1; j<=$collumnDim; j++){
				//row i of left times collumn j of right
				var sum =0;
				highlightRow("Left",i,1);
				highlightCollumn("right",j,2);
				for(var k=1; k<=$collumnInput1.val(); k++) {
					
					var leftInput = parseFractions("#Left"+i+k);
					var rightInput = parseFractions("#right"+k+j);

					sum+= leftInput * rightInput;
					//sum+= equals ik * kj
				}
				$("#result"+i+j).val(sum);	
				
			}

		}


	}

	

	function takeTransposeLeft(){
		
		$rowDim = $collumnInput1.val();
		$collumnDim = $rowInput1.val();
		
		// $resultVal = $("#result11").val();
		// ////console.log($resultVal);

		// $("#result"+i+j).val(10);
		//////console.log("collumnInput1: " + $collumnInput1.val());
		
		for(var i=1; i<=$rowDim; i++){

			for(var j=1; j<=$collumnDim; j++){
				//row i of left times collumn j of right
				var matchValue = parseFractions("#Left"+j+i);
				$("#result"+i+j).val(matchValue);
			}

		}
	}

	function takeResultTranspose(){
		$rowDim = $collumnInput1.val();
		$collumnDim = $rowInput1.val();
		
		// $resultVal = $("#result11").val();
		// ////console.log($resultVal);

		// $("#result"+i+j).val(10);
		//////console.log("collumnInput1: " + $collumnInput1.val());
		
		
				//row i of left times collumn j of right
			var matchValue1 = parseFractions("#result"+1+1);
			var matchValue2 = parseFractions("#result"+1+2);
			var matchValue3 = parseFractions("#result"+1+3);
			var matchValue4 = parseFractions("#result"+2+1);
			var matchValue5 = parseFractions("#result"+2+2);
			var matchValue6 = parseFractions("#result"+2+3);
			var matchValue7 = parseFractions("#result"+3+1);
			var matchValue8 = parseFractions("#result"+3+2);
			var matchValue9 = parseFractions("#result"+3+3);

			$("#result"+1+1).val(matchValue1);
			$("#result"+1+2).val(matchValue4);
			$("#result"+1+3).val(matchValue7);
			$("#result"+2+1).val(matchValue2);
			$("#result"+2+2).val(matchValue5);
			$("#result"+2+3).val(matchValue8);
			$("#result"+3+1).val(matchValue3);
			$("#result"+3+2).val(matchValue6);
			$("#result"+3+3).val(matchValue9);
		
	
	}

	function determinant2by2(a,b,c,d){
		var result = (a * d) - (b * c);
		return result; 
	}

	function determinant3by3(){
		var det1 = determinant2by2( parseFractions("#Left22"), parseFractions("#Left23"), parseFractions("#Left32"), parseFractions("#Left33") );
		var det2 = determinant2by2( parseFractions("#Left21"), parseFractions("#Left23"), parseFractions("#Left31"), parseFractions("#Left33") );
		var det3 = determinant2by2( parseFractions("#Left21"), parseFractions("#Left22"), parseFractions("#Left31"), parseFractions("#Left32") );

		var mDet1 = det1 * parseFractions("#Left11");
		var mDet2 = det2 * parseFractions("#Left12") * -1;
		var mDet3 = det3 * parseFractions("#Left13");

		var mDet = mDet1 + mDet2 + mDet3;
		return mDet;
	}
	function takeDeterminant2by2(){
		var det = determinant2by2(parseFractions("#Left11"), parseFractions("#Left12"), parseFractions("#Left21"), parseFractions("#Left22") );

		alert("determinant is: "+det);
		//$resultsDiv = '<div id= "determinantResult"> <h1> The determinant is:'+ det+ '</h1></div>';
		//$("#resultsBox").append($resultsDiv);

	}


	function take2by2Inverse(){
		var det = determinant2by2( parseFractions("#Left11"), parseFractions("#Left12"), parseFractions("#Left21"), parseFractions("#Left22") );

		if(det!=0){
			var flippedDet = 1/det;
			var res11 = flippedDet * parseFractions("#Left22");
			var res22 = flippedDet * parseFractions("#Left11");
			var res12 = flippedDet * parseFractions("#Left12") * -1;
			var res21 = flippedDet * parseFractions("#Left21") * -1;
			$("#result11").val(res11);
			$("#result12").val(res12);
			$("#result21").val(res21);
			$("#result22").val(res22);

		}else{
			alert("Inverse is Undefined as the Determinant is 0");
		}
	}
	
	function takeDeterminant3by3(){
		
		var mDet = determinant3by3();
		alert("Determinant is: "+mDet);
		// $resultsDiv = '<div id= "determinantResult"> <h1> The determinant is:'+ mdet+ '</h1></div>';
		// $("#resultsBox").append($resultsDiv);

	}

	function takeInverse3by3(){
		var mDet = determinant3by3();

		if(mDet!=0){
			var flippedDet = 1/mDet;

			var det1 = determinant2by2( parseFractions("#Left22"), parseFractions("#Left23"), parseFractions("#Left32"), parseFractions("#Left33") ); //* flippedDet;
			var det2 = determinant2by2( parseFractions("#Left21"), parseFractions("#Left23"), parseFractions("#Left31"), parseFractions("#Left33") ) * -1;// * flippedDet * -1;
			var det3 = determinant2by2( parseFractions("#Left21"), parseFractions("#Left22"), parseFractions("#Left31"), parseFractions("#Left32") );// * flippedDet;
			var det4 = determinant2by2( parseFractions("#Left12"), parseFractions("#Left13"), parseFractions("#Left32"), parseFractions("#Left33") ) * -1;// * flippedDet *-1;
			var det5 = determinant2by2( parseFractions("#Left11"), parseFractions("#Left13"), parseFractions("#Left31"), parseFractions("#Left33") );// * flippedDet;
			var det6 = determinant2by2( parseFractions("#Left11"), parseFractions("#Left12"), parseFractions("#Left31"), parseFractions("#Left32") ) * -1;// * flippedDet *-1;
			var det7 = determinant2by2( parseFractions("#Left12"), parseFractions("#Left13"), parseFractions("#Left22"), parseFractions("#Left23") );// * flippedDet;
			var det8 = determinant2by2( parseFractions("#Left11"), parseFractions("#Left13"), parseFractions("#Left21"), parseFractions("#Left23") ) * -1;// * flippedDet *-1;
			var det9 = determinant2by2( parseFractions("#Left11"), parseFractions("#Left12"), parseFractions("#Left21"), parseFractions("#Left22") );// * flippedDet;

			$("#result11").val(det1+"/"+mDet);
			$("#result12").val(det4/mDet);
			$("#result13").val(det7/mDet);
			$("#result21").val(det2/mDet);
			$("#result22").val(det5/mDet);
			$("#result23").val(det8/mDet);
			$("#result31").val(det3/mDet);
			$("#result32").val(det6/mDet);
			$("#result33").val( (det9/mDet).toPrecision(5));

			//takeTransposeLeft();
			alert("The determinant is"+ mDet);      
		}else{
			alert("Inverse is Undefined as the Determinant is 0");
		}
		
	}
	////////////////////////////////////////////////////////////////////Math Logic

	/////////////////////////////////////////////////////////////////////animated Math
	function animatedTranspose(){
		$("#solutionBox").html('<h3 id="animationText">In the transpose matrix entry ij = extry ji</h3>');
		$rowDim = $rowInput1.val();
		$collumnDim = $collumnInput1.val();
		var row = 1; var collumn = 0;
		var rowPrev = 1; var collumnPrev=0;
		var stop = 0;


		function frame(){
			if(stop==0){

				collumn++;
				unHighlightCell("result",rowPrev,collumnPrev);
				unHighlightCell("Left",collumnPrev,rowPrev); //unHighlight old cells

				highlighCell("result",row,collumn);
				highlighCell("Left",collumn,row); //highlight new cells

				var matchValue = parseFractions("#Left"+collumn+row);
				$("#result"+row+collumn).val(matchValue);
			 	
			 	$("#solutionBox").html('<h3 id="animationText">In the transpose matrix entry ij = extry ji</h3><h5>For example entry in row ' + collumn +  ' and collumn ' + row +  ' in the original matrix will be in row ' + row + ' and collumn ' +collumn + ' in the transposed matrix</h5>');
				
				collumnPrev = collumn;
				rowPrev = row;

				if( (row==$rowDim) && (collumn == $collumnDim)  ){
						 stop=1;
				}
					

				if(collumn==$collumnDim){
						row++;
						collumn=0;
				}

			}else{
				unHighlightCell("result",rowPrev,collumnPrev);
				unHighlightCell("Left",collumnPrev,rowPrev); //unHighlight old cells
				clearInterval(id);
			}
			
		}

		var id = setInterval(frame, 3000) // draw every 3seconds

	}

	function animatedAdd(){
		$("#solutionBox").html('<h1 id="animationText"></h1>');
		$rowDim = $rowInput1.val();
		$collumnDim = $collumnInput2.val();
		var row = 1; var collumn = 0;
		var rowPrev = 1; var collumnPrev=0;
		var stop = 0;


		function frame(){
			if(stop==0){

				collumn++;
				unHighlightCell("Left",rowPrev,collumnPrev); //unHighlight old cells
				unHighlightCell("right",rowPrev,collumnPrev);
				unHighlightCell("result",rowPrev,collumnPrev);

				highlighCell("Left",row,collumn); //highlight new cells
				highlighCell("right",row,collumn);
				highlighCell("result",row,collumn);

				var leftInput = parseFractions("#Left"+row+collumn); //get inputs and add
				var rightInput = parseFractions("#right"+row+collumn);
				var finalOutput = leftInput + rightInput;
				$("#result"+row+collumn).val(finalOutput);
				var outputString = leftInput + " + " + rightInput + " = " + finalOutput ;
			 	
			 	$("#animationText").html(outputString );
				
				collumnPrev = collumn;
				rowPrev = row;

				if( (row==$rowDim) && (collumn == $collumnDim)  ){
						 stop=1;
				}
					

				if(collumn==$collumnDim){
						row++;
						collumn=0;
				}

			}else{
				unHighlightCell("Left",rowPrev,collumnPrev);
				unHighlightCell("right",rowPrev,collumnPrev);
				unHighlightCell("result",rowPrev,collumnPrev);
				$("#animationText").html("" );
				clearInterval(id);
			}
			
		}

		var id = setInterval(frame, 3000) // draw every 3seconds

	}

	function animatedSubtract(){
		$("#solutionBox").html('<h1 id="animationText"></h1>');;
		$rowDim = $rowInput1.val();
		$collumnDim = $collumnInput2.val();
		var row = 1; var collumn = 0;
		var rowPrev = 1; var collumnPrev=0;
		var stop = 0;


		function frame(){
			if(stop==0){

				collumn++;
				unHighlightCell("Left",rowPrev,collumnPrev); //unHighlight old cells
				unHighlightCell("right",rowPrev,collumnPrev);
				unHighlightCell("result",rowPrev,collumnPrev);

				highlighCell("Left",row,collumn); //highlight new cells
				highlighCell("right",row,collumn);
				highlighCell("result",row,collumn);

				var leftInput = parseFractions("#Left"+row+collumn); //get inputs and add
				var rightInput = parseFractions("#right"+row+collumn);
				var finalOutput = leftInput - rightInput;
				$("#result"+row+collumn).val(finalOutput);
			 	
			 	var outputString = leftInput + " - " + rightInput + " = " + finalOutput ;
			 	$("#animationText").html(outputString );
				
				collumnPrev = collumn;
				rowPrev = row;

				if( (row==$rowDim) && (collumn == $collumnDim)  ){
						 stop=1;
				}
					

				if(collumn==$collumnDim){
						row++;
						collumn=0;
				}

			}else{
				unHighlightCell("Left",rowPrev,collumnPrev);
				unHighlightCell("right",rowPrev,collumnPrev);
				unHighlightCell("result",rowPrev,collumnPrev);
				$("#animationText").html("" );
				clearInterval(id);
			}
			
		}

		var id = setInterval(frame, 3000) // draw every 3seconds

	}


	function animatedMultiplyMatrices(){
		$("#solutionBox").html('<h1 id="animationText"></h1>');
		$rowDim = $rowInput1.val();
		$collumnDim = $collumnInput2.val();
		var row = 1; var collumn = 0;
		var rowPrev = 1; var collumnPrev=1;
		var stop =0;
		function frame(){
			if(stop ==0){
				unHighlightRow("Left",rowPrev,1);
				unHighlightCollumn("right",collumnPrev,2);
				unHighlightCell("result",rowPrev,collumnPrev);

				collumn++;

				highlightRow("Left",row,1);
				highlightCollumn("right",collumn,2);

				var sum =0;
				
				$("#animationText").html("");
				for(var k=1; k<=$collumnInput1.val(); k++) {
						
					var leftInput = parseFractions("#Left"+row+k);
					var rightInput = parseFractions("#right"+k+collumn);

					sum+= leftInput * rightInput;
					if(k!=$collumnInput1.val()){
						var outputString = "( " + leftInput + " * " + rightInput + " )" + " + " ;
					}else{
						var outputString = "( " + leftInput + " * " + rightInput + " )" ;
					}
			 		$("#animationText").append(outputString );
						//sum+= equals ik * kj
				}
				$("#animationText").append("<p> Total = " + sum + "</p>" );
				$("#result"+row+collumn).val(sum);	
				highlighCell("result",row,collumn);
				collumnPrev = collumn;
				rowPrev = row;

				if( (row==$rowDim) && (collumn == $collumnDim)  ){
					 stop=1;
				}
				

				if(collumn==$collumnDim){
					row++;
					collumn=0;
				}

			}else{
				clearInterval(id);
				unHighlightRow("Left",$rowInput1.val(),1);
		 		unHighlightCollumn("right",$collumnInput2.val(),2);
		 		unHighlightCell("result",$rowInput1.val(),$collumnInput2.val());
		 		$("#animationText").html("");
			}
			

		}

		 var id = setInterval(frame, 3000) // draw every 10ms
		 

	}

	
	function animatedDeterminant2by2(){
		$("#solutionBox").html('<h3 id="animationText"></h3>');
		highlighCell("Left",1,1);
		highlighCell("Left",2,2);
		$("#animationText").html(" Determinant = ( a x d )-( b x c ) = ");
		$("#animationText").append("( " + parseFractions("#Left11") + " x " + parseFractions("#Left22") + " )");

		function step2(){
			
			function step3(){

				unHighlightCell("Left",1,2);
				unHighlightCell("Left",2,1);
				clearInterval(id2);
				var det = determinant2by2(parseFractions("#Left11"), parseFractions("#Left12"), parseFractions("#Left21"), parseFractions("#Left22") );
				$("#animationText").append(" = " + det);

				function step4(){

					clearInterval(id3);
					$("#animationText").html("");

				}

				var id3 =  setInterval(step4, 3000);

			}

			unHighlightCell("Left",1,1);
			unHighlightCell("Left",2,2);
			highlighCell("Left",1,2);
			highlighCell("Left",2,1);
			$("#animationText").append(" + ( " + parseFractions("#Left12") + " x " + parseFractions("#Left21") + " )");
			clearInterval(id);
			var id2 =  setInterval(step3, 3000);


		}
		var id = setInterval(step2, 3000);

	}
	function animatedDeterminant3by3(){
		$("#solutionBox").html("");
		var det1 = 0; var det2=0; var det3 = 0;
		highlighCellCustom("Left",1,1, "blue");
		highlighCell("Left",2,2);
		highlighCell("Left",2,3);
		highlighCell("Left",3,2);
		highlighCell("Left",3,3);
		
		det1 = parseFractions("#Left11") * determinant2by2(parseFractions("#Left22"), parseFractions("#Left23"), parseFractions("#Left32"), parseFractions("#Left33") );
		$("#solutionBox").append("<p>" + "Subdeterminant1 = " + parseFractions("#Left11") + " x (" + parseFractions("#Left22") + " x " + parseFractions("#Left33") + " )" + " - ( " + parseFractions("#Left23") + " x " + parseFractions("#Left32") + " ) = " + det1 + "</p>");


		function step2(){

			unHighlightCell("Left",1,1);
			unHighlightCell("Left",2,2);
			unHighlightCell("Left",2,3);
			unHighlightCell("Left",3,2);
			unHighlightCell("Left",3,3);

			highlighCellCustom("Left",1,2,"blue");
			highlighCell("Left",2,1);
			highlighCell("Left",2,3);
			highlighCell("Left",3,1);
			highlighCell("Left",3,3);
			det2 = parseFractions("#Left12") * determinant2by2(parseFractions("#Left21"), parseFractions("#Left23"), parseFractions("#Left31"), parseFractions("#Left33") );
			$("#solutionBox").append("<p>" + "Subdeterminant2 = " + parseFractions("#Left12") + " x (" + parseFractions("#Left21") + " x " + parseFractions("#Left33") + " )" + " - ( " + parseFractions("#Left23") + " x " + parseFractions("#Left31") + " ) = " + det2 + "</p>");
			function step3(){

				unHighlightCell("Left",1,2);
				unHighlightCell("Left",2,1);
				unHighlightCell("Left",2,3);
				unHighlightCell("Left",3,1);
				unHighlightCell("Left",3,3);

				highlighCellCustom("Left",1,3,"blue");
				highlighCell("Left",2,1);
				highlighCell("Left",2,2);
				highlighCell("Left",3,1);
				highlighCell("Left",3,2);

				det3 = parseFractions("#Left13") *determinant2by2(parseFractions("#Left21"), parseFractions("#Left22"), parseFractions("#Left31"), parseFractions("#Left32") );
				$("#solutionBox").append("<p>" + "Subdeterminant3 = " + parseFractions("#Left13") + " x (" + parseFractions("#Left21") + " x " + parseFractions("#Left32") + " )" + " - ( " + parseFractions("#Left22") + " x " + parseFractions("#Left31") + " ) = " + det3 + "</p>");

				function step4(){
					var overallDet = det1 - det2 +  det3;
					$("#solutionBox").append("<p> The determinant is " + det1 + " - " + det2 + " + " + det3 + " = " + overallDet + "</p>" );
					unHighlightCell("Left",1,3);
					unHighlightCell("Left",2,1);
					unHighlightCell("Left",2,2);
					unHighlightCell("Left",3,1);
					unHighlightCell("Left",3,2);
					clearInterval(id3);
					//takeDeterminant3by3();


				}

				clearInterval(id2);
				
				var id3 =  setInterval(step4, 3000);

			}

			

			clearInterval(id);
			var id2 =  setInterval(step3, 3000);


		}
		var id = setInterval(step2, 3000);


	}

	function animatedInverse2by2(){
		$("#solutionBox").html("");
		var det = determinant2by2( parseFractions("#Left11"), parseFractions("#Left12"), parseFractions("#Left21"), parseFractions("#Left22") );

		if(det!=0){
			flippedDet = 1/det;
			$("#solutionBox").append("<p> Swap the first diagnol entries</p>" );
			highlighCellCustom("Left",1,1,"blue");
			highlighCellCustom("Left",2,2,"red");
			highlighCellCustom("result",1,1,"red");
			highlighCellCustom("result",2,2,"blue");
			var res11 = parseFractions("#Left22");
			var res22 = parseFractions("#Left11");
			$("#result11").val(res11);
			$("#result22").val(res22);

			function step2(){

				unHighlightCell("Left",1,1);
				unHighlightCell("Left",2,2);
				unHighlightCell("result",1,1);
				unHighlightCell("result",2,2);

				highlighCellCustom("Left",1,2,"blue");
				highlighCellCustom("Left",2,1,"red");
				highlighCellCustom("result",1,2,"blue");
				highlighCellCustom("result",2,1,"red");

				var res12 = parseFractions("#Left12") * -1;
				var res21 = parseFractions("#Left21") * -1;
				$("#solutionBox").append("<p> Multiply the opposite diagnol entries by -1</p>" );

				$("#result12").val(res12);
				$("#result21").val(res21);
			

				function step3(){
					scalarMultiply("result",flippedDet,2,2);
					$("#solutionBox").append("<p> Multiply the matrix by 1 over the determinant which in this case is 1 " +"/ "+ det + "</p>" );
					unHighlightCell("Left",1,2);
					unHighlightCell("Left",2,1);
					unHighlightCell("result",1,2);
					unHighlightCell("result",2,1);

					clearInterval(id2)
				}

				clearInterval(id);
				var id2 = setInterval(step3, 3000);
			}

			var id = setInterval(step2, 3000);

		}else{
			alert("Inverse is Undefined as the Determinant is 0");
		}



	}

	function animatedInverse3by3(){
		$("#solutionBox").html("");
		var det1 = 0; var det2=0; var det3 = 0; var det4=0; var det5 = 0; var det6=0; var det7=0; var det8=0; var det9=0;
		highlighCellCustom("result",1,1, "blue");
		highlighCell("Left",2,2);
		highlighCell("Left",2,3);
		highlighCell("Left",3,2);
		highlighCell("Left",3,3);
		
		det1 = determinant2by2(parseFractions("#Left22"), parseFractions("#Left23"), parseFractions("#Left32"), parseFractions("#Left33") );
		$("#solutionBox").append("<p>" + "Subdeterminant1 = ( " + parseFractions("#Left22") + " x " + parseFractions("#Left33") + " )" + " - ( " + parseFractions("#Left23") + " x " + parseFractions("#Left32") + " ) = " + det1 + "</p>");
		$("#result11").val(det1);

		function step2(){

			unHighlightCell("result",1,1);
			unHighlightCell("Left",2,2);
			unHighlightCell("Left",2,3);
			unHighlightCell("Left",3,2);
			unHighlightCell("Left",3,3);

			highlighCellCustom("result",1,2,"blue");
			highlighCell("Left",2,1);
			highlighCell("Left",2,3);
			highlighCell("Left",3,1);
			highlighCell("Left",3,3);
			det2 =  determinant2by2(parseFractions("#Left21"), parseFractions("#Left23"), parseFractions("#Left31"), parseFractions("#Left33") );
			$("#solutionBox").append("<p>" + "Subdeterminant2 = ( " + parseFractions("#Left21") + " x " + parseFractions("#Left33") + " )" + " - ( " + parseFractions("#Left23") + " x " + parseFractions("#Left31") + " ) = " + det2 + "</p>");
			$("#result12").val(det2);
			function step3(){

				unHighlightCell("result",1,2);
				unHighlightCell("Left",2,1);
				unHighlightCell("Left",2,3);
				unHighlightCell("Left",3,1);
				unHighlightCell("Left",3,3);

				highlighCellCustom("result",1,3,"blue");
				highlighCell("Left",2,1);
				highlighCell("Left",2,2);
				highlighCell("Left",3,1);
				highlighCell("Left",3,2);

				det3 = parseFractions("#Left13") *determinant2by2(parseFractions("#Left21"), parseFractions("#Left22"), parseFractions("#Left31"), parseFractions("#Left32") );
				$("#solutionBox").append("<p>" + "Subdeterminant3 = ( "  + parseFractions("#Left21") + " x " + parseFractions("#Left32") + " )" + " - ( " + parseFractions("#Left22") + " x " + parseFractions("#Left31") + " ) = " + det3 + "</p>");
				$("#result13").val(det3);

				function step4(){
					unHighlightCell("result",1,3);
					unHighlightCell("Left",2,1);
					unHighlightCell("Left",2,2);
					unHighlightCell("Left",3,1);
					unHighlightCell("Left",3,2);

					highlighCellCustom("result",2,1,"blue");
					highlighCell("Left",1,2);
					highlighCell("Left",1,3);
					highlighCell("Left",3,2);
					highlighCell("Left",3,3);

					det4 = determinant2by2(parseFractions("#Left12"), parseFractions("#Left13"), parseFractions("#Left32"), parseFractions("#Left33") );
					$("#solutionBox").append("<p>" + "Subdeterminant4 = ( "  + parseFractions("#Left12") + " x " + parseFractions("#Left33") + " )" + " - ( " + parseFractions("#Left32") + " x " + parseFractions("#Left13") + " ) = " + det4 + "</p>");
					$("#result21").val(det4);

					function step5(){
						
						unHighlightCell("result",2,1);
						unHighlightCell("Left",1,2);
						unHighlightCell("Left",1,3);
						unHighlightCell("Left",3,2);
						unHighlightCell("Left",3,3);

						highlighCellCustom("result",2,2,"blue");
						highlighCell("Left",1,1);
						highlighCell("Left",1,3);
						highlighCell("Left",3,1);
						highlighCell("Left",3,3);

						det5 = determinant2by2(parseFractions("#Left11"), parseFractions("#Left13"), parseFractions("#Left31"), parseFractions("#Left33") );
						$("#solutionBox").append("<p>" + "Subdeterminant5 = (" + parseFractions("#Left11") + " x " + parseFractions("#Left33") + " )" + " - ( " + parseFractions("#Left31") + " x " + parseFractions("#Left13") + " ) = " + det5 + "</p>");
						$("#result22").val(det5);

						function step6(){
						
							unHighlightCell("result",2,2);
							unHighlightCell("Left",1,1);
							unHighlightCell("Left",1,3);
							unHighlightCell("Left",3,1);
							unHighlightCell("Left",3,3);

							highlighCellCustom("result",2,3,"blue");
							highlighCell("Left",1,1);
							highlighCell("Left",1,2);
							highlighCell("Left",3,1);
							highlighCell("Left",3,2);

							det6 = determinant2by2(parseFractions("#Left11"), parseFractions("#Left12"), parseFractions("#Left31"), parseFractions("#Left32") );
							$("#solutionBox").append("<p>" + "Subdeterminant6 = (" + parseFractions("#Left11") + " x " + parseFractions("#Left32") + " )" + " - ( " + parseFractions("#Left31") + " x " + parseFractions("#Left12") + " ) = " + det6 + "</p>");
							$("#result23").val(det6);

							function step7(){


								unHighlightCell("result",2,3);
								unHighlightCell("Left",1,1);
								unHighlightCell("Left",1,2);
								unHighlightCell("Left",3,1);
								unHighlightCell("Left",3,2);

								highlighCellCustom("result",3,1,"blue");
								highlighCell("Left",1,2);
								highlighCell("Left",1,3);
								highlighCell("Left",2,2);
								highlighCell("Left",2,3);

								det7 = determinant2by2(parseFractions("#Left12"), parseFractions("#Left13"), parseFractions("#Left22"), parseFractions("#Left23") );
								$("#solutionBox").append("<p>" + "Subdeterminant7 = (" + parseFractions("#Left12") + " x " + parseFractions("#Left23") + " )" + " - ( " + parseFractions("#Left22") + " x " + parseFractions("#Left13") + " ) = " + det7 + "</p>");
								$("#result31").val(det7);

								function step8(){


									unHighlightCell("result",3,1);
									unHighlightCell("Left",1,2);
									unHighlightCell("Left",1,3);
									unHighlightCell("Left",2,2);
									unHighlightCell("Left",2,3);

									highlighCellCustom("result",3,2,"blue");
									highlighCell("Left",1,1);
									highlighCell("Left",1,3);
									highlighCell("Left",2,1);
									highlighCell("Left",2,3);

									det8 = determinant2by2(parseFractions("#Left11"), parseFractions("#Left13"), parseFractions("#Left21"), parseFractions("#Left23") );
									$("#solutionBox").append("<p>" + "Subdeterminant8 = (" + parseFractions("#Left11") + " x " + parseFractions("#Left23") + " )" + " - ( " + parseFractions("#Left21") + " x " + parseFractions("#Left13") + " ) = " + det8 + "</p>");
									$("#result32").val(det8);

									function step9(){


										unHighlightCell("result",3,2);
										unHighlightCell("Left",1,1);
										unHighlightCell("Left",1,3);
										unHighlightCell("Left",2,1);
										unHighlightCell("Left",2,3);

										highlighCellCustom("result",3,3,"blue");
										highlighCell("Left",1,1);
										highlighCell("Left",1,2);
										highlighCell("Left",2,1);
										highlighCell("Left",2,2);

										det9 = determinant2by2(parseFractions("#Left11"), parseFractions("#Left12"), parseFractions("#Left21"), parseFractions("#Left22") );
										$("#solutionBox").append("<p>" + "Subdeterminant9 = (" + parseFractions("#Left11") + " x " + parseFractions("#Left22") + " )" + " - ( " + parseFractions("#Left21") + " x " + parseFractions("#Left12") + " ) = " + det9 + "</p>");
										$("#result33").val(det9);

										function step10(){
											unHighlightCell("result",3,3);
											unHighlightCell("Left",1,1);
											unHighlightCell("Left",1,2);
											unHighlightCell("Left",2,1);
											unHighlightCell("Left",2,2);

											var res11 = parseFractions("#result11");
											var res12 = parseFractions("#result12")*-1;
											var res13 = parseFractions("#result13");
											var res21 = parseFractions("#result21")*-1;
											var res22 = parseFractions("#result22");
											var res23 = parseFractions("#result23")*-1;
											var res31 = parseFractions("#result31");
											var res32 = parseFractions("#result32")*-1;
											var res33 = parseFractions("#result33");
											
											$("#result11").val(res11);
											$("#result12").val(res12);
											$("#result13").val(res13);
											$("#result21").val(res21);
											$("#result22").val(res22);
											$("#result23").val(res23);
											$("#result31").val(res31);
											$("#result32").val(res32);
											$("#result33").val(res33);
											$("#solutionBox").html("Do checkerboard negative");

											function step11(){
												clearInterval(id10);
												takeResultTranspose();
												$("#solutionBox").html("Take the transpose to get the adjugate");

												function step12(){
													var overallDet = determinant3by3();
													var flippedDet = 1/overallDet;

													var res11 = parseFractions("#result11") * flippedDet;
													var res12 = parseFractions("#result12") * flippedDet;
													var res13 = parseFractions("#result13") * flippedDet;
													var res21 = parseFractions("#result21") * flippedDet;
													var res22 = parseFractions("#result22") * flippedDet;
													var res23 = parseFractions("#result23") * flippedDet;
													var res31 = parseFractions("#result31") * flippedDet;
													var res32 = parseFractions("#result32") * flippedDet;
													var res33 = parseFractions("#result33") * flippedDet;

													$("#result11").val(res11);
													$("#result12").val(res12);
													$("#result13").val(res13);
													$("#result21").val(res21);
													$("#result22").val(res22);
													$("#result23").val(res23);
													$("#result31").val(res31);
													$("#result32").val(res32);
													$("#result33").val(res33);

													if(overallDet != 0){
														$("#solutionBox").html("Multiply by 1 over the determinant meaning 1 / "+ overallDet);
													}else{
														$("#solutionBox").html("The determinant is zero so the inverse is undefined as the last step is to multiply the matrix by 1/determinant");
													}
													
													clearInterval(id11);
												}

												clearInterval(id10);
												var id11 =  setInterval(step12, 3000);
											}
											clearInterval(id9);
											var id10 =  setInterval(step11, 3000);
										}
										clearInterval(id8);
									
										var id9 =  setInterval(step10, 3000);

									}
									clearInterval(id7);
								
									var id8 =  setInterval(step9, 3000);

								}
								clearInterval(id6);
							
								var id7 =  setInterval(step8, 3000);

							}
							clearInterval(id5);
						
							var id6 =  setInterval(step7, 3000);

						}
						
						clearInterval(id4);
					
						var id5 =  setInterval(step6, 3000);

					}
					
					clearInterval(id3);
				
					var id4 =  setInterval(step5, 3000);

				}

				clearInterval(id2);
				
				var id3 =  setInterval(step4, 3000);

			}

			

			clearInterval(id);
			var id2 =  setInterval(step3, 3000);


		}
		var id = setInterval(step2, 3000);

	}


	///////////////////////////////////////////////////////////////////animated functions



	////////////////////////////////////////////////////////////////////Event Control
	$addButton.click(function(){
		
		reset();
		state = 1; //we are adding 
		
		//set inputs to 3 by default
		$addButton.css("border","solid white");
		$rowInput1.val(2);
		$collumnInput1.val(2);
		$rowInput2.val(2);
		$collumnInput2.val(2);
		
		//create default matrices
		createDefaultMatrices();
		
		
	});

	$subtractButton.click(function(){
		
		reset();
		state = 2; //we are subtracting 
		
		//set inputs to 2 by default
		$subtractButton.css("border","solid white");
		$rowInput1.val(2);
		$collumnInput1.val(2);
		$rowInput2.val(2);
		$collumnInput2.val(2);
		
		//create default matrices
		createDefaultMatrices();
		
	});

	$multiplyButton.click(function(){
		
		reset();
		state =3; //we are multiplying 
		
		//set inputs to 3 by default
		$multiplyButton.css("border","solid white");
		$rowInput1.val(2);
		$collumnInput1.val(2);
		$rowInput2.val(2);
		$collumnInput2.val(2);
		
		//create default matrices
		createDefaultMatrices();


		//make multiply buttons appear
		$xBox.css("visibility","visible");
		$equalBox.css("visibility","visible");

		
		
	});

	$resetButton.click(function(){
		reset();

	})


	$transposeButton.click(function(){

		reset(); //reset
		state = 4; //now in transpose state
		$transposeButton.css("border","solid white");

		$rowInput1.val(2); //default val of 2
		$collumnInput1.val(2);

		makeRightDimensionsReadOnly();

		
		addLeftMatrix();
		addResultsMatrix($collumnInput1.val(),$rowInput1.val());
		//takeTransposeLeft();
	});

	$determinantButton2.click(function(){

		reset();
		state=5;

		$rowInput1.val(2);
		$collumnInput1.val(2);
		

		makeDimensionsReadOnly();

		//create default matrices
		addLeftMatrix();

		$determinantButton2.css("border","solid white");


	});

	$determinantButton3.click(function(){

		reset();
		state=6;

		$rowInput1.val(3);
		$collumnInput1.val(3);
		
		makeDimensionsReadOnly();

		//create default matrices
		addLeftMatrix();
		
		$determinantButton3.css("border","solid white");


	});

	$inverseButton2.click(function(){

		reset();
		state=7;

		$rowInput1.val(2);
		$collumnInput1.val(2);
		

		makeDimensionsReadOnly();

		//create default matrices
		addLeftMatrix();
		addResultsMatrix($collumnInput1.val(),$rowInput1.val());


		$inverseButton2.css("border","solid white");


	});

	$inverseButton3.click(function(){

		reset();
		state=8;

		$rowInput1.val(3);
		$collumnInput1.val(3);
		

		makeDimensionsReadOnly();

		//create default matrices
		addLeftMatrix();
		addResultsMatrix($collumnInput1.val(),$rowInput1.val());


		$inverseButton3.css("border","solid white");


	});

	$rrefButton.click(function(){

		reset();
		state=9;

		$rowInput1.val(3);
		$collumnInput1.val(3);
		

		
		//create default matrices
		addLeftMatrix();
		addResultsMatrix($collumnInput1.val(),$rowInput1.val());


		$rrefButton.css("border","solid white");


	});

	$AxBButton.click(function(){

		reset();
		state=10;

		$rowInput1.val(3);
		$collumnInput1.val(3);
		

		
		//create default matrices
		addLeftMatrix();
		makeLeftAugmented();
		addResultsMatrix($collumnInput1.val(),$rowInput1.val());
		makeResultAugmented();

		$AxBButton.css("border","solid white");


	});



	$updateMatrices.click(function(){
		var updated= 0;

		
		if(state <=4 ){ //if not multiply and transpose then dimensions are fixed
			

			if( (state <=2) && canAddSubtract()){
				if(leftMarixNotZero()){ addLeftMatrix(); updated++;}
				if(rightMatrixNotZero()){addRightMatrix();updated++;}
				
			}
			if( (state==3)  && canMultiply()){
				if(leftMarixNotZero()){ addLeftMatrix(); updated++;}
				if(rightMatrixNotZero()){ addRightMatrix(); updated++;}

			}

			if( (state==4) && canTranspose() ){			
				if(leftMarixNotZero() ){addLeftMatrix();updated++;}	
			}

			if( updated!=0 ){
				$resultsBox.empty();

				if(state<=3){
					addResultsMatrix($rowInput1.val(), $collumnInput2.val());
				}else if(state==4){
					addResultsMatrix($rowInput1.val(), $collumnInput1.val());
				}
			}
		}
		
	
	});

	$calculateButton.click(function(){
		if(state == 1){
			addMatrices();
			// animatedAdd();
		}
		else if (state == 2) {
			subtractMatrices();
			// animatedSubtract();
			
		}
		else if(state == 3){ 
			multiplyMatrices();
			// animatedMultiplyMatrices();

		}
		else if(state == 4){
			takeTransposeLeft();
			// animatedTranspose();
		}
		else if( state == 5){
			takeDeterminant2by2();
			// animatedDeterminant2by2();
		} 
		else if( state == 6){
			takeDeterminant3by3();
			// animatedDeterminant3by3();
		}
		else if(state==7){
			take2by2Inverse();
			// animatedInverse2by2();
		}
		else if(state==8){
			takeInverse3by3();
			// animatedInverse3by3();
		}else if(state==9){
			rowEcheolonForm();
		}else if(state==10){
			AXBReduce();
		}
		
	
	});

	$animatedSolutionButton.click(function(){
		if(state == 1){
			//addMatrices();
			animatedAdd();
			//rowEcheolonForm();
		}
		else if (state == 2) {
			//subtractMatrices();
			animatedSubtract();
			
		}
		else if(state == 3){ 
			//multiplyMatrices();
			animatedMultiplyMatrices();

		}
		else if(state == 4){
			//takeTransposeLeft();
			animatedTranspose();
		}
		else if( state == 5){
			//takeDeterminant2by2();
			animatedDeterminant2by2();
		} 
		else if( state == 6){
			//takeDeterminant3by3();
			animatedDeterminant3by3();
		}
		else if(state==7){
			//take2by2Inverse();
			animatedInverse2by2();
		}
		else if(state==8){
			//takeInverse3by3();
			animatedInverse3by3();
		}else if(state==9){
			rowEcheolonForm();
		}else if(state==10){
			AXBReduce();
		}
		
	
	});


	////////////////////////////////////////////////Event control

})