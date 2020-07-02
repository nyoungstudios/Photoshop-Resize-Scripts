// Created by Nathaniel Young (nyoungstudios)
// this script resizes all photos in the folder with the optimal settings for Mailchimp
// saves resized files in a subfolder called "Resize"

//wrapper function
function main() {

  // opens folder dialog for user to select the folder to process
  var inputFolder = Folder.selectDialog("Pick a source folder");

  // checks if user selected no folder
  if (inputFolder == null) {
    return;
  }
  
  // regular expression to match file types
  var fileTypes = new RegExp('.*.jpg|.*.png|.*.tif|.*.jpeg', 'i');

  // gets list of files that match regular expression
  var fileList = inputFolder.getFiles(fileTypes);

  // parameters
  var widthOfDocument = 1000;
  var quality = 10;


  // loops over each file in the folder
  for (var i = 0; i < fileList.length; i++) {
    // gets file path name
    var filePathName = fileList[i].toString();

    // removes the file extension
    var saveLocation = filePathName.substring(0, filePathName.lastIndexOf('/') + 1) + 'Resize/';
    var baseDocName = filePathName.substring(filePathName.lastIndexOf('/') + 1, filePathName.lastIndexOf('.'));

    // Creates Resize folder if it does not already exist
    var folder = new Folder(saveLocation);
    if (i == 0 && !folder.exists) {
        folder.create();
    }

    // appends underscore (_) if the original document name ends in a number
    var lastChar = baseDocName[baseDocName.length - 1];

    if (lastChar >= '0' && lastChar <= '9') {
      baseDocName += '_';
    }

    // appends the width of the document
    baseDocName += widthOfDocument;


    // =======================================================
    // opens photo
    var idOpn = charIDToTypeID( "Opn " );
        var desc01 = new ActionDescriptor();
        var iddontRecord = stringIDToTypeID( "dontRecord" );
        desc01.putBoolean( iddontRecord, false );
        var idforceNotify = stringIDToTypeID( "forceNotify" );
        desc01.putBoolean( idforceNotify, true );
        var idnull = charIDToTypeID( "null" );
        desc01.putPath( idnull, new File( filePathName ) );
        var idDocI = charIDToTypeID( "DocI" );
        desc01.putInteger( idDocI, 286 );
    executeAction( idOpn, desc01, DialogModes.NO );

    // =======================================================
    // gets the current active document open
    currentDocument = app.activeDocument;

    // =======================================================
    // resizes photo
    var idImgS = charIDToTypeID( "ImgS" );
        var desc02 = new ActionDescriptor();
        var idWdth = charIDToTypeID( "Wdth" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc02.putUnitDouble( idWdth, idPxl, widthOfDocument );
        var idscaleStyles = stringIDToTypeID( "scaleStyles" );
        desc02.putBoolean( idscaleStyles, true );
        var idCnsP = charIDToTypeID( "CnsP" );
        desc02.putBoolean( idCnsP, true );
        var idIntr = charIDToTypeID( "Intr" );
        var idIntp = charIDToTypeID( "Intp" );
        var idautomaticInterpolation = stringIDToTypeID( "automaticInterpolation" );
        desc02.putEnumerated( idIntr, idIntp, idautomaticInterpolation );
    executeAction( idImgS, desc02, DialogModes.NO );

    // =======================================================
    // saves jpg photo
    var idsave = charIDToTypeID( "save" );
        var desc03 = new ActionDescriptor();
        var idAs = charIDToTypeID( "As  " );
            var desc04 = new ActionDescriptor();
            var idEQlt = charIDToTypeID( "EQlt" );
            desc04.putInteger( idEQlt, quality );
            var idMttC = charIDToTypeID( "MttC" );
            var idMttC = charIDToTypeID( "MttC" );
            var idNone = charIDToTypeID( "None" );
            desc04.putEnumerated( idMttC, idMttC, idNone );
        var idJPEG = charIDToTypeID( "JPEG" );
        desc03.putObject( idAs, idJPEG, desc04 );
        var idIn = charIDToTypeID( "In  " );
        desc03.putPath( idIn, new File( saveLocation + baseDocName + ".jpg" ) );
        var idDocI = charIDToTypeID( "DocI" );
        desc03.putInteger( idDocI, 1363 );
        var idCpy = charIDToTypeID( "Cpy " );
        desc03.putBoolean( idCpy, true );
        var idsaveStage = stringIDToTypeID( "saveStage" );
        var idsaveStageType = stringIDToTypeID( "saveStageType" );
        var idsaveBegin = stringIDToTypeID( "saveBegin" );
        desc03.putEnumerated( idsaveStage, idsaveStageType, idsaveBegin );
    executeAction( idsave, desc03, DialogModes.NO );

    // =======================================================
    // closes photoshop file
    currentDocument.close(SaveOptions.DONOTSAVECHANGES);


  }
};

main();