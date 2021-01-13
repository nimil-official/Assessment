var scene, camera, renderer, mesh, axis, crate, normalTexture;

var LoadScene = function(){

   var scope = this
   this.scene = new THREE.Scene()
   this.scene.background = new THREE.Color( 0xececec );
   this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000);
   this.renderer = new THREE.WebGLRenderer();
   this.renderer.setSize( window.innerWidth, window.innerHeight );
   this.renderer.setClearColor( 0xffffff, 0);

   this.camera.position.set( 1, 1.5, -8 ) 
 
   this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) )
   document.getElementById( 'container' ).appendChild( this.renderer.domElement )
   this.renderer.render( this.scene, this.camera );

   
   this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement, document.getElementById( 'container' ) )
   this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	this.controls.dampingFactor = 0.0
	this.controls.screenSpacePanning = false
	//this.controls.minDistance = 100;
	//this.controls.maxDistance = 50
	this.controls.maxPolarAngle = Math.PI / 2;

   this.barn16;
   this.barn20;
   this.barn16Door;
   this.barn20Door;
   this.barn16Window;
   this.barn20Window;
   //this.modelNames = {}
}

LoadScene.prototype = {

   renderScene : function(){

      var scope = this;
      scope.renderer.render( scope.scene, scope.camera )

   },

   addLight : function(){

      var ambientLight = new THREE.AmbientLight( 0x404040, 2 )  
      this.scene.add( ambientLight )
      ambientLight.position.set( 0, 10, 0 );
      var pointLight = new THREE.PointLight( 0xFFFFFF, 1 )
      this.scene.add( pointLight );
      pointLight.position.set( 0, 10, 0 )
      pointLight.castShadow = true
      this.renderScene()

   },

   loadModels : function( modelName, position, rotationAngle, scaleValue, callBack ){

      return new Promise( (resovle, reject) => {

         var scope = this;
      
         var mtlLoader = new THREE.MTLLoader();
         var modelMTLPath = "./Models/" + modelName + "/" + modelName + ".mtl";
         var modelOBJPath = "./Models/" + modelName + "/" + modelName + ".obj";
         mtlLoader.load( modelMTLPath, function( materials ){
     
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials( materials );
            objLoader.load( modelOBJPath, function( model ){
     
                  model.scale.set(scaleValue.x, scaleValue.y, scaleValue.z);
                  model.position.set( position.x, position.y, position.z );
                  model.name = modelName
                  model.visible = false
   
                  if( modelName === "Door" || modelName === "window" ){
   
                     model.rotation.set( rotationAngle.x ,rotationAngle.y, rotationAngle.z );
                     model.visible = true
   
                  }else{
                     model.rotateX( rotationAngle.x )
                     model.rotateY( rotationAngle.y )
                     model.rotateZ( rotationAngle.z )
                  }
                  
                  scope.scene.add( model )
                  scope.renderScene();

                  if( callBack )
                     callBack()

                  resovle( model )
   
            } )
     
         } )

      } )
     

   },


}









