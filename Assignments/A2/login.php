<?php
	// See all errors and warnings
	error_reporting(E_ALL);
	ini_set('error_reporting', E_ALL);

	$mysqli = mysqli_connect("localhost", "root", "", "dbuser");

	$email = isset($_POST["email"]) ? $_POST["email"] : null;
	$pass = isset($_POST["pass"]) ? $_POST["pass"] : null;
	// If email and/or pass POST values are set, set the variables to those values, otherwise make them false

?>

<!DOCTYPE html>
<html>
<head>
	<title>IMY 220 - Assignment 2</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css" />
	<meta charset="utf-8" />
	<meta name="author" content="Tayla Orsmond">
	<!-- Replaced Name Surname with my name and surname -->
</head>
<body>
	<div class="container">
		<?php 
			$query = "SELECT * FROM tbusers WHERE email = '$email' AND password = '$pass'";
			$res = $mysqli->query($query);
			if($row = mysqli_fetch_array($res))
			{
				echo 	"<table class='table table-bordered mt-3'>
							<tr>
								<td>Name</td>
								<td>" . $row['name'] . "</td>
							<tr>
							<tr>
								<td>Surname</td>
								<td>" . $row['surname'] . "</td>
							<tr>
							<tr>
								<td>Email Address</td>
								<td>" . $row['email'] . "</td>
							<tr>
							<tr>
								<td>Birthday</td>
								<td>" . $row['birthday'] . "</td>
							<tr>
						</table>";
						

				echo 	"<form action='login.php' method='POST' enctype='multipart/form-data'>
							<div class='form-group'>
								<input type='hidden' name='email' value='$email'/>
								<input type='hidden' name='pass' value='$pass'/>
								<label for='eventName'>Event Name:</label><br>
								<input type='text' class='form-control' name='eventName' /><br>								
								<label for='eventDescription'>Event Description:</label><br>
								<input type='text' class='form-control' name='eventDescription' /><br>

								<label for 'eventDate'>Event date:</label><br>
								<input type='date' class='form-control' name='eventDate' /><br>	

								<input type='file' class='form-control' name='picToUpload[]' id='picToUpload' multiple='multiple' /><br/>								

								<input type='submit' class='btn-standard' value='Upload event' name='submit' />
							</div>
					  	</form>";				
			}//end if

			else
			{
				echo 	'<div class="alert alert-danger mt-3" role="alert">
  							You are not registered on this site!
  						</div>';
			}//end else

			/*
			* Tayla Orsmond u21467456
			* 
			*/
			if(isset($_POST["submit"]) && $email != null){
				//If user submitted form and email is != null (i.e., logged in)
				if(isset($_FILES["picToUpload"]) 
				&& isset($_POST["eventName"])
				&& isset($_POST["eventDescription"])
				&& isset($_POST["eventDate"])){
					//If all form inputs have been filled in
					/* 
					* Get variables from form
					*/
					$images = $_FILES["picToUpload"];
					$e_name = addslashes($_POST["eventName"]);
					$e_desc = addslashes($_POST["eventDescription"]);
					$e_date = $_POST["eventDate"];
					$u_email = $_POST["email"];
					$u_pass = $_POST["pass"];

					/* 
					* Check and Upload Image
					*/
					//check if the image is a jpg and smaller than 1MB
					if($images["type"][0] != "image/jpg"
					&& $images["type"][0] != "image/jpeg"
					&& $images["type"][0] != "image/pjpeg"){
						//File is not valid
						echo '<div class="alert alert-warning mt-3" role="alert">
								File Type not supported.
							</div>';
					}
					else if ($images["size"][0] > 1000000){
						//File is larger than 1MB
						echo '<div class="alert alert-warning mt-3" role="alert">
								File is too large.
							</div>';
					}
					else if($images["error"][0] > 0){
						echo '<div class="alert alert-warning mt-3" role="alert">
								Error: ' . $uploadFile["error"] . '
							</div><br/>';
					} 
					else if(($images["type"][0] == "image/jpg"
						|| $images["type"][0] == "image/jpeg"
						|| $images["type"][0] == "image/pjpeg")
						&& $images["size"][0] < 1000000){
						
						move_uploaded_file($images["tmp_name"][0], "gallery/" . $images["name"][0]);
						/* 
						* Make DB query
						*/
						//Get user data
						$q = "SELECT user_id FROM tbusers WHERE email = '$u_email' AND password = '$u_pass'";
						$r = $mysqli->query($q);
						if(mysqli_num_rows($r) > 0){//user exists
							$row = $r->fetch_assoc();
							$u_id = $row["user_id"];
							//Upload into events
							$q2 = "INSERT INTO tbevents(user_id, name, description, date) VALUES ('$u_id', '$e_name', '$e_desc', '$e_date')";
							if($mysqli->query($q2)){
								//Get the event id of the newly uploaded event
								$q3 = "SELECT event_id FROM tbevents WHERE user_id = '$u_id' AND name = '$e_name' AND date = '$e_date'";
								$r = $mysqli->query($q3);
								if(mysqli_num_rows($r) > 0){
									$row = $r->fetch_assoc();
									$e_id = $row["event_id"];
									$n = $images["name"][0];
									//Finally, upload image to gallery
									$q4 = "INSERT INTO tbgallery(event_id, image_name) VALUES ('$e_id', '$n')";
									if($mysqli->query($q4)){
										echo '<div class="alert alert-success mt-3" role="alert">
												Event uploaded sucessfully
											</div>';
									}
								}
							}
						}
					}
				}
				else{
					echo '<div class="alert alert-warning mt-3" role="alert">
							Please ensure all form fields are filled in and valid before submitting.
						</div>';
				}
			}
			/* 
			* Display User events
			*/
			$query = "SELECT * FROM tbusers WHERE email = '$email' AND password = '$pass'";
			$res = $mysqli->query($query);
			$r = $res->fetch_assoc();
			$uid = $r["user_id"][0];
			echo "<h2>Events:</h2>
					<div class='row row-cols-4 eventsGallery'>";
					//Get all events for a user
				$event_query = "SELECT * FROM  tbevents WHERE user_id = '$uid' ORDER BY date DESC";
				$events = $mysqli->query($event_query);
				if(mysqli_num_rows($events) > 0){//Events exist
					while($row = $events->fetch_assoc()){
						$eid = $row['event_id'];
						$image_query = "SELECT image_name FROM tbgallery WHERE event_id = '$eid'";
						$images = $mysqli->query($image_query);
						$img = $images->fetch_assoc();

						echo "<div class='col'>
							<div class='card'>
								<div class='h4 ms-2'>" . $row["date"] ."</div>
								<div class='card-body'>
									<img class='card-img-top' src='gallery/".$img["image_name"]."' alt='' />
									<div class='card-title mt-2'>" . stripslashes($row["name"]) ."</div>
									<div class='card-text'>" . stripslashes($row["description"]) ."</div>
								</div>
							</div>
						</div>";
					}
				}
			echo "</div>";
		?>
	</div>
</body>
</html>