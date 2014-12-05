window.Skydome = function(texture)
{
    function getFileContent(url)
    {
        return $.ajax({type: "GET",  url: url, async: false}).responseText;
    }
    
    var geometry = new THREE.SphereGeometry(1000, 64, 64);
    var uniforms = { texture: { type: 't', value: texture } };

    var material = new THREE.ShaderMaterial( {
      uniforms:       uniforms,
      vertexShader:   getFileContent("shaders/skydome.vert"),
      fragmentShader: getFileContent("shaders/skydome.frag")
    });

    skydome = new THREE.Mesh(geometry, material);
    skydome.scale.set(-1, 1, 1);
    skydome.rotation.order = 'XZY';
    skydome.renderDepth = 1000.0;
    return skydome;
};