<?php
   $json = file_get_contents("php://input");
   
   //$json = $_POST['json'];
   //$arr = json_decode($json);
   //$file = fopen('results/' . $json->timestamp . '.json', 'w+');
   
   $file = fopen('results/' . time() . '.json', 'w+');

   fwrite($file, $json);
   fclose($file);
?>