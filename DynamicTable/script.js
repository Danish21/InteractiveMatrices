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
	$resetButton =$("#resetButton");
	$updateMatrices= $("#updateMatrices"); //create Table button

	$calculateButton = $("#calculateButton");

	$dimensionInput = $(".dimensionInput");
	$dimensionInput1 = $(".dimensionInput1");
	$dimensionInput2 = $(".dimensionInput2");


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
		console.log($rowDim);
		console.log($collumnDim);

		$tableLeft += '<table id ="myTable1">';

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

	function addRightMatrix(){

		$("#myTable2").remove(); // empty current table

		$rowDim = $rowInput2.val();
		$collumnDim = $collumnInput2.val();
		console.log($rowDim);
		console.log($collumnDim);

		$tableRight += '<table id ="myTable2">';

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
		

		$tableResults += '<table id ="myTable3">';

		for(var i=1; i <= $rowDim; i++){
			
			$tableResults += "<tr>";
			
			for( var j=1; j<= $collumnDim; j++){
				$tableResults += '<td> <input class="matrixEntry" id="result' +i +j+ '" type="text" >';
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

	function createDefaultMatrices(){
		addLeftMatrix();
		addRightMatrix();
		addResultsMatrix($rowInput1.val(), $collumnInput2.val());

	}

	/////////////////////////////////////////////////////////////////////////Styling Logic
	function parseFractions(inputId){
				
				var inputString = $(inputId).val();
				
				var inputFrac = inputString.split("/");
				
				inputFrac[0]=parseFloat(inputFrac[0]);

				var output = inputFrac[0];
				
				if(typeof inputFrac[1] !== 'undefined'){
					inputFrac[1]=parseFloat(inputFrac[1]);
					output = inputFrac[0]/inputFrac[1];
				} 

				return output;

	}
	/////////////////////////////////////////////////////////////////////////Math Logic
	


	function addMatrices(){

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
		// console.log($resultVal);

		// $("#result"+i+j).val(10);
		//console.log("collumnInput1: " + $collumnInput1.val());
		
		for(var i=1; i<=$rowDim; i++){

			for(var j=1; j<=$collumnDim; j++){
				//row i of left times collumn j of right
				var sum =0;
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
		// console.log($resultVal);

		// $("#result"+i+j).val(10);
		//console.log("collumnInput1: " + $collumnInput1.val());
		
		for(var i=1; i<=$rowDim; i++){

			for(var j=1; j<=$collumnDim; j++){
				//row i of left times collumn j of right
				var matchValue = parseFractions("#Left"+j+i);
				$("#result"+i+j).val(matchValue);
			}

		}
	}

	function takeResultTranspose(){

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







	////////////////////////////////////////////////////////////////////Event Control
	$addButton.click(function(){
		
		reset();
		state = 1; //we are adding 
		
		//set inputs to 3 by default
		$addButton.css("border","solid black");
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
		$subtractButton.css("border","solid black");
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
		$multiplyButton.css("border","solid black");
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
		removeBorder();
		reset();

	})


	$transposeButton.click(function(){

		reset(); //reset
		state = 4; //now in transpose state
		$transposeButton.css("border","solid black");

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

		$determinantButton2.css("border","solid black");


	});

	$determinantButton3.click(function(){

		reset();
		state=6;

		$rowInput1.val(3);
		$collumnInput1.val(3);
		
		makeDimensionsReadOnly();

		//create default matrices
		addLeftMatrix();
		
		$determinantButton3.css("border","solid black");


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


		$inverseButton2.css("border","solid black");


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


		$inverseButton3.css("border","solid black");


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

			if( (state==4) ){			
				if(leftMarixNotZero()){addLeftMatrix();updated++;}	
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
		}
		else if (state == 2) {
			subtractMatrices();
		}
		else if(state == 3){ 
			multiplyMatrices();
		}
		else if(state == 4){
			takeTransposeLeft();
		}
		else if( state == 5){
			takeDeterminant2by2();
		} 
		else if( state == 6){
			takeDeterminant3by3();
		}
		else if(state==7){
			take2by2Inverse();
		}
		else if(state==8){
			takeInverse3by3();
		}
		
	
	});

	////////////////////////////////////////////////Event control

})