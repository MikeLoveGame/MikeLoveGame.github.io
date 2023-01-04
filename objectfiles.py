import math

class block:
        
        def __init__(self, shape, length, width, tall):
            self.shape=shape
            self.length=length
            self.width=width
            self.tall=tall

        def getVolume(self):
            return self.length * self.width * self.tall

class sphere(block):
    
    def __init__(self, r,x ,y,z):
        super().__init__("sphere", r, r, r)
        self.x=x
        self.y=y
        self.z=z
        self.radius=r

        self.velocity=[0,0,0]
        self.angularvelocity=[0,0,0]
        
    #@overwrite
    def getVolume(self):
        return 4/3*math.pi*(self.radius**3)

    def getspeed(self):
        return math.sqrt(self.velocity[0]**2+self.velocity[1]**2+self.velocity[2]**2)

    @staticmethod
    def collisionUpdate(sphere1, sphere2):
        speed1=sphere1.getspeed()
        speed2=sphere2.getspeed()

        #assumming the density is 1 for now
        mass1=sphere1.getVolume()
        mass2=sphere2.getVolume()

        velocity1=[sphere1.velocity[0],sphere1.velocity[1],sphere1.velocity[2]]
        velocity2=[sphere2.velocity[0],sphere2.velocity[1],sphere2.velocity[2]]

        fvelocity2=[0,0,0]
        fvelocity1=[0,0,0]

        #assume sphere2 is the ground
        for i in range(len(velocity1)):
            velocity1[i]=velocity1[i]-velocity2[i]
            
            fvelocity1[i]= velocity1[i]*(1-2*mass2/(mass1+mass2))#formula conservation of momentum
            
            fvelocity2[i]= 2*velocity1[i]*(mass1/(mass1+mass2))

        #the ground is now the ground
        for i in range(len(velocity2)):
            fvelocity1[i]=fvelocity1[i]+velocity2[i]

        for i in range(len(velocity2)):
            sphere1.velocity[i]=fvelocity1[i]
            
            sphere2.velocity[i]=fvelocity2[i]



    @staticmethod
    def SphereicalCollisionDetection(sphere1, sphere2):
        if (sphere1.shape!="sphere"):
            raise TypeError

        x=sphere1.x-sphere2.x
        y=sphere1.y-sphere2.y
        z=sphere1.z-sphere2.z
        d=math.sqrt(x**2+y**2+z**2)
        if(d<=sphere1 or d<=sphere2):
            return True

        return False
    
    def update(self, time,gravity):
        self.x=self.x+self.velocity[0]*time
        self.y=self.y+self.velocity[1]*time
        self.z=self.z+self.velocity[2]*time-math.abs(gravity*time)



