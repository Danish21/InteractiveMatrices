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

	function addRightMatrix(){

		$("#myTable2").remove(); // empty current table

		$rowDim = $rowInput2.val();
		$collumnDim = $collumnInput2.val();
		console.log($rowDim);
		console.log($collumnDim);

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
		// console.log($resultVal);

		// $("#result"+i+j).val(10);
		//console.log("collumnInput1: " + $collumnInput1.val());
		
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
		$rowDim = $collumnInput1.val();
		$collumnDim = $rowInput1.val();
		
		// $resultVal = $("#result11").val();
		// console.log($resultVal);

		// $("#result"+i+j).val(10);
		//console.log("collumnInput1: " + $collumnInput1.val());
		
		
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
		$("#solutionBox").html('<h1 id="animationText"></h1>');
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
		$("#solutionBox").html("");
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
							$("#solutionBox").append("<p>" + "Subdeterminant3 = (" + parseFractions("#Left11") + " x " + parseFractions("#Left32") + " )" + " - ( " + parseFractions("#Left31") + " x " + parseFractions("#Left12") + " ) = " + det6 + "</p>");
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
			//addMatrices();
			animatedAdd();
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
		}
		
	
	});

	////////////////////////////////////////////////Event control

})