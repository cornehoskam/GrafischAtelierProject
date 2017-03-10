<?php
use App\ShopItemNames;
?>
<html>

	<link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">

	<body>
	
		@include('layouts.header', array('title'=>'Webshop'))
	
		<div class="container">
		
			<?php
			require '../app/ShopItemNames.php';
			$y = new ShopItemNames();
			$titles = $y->getNames();
			
			for($x = 0; $x < 8; $x ++) {
				
				echo "<div class=\"row\">";
				
				for($y = 1; $y < 4; $y ++) {
					
					$productnr = ($x * 3) + $y;
					$fileName = "img/WebshopImages/Shop$productnr.jpg";
					
					echo "<div class=\"col-lg-4 col-md-4 col-sm-4 col-sm-offset-0 col-xs-10 col-xs-offset-1\" >";
					
					if (file_exists($fileName) && isset($titles[$productnr])) {
						
						echo "<a href=\"product/$productnr\">";
						
						echo "<img src=\"$fileName\" style=\"width: 100%;\">";
						
						echo "<br>";
						
						$productTitle = $titles[$productnr];
						
						echo "$productTitle";
						
						echo "</a>";
						
						echo "</div>";
					} else {
						
						echo "</div>";
						break 2;
					}
				}
				
				echo "</div>";
			}
			echo "</div>";
			?>
		
		</div>
	
		@include('layouts.footer')
	</body>

</html>
