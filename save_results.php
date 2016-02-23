<?php
   $json = $_POST['json'];
   $arr = json_decode($json);
   $file = fopen('results/' . $arr->timestamp . '.json', 'w+');
   fwrite($file, $json);
   fclose($file);
?>