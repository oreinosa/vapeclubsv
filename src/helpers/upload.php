<?php 
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\Exception\UnsatisfiedDependencyException;

class Upload {

  public static function uploadFile($folderName,$file){
    $fileTempName = $file["tmp_name"];
    $isFileEmpty = !(isset($fileTempName) && getimagesize($fileTempName));
    if($isFileEmpty) {
      $data = array(
        "flag" => false,
        "data" => 'File is empty'
      );
      return $data;
    }

    // Generate UUID for file name
    try {
      $uuid = Uuid::uuid1();
    } catch (UnsatisfiedDependencyException $e) {
      $data = array(
        "flag" => false, 
        "data" => 'Caught UnsatisfiedDependencyException exception: ' . $e->getMessage()
      );
      return $data;
    }

    // Set file path 
    $path =  STATICPATH . $folderName;
    // Check if folder exists if not it creates it
    if (!file_exists($path)) {
      mkdir($path, 0777, true);
    }
    // Get file type 
    $fileType = strtolower(pathinfo($file["name"],PATHINFO_EXTENSION));
    // Set file name with file path + uuid + file type 
    $target_file = $path . '/' . $uuid . '.' . $fileType;
    try{
      $uploadFlag = move_uploaded_file($fileTempName, $target_file);
      if($uploadFlag){
        $imageURL = $folderName . '/' . $uuid . '.' . $fileType;
        $data = array(
          "flag" => true,
          "data" => $imageURL
        );
      }else{
        $data = array(
          "flag" => false,
          "data" => 'Unable to upload file, try again later'
        );
      }
      return $data; 
    } catch (Exception $e){
      $data = array(
        "flag" => false,
        "data" => 'Caught exception: ' . $e->getMessage()
      );
      return $data; 
    }

  }

}

    // File size limit
    // $limit = 500000;
    // if ($file["size"] > $limit) {
    //   $data = array(
    //     "flag" => false,
    //     "data" => 'File size limit is '.limit. 'kb'
    //   );
    //   return $data;
    // }
    // Allow certain file formats
    // if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    // && $imageFileType != "gif" ) {
    //     echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    //     $uploadOk = 0;
    // }