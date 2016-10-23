<?php
   $json = file_get_contents("php://input");
   
   /*$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$exp = $request->exp;
    @$name = $request->name;
    @$results = $request->results;*/

   //$json = $_POST['json'];
   //$arr = json_decode($json);
   //$file = fopen('results/' . $json->timestamp . '.json', 'w+');
   
   $file = fopen('results/' . time() . '.json', 'w+');

   fwrite($file, $json);
   fclose($file);
?>