function init(){

    var loadScene = new LoadScene();
    loadScene.addLight();
 
    loadScene.loadModels( "barn16", {x: 0, y: -1, z:0}, { x: 0, y: -40, z: 0 }, { x: 0.025, y: 0.025, z: 0.025 }, loadBarn20 ).then( res => {
 
       loadScene.barn16 = res
       loadScene.barn16.visible = true
       //loadScene.barn16.children[1].name = 'roof'
 
    } )

    function loadBarn20(){

        loadScene.loadModels( "barn20", {x: -8, y: -1, z:-3.2}, { x: 0, y: -40, z: 0 }, { x: 0.035, y: 0.035, z: 0.035 }, loadDoor ).then( res => {
 
            loadScene.barn20 = res
            //loadScene.barn20.children[1].name = 'roof'
      
         } )

    }
    
    function loadDoor(){

        loadScene.loadModels( "Door", {x: 1.7, y: -0.04, z: -2.5} ,{x: 0, y: 2.43, z: 0}, {x: 0.04, y: 0.04, z: 0.04}, loadWindow ).then( res => {
 
            loadScene.barn16Door = res;
            loadScene.barn20Door = res.clone();
            THREE.SceneUtils.attach( res, loadScene.scene, loadScene.barn16 )
            var syncLoadClonedDoor = new Promise( (resolve, reject) => {
    
                resolve( loadScene.scene.add( loadScene.barn20Door ) )
    
            } )
            //loadScene.barn20Door.name = "barn20Door";
    
    
            syncLoadClonedDoor.then( res => {
    
                THREE.SceneUtils.attach( loadScene.barn20Door, loadScene.scene, loadScene.barn20 )
    
            } )
            
     
        } )

    }
    
    function loadWindow(){

        loadScene.loadModels( "window", {x: 0.35, y: -1, z: -2} ,{x: 0, y: -0.71, z: 0}, {x: 0.025, y: 0.025, z: 0.025} ).then( res => {
 
            loadScene.barn16Window = res;
            loadScene.barn20Window = res.clone();
            loadScene.barn20Window.position.set( -0.5, -1, -2 )
            THREE.SceneUtils.attach( res, loadScene.scene, loadScene.barn16 )
            
            var syncLoadClonedWindow = new Promise( (resolve, reject) => {
    
             resolve(  loadScene.scene.add( loadScene.barn20Window ) )
    
            } )
    
    
            syncLoadClonedWindow.then( res => {
    
                 THREE.SceneUtils.attach( loadScene.barn20Window, loadScene.scene, loadScene.barn20 )
    
            } )
           
           loadScene.barn16.userData.roofColor = '5151ce'
           loadScene.barn16Door.userData.doorColor = '5151ce'
           loadScene.barn16Window.userData.windowColor = '5151ce'
           loadScene.barn20.userData.roofColor = '5151ce'
           loadScene.barn20Door.userData.doorColor = '5151ce'
           loadScene.barn20Window.userData.windowColor = '5151ce'
     
        } )

    }
    
 
    loadScene.renderScene();

    animate()
    function animate() {
 
       requestAnimationFrame( animate );
 
       loadScene.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
 
       loadScene.renderScene();
 
    }

    registerListeners( loadScene );
    
}
 
function registerListeners( loadScene ){

    var modelDiv = document.getElementById( 'modelDiv' );
    var scaleDiv = document.getElementById( 'scaleDiv' );
    var colorDiv = document.getElementById( 'colorDiv' );
    modelDiv.style.display = "none";
    scaleDiv.style.display = "none";
    colorDiv.style.display = "none";

    document.getElementById( 'showHideModelDiv' ).addEventListener( 'click', () => {

        if( modelDiv.style.display === "none" ){

            modelDiv.style.display = "block";
            scaleDiv.style.display = "none";
            colorDiv.style.display = "none";

            // if( loadScene.barn16Door.visible || loadScene.barn20Door.visible )
            //     document.getElementById( 'showDoor' ).checked = true;
            // else
            //     document.getElementById( 'hideDoor' ).checked = true;
            
            // if( loadScene.barn16Window.visible || loadScene.barn20Window.visible )
            //     document.getElementById( 'showWindow' ).checked = true;
            // else
            //     document.getElementById( 'hideWindow' ).checked = true

        } else{

            modelDiv.style.display = "none";

        }

    } )

    document.getElementById( 'showHideScaleDiv' ).addEventListener( 'click', () => {

        if( scaleDiv.style.display === "none" ){

            modelDiv.style.display = "none";
            scaleDiv.style.display = "block";
            colorDiv.style.display = "none";

        } else{

            scaleDiv.style.display = "none";

        }

    } )

    document.getElementById( 'showHideColorDiv' ).addEventListener( 'click', () => {

        if( colorDiv.style.display === "none" ){

            modelDiv.style.display = "none";
            scaleDiv.style.display = "none";
            colorDiv.style.display = "block";

        } else{

            colorDiv.style.display = "none";

        }

    } )

    document.getElementById( 'barn16' ).addEventListener( 'click', function(){

        if( !(loadScene.barn16.visible) ){

            loadScene.barn16.visible = true;
            loadScene.barn20.visible = false;
            var zScale = 8 + 2*(loadScene.barn16.scale.z - 0.025)/0.005
            var xScale = 10 + 2*(loadScene.barn16.scale.x - 0.025)/0.005
            document.getElementById( 'scaleModel' ).value = zScale + '-' + xScale

            if( loadScene.barn16Door.userData.doorColor != undefined ){
                var doorColorBtnId = loadScene.barn16Door.userData.doorColor
                doorColorBtnId = 'door-' + doorColorBtnId
                document.getElementById( doorColorBtnId ).checked = true

                loadScene.barn16Door.children[0].material.color = new THREE.Color( '#' + loadScene.barn16Door.userData.doorColor )

            }
            
            if( loadScene.barn16.userData.roofColor != undefined ){
                var roofColorBtnId = loadScene.barn16.userData.roofColor
                roofColorBtnId = 'roof-' + roofColorBtnId
                document.getElementById( roofColorBtnId ).checked = true

                loadScene.barn16.children[1].material.color = new THREE.Color( '#' + loadScene.barn16.userData.roofColor )
            }

            if( loadScene.barn16Window.userData.windowColor != undefined ){
                var windowColorBtnId = loadScene.barn16Window.userData.windowColor
                windowColorBtnId = 'window-' + windowColorBtnId
                document.getElementById( windowColorBtnId ).checked = true

                loadScene.barn16Window.children[0].material.color = new THREE.Color( '#' + loadScene.barn16Window.userData.windowColor )
            }
            
        }
    } )

    document.getElementById( 'barn20' ).addEventListener( 'click', function(){

        if( !(loadScene.barn20.visible) ){

            loadScene.barn16.visible = false;
            loadScene.barn20.visible = true;
            var zScale = 8 + 2*(loadScene.barn20.scale.z - 0.035)/0.005
            var xScale = 10 + 2*(loadScene.barn20.scale.x - 0.035)/0.005
            document.getElementById( 'scaleModel' ).value = zScale + '-' + xScale

            if( loadScene.barn20Door.userData.doorColor != undefined ){
                var doorColorBtnId = loadScene.barn20Door.userData.doorColor
                doorColorBtnId = 'door-' + doorColorBtnId
                document.getElementById( doorColorBtnId ).checked = true

                loadScene.barn20Door.children[0].material.color = new THREE.Color( '#' + loadScene.barn20Door.userData.doorColor )
            }
            
            if( loadScene.barn20.userData.roofColor != undefined ){
                var roofColorBtnId = loadScene.barn20.userData.roofColor
                roofColorBtnId = 'roof-' + roofColorBtnId
                document.getElementById( roofColorBtnId ).checked = true

                loadScene.barn20.children[1].material.color = new THREE.Color( '#' + loadScene.barn20.userData.roofColor )
            }
            
            if( loadScene.barn20Window.userData.windowColor != undefined ){
                var windowColorBtnId = loadScene.barn20Window.userData.windowColor
                windowColorBtnId = 'window-' + windowColorBtnId
                document.getElementById( windowColorBtnId ).checked = true

                loadScene.barn20Window.children[0].material.color = new THREE.Color( '#' + loadScene.barn20Window.userData.windowColor )
            }
        
        }
        

    } )

    document.getElementById( 'showDoor' ).addEventListener( 'click', function(){
        
        if( !(loadScene.barn16Door.visible) )
            loadScene.barn16Door.visible = true;

        if( !(loadScene.barn20Door.visible) )
            loadScene.barn20Door.visible = true;

    } )

    document.getElementById( 'hideDoor' ).addEventListener( 'click', function(){

        if( (loadScene.barn16Door.visible) )
            loadScene.barn16Door.visible = false;

        if( (loadScene.barn20Door.visible) )
            loadScene.barn20Door.visible = false;

    } )

    document.getElementById( 'showWindow' ).addEventListener( 'click', function(){

        if( !(loadScene.barn16Window.visible) )
            loadScene.barn16Window.visible = true;

        if( !(loadScene.barn20Window.visible) )
            loadScene.barn20Window.visible = true;

    } )

    document.getElementById( 'hideWindow' ).addEventListener( 'click', function(){

        if( (loadScene.barn16Window.visible) )
            loadScene.barn16Window.visible = false;

        if( (loadScene.barn20Window.visible) )
            loadScene.barn20Window.visible = false;

    } )

    document.getElementById( 'scaleModel' ).addEventListener( 'change', function(){

        var scaleValues = scalesValues = this.value.split( '-' );
        var scaleY = (parseInt( scaleValues[0] ) - 8)/2
        var scaleX = (parseInt( scaleValues[1] ) - 10)/2
        if( document.getElementById( 'barn16' ).checked === true ){

            loadScene.barn16.scale.set( 0.025 + 0.005*scaleX, loadScene.barn16.scale.y, 0.025 + 0.005*scaleY )

        }else{

            loadScene.barn20.scale.set( 0.035 + 0.005*scaleX, loadScene.barn16.scale.y, 0.035 + 0.005*scaleY )

        }

    } )

    var doorColorInput = document.getElementsByClassName( 'doorColorClass' );
    for( var i = 0; i < doorColorInput.length; i++ ){

        doorColorInput[i].addEventListener( 'change', function( event ){

            if( loadScene.barn16.visible ){

                var colorHex = this.id.split( '-' )
                colorHex = colorHex[1];
                var color = new THREE.Color( '#' + colorHex );
                loadScene.barn16Door.children[0].material.color = color
                loadScene.barn16Door.userData.doorColor = colorHex   

            }else {

                var colorHex = this.id.split( '-' )
                colorHex = colorHex[1];
                var color = new THREE.Color( '#' + colorHex );
                loadScene.barn20Door.children[0].material.color = color
                loadScene.barn20Door.userData.doorColor = colorHex

            }

        } )

    }

    var roofColorInput = document.getElementsByClassName( 'roofColorClass' );
    for( var i = 0; i < roofColorInput.length; i++ ){

        roofColorInput[i].addEventListener( 'change', function( event ){
            
            if( loadScene.barn16.visible ){

                var colorHex = this.id.split( '-' )
                colorHex = colorHex[1];
                var color = new THREE.Color( '#' + colorHex );
                loadScene.barn16.children[1].material.color = color 
                loadScene.barn16.userData.roofColor = colorHex

            }else {

                var colorHex = this.id.split( '-' )
                colorHex = colorHex[1];
                var color = new THREE.Color( '#' + colorHex );
                loadScene.barn20.children[1].material.color = color 
                loadScene.barn20.userData.roofColor = colorHex

            }

        } )

    }

    var roofColorInput = document.getElementsByClassName( 'windowColorClass' );
    for( var i = 0; i < roofColorInput.length; i++ ){

        roofColorInput[i].addEventListener( 'change', function( event ){
            
            if( loadScene.barn16.visible ){

                var colorHex = this.id.split( '-' )
                colorHex = colorHex[1];
                var color = new THREE.Color( '#' + colorHex );
                loadScene.barn16Window.children[0].material.color = color 
                loadScene.barn16Window.userData.windowColor = colorHex

            }else {

                var colorHex = this.id.split( '-' )
                colorHex = colorHex[1];
                var color = new THREE.Color( '#' + colorHex );
                loadScene.barn20Window.children[0].material.color = color 
                loadScene.barn20Window.userData.windowColor = colorHex

            }

        } )

    }

}

window.onload = init;


