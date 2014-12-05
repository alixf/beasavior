window.Area = function(x, y, type)
{
    var material = new THREE.MeshBasicMaterial({color : 0x0080FF, transparent : true, opacity : 0.5});
    if(type == "crisis")
        material = new THREE.MeshBasicMaterial({color : 0xFF0000, transparent : true, opacity : 0.5});
    
    var geometry = new THREE.SphereGeometry(50, 16, 16);
    var area = new THREE.Mesh(geometry, material);
    
    function getXYZFromUV(u, v, radius)
    {
        var u = 1.5 - u;
        var v = 1 - v; 
        var theta = 2.0 * Math.PI * u;
        var phi = Math.PI * v;
        x = Math.cos(theta) * Math.sin(phi) * radius;
        y = Math.sin(theta) * Math.sin(phi) * radius;
        z = -Math.cos(phi) * radius;
        return new THREE.Vector3(x, z, y);
    }
    
    area.clock = 0.0;
    area.update = function(dt)
    {
        area.clock += dt;
        
        var scaleFactor = area.clock - Math.floor(area.clock);
        var alphaFactor =-(scaleFactor*2-1)*(scaleFactor*2-1)+1;
        area.material.opacity = 0.33 + alphaFactor * 0.33;
        
        area.scale.set(scaleFactor,scaleFactor,scaleFactor);
    }
    
    var position = getXYZFromUV(x, y, 300);
    area.position.set(position.x, position.y, position.z);
    return area;
}