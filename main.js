var container = document.getElementById('container');


            var camera, scene, renderer, controls ,video;
            init();
            animate();
            function init() {
                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
                controls = new THREE.DeviceOrientationControls( camera );
                scene = new THREE.Scene();
                
                
                var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
				// invert the geometry on the x-axis so that all of the faces point inward
				geometry.scale( - 1, 1, 1 );

				var material = new THREE.MeshBasicMaterial( {
					map: new THREE.TextureLoader().load( 'textures/2294472375_24a3b8ef46_o.jpg' )
				} );

				var mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );
                
                /*
                var helperGeometry = new THREE.BoxBufferGeometry( 100, 100, 100, 4, 4, 4 );
                var helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
                var helper = new THREE.Mesh( helperGeometry, helperMaterial );
                scene.add( helper );
                */
                
                var texture = new THREE.TextureLoader().load( 'textures/art.jpg' );
                var geometry = new THREE.PlaneGeometry( 50,50,4);
                var material = new THREE.MeshBasicMaterial( { map: texture } );
                planemesh = new THREE.Mesh( geometry, material );
                planemesh.rotation.y = -90 ;
                planemesh.position.set( 100, 20, 0 );
                scene.add( planemesh );
                
                var texture = new THREE.TextureLoader().load( 'textures/art.jpg' );
                var geometry = new THREE.PlaneGeometry( 50,50,4);
                var material = new THREE.MeshBasicMaterial( { map: texture } );
                planemesh2 = new THREE.Mesh( geometry, material );
                planemesh2.rotation.y = 90 ;
                planemesh2.position.set( -100, 20, 0 );
                scene.add( planemesh2 );
                
                
                
                //
                renderer = new THREE.WebGLRenderer( { antialias: true } );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                document.body.appendChild( renderer.domElement );
                //
                window.addEventListener( 'resize', onWindowResize, false );
                /*
                if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
                    var constraints = { video: { width: 1280, height: 720, facingMode: 'user' } };
                    navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {
                        // apply the stream to the video element used in the texture
                        video.srcObject = stream;
                        video.play();
                    } ).catch( function ( error ) {
                        console.error( 'Unable to access the camera/webcam.', error );
                    } );
                } else {
                    console.error( 'MediaDevices interface not available.' );
                }*/
            }
		    
            //Touching Object
            var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
            domEvents.addEventListener(planemesh , 'touchstart' , event =>{
            //planemesh.rotation.y = planemesh.rotation.y + 2.5 ;
            this.t1 = new TimelineMax();
            this.t1.to(planemesh.scale, 0.5 , { x:0 , y:0 , z:0 , ease:Expo.easeOut});
            })
            
            domEvents.addEventListener(planemesh2 , 'touchstart' , event =>{
            this.t2 = new TimelineMax();
            this.t2.to(planemesh2.scale, 0.5 , { x:0 , y:0 , z:0 , ease:Expo.easeOut});
            })
            
            
            function animate() {
                window.requestAnimationFrame( animate );
                controls.update();
                renderer.render( scene, camera );
            }
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }
