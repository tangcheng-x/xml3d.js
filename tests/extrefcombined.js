module("External References", {
    setup : function() {
        stop();
        var that = this;
        this.cb = function(e) {
            ok(true, "Scene loaded");
            that.doc = document.getElementById("xml3dframe").contentDocument;
            start();
        };
        loadDocument("scenes/extref-combined.xhtml"+window.location.search, this.cb);
    },
    teardown : function() {
        var v = document.getElementById("xml3dframe");
        v.removeEventListener("load", this.cb, true);
    }
});

test("Mesh JSON reference", 4, function() {
    var xTest = this.doc.getElementById("xml3dTest"),
        glTest = getContextForXml3DElement(xTest), hTest = getHandler(xTest);
    var self = this;

    var testStep = 0;
    function onFrameDrawn(){
        if(testStep == 0){
            if( XML3DUnit.getPixelValue(glTest, 64, 200)[0] == 0)
                return;

            XML3DUnit.loadSceneTestImages(self.doc, "xml3dReference", "xml3dTest", function(refImage, testImage){
                QUnit.imageEqual(refImage, testImage, "JSON render matches");

                var meshElement = self.doc.getElementById("myMesh02");
                meshElement.setAttribute("src", "json/simpleMesh2.json");

                testStep++;
            });
        }
        if(testStep == 1){
            if( XML3DUnit.getPixelValue(glTest, 128, 128)[0] == 0)
                return;

            XML3DUnit.loadSceneTestImages(self.doc, "xml3dReference2", "xml3dTest", function(refImage, testImage){
                QUnit.imageEqual(refImage, testImage, "JSON render matches after change");

                start();
            });
        }
    }

    xTest.addEventListener("framedrawn", onFrameDrawn);


    this.doc.getElementById("jsonGroup").visible = true;
    hTest.draw();

    stop();
});



/*test("Mesh XML reference", 3, function() {
    var xRef = this.doc.getElementById("xml3dReference"),
    actual,
    win = this.doc.defaultView,
    glRef = getContextForXml3DElement(xRef), hRef = getHandler(xRef);

    var xTest = this.doc.getElementById("xml3dTest"),
    glTest = getContextForXml3DElement(xTest), hTest = getHandler(xTest);

    this.doc.getElementById("xmlGroup").visible = true;
    hTest.draw();


    var data = glRef.canvas.toDataURL();
    var img = new Image();
    img.onload = function(e) {
        var expected = new Image();
        expected.onload = function(e) {
            QUnit.imageEqual(img, expected, "XML render matches");
            start();
        };
        expected.src = glTest.canvas.toDataURL();
        stop();
        start();
    };
    img.src = data;
    stop();

});

test("Shader JSON reference", 3, function() {
    var xRef = this.doc.getElementById("xml3dReference"),
    actual,
    win = this.doc.defaultView,
    glRef = getContextForXml3DElement(xRef), hRef = getHandler(xRef);

    var xTest = this.doc.getElementById("xml3dTest"),
    glTest = getContextForXml3DElement(xTest), hTest = getHandler(xTest);

    this.doc.getElementById("jsonShaderGroup").visible = true;
    this.doc.getElementById("meshGroup").setAttribute("shader", "#flatgreen");
    hTest.draw();
    hRef.draw();


    var data = glRef.canvas.toDataURL();
    var img = new Image();
    img.onload = function(e) {
        var expected = new Image();
        expected.onload = function(e) {
            QUnit.imageEqual(img, expected, "JSON shader render matches");
            start();
        };
        expected.src = glTest.canvas.toDataURL();
        stop();
        start();
    };
    img.src = data;
    stop();

});

test("Shader XML reference", 3, function() {
    var xRef = this.doc.getElementById("xml3dReference"),
    actual,
    win = this.doc.defaultView,
    glRef = getContextForXml3DElement(xRef), hRef = getHandler(xRef);

    var xTest = this.doc.getElementById("xml3dTest"),
    glTest = getContextForXml3DElement(xTest), hTest = getHandler(xTest);

    this.doc.getElementById("xmlShaderGroup").visible = true;
    this.doc.getElementById("meshGroup").setAttribute("shader", "#flatgreen");
    hTest.draw();
    hRef.draw();

    var data = glRef.canvas.toDataURL();
    var img = new Image();
    img.onload = function(e) {
        var expected = new Image();
        expected.onload = function(e) {
            QUnit.imageEqual(img, expected, "XML shader render matches");
            start();
        };
        expected.src = glTest.canvas.toDataURL();
        stop();
        start();
    };
    img.src = data;
    stop();

});*/
