//@index

function mymodule(exports){

    exports.block=class block{
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

    exports.sphere=class sphere extends block{
        
        constructor(r,x ,y,z){
            super("sphere", r, r, r);
            this.x=x;
            this.y=y;
            this.z=z;
            this.radius=r;

            this.velocity=new Array[0,0,0];
            this.angularvelocity= new Array[0,0,0];
            
        }

        //@overwrite
        getVolume(){
            return 4/3*Math.PI*(this.radius**3);
        }
        getspeed(){
            return Math.sqrt(this.velocity[0]**2+this.velocity[1]**2+this.velocity[2]**2);
        }

        static collusionUpdatte(sphere1, sphere2){
            speed1=sphere1.getspeed();
            speed2=sphere2.getspeed();

            //assumming the density is 1 for now
            mass1=sphere1.getVolume();
            mass2=sphere2.getVolume();

            velocity1=new Array[sphere1.velocity[0],sphere1.velocity[1],sphere1.velocity[2]];
            velocity2=new Array[sphere2.velocity[0],sphere2.velocity[1],sphere2.velocity[2]];

            fvelocity2=new Array[0,0,0];
            fvelocity1=new Array[0,0,0];

            //assume sphere2 is relatively still 
            for (let index = 0; index < velocity1.length; index++) {
                velocity1[index]=velocity1[index]-velocity2[index];
                
                fvelocity1= velocity1[index]*(1-2*mass2/(mass1+mass2));//formula conservation of momentum
                fvelocity2= 2*velocity1[index]*(mass1/(mass1+mass2));
            }

            //write back 
            for (let index = 0; index < velocity2.length; index++) {
                fvelocity1[index]+=velocity2[index];
            }

            for (let index = 0; index < array.length; index++) {
                sphere1.velocity[index]=fvelocity1[index];
                sphere2.velocity[index]=fvelocity2[index];
            }
        }


        static SphereicalCollisionDetection(sphere1, sphere2){
            if (sphere1.shape!="sphere"){
                throw TypeError;
            }
            x=sphere1.x-sphere2.x;
            y=sphere1.y-sphere2.y;
            z=sphere1.z-sphere2.z;
            d=Math.sqrt(x**2+y**2+z**2);
            if(d<=sphere1 || d<=sphere2){
                return true;
            }

            return false;
        }

        update(time,gravity){
            this.x=this.x+this.velocity[0]*time;
            this.y=this.y+this.velocity[1]*time;
            this.z=this.z+this.velocity[2]*time-Math.abs(gravity*time);
        }
        
        

    }

    exports.plot=class plot{
        constructor(canvas, spheres){
            this.canvas=canvas;
            this.ctx=canvas.getContext("2d");
            this.width=canvas.width;
            this.height=canvas.height;
            this.spheres=spehres;
        }

        addSphere(sphere){
            this.spheres.push(sphere);
        }

        update(){
            this.ctx.clearRect(0,0,this.width,this.height);
            for (let index = 0; index < this.spheres.length; index++) {
                this.ctx.beginPath();
                this.ctx.arc(this.spheres[index].x,this.spheres[index].y,this.spheres[index].radius,0,2*Math.PI);
                this.ctx.stroke();
            }
        }
    }

}

module.exports=mymodule;