
const canvas=document.querySelector('canvas');

const C=canvas.getContext('2d');

canvas.width=innerWidth;
canvas.height=innerHeight;

class block{
        //a block must not have spherecal edge
        constructor(shape, length, width, tall){
            this.shape=shape;
            this.length=length;
            this.width=width;
            this.tall=tall;
        }
        getVolume() {
            return this.length * this.width * this.tall;
        }
    }

    class sphere extends block{
        
        constructor(r,x ,y,z,colour, density){
            super("sphere", r, r, r);
            this.x=x;
            this.y=y;
            this.z=z;
            this.radius=r;
            this.colour=colour;
            this.density=density;

            this.velocity = new Array(0,0,0);
            
        }

        //@overwrite
        getVolume(){
            return 4/3*Math.PI*(this.radius**3);
        }
        getspeed(){
            return Math.sqrt(this.velocity[0]**2+this.velocity[1]**2+this.velocity[2]**2);
        }
        getMass(){
            return (this.getVolume()*this.density);
        }
        setRandom2DSpeed(){
            this.velocity[0]=randint(0,100);
            this.velocity[1]=randint(0,100);
        }

        static collisionUpdate(sphere1, sphere2){

            var speed1=sphere1.getspeed();
            var speed2=sphere2.getspeed();

            //assumming the density is 1 for now
            var mass1=sphere1.getMass();
            var mass2=sphere2.getMass();

            var velocity1=new Array(sphere1.velocity[0],sphere1.velocity[1],sphere1.velocity[2]);
            var velocity2=new Array(sphere2.velocity[0],sphere2.velocity[1],sphere2.velocity[2]);

            var fvelocity2=new Array(0,0,0);
            var fvelocity1=new Array(0,0,0);
            

            //assume sphere2 is relatively still 
            for (let index = 0; index < velocity1.length; index++) {
                //velocity1[index]=velocity1[index]-velocity2[index];
                //fvelocity1[index]= velocity1[index]*(1-(2*mass2)/(mass1+mass2))*0.55;//formula conservation of momentum
                //fvelocity2[index]= 2*velocity1[index]*(mass1/(mass1+mass2))*0.55;// this leads to an infinite increase of the system's energy
                
                var E1=velocity1[index]**2*mass1;
                var E2=velocity2[index]**2*mass2;
                //calculate using conservation of energy only
                fvelocity2[index]=Math.sqrt(E1/mass2);
                fvelocity1[index]=Math.sqrt(E2/mass1);

                if (velocity1[index]*velocity2[index]>0){//same direction
                    if(velocity1[index]>velocity2[index]){ //sphere1 hit sphere2
                    fvelocity1[index]= -1*fvelocity1[index];
                    }
                    else{//sphere2 hit sphere1
                        fvelocity2[index]= -1*fvelocity2[index];
                    }
                }

                else{ //diff direction
                    if((fvelocity1[index]*velocity1[index])>0){
                        fvelocity1[index]= -1*fvelocity1[index];
                    }
                    if((fvelocity2[index]*velocity2[index])>0){
                        fvelocity2[index]= -1*fvelocity2[index];
                    }
                }
                //write back value 
                sphere1.velocity[index]=fvelocity1[index];
                sphere2.velocity[index]=fvelocity2[index];
                
            }

            //split the balls
            /*/write back 
            for (let index = 0; index < velocity2.length; index++) {
                fvelocity1[index]=fvelocity1[index]+velocity2[index];
            }

            for (let index = 0; index < velocity2.length; index++) {
                
            }*/
        }


        static SphereicalCollisionDetection2D(sphere1, sphere2){

            var x=sphere1.x-sphere2.x;
            var y=sphere1.y-sphere2.y;
            
            var d=Math.sqrt(x**2+y**2);

            if(d <=sphere1.radius || d <=sphere2.radius){
                
                return true;
            }

            return false;
        }

        update(time,gravity){
            this.x=this.x+this.velocity[0]*time;
            if(this.x<0){
                this.x=0;//can't break through the ground
                this.velocity[0]=-this.velocity[0];//bouncing back
            }

            else if (this.x>innerWidth){ //boundary is 500
                this.x=innerWidth;
                this.velocity[0]=-this.velocity[0];
            }

            
            this.y=this.y+this.velocity[1]*time;

            if(this.y>700){ 
                this.y=700;
                this.velocity[1]=-this.velocity[1];
            }

            this.z=this.z+this.velocity[2]*time;
            if(this.z<0){
                this.z=0;
                this.velocity[2]=-this.velocity[2];
            }
            
            this.velocity[1]=this.velocity[1]+gravity*time;
            this.draw();
        }
        
        draw(){
            C.beginPath();
            C.arc(this.x, this.y,this.radius,0,Math.PI*2, false);
            C.fillStyle=this.colour;
            C.fill();
            C.closePath();
        }

    }

    function randint(bottom, top){
        return (Math.floor(Math.abs(Math.random()*top)%(top-bottom))+bottom);
    }
    function randcolor(){
        const colours=["red", "green", "blue", "pink", "yellow", "black", "purple"];
        return colours[randint(0,7)];
    }
    function update(spheres){

        for (let i=0; i<spheres.length; i++){
            for(let j=i+1; j<spheres.length; j++){
                if(sphere.SphereicalCollisionDetection2D(spheres[i].value, spheres[j].value)){
                    sphere.collisionUpdate(spheres[i].value, spheres[j].value);
                }
            }
        }
        C.clearRect(0,0,innerWidth, innerHeight);
        for (let i= 0; i < spheres.length; i++) {
            spheres[i].value.update(time,gravity);
        }
    }
    function animate(){
        requestAnimationFrame(animate);
        update(spheres);
    }


    
      

const gravity=9.81;
const time=0.023;
const spheres = [];

for (let i = 0; i < 200; i++) {
  spheres.push({
    value: new sphere(randint(5,15), randint(100,600),randint(100,600),0,randcolor(), 1)
  });
  //spheres[i].value.velocity[]
  spheres[i].value.setRandom2DSpeed();
  spheres[i].value.draw();
}

addEventListener('click', (event)=>{
    x= new sphere(randint(5,15),event.clientX, event.clientY,0,randcolor(), 1);
    spheres.push({
        value: new sphere(randint(5,15),event.clientX, event.clientY,0,randcolor(), 1)
    }
    );
    x.setRandom2DSpeed();
    x.draw();
    }
)


animate();




    




