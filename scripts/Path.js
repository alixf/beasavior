window.Path = function(pos1, pos2)
{
    var geometrySpline = new THREE.Geometry();
    var count = 64.0;
    for(i=0; i < count; ++i)
        geometrySpline.vertices[i] = new THREE.Vector3(pos1.x * (1-i/count) + pos2.x * (i/count),
                                                       pos1.y * (1-i/count) + pos2.y * (i/count),
                                                       pos1.z * (1-i/count) + pos2.z * (i/count)).normalize().multiplyScalar(310);
    
    geometrySpline.computeLineDistances();
    
    var o = new THREE.Line(geometrySpline, new THREE.LineBasicMaterial( { color: 0xffffff } ), THREE.LineStrip);
    return o;
};