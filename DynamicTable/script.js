$(document).ready(function(){


	// $("#myTable").

	$createTable= $("#createTable"); //create Table button
	$multiplyButton = $("#multiplyButton");
	$transposeButton = $("#transposeButton");
	$determinantButton = $("#determinantButton");
	$resetButton =$("#resetButton");

	$dimensionInput = $(".dimensionInput");
	$dimensionInput1 = $(".dimensionInput1");
	$dimensionInput2 = $(".dimensionInput2");


	var state = 0;
	//0 for reset
	//1 for multiply
	//2 for Transpose
	//3 for det2x2
	//4 for det3x3
	//5 for 2x2 Inverse
	//6 for 3x3 Inverse


	$tableLeft= ""; 
	$tableRight = "";
	$tableResults= "";
	$rowInput1 = $('#rowInput1'); //reading from row dimension box1
	$collumnInput1 = $("#collumnInput1");

	$rowInput2 = $('#rowInput2'); //reading from rowinput2
	$collumnInput2 = $("#collumnInput2");

	$xBox = $("#xBox"); //just multiply sign
	$equalBox = $("#equalBox"); //just stores equal sign
	$resultsBox =  $("#resultsBox");

	$leftTableExists = false;
	$rightTableExists = false;
	$tableResultsExists = false;
	$multiplyBoxExists =false;
	$equalBoxExists =false;

	function removeBorder(){
		if(state==1){
			$multiplyButton.css("border","none");
		}
		if(state==2){
			$transposeButton.css("border","none");
		}
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


	function takeTransposeLeft(){
		
		$rowDim = $collumnInput1.val();
		$collumnDim = $rowInput1.val();
		
		// $resultVal = $("#result11").val();
		// console.log($resultVal);

		// $("#result"+i+j).val(10);
		console.log("collumnInput1: " + $collumnInput1.val());
		
		for(var i=1; i<=$rowDim; i++){

			for(var j=1; j<=$collumnDim; j++){
				//row i of left times collumn j of right
				var matchValue = $("#Left"+j+i).val();
				$("#result"+i+j).val(matchValue);
			}

		}
	}

	function takeDeterminant2by2(){
		var determinant = $("#Left11").val()*$("#Left22").val() - $("#Left12").val()*$("#Left21").val();
		console.log("determinant is: "+determinant)
		$resultsDiv = '<div id= "determinantResult"> <h1> The determinant is:'+ determinant+ '</h1></div>';
		$("#resultsBox").append($resultsDiv);

	}

	function clearResultsBox(){
		$resultsBox.empty();
	}

	function reset(){ // get rid of all tables

		state =0;
		$xBox.css("visibility","hidden");
		$equalBox.css("visibility","hidden");
		makeDimensionsAppear();
		if($leftTableExists){$("#myTable1").remove(); $leftTableExists=false;}
		if($rightTableExists){$("#myTable2").remove(); $rightTableExists=false;}
		$resultsBox.empty();
		$rowInput1.val(0); $rowInput2.val(0); $collumnInput1.val(0); $collumnInput2.val(0);
		


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
				$tableLeft += '<td> <input class="matrixEntry" id="Left' + i + j + '"type="number" name="quantity" min="1" max="100">';
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
				$tableRight += '<td> <input class="matrixEntry" id="right'+ i + j +'" type="number" name="quantity" min="1" max="100">';
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
				$tableResults += '<td> <input class="matrixEntry" id="result' +i +j+ '" type="number" name="quantity" min="1" max="100">';
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

	function multiplyMatrices(){

		$rowDim = $rowInput1.val();
		$collumnDim = $collumnInput2.val();
		
		// $resultVal = $("#result11").val();
		// console.log($resultVal);

		// $("#result"+i+j).val(10);
		console.log("collumnInput1: " + $collumnInput1.val());
		
		for(var i=1; i<=$rowDim; i++){

			for(var j=1; j<=$collumnDim; j++){
				//row i of left times collumn j of right
				var sum =0;
				for(var k=1; k<=$collumnInput1.val(); k++) {
					sum+= $("#Left"+i+k).val() * $("#right"+k+j).val();
					//sum+= equals ik * kj
				}
				$("#result"+i+j).val(sum);
			}

		}



	}
	$createTable.click(function(){

		if( ($rowInput1.val()!=0)  && ($collumnInput1.val()!=0) ){
				addLeftMatrix();
		}

		if( ($rowInput2.val()!=0)  && ($collumnInput2.val()!=0) ){
				addRightMatrix();
		}
		
	
	});


	$multiplyButton.click(function(){

		removeBorder();
		state =1;
		$multiplyButton.css("border","solid black");

		if( $collumnInput1.val() != $rowInput2.val() ){

			$("#myTable3").remove();

			$errorDiv = '<div id= "errorDiv"> <h1> Invalid Dimensions: Collumn dimensions of the left matrix must equal the Row dimension of second matrix</h1> </div>'

			$("#resultsBox").append($errorDiv);

		}else{

			addResultsMatrix($rowInput1.val(),$collumnInput2.val());
			multiplyMatrices();
			$xBox.css("visibility","visible");
			$equalBox.css("visibility","visible");

		}
		
	});

	$resetButton.click(function(){
		removeBorder();
		reset();

	})


	$transposeButton.click(function(){

		removeBorder();
		$transposeButton.css("border","solid black");
		state =2;

		if($rightTableExists){$("#myTable2").remove(); $rightTableExists=false;}
		if($tableResultsExists){$("#myTable3").remove(); $tableResultsExists=false;}
		$xBox.css("visibility","hidden");
		$equalBox.css("visibility","hidden");

		addResultsMatrix($collumnInput1.val(),$rowInput1.val());
		takeTransposeLeft();
	});

	$determinantButton.click(function(){

		console.log("hello");

		if($rowInput1.val()==2 && $collumnInput1.val() == 2){
			takeDeterminant2by2();
		}


	});
	

})