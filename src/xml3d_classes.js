


org.xml3d.classInfo = {};
org.xml3d.methods = {};
org.xml3d.document = null;

function getAllElementNodes(elem) {
	if (!elem)
		return [];
	var r = [];
	var n = elem.firstElementChild;
	while(n) {
		r.push(n);
		r = r.concat(getAllElementNodes(n));
		n = n.nextElementSibling;
	}
	return r;
};

function getElementNodes(elem) {
if (!elem)
	return [];
var r = [];
var n = elem.firstElementChild;
while(n) {
	r.push(n);
	n = n.nextElementSibling;
}
return r;
};

org.xml3d.data.configure = function(xml3ds) {
 	if (!org.xml3d.document)
 		org.xml3d.document = new org.xml3d.XML3DDocument();

 	for(var x in xml3ds) {
 		org.xml3d.document.initXml3d(xml3ds[x]);
 	}
};

org.xml3d.defineClass = function(ctor, parent, methods) {
	if (parent) {
		function inheritance() {
		}
		inheritance.prototype = parent.prototype;
		ctor.prototype = new inheritance();
		ctor.prototype.constructor = ctor;
		ctor.superClass = parent;
	}
	if (methods) {
		for ( var m in methods) {
			ctor.prototype[m] = methods[m];
		}
	}
	return ctor;
};

org.xml3d.isa = function(object, classInfo) {
	var oClass = object._classInfo;
	while (oClass !== undefined)  {
		if (oClass == classInfo)
			return true;
		oClass = oClass.constructor.superClass;
	}
	return false;
};


var getElementByIdWrapper = function(xmldoc, myID, namespace) {

};




//-----------------------------------------------------------------------------
//Class Notification
//-----------------------------------------------------------------------------
org.xml3d.Notification = function(notifier, eventType, attribute, oldValue, newValue) {
	this.notifier = notifier;
	this.eventType = eventType;
	this.attribute = attribute;
	this.oldValue = oldValue;
	this.newValue = newValue;
};


//-----------------------------------------------------------------------------
// Init helper
//-----------------------------------------------------------------------------
org.xml3d.initFloat = function(value, defaultValue) {
	return value ? +value : defaultValue;
};

org.xml3d.initString = function(value, defaultValue) {
	return value ? value : defaultValue;
};

org.xml3d.initInt = function(value, defaultValue) {
	return value ? parseInt(value) : defaultValue;
};

/*
org.xml3d.initBoolean = function(value, defaultValue) {
	return value ? value == "true" : defaultValue;
};
*/

org.xml3d.initBoolean = function(value, defaultValue) {
    if (value === undefined || value == "")
		return defaultValue;
	
	if (typeof value == typeof "") {
		return value == "true" ? true : false;
	}
    return !!value;
};

org.xml3d.initXML3DVec3 = function(value, x, y, z) {
	if (value) {
		var result = new XML3DVec3();
		result.setVec3Value(value);
		return result;
	}
	else return new XML3DVec3(x, y, z);
};

org.xml3d.initXML3DRotation = function(value, x, y, z, angle) {
	var result = new XML3DRotation();
	if (value)
	{
		result.setAxisAngleValue(value);
	}
	else
	{
		result.setAxisAngle(new XML3DVec3(x, y, z), angle);
	}
	return result;
};

org.xml3d.initEnum = function(value, defaultValue, choice)
{
	if(value && typeof(value) == "string" && choice[value.toLowerCase()] !== undefined)
	{
		var index = choice[value.toLowerCase()];
		return choice[index];
	}

	return choice[defaultValue];
};

org.xml3d.initIntArray = function(value, defaultValue) {
	var exp = /([+\-0-9]+)/g;
	return value ? new Int32Array(value.match(exp)) : new Int32Array(defaultValue);
};

org.xml3d.initUInt16Array = function(value, defaultValue) {
	var exp = /([+\-0-9]+)/g;
	return value ? new Uint16Array(value.match(exp)) : new Uint16Array(defaultValue);
};

org.xml3d.initFloatArray = function(value, defaultValue) {
	var exp = /([+\-0-9eE\.]+)/g;
	return value ? new Float32Array(value.match(exp)) :  new Float32Array(defaultValue);
};

org.xml3d.initFloat3Array = function(value, defaultValue) {
	return org.xml3d.initFloatArray(value, defaultValue);
};

org.xml3d.initFloat2Array = function(value, defaultValue) {
	return org.xml3d.initFloatArray(value, defaultValue);
};

org.xml3d.initFloat4Array = function(value, defaultValue) {
	return org.xml3d.initFloatArray(value, defaultValue);
};

org.xml3d.initFloat4x4Array = function(value, defaultValue) {
	return org.xml3d.initFloatArray(value, defaultValue);
};

org.xml3d.initBoolArray = function(value, defaultValue) {
	var converted = value.replace(/(true)/i, "1").replace(/(false)/i, "0");
	return new Uint8Array(converted.match(/\d/i));
};

org.xml3d.initAnyURI = function(node, defaultValue) {
	return org.xml3d.initString(node, defaultValue);
};


//-----------------------------------------------------------------------------
// Checker helper
//-----------------------------------------------------------------------------
org.xml3d.isFloat = function(value)
{
	return typeof value == "number";
};

org.xml3d.isString = function(value)
{
	return typeof value == "string";
};

org.xml3d.isInt = function(value)
{
	return typeof value == "number";
};

org.xml3d.isBoolean = function(value)
{
	return typeof value == "boolean";
};

org.xml3d.isXML3DVec3 = function(value)
{
	return typeof value == "object" && new XML3DVec3().constructor == value.constructor;
};

org.xml3d.isXML3DRotation = function(value, x, y, z, angle)
{
	return typeof value == "object" && new XML3DRotation().constructor == value.constructor;
};

org.xml3d.isEnum = function(value, choice)
{
	return (typeof value == "string" && choice[value.toLowerCase()] != undefined);
};

org.xml3d.isIntArray = function(value)
{
	return typeof value == "object" && new Int32Array().constructor == value.constructor;
};

org.xml3d.isUInt16Array = function(value)
{
	return typeof value == "object" && new Uint16Array().constructor == value.constructor;
};

org.xml3d.isFloatArray = function(value)
{
	return typeof value == "object" && new Float32Array().constructor == value.constructor;
};

org.xml3d.isFloat3Array = function(value)
{
	return org.xml3d.isFloatArray(value);
};

org.xml3d.isFloat2Array = function(value)
{
	return org.xml3d.isFloatArray(value);
};

org.xml3d.isFloat4Array = function(value)
{
	return org.xml3d.isFloatArray(value);
};

org.xml3d.isFloat4x4Array = function(value)
{
	return org.xml3d.isFloatArray(value);
};

org.xml3d.isBoolArray = function(value)
{
	return typeof value == "object" && new Uint8Array().constructor == value.constructor;
};

org.xml3d.isAnyURI = function(node)
{
	return org.xml3d.isString(node);
};

org.xml3d.elementEvents = {
    "framedrawn":1, "mousedown":1, "mouseup":1, "click":1, "mousemove":1, 
	"mouseout":1, "update":1, "mousewheel":1 
};
org.xml3d.configureEvents = function(node) {
    node.__proto__.__addEventListener = node.__proto__.addEventListener;
    node.__proto__.__removeEventListener = node.__proto__.removeEventListener;

    node.addEventListener = function(type, listener, useCapture) {
                
        if(org.xml3d.elementEvents[node.nodeName]) {
            for (i = 0; i < this.adapters.length; i++) {
                if (this.adapters[i].addEventListener) {
                    this.adapters[i].addEventListener(type, listener, useCapture);
                }
            }
        }
        else
            this.__addEventListener(type, listener, useCapture);
    };
    node.removeEventListener = function(type, listener, useCapture) {
        
        if(org.xml3d.elementEvents[node.nodeName]) {
            for (i = 0; i < this.adapters.length; i++) {
                if (this.adapters[i].removeEventListener) {
                    this.adapters[i].removeEventListener(type, listener, useCapture);
                }
            }
        }
        else
            this.__removeEventListener(type, listener, useCapture);
    };
};

// MeshTypes
org.xml3d.MeshTypes = {};
org.xml3d.MeshTypes["triangles"] = 0;
org.xml3d.MeshTypes[0] = "triangles";
org.xml3d.MeshTypes["trianglestrips"] = 1;
org.xml3d.MeshTypes[1] = "trianglestrips";
org.xml3d.MeshTypes["lines"] = 2;
org.xml3d.MeshTypes[2] = "lines";
org.xml3d.MeshTypes["linestrips"] = 3;
org.xml3d.MeshTypes[3] = "linestrips";
// TextureTypes
org.xml3d.TextureTypes = {};
org.xml3d.TextureTypes["2d"] = 0;
org.xml3d.TextureTypes[0] = "2d";
org.xml3d.TextureTypes["1d"] = 1;
org.xml3d.TextureTypes[1] = "1d";
org.xml3d.TextureTypes["3d"] = 2;
org.xml3d.TextureTypes[2] = "3d";
// FilterTypes
org.xml3d.FilterTypes = {};
org.xml3d.FilterTypes["none"] = 0;
org.xml3d.FilterTypes[0] = "none";
org.xml3d.FilterTypes["nearest"] = 1;
org.xml3d.FilterTypes[1] = "nearest";
org.xml3d.FilterTypes["linear"] = 2;
org.xml3d.FilterTypes[2] = "linear";
// WrapTypes
org.xml3d.WrapTypes = {};
org.xml3d.WrapTypes["clamp"] = 0;
org.xml3d.WrapTypes[0] = "clamp";
org.xml3d.WrapTypes["repeat"] = 1;
org.xml3d.WrapTypes[1] = "repeat";
org.xml3d.WrapTypes["border"] = 2;
org.xml3d.WrapTypes[2] = "border";
// DataFieldType
org.xml3d.DataFieldType = {};
org.xml3d.DataFieldType["float "] = 0;
org.xml3d.DataFieldType[0] = "float ";
org.xml3d.DataFieldType["float2 "] = 1;
org.xml3d.DataFieldType[1] = "float2 ";
org.xml3d.DataFieldType["float3"] = 2;
org.xml3d.DataFieldType[2] = "float3";
org.xml3d.DataFieldType["float4"] = 3;
org.xml3d.DataFieldType[3] = "float4";
org.xml3d.DataFieldType["float4x4"] = 4;
org.xml3d.DataFieldType[4] = "float4x4";
org.xml3d.DataFieldType["int"] = 5;
org.xml3d.DataFieldType[5] = "int";
org.xml3d.DataFieldType["bool"] = 6;
org.xml3d.DataFieldType[6] = "bool";
org.xml3d.DataFieldType["texture"] = 7;
org.xml3d.DataFieldType[7] = "texture";
org.xml3d.DataFieldType["video"] = 8;
org.xml3d.DataFieldType[8] = "video";

org.xml3d.event = org.xml3d.event || {};
// Initialize methods
org.xml3d.event.UNHANDLED = 1;
org.xml3d.event.HANDLED = 2;

org.xml3d.factory = new org.xml3d.XML3DNodeFactory();
org.xml3d.configure = function(element) {
	if (element._configured !== undefined)
        return element;
    org.xml3d.factory.configure(element);
}

/**
 * Register class for element <Xml3dNode>
 */
org.xml3d.classInfo.Xml3dNode = function(node, c)
{
    org.xml3d.configureEvents(node);
    
	node.xml3ddocument = c.doc;
	node.adapters      = [];

	node.addAdapter = function(adapter)
	{
		this.adapters.push(adapter);
	};

	node.getTextContent = function()
	{
		var str = "";
		var k   = this.firstChild;

		while(k)
		{
			if (k.nodeType == 3)
			{
				str += k.textContent;
			}

			k = k.nextSibling;
		}
		return str;
	};

	node.notificationRequired = function ()
	{
		return this.adapters.length != 0;
	};

	node.notify = function (notification)
	{
		for(var i= 0; i < this.adapters.length; i++)
		{
		  this.adapters[i].notifyChanged(notification);
		}
	};

	node.update = function()
	{
		//if (this.adapters[0])
		//	this.adapters[0].factory.ctx.redraw("xml3d::update");
 	};

	node.setField = function(event)
	{
		return org.xml3d.event.UNHANDLED;
	};

	node.evalMethod = function(evtMethod)
	{
		if (evtMethod)
			eval(evtMethod);
	};
};


/**
 * Parameters and Methods for <xml3d>
 **/
org.xml3d.classInfo.xml3d = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._onclick = org.xml3d.initString(node.getAttribute("onclick"), "");
	node._ondblclick = org.xml3d.initString(node.getAttribute("ondblclick"), "");
	node._onmousedown = org.xml3d.initString(node.getAttribute("onmousedown"), "");
	node._onmouseup = org.xml3d.initString(node.getAttribute("onmouseup"), "");
	node._onmouseover = org.xml3d.initString(node.getAttribute("onmouseover"), "");
	node._onmousemove = org.xml3d.initString(node.getAttribute("onmousemove"), "");
	node._onmouseout = org.xml3d.initString(node.getAttribute("onmouseout"), "");
	node._onkeypress = org.xml3d.initString(node.getAttribute("onkeypress"), "");
	node._onkeydown = org.xml3d.initString(node.getAttribute("onkeydown"), "");
	node._onkeyup = org.xml3d.initString(node.getAttribute("onkeyup"), "");
	node._height = org.xml3d.initInt(node.getAttribute("height"), 600);
	node._width = org.xml3d.initInt(node.getAttribute("width"), 800);

	//node.definitionArea = [];
	//node.graph = [];
	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("onclick", function (value)
	{
		var oldValue = this._onclick;

		if(org.xml3d.isString(value))
		{
			this._onclick = value;
		}
		else
		{
			this._onclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onclick", oldValue, this._onclick));
		}
	});

	node.__defineGetter__("onclick", function (value)
	{
		return this._onclick;
	});

	// Bla:false
	node.__defineSetter__("ondblclick", function (value)
	{
		var oldValue = this._ondblclick;

		if(org.xml3d.isString(value))
		{
			this._ondblclick = value;
		}
		else
		{
			this._ondblclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.ondblclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "ondblclick", oldValue, this._ondblclick));
		}
	});

	node.__defineGetter__("ondblclick", function (value)
	{
		return this._ondblclick;
	});

	// Bla:false
	node.__defineSetter__("onmousedown", function (value)
	{
		var oldValue = this._onmousedown;

		if(org.xml3d.isString(value))
		{
			this._onmousedown = value;
		}
		else
		{
			this._onmousedown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousedown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousedown", oldValue, this._onmousedown));
		}
	});

	node.__defineGetter__("onmousedown", function (value)
	{
		return this._onmousedown;
	});

	// Bla:false
	node.__defineSetter__("onmouseup", function (value)
	{
		var oldValue = this._onmouseup;

		if(org.xml3d.isString(value))
		{
			this._onmouseup = value;
		}
		else
		{
			this._onmouseup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseup", oldValue, this._onmouseup));
		}
	});

	node.__defineGetter__("onmouseup", function (value)
	{
		return this._onmouseup;
	});

	// Bla:false
	node.__defineSetter__("onmouseover", function (value)
	{
		var oldValue = this._onmouseover;

		if(org.xml3d.isString(value))
		{
			this._onmouseover = value;
		}
		else
		{
			this._onmouseover = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseover))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseover", oldValue, this._onmouseover));
		}
	});

	node.__defineGetter__("onmouseover", function (value)
	{
		return this._onmouseover;
	});

	// Bla:false
	node.__defineSetter__("onmousemove", function (value)
	{
		var oldValue = this._onmousemove;

		if(org.xml3d.isString(value))
		{
			this._onmousemove = value;
		}
		else
		{
			this._onmousemove = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousemove))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousemove", oldValue, this._onmousemove));
		}
	});

	node.__defineGetter__("onmousemove", function (value)
	{
		return this._onmousemove;
	});

	// Bla:false
	node.__defineSetter__("onmouseout", function (value)
	{
		var oldValue = this._onmouseout;

		if(org.xml3d.isString(value))
		{
			this._onmouseout = value;
		}
		else
		{
			this._onmouseout = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseout))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseout", oldValue, this._onmouseout));
		}
	});

	node.__defineGetter__("onmouseout", function (value)
	{
		return this._onmouseout;
	});

	// Bla:false
	node.__defineSetter__("onkeypress", function (value)
	{
		var oldValue = this._onkeypress;

		if(org.xml3d.isString(value))
		{
			this._onkeypress = value;
		}
		else
		{
			this._onkeypress = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeypress))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeypress", oldValue, this._onkeypress));
		}
	});

	node.__defineGetter__("onkeypress", function (value)
	{
		return this._onkeypress;
	});

	// Bla:false
	node.__defineSetter__("onkeydown", function (value)
	{
		var oldValue = this._onkeydown;

		if(org.xml3d.isString(value))
		{
			this._onkeydown = value;
		}
		else
		{
			this._onkeydown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeydown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeydown", oldValue, this._onkeydown));
		}
	});

	node.__defineGetter__("onkeydown", function (value)
	{
		return this._onkeydown;
	});

	// Bla:false
	node.__defineSetter__("onkeyup", function (value)
	{
		var oldValue = this._onkeyup;

		if(org.xml3d.isString(value))
		{
			this._onkeyup = value;
		}
		else
		{
			this._onkeyup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeyup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeyup", oldValue, this._onkeyup));
		}
	});

	node.__defineGetter__("onkeyup", function (value)
	{
		return this._onkeyup;
	});

	// Bla:false
	node.__defineSetter__("height", function (value)
	{
		var oldValue = this._height;

		if(org.xml3d.isInt(value))
		{
			this._height = value;
		}
		else
		{
			this._height = org.xml3d.initInt(value, 600);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.height))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "height", oldValue, this._height));
		}
	});

	node.__defineGetter__("height", function (value)
	{
		return this._height;
	});

	// Bla:false
	node.__defineSetter__("width", function (value)
	{
		var oldValue = this._width;

		if(org.xml3d.isInt(value))
		{
			this._width = value;
		}
		else
		{
			this._width = org.xml3d.initInt(value, 800);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.width))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "width", oldValue, this._width));
		}
	});

	node.__defineGetter__("width", function (value)
	{
		return this._width;
	});


	node.__defineSetter__("activeView", function (value)
	{
		var oldValue = this._activeView;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("activeView", value);
		}
		else
		{
			this.setAttribute("activeView", org.xml3d.initString(value, ""));
		}

	    this._activeViewNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.activeView))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "activeView", oldValue, this.activeView));
		}
	});

	node.__defineGetter__("activeView", function (value)
	{
		return this.getAttribute("activeView");
	});

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "ondblclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.ondblclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousedown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousedown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseover")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseover = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousemove")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousemove = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseout")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseout = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeypress")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeypress = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeydown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeydown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeyup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeyup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "height")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.height = org.xml3d.initInt("", 600);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "width")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.width = org.xml3d.initInt("", 800);
			return org.xml3d.event.HANDLED;
		}

		if(attrName == "activeView")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.activeView = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		return org.xml3d.event.UNHANDLED;
	};

	node.getActiveViewNode = function()
	{
		if (!this._activeViewNode && this.hasAttribute("activeView"))
		{
		  this._activeViewNode = this.xml3ddocument.resolve(this.getAttribute("activeView"));
		}
		return this._activeViewNode;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onclick")
		{
			this.onclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "ondblclick")
		{
			this.ondblclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousedown")
		{
			this.onmousedown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseup")
		{
			this.onmouseup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseover")
		{
			this.onmouseover = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousemove")
		{
			this.onmousemove = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseout")
		{
			this.onmouseout = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeypress")
		{
			this.onkeypress = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeydown")
		{
			this.onkeydown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeyup")
		{
			this.onkeyup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "height")
		{
			this.height = org.xml3d.initInt(event.newValue, 600);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "width")
		{
			this.width = org.xml3d.initInt(event.newValue, 800);
			return org.xml3d.event.HANDLED;
		}

		if (event.attrName == "activeView")
		{
			this.activeView = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
	
		return org.xml3d.event.UNHANDLED;
	};

		node.createXML3DVec3 = org.xml3d.methods.xml3dCreateXML3DVec3;
		node.createXML3DRotation = org.xml3d.methods.xml3dCreateXML3DRotation;
		node.createXML3DMatrix = org.xml3d.methods.xml3dCreateXML3DMatrix;
		node.createXML3DRay = org.xml3d.methods.xml3dCreateXML3DRay;
		node.getElementByPoint = org.xml3d.methods.xml3dGetElementByPoint;
		node.generateRay = org.xml3d.methods.xml3dGenerateRay;
		node.getElementByRay = org.xml3d.methods.xml3dGetElementByRay;
		node.getBoundingBox = org.xml3d.methods.xml3dGetBoundingBox;

};
/**
 * Parameters and Methods for <data>
 **/
org.xml3d.classInfo.data = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._map = org.xml3d.initString(node.getAttribute("map"), "");
	node._expose = org.xml3d.initString(node.getAttribute("expose"), "");

	//node.sources = [];
	//node.childContainers = [];
	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("map", function (value)
	{
		var oldValue = this._map;

		if(org.xml3d.isString(value))
		{
			this._map = value;
		}
		else
		{
			this._map = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.map))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "map", oldValue, this._map));
		}
	});

	node.__defineGetter__("map", function (value)
	{
		return this._map;
	});

	// Bla:false
	node.__defineSetter__("expose", function (value)
	{
		var oldValue = this._expose;

		if(org.xml3d.isString(value))
		{
			this._expose = value;
		}
		else
		{
			this._expose = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.expose))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "expose", oldValue, this._expose));
		}
	});

	node.__defineGetter__("expose", function (value)
	{
		return this._expose;
	});


	node.__defineSetter__("src", function (value)
	{
		var oldValue = this._src;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("src", value);
		}
		else
		{
			this.setAttribute("src", org.xml3d.initString(value, ""));
		}

	    this._srcNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.src))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "src", oldValue, this.src));
		}
	});

	node.__defineGetter__("src", function (value)
	{
		return this.getAttribute("src");
	});

	node.__defineSetter__("script", function (value)
	{
		var oldValue = this._script;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("script", value);
		}
		else
		{
			this.setAttribute("script", org.xml3d.initString(value, ""));
		}

	    this._scriptNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.script))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "script", oldValue, this.script));
		}
	});

	node.__defineGetter__("script", function (value)
	{
		return this.getAttribute("script");
	});

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "map")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.map = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "expose")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.expose = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		if(attrName == "src")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.src = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "script")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.script = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		return org.xml3d.event.UNHANDLED;
	};

	node.getSrcNode = function()
	{
		if (!this._srcNode && this.hasAttribute("src"))
		{
		  this._srcNode = this.xml3ddocument.resolve(this.getAttribute("src"));
		}
		return this._srcNode;
	};

	node.getScriptNode = function()
	{
		if (!this._scriptNode && this.hasAttribute("script"))
		{
		  this._scriptNode = this.xml3ddocument.resolve(this.getAttribute("script"));
		}
		return this._scriptNode;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "map")
		{
			this.map = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "expose")
		{
			this.expose = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

		if (event.attrName == "src")
		{
			this.src = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "script")
		{
			this.script = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
	
		return org.xml3d.event.UNHANDLED;
	};

		node.getResult = org.xml3d.methods.dataGetResult;
		node.getOutputFieldNames = org.xml3d.methods.dataGetOutputFieldNames;

};
/**
 * Parameters and Methods for <defs>
 **/
org.xml3d.classInfo.defs = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");

	//node.children = [];
	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});


	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <group>
 **/
org.xml3d.classInfo.group = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._onclick = org.xml3d.initString(node.getAttribute("onclick"), "");
	node._ondblclick = org.xml3d.initString(node.getAttribute("ondblclick"), "");
	node._onmousedown = org.xml3d.initString(node.getAttribute("onmousedown"), "");
	node._onmouseup = org.xml3d.initString(node.getAttribute("onmouseup"), "");
	node._onmouseover = org.xml3d.initString(node.getAttribute("onmouseover"), "");
	node._onmousemove = org.xml3d.initString(node.getAttribute("onmousemove"), "");
	node._onmouseout = org.xml3d.initString(node.getAttribute("onmouseout"), "");
	node._onkeypress = org.xml3d.initString(node.getAttribute("onkeypress"), "");
	node._onkeydown = org.xml3d.initString(node.getAttribute("onkeydown"), "");
	node._onkeyup = org.xml3d.initString(node.getAttribute("onkeyup"), "");
	node._visible = org.xml3d.initBoolean(node.getAttribute("visible"), true);

	//node.children = [];
	//node.defs = [];
	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("onclick", function (value)
	{
		var oldValue = this._onclick;

		if(org.xml3d.isString(value))
		{
			this._onclick = value;
		}
		else
		{
			this._onclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onclick", oldValue, this._onclick));
		}
	});

	node.__defineGetter__("onclick", function (value)
	{
		return this._onclick;
	});

	// Bla:false
	node.__defineSetter__("ondblclick", function (value)
	{
		var oldValue = this._ondblclick;

		if(org.xml3d.isString(value))
		{
			this._ondblclick = value;
		}
		else
		{
			this._ondblclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.ondblclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "ondblclick", oldValue, this._ondblclick));
		}
	});

	node.__defineGetter__("ondblclick", function (value)
	{
		return this._ondblclick;
	});

	// Bla:false
	node.__defineSetter__("onmousedown", function (value)
	{
		var oldValue = this._onmousedown;

		if(org.xml3d.isString(value))
		{
			this._onmousedown = value;
		}
		else
		{
			this._onmousedown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousedown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousedown", oldValue, this._onmousedown));
		}
	});

	node.__defineGetter__("onmousedown", function (value)
	{
		return this._onmousedown;
	});

	// Bla:false
	node.__defineSetter__("onmouseup", function (value)
	{
		var oldValue = this._onmouseup;

		if(org.xml3d.isString(value))
		{
			this._onmouseup = value;
		}
		else
		{
			this._onmouseup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseup", oldValue, this._onmouseup));
		}
	});

	node.__defineGetter__("onmouseup", function (value)
	{
		return this._onmouseup;
	});

	// Bla:false
	node.__defineSetter__("onmouseover", function (value)
	{
		var oldValue = this._onmouseover;

		if(org.xml3d.isString(value))
		{
			this._onmouseover = value;
		}
		else
		{
			this._onmouseover = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseover))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseover", oldValue, this._onmouseover));
		}
	});

	node.__defineGetter__("onmouseover", function (value)
	{
		return this._onmouseover;
	});

	// Bla:false
	node.__defineSetter__("onmousemove", function (value)
	{
		var oldValue = this._onmousemove;

		if(org.xml3d.isString(value))
		{
			this._onmousemove = value;
		}
		else
		{
			this._onmousemove = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousemove))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousemove", oldValue, this._onmousemove));
		}
	});

	node.__defineGetter__("onmousemove", function (value)
	{
		return this._onmousemove;
	});

	// Bla:false
	node.__defineSetter__("onmouseout", function (value)
	{
		var oldValue = this._onmouseout;

		if(org.xml3d.isString(value))
		{
			this._onmouseout = value;
		}
		else
		{
			this._onmouseout = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseout))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseout", oldValue, this._onmouseout));
		}
	});

	node.__defineGetter__("onmouseout", function (value)
	{
		return this._onmouseout;
	});

	// Bla:false
	node.__defineSetter__("onkeypress", function (value)
	{
		var oldValue = this._onkeypress;

		if(org.xml3d.isString(value))
		{
			this._onkeypress = value;
		}
		else
		{
			this._onkeypress = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeypress))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeypress", oldValue, this._onkeypress));
		}
	});

	node.__defineGetter__("onkeypress", function (value)
	{
		return this._onkeypress;
	});

	// Bla:false
	node.__defineSetter__("onkeydown", function (value)
	{
		var oldValue = this._onkeydown;

		if(org.xml3d.isString(value))
		{
			this._onkeydown = value;
		}
		else
		{
			this._onkeydown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeydown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeydown", oldValue, this._onkeydown));
		}
	});

	node.__defineGetter__("onkeydown", function (value)
	{
		return this._onkeydown;
	});

	// Bla:false
	node.__defineSetter__("onkeyup", function (value)
	{
		var oldValue = this._onkeyup;

		if(org.xml3d.isString(value))
		{
			this._onkeyup = value;
		}
		else
		{
			this._onkeyup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeyup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeyup", oldValue, this._onkeyup));
		}
	});

	node.__defineGetter__("onkeyup", function (value)
	{
		return this._onkeyup;
	});

	// Bla:false
	node.__defineSetter__("visible", function (value)
	{
		var oldValue = this._visible;

		if(org.xml3d.isBoolean(value))
		{
			this._visible = value;
		}
		else
		{
			this._visible = org.xml3d.initBoolean(value, true);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.visible))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "visible", oldValue, this._visible));
		}
	});

	node.__defineGetter__("visible", function (value)
	{
		return this._visible;
	});


	node.__defineSetter__("transform", function (value)
	{
		var oldValue = this._transform;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("transform", value);
		}
		else
		{
			this.setAttribute("transform", org.xml3d.initString(value, ""));
		}

	    this._transformNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.transform))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "transform", oldValue, this.transform));
		}
	});

	node.__defineGetter__("transform", function (value)
	{
		return this.getAttribute("transform");
	});

	node.__defineSetter__("shader", function (value)
	{
		var oldValue = this._shader;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("shader", value);
		}
		else
		{
			this.setAttribute("shader", org.xml3d.initString(value, ""));
		}

	    this._shaderNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.shader))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "shader", oldValue, this.shader));
		}
	});

	node.__defineGetter__("shader", function (value)
	{
		return this.getAttribute("shader");
	});

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "ondblclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.ondblclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousedown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousedown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseover")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseover = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousemove")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousemove = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseout")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseout = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeypress")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeypress = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeydown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeydown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeyup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeyup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "visible")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.visible = org.xml3d.initBoolean("", true);
			return org.xml3d.event.HANDLED;
		}

		if(attrName == "transform")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.transform = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "shader")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.shader = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		return org.xml3d.event.UNHANDLED;
	};

	node.getTransformNode = function()
	{
		if (!this._transformNode && this.hasAttribute("transform"))
		{
		  this._transformNode = this.xml3ddocument.resolve(this.getAttribute("transform"));
		}
		return this._transformNode;
	};

	node.getShaderNode = function()
	{
		if (!this._shaderNode && this.hasAttribute("shader"))
		{
		  this._shaderNode = this.xml3ddocument.resolve(this.getAttribute("shader"));
		}
		return this._shaderNode;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onclick")
		{
			this.onclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "ondblclick")
		{
			this.ondblclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousedown")
		{
			this.onmousedown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseup")
		{
			this.onmouseup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseover")
		{
			this.onmouseover = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousemove")
		{
			this.onmousemove = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseout")
		{
			this.onmouseout = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeypress")
		{
			this.onkeypress = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeydown")
		{
			this.onkeydown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeyup")
		{
			this.onkeyup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "visible")
		{
			this.visible = org.xml3d.initBoolean(event.newValue, true);
			return org.xml3d.event.HANDLED;
		}

		if (event.attrName == "transform")
		{
			this.transform = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "shader")
		{
			this.shader = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
	
		return org.xml3d.event.UNHANDLED;
	};

		node.getWorldMatrix = org.xml3d.methods.XML3DGraphTypeGetWorldMatrix;
		node.getLocalMatrix = org.xml3d.methods.groupGetLocalMatrix;
		node.getBoundingBox = org.xml3d.methods.groupGetBoundingBox;

};
/**
 * Parameters and Methods for <mesh>
 **/
org.xml3d.classInfo.mesh = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._onclick = org.xml3d.initString(node.getAttribute("onclick"), "");
	node._ondblclick = org.xml3d.initString(node.getAttribute("ondblclick"), "");
	node._onmousedown = org.xml3d.initString(node.getAttribute("onmousedown"), "");
	node._onmouseup = org.xml3d.initString(node.getAttribute("onmouseup"), "");
	node._onmouseover = org.xml3d.initString(node.getAttribute("onmouseover"), "");
	node._onmousemove = org.xml3d.initString(node.getAttribute("onmousemove"), "");
	node._onmouseout = org.xml3d.initString(node.getAttribute("onmouseout"), "");
	node._onkeypress = org.xml3d.initString(node.getAttribute("onkeypress"), "");
	node._onkeydown = org.xml3d.initString(node.getAttribute("onkeydown"), "");
	node._onkeyup = org.xml3d.initString(node.getAttribute("onkeyup"), "");
	node._visible = org.xml3d.initBoolean(node.getAttribute("visible"), true);
	node._type = org.xml3d.initEnum(node.getAttribute("type"), 0, org.xml3d.MeshTypes);

	//node.sources = [];
	//node.childContainers = [];
	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("onclick", function (value)
	{
		var oldValue = this._onclick;

		if(org.xml3d.isString(value))
		{
			this._onclick = value;
		}
		else
		{
			this._onclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onclick", oldValue, this._onclick));
		}
	});

	node.__defineGetter__("onclick", function (value)
	{
		return this._onclick;
	});

	// Bla:false
	node.__defineSetter__("ondblclick", function (value)
	{
		var oldValue = this._ondblclick;

		if(org.xml3d.isString(value))
		{
			this._ondblclick = value;
		}
		else
		{
			this._ondblclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.ondblclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "ondblclick", oldValue, this._ondblclick));
		}
	});

	node.__defineGetter__("ondblclick", function (value)
	{
		return this._ondblclick;
	});

	// Bla:false
	node.__defineSetter__("onmousedown", function (value)
	{
		var oldValue = this._onmousedown;

		if(org.xml3d.isString(value))
		{
			this._onmousedown = value;
		}
		else
		{
			this._onmousedown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousedown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousedown", oldValue, this._onmousedown));
		}
	});

	node.__defineGetter__("onmousedown", function (value)
	{
		return this._onmousedown;
	});

	// Bla:false
	node.__defineSetter__("onmouseup", function (value)
	{
		var oldValue = this._onmouseup;

		if(org.xml3d.isString(value))
		{
			this._onmouseup = value;
		}
		else
		{
			this._onmouseup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseup", oldValue, this._onmouseup));
		}
	});

	node.__defineGetter__("onmouseup", function (value)
	{
		return this._onmouseup;
	});

	// Bla:false
	node.__defineSetter__("onmouseover", function (value)
	{
		var oldValue = this._onmouseover;

		if(org.xml3d.isString(value))
		{
			this._onmouseover = value;
		}
		else
		{
			this._onmouseover = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseover))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseover", oldValue, this._onmouseover));
		}
	});

	node.__defineGetter__("onmouseover", function (value)
	{
		return this._onmouseover;
	});

	// Bla:false
	node.__defineSetter__("onmousemove", function (value)
	{
		var oldValue = this._onmousemove;

		if(org.xml3d.isString(value))
		{
			this._onmousemove = value;
		}
		else
		{
			this._onmousemove = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousemove))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousemove", oldValue, this._onmousemove));
		}
	});

	node.__defineGetter__("onmousemove", function (value)
	{
		return this._onmousemove;
	});

	// Bla:false
	node.__defineSetter__("onmouseout", function (value)
	{
		var oldValue = this._onmouseout;

		if(org.xml3d.isString(value))
		{
			this._onmouseout = value;
		}
		else
		{
			this._onmouseout = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseout))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseout", oldValue, this._onmouseout));
		}
	});

	node.__defineGetter__("onmouseout", function (value)
	{
		return this._onmouseout;
	});

	// Bla:false
	node.__defineSetter__("onkeypress", function (value)
	{
		var oldValue = this._onkeypress;

		if(org.xml3d.isString(value))
		{
			this._onkeypress = value;
		}
		else
		{
			this._onkeypress = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeypress))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeypress", oldValue, this._onkeypress));
		}
	});

	node.__defineGetter__("onkeypress", function (value)
	{
		return this._onkeypress;
	});

	// Bla:false
	node.__defineSetter__("onkeydown", function (value)
	{
		var oldValue = this._onkeydown;

		if(org.xml3d.isString(value))
		{
			this._onkeydown = value;
		}
		else
		{
			this._onkeydown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeydown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeydown", oldValue, this._onkeydown));
		}
	});

	node.__defineGetter__("onkeydown", function (value)
	{
		return this._onkeydown;
	});

	// Bla:false
	node.__defineSetter__("onkeyup", function (value)
	{
		var oldValue = this._onkeyup;

		if(org.xml3d.isString(value))
		{
			this._onkeyup = value;
		}
		else
		{
			this._onkeyup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeyup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeyup", oldValue, this._onkeyup));
		}
	});

	node.__defineGetter__("onkeyup", function (value)
	{
		return this._onkeyup;
	});

	// Bla:false
	node.__defineSetter__("visible", function (value)
	{
		var oldValue = this._visible;

		if(org.xml3d.isBoolean(value))
		{
			this._visible = value;
		}
		else
		{
			this._visible = org.xml3d.initBoolean(value, true);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.visible))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "visible", oldValue, this._visible));
		}
	});

	node.__defineGetter__("visible", function (value)
	{
		return this._visible;
	});

	// Bla:false
	node.__defineSetter__("type", function (value)
	{
		var oldValue = this._type;

		if(org.xml3d.isEnum(value, org.xml3d.MeshTypes))
		{
			this._type = value;
		}
		else
		{
			this._type = org.xml3d.initEnum(value, 0, org.xml3d.MeshTypes);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.type))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "type", oldValue, this._type));
		}
	});

	node.__defineGetter__("type", function (value)
	{
		return this._type;
	});


	node.__defineSetter__("src", function (value)
	{
		var oldValue = this._src;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("src", value);
		}
		else
		{
			this.setAttribute("src", org.xml3d.initString(value, ""));
		}

	    this._srcNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.src))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "src", oldValue, this.src));
		}
	});

	node.__defineGetter__("src", function (value)
	{
		return this.getAttribute("src");
	});

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "ondblclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.ondblclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousedown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousedown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseover")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseover = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousemove")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousemove = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseout")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseout = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeypress")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeypress = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeydown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeydown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeyup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeyup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "visible")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.visible = org.xml3d.initBoolean("", true);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "type")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.type = org.xml3d.initEnum("", 0, org.xml3d.MeshTypes);
			return org.xml3d.event.HANDLED;
		}

		if(attrName == "src")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.src = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		return org.xml3d.event.UNHANDLED;
	};

	node.getSrcNode = function()
	{
		if (!this._srcNode && this.hasAttribute("src"))
		{
		  this._srcNode = this.xml3ddocument.resolve(this.getAttribute("src"));
		}
		return this._srcNode;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onclick")
		{
			this.onclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "ondblclick")
		{
			this.ondblclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousedown")
		{
			this.onmousedown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseup")
		{
			this.onmouseup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseover")
		{
			this.onmouseover = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousemove")
		{
			this.onmousemove = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseout")
		{
			this.onmouseout = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeypress")
		{
			this.onkeypress = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeydown")
		{
			this.onkeydown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeyup")
		{
			this.onkeyup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "visible")
		{
			this.visible = org.xml3d.initBoolean(event.newValue, true);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "type")
		{
			this.type = org.xml3d.initEnum(event.newValue, 0, org.xml3d.MeshTypes);
			return org.xml3d.event.HANDLED;
		}

		if (event.attrName == "src")
		{
			this.src = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
	
		return org.xml3d.event.UNHANDLED;
	};

		node.getWorldMatrix = org.xml3d.methods.XML3DGraphTypeGetWorldMatrix;
		node.getBoundingBox = org.xml3d.methods.meshGetBoundingBox;

};
/**
 * Parameters and Methods for <transform>
 **/
org.xml3d.classInfo.transform = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._translation = org.xml3d.initXML3DVec3(node.getAttribute("translation"), 0, 0, 0);
	if(node._translation != null)
	{
		node._translation.setOwnerNode("translation", node);
	}
	node._scale = org.xml3d.initXML3DVec3(node.getAttribute("scale"), 1, 1, 1);
	if(node._scale != null)
	{
		node._scale.setOwnerNode("scale", node);
	}
	node._rotation = org.xml3d.initXML3DRotation(node.getAttribute("rotation"), 0, 0, 1, 0);
	if(node._rotation != null)
	{
		node._rotation.setOwnerNode("rotation", node);
	}
	node._center = org.xml3d.initXML3DVec3(node.getAttribute("center"), 0, 0, 0);
	if(node._center != null)
	{
		node._center.setOwnerNode("center", node);
	}
	node._scaleOrientation = org.xml3d.initXML3DRotation(node.getAttribute("scaleOrientation"), 0, 0, 1, 0);
	if(node._scaleOrientation != null)
	{
		node._scaleOrientation.setOwnerNode("scaleOrientation", node);
	}

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("translation", function (value)
	{
		var oldValue = this._translation;

		if(org.xml3d.isXML3DVec3(value))
		{
			this._translation = value;
		}
		else
		{
			this._translation = org.xml3d.initXML3DVec3(value, 0, 0, 0);
		}

	    if(this._translation != null)
		{
			this._translation.setOwnerNode("translation", this);
		}		

		if (this.notificationRequired() && ! isEqual(oldValue,this.translation))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "translation", oldValue, this._translation));
		}
	});

	node.__defineGetter__("translation", function (value)
	{
		return this._translation;
	});

	// Bla:false
	node.__defineSetter__("scale", function (value)
	{
		var oldValue = this._scale;

		if(org.xml3d.isXML3DVec3(value))
		{
			this._scale = value;
		}
		else
		{
			this._scale = org.xml3d.initXML3DVec3(value, 1, 1, 1);
		}

	    if(this._scale != null)
		{
			this._scale.setOwnerNode("scale", this);
		}		

		if (this.notificationRequired() && ! isEqual(oldValue,this.scale))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "scale", oldValue, this._scale));
		}
	});

	node.__defineGetter__("scale", function (value)
	{
		return this._scale;
	});

	// Bla:false
	node.__defineSetter__("rotation", function (value)
	{
		var oldValue = this._rotation;

		if(org.xml3d.isXML3DRotation(value))
		{
			this._rotation = value;
		}
		else
		{
			this._rotation = org.xml3d.initXML3DRotation(value, 0, 0, 1, 0);
		}

	    if(this._rotation != null)
		{
			this._rotation.setOwnerNode("rotation", this);
		}		

		if (this.notificationRequired() && ! isEqual(oldValue,this.rotation))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "rotation", oldValue, this._rotation));
		}
	});

	node.__defineGetter__("rotation", function (value)
	{
		return this._rotation;
	});

	// Bla:false
	node.__defineSetter__("center", function (value)
	{
		var oldValue = this._center;

		if(org.xml3d.isXML3DVec3(value))
		{
			this._center = value;
		}
		else
		{
			this._center = org.xml3d.initXML3DVec3(value, 0, 0, 0);
		}

	    if(this._center != null)
		{
			this._center.setOwnerNode("center", this);
		}		

		if (this.notificationRequired() && ! isEqual(oldValue,this.center))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "center", oldValue, this._center));
		}
	});

	node.__defineGetter__("center", function (value)
	{
		return this._center;
	});

	// Bla:false
	node.__defineSetter__("scaleOrientation", function (value)
	{
		var oldValue = this._scaleOrientation;

		if(org.xml3d.isXML3DRotation(value))
		{
			this._scaleOrientation = value;
		}
		else
		{
			this._scaleOrientation = org.xml3d.initXML3DRotation(value, 0, 0, 1, 0);
		}

	    if(this._scaleOrientation != null)
		{
			this._scaleOrientation.setOwnerNode("scaleOrientation", this);
		}		

		if (this.notificationRequired() && ! isEqual(oldValue,this.scaleOrientation))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "scaleOrientation", oldValue, this._scaleOrientation));
		}
	});

	node.__defineGetter__("scaleOrientation", function (value)
	{
		return this._scaleOrientation;
	});


	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "translation")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.translation = org.xml3d.initXML3DVec3("", 0, 0, 0);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "scale")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.scale = org.xml3d.initXML3DVec3("", 1, 1, 1);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "rotation")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.rotation = org.xml3d.initXML3DRotation("", 0, 0, 1, 0);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "center")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.center = org.xml3d.initXML3DVec3("", 0, 0, 0);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "scaleOrientation")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.scaleOrientation = org.xml3d.initXML3DRotation("", 0, 0, 1, 0);
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "translation")
		{
			this.translation = org.xml3d.initXML3DVec3(event.newValue, 0, 0, 0);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "scale")
		{
			this.scale = org.xml3d.initXML3DVec3(event.newValue, 1, 1, 1);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "rotation")
		{
			this.rotation = org.xml3d.initXML3DRotation(event.newValue, 0, 0, 1, 0);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "center")
		{
			this.center = org.xml3d.initXML3DVec3(event.newValue, 0, 0, 0);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "scaleOrientation")
		{
			this.scaleOrientation = org.xml3d.initXML3DRotation(event.newValue, 0, 0, 1, 0);
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <shader>
 **/
org.xml3d.classInfo.shader = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");

	//node.sources = [];
	//node.childContainers = [];
	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});


	node.__defineSetter__("script", function (value)
	{
		var oldValue = this._script;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("script", value);
		}
		else
		{
			this.setAttribute("script", org.xml3d.initString(value, ""));
		}

	    this._scriptNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.script))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "script", oldValue, this.script));
		}
	});

	node.__defineGetter__("script", function (value)
	{
		return this.getAttribute("script");
	});

	node.__defineSetter__("src", function (value)
	{
		var oldValue = this._src;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("src", value);
		}
		else
		{
			this.setAttribute("src", org.xml3d.initString(value, ""));
		}

	    this._srcNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.src))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "src", oldValue, this.src));
		}
	});

	node.__defineGetter__("src", function (value)
	{
		return this.getAttribute("src");
	});

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		if(attrName == "script")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.script = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "src")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.src = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		return org.xml3d.event.UNHANDLED;
	};

	node.getScriptNode = function()
	{
		if (!this._scriptNode && this.hasAttribute("script"))
		{
		  this._scriptNode = this.xml3ddocument.resolve(this.getAttribute("script"));
		}
		return this._scriptNode;
	};

	node.getSrcNode = function()
	{
		if (!this._srcNode && this.hasAttribute("src"))
		{
		  this._srcNode = this.xml3ddocument.resolve(this.getAttribute("src"));
		}
		return this._srcNode;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

		if (event.attrName == "script")
		{
			this.script = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "src")
		{
			this.src = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <light>
 **/
org.xml3d.classInfo.light = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._onclick = org.xml3d.initString(node.getAttribute("onclick"), "");
	node._ondblclick = org.xml3d.initString(node.getAttribute("ondblclick"), "");
	node._onmousedown = org.xml3d.initString(node.getAttribute("onmousedown"), "");
	node._onmouseup = org.xml3d.initString(node.getAttribute("onmouseup"), "");
	node._onmouseover = org.xml3d.initString(node.getAttribute("onmouseover"), "");
	node._onmousemove = org.xml3d.initString(node.getAttribute("onmousemove"), "");
	node._onmouseout = org.xml3d.initString(node.getAttribute("onmouseout"), "");
	node._onkeypress = org.xml3d.initString(node.getAttribute("onkeypress"), "");
	node._onkeydown = org.xml3d.initString(node.getAttribute("onkeydown"), "");
	node._onkeyup = org.xml3d.initString(node.getAttribute("onkeyup"), "");
	node._visible = org.xml3d.initBoolean(node.getAttribute("visible"), true);
	node._global = org.xml3d.initBoolean(node.getAttribute("global"), false);
	node._intensity = org.xml3d.initFloat(node.getAttribute("intensity"), 1);

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("onclick", function (value)
	{
		var oldValue = this._onclick;

		if(org.xml3d.isString(value))
		{
			this._onclick = value;
		}
		else
		{
			this._onclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onclick", oldValue, this._onclick));
		}
	});

	node.__defineGetter__("onclick", function (value)
	{
		return this._onclick;
	});

	// Bla:false
	node.__defineSetter__("ondblclick", function (value)
	{
		var oldValue = this._ondblclick;

		if(org.xml3d.isString(value))
		{
			this._ondblclick = value;
		}
		else
		{
			this._ondblclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.ondblclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "ondblclick", oldValue, this._ondblclick));
		}
	});

	node.__defineGetter__("ondblclick", function (value)
	{
		return this._ondblclick;
	});

	// Bla:false
	node.__defineSetter__("onmousedown", function (value)
	{
		var oldValue = this._onmousedown;

		if(org.xml3d.isString(value))
		{
			this._onmousedown = value;
		}
		else
		{
			this._onmousedown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousedown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousedown", oldValue, this._onmousedown));
		}
	});

	node.__defineGetter__("onmousedown", function (value)
	{
		return this._onmousedown;
	});

	// Bla:false
	node.__defineSetter__("onmouseup", function (value)
	{
		var oldValue = this._onmouseup;

		if(org.xml3d.isString(value))
		{
			this._onmouseup = value;
		}
		else
		{
			this._onmouseup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseup", oldValue, this._onmouseup));
		}
	});

	node.__defineGetter__("onmouseup", function (value)
	{
		return this._onmouseup;
	});

	// Bla:false
	node.__defineSetter__("onmouseover", function (value)
	{
		var oldValue = this._onmouseover;

		if(org.xml3d.isString(value))
		{
			this._onmouseover = value;
		}
		else
		{
			this._onmouseover = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseover))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseover", oldValue, this._onmouseover));
		}
	});

	node.__defineGetter__("onmouseover", function (value)
	{
		return this._onmouseover;
	});

	// Bla:false
	node.__defineSetter__("onmousemove", function (value)
	{
		var oldValue = this._onmousemove;

		if(org.xml3d.isString(value))
		{
			this._onmousemove = value;
		}
		else
		{
			this._onmousemove = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousemove))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousemove", oldValue, this._onmousemove));
		}
	});

	node.__defineGetter__("onmousemove", function (value)
	{
		return this._onmousemove;
	});

	// Bla:false
	node.__defineSetter__("onmouseout", function (value)
	{
		var oldValue = this._onmouseout;

		if(org.xml3d.isString(value))
		{
			this._onmouseout = value;
		}
		else
		{
			this._onmouseout = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseout))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseout", oldValue, this._onmouseout));
		}
	});

	node.__defineGetter__("onmouseout", function (value)
	{
		return this._onmouseout;
	});

	// Bla:false
	node.__defineSetter__("onkeypress", function (value)
	{
		var oldValue = this._onkeypress;

		if(org.xml3d.isString(value))
		{
			this._onkeypress = value;
		}
		else
		{
			this._onkeypress = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeypress))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeypress", oldValue, this._onkeypress));
		}
	});

	node.__defineGetter__("onkeypress", function (value)
	{
		return this._onkeypress;
	});

	// Bla:false
	node.__defineSetter__("onkeydown", function (value)
	{
		var oldValue = this._onkeydown;

		if(org.xml3d.isString(value))
		{
			this._onkeydown = value;
		}
		else
		{
			this._onkeydown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeydown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeydown", oldValue, this._onkeydown));
		}
	});

	node.__defineGetter__("onkeydown", function (value)
	{
		return this._onkeydown;
	});

	// Bla:false
	node.__defineSetter__("onkeyup", function (value)
	{
		var oldValue = this._onkeyup;

		if(org.xml3d.isString(value))
		{
			this._onkeyup = value;
		}
		else
		{
			this._onkeyup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeyup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeyup", oldValue, this._onkeyup));
		}
	});

	node.__defineGetter__("onkeyup", function (value)
	{
		return this._onkeyup;
	});

	// Bla:false
	node.__defineSetter__("visible", function (value)
	{
		var oldValue = this._visible;

		if(org.xml3d.isBoolean(value))
		{
			this._visible = value;
		}
		else
		{
			this._visible = org.xml3d.initBoolean(value, true);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.visible))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "visible", oldValue, this._visible));
		}
	});

	node.__defineGetter__("visible", function (value)
	{
		return this._visible;
	});

	// Bla:false
	node.__defineSetter__("global", function (value)
	{
		var oldValue = this._global;

		if(org.xml3d.isBoolean(value))
		{
			this._global = value;
		}
		else
		{
			this._global = org.xml3d.initBoolean(value, false);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.global))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "global", oldValue, this._global));
		}
	});

	node.__defineGetter__("global", function (value)
	{
		return this._global;
	});

	// Bla:false
	node.__defineSetter__("intensity", function (value)
	{
		var oldValue = this._intensity;

		if(org.xml3d.isFloat(value))
		{
			this._intensity = value;
		}
		else
		{
			this._intensity = org.xml3d.initFloat(value, 1);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.intensity))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "intensity", oldValue, this._intensity));
		}
	});

	node.__defineGetter__("intensity", function (value)
	{
		return this._intensity;
	});


	node.__defineSetter__("shader", function (value)
	{
		var oldValue = this._shader;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("shader", value);
		}
		else
		{
			this.setAttribute("shader", org.xml3d.initString(value, ""));
		}

	    this._shaderNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.shader))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "shader", oldValue, this.shader));
		}
	});

	node.__defineGetter__("shader", function (value)
	{
		return this.getAttribute("shader");
	});

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "ondblclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.ondblclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousedown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousedown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseover")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseover = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousemove")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousemove = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseout")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseout = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeypress")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeypress = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeydown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeydown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeyup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeyup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "visible")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.visible = org.xml3d.initBoolean("", true);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "global")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.global = org.xml3d.initBoolean("", false);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "intensity")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.intensity = org.xml3d.initFloat("", 1);
			return org.xml3d.event.HANDLED;
		}

		if(attrName == "shader")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.shader = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		return org.xml3d.event.UNHANDLED;
	};

	node.getShaderNode = function()
	{
		if (!this._shaderNode && this.hasAttribute("shader"))
		{
		  this._shaderNode = this.xml3ddocument.resolve(this.getAttribute("shader"));
		}
		return this._shaderNode;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onclick")
		{
			this.onclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "ondblclick")
		{
			this.ondblclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousedown")
		{
			this.onmousedown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseup")
		{
			this.onmouseup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseover")
		{
			this.onmouseover = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousemove")
		{
			this.onmousemove = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseout")
		{
			this.onmouseout = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeypress")
		{
			this.onkeypress = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeydown")
		{
			this.onkeydown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeyup")
		{
			this.onkeyup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "visible")
		{
			this.visible = org.xml3d.initBoolean(event.newValue, true);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "global")
		{
			this.global = org.xml3d.initBoolean(event.newValue, false);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "intensity")
		{
			this.intensity = org.xml3d.initFloat(event.newValue, 1);
			return org.xml3d.event.HANDLED;
		}

		if (event.attrName == "shader")
		{
			this.shader = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
	
		return org.xml3d.event.UNHANDLED;
	};

		node.getWorldMatrix = org.xml3d.methods.XML3DGraphTypeGetWorldMatrix;

};
/**
 * Parameters and Methods for <lightshader>
 **/
org.xml3d.classInfo.lightshader = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");

	//node.sources = [];
	//node.childContainers = [];
	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});


	node.__defineSetter__("script", function (value)
	{
		var oldValue = this._script;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("script", value);
		}
		else
		{
			this.setAttribute("script", org.xml3d.initString(value, ""));
		}

	    this._scriptNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.script))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "script", oldValue, this.script));
		}
	});

	node.__defineGetter__("script", function (value)
	{
		return this.getAttribute("script");
	});

	node.__defineSetter__("src", function (value)
	{
		var oldValue = this._src;
		
		if(org.xml3d.isString(value))
		{
			this.setAttribute("src", value);
		}
		else
		{
			this.setAttribute("src", org.xml3d.initString(value, ""));
		}

	    this._srcNode = null;

		if (this.notificationRequired() && ! isEqual(oldValue, this.src))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "src", oldValue, this.src));
		}
	});

	node.__defineGetter__("src", function (value)
	{
		return this.getAttribute("src");
	});

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		if(attrName == "script")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.script = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "src")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.src = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}

		return org.xml3d.event.UNHANDLED;
	};

	node.getScriptNode = function()
	{
		if (!this._scriptNode && this.hasAttribute("script"))
		{
		  this._scriptNode = this.xml3ddocument.resolve(this.getAttribute("script"));
		}
		return this._scriptNode;
	};

	node.getSrcNode = function()
	{
		if (!this._srcNode && this.hasAttribute("src"))
		{
		  this._srcNode = this.xml3ddocument.resolve(this.getAttribute("src"));
		}
		return this._srcNode;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

		if (event.attrName == "script")
		{
			this.script = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "src")
		{
			this.src = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <script>
 **/
org.xml3d.classInfo.script = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node.value = org.xml3d.initString(node.getTextContent(), null);
	node._src = org.xml3d.initString(node.getAttribute("src"), "");
	node._type = org.xml3d.initString(node.getAttribute("type"), "");

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// TODO: Setter for mixed value
	node.setValue = function(e)
	{
		var oldValue = this.value;
		this.value = org.xml3d.initString(e.newValue, null);

		if (this.parentNode.notificationRequired() && ! isEqual(oldValue,this.value))
		{
	    	this.parentNode.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "value", oldValue, this.value));
		}
	};
	// Bla:false
	node.__defineSetter__("src", function (value)
	{
		var oldValue = this._src;

		if(org.xml3d.isString(value))
		{
			this._src = value;
		}
		else
		{
			this._src = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.src))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "src", oldValue, this._src));
		}
	});

	node.__defineGetter__("src", function (value)
	{
		return this._src;
	});

	// Bla:false
	node.__defineSetter__("type", function (value)
	{
		var oldValue = this._type;

		if(org.xml3d.isString(value))
		{
			this._type = value;
		}
		else
		{
			this._type = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.type))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "type", oldValue, this._type));
		}
	});

	node.__defineGetter__("type", function (value)
	{
		return this._type;
	});


	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "src")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.src = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "type")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.type = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "src")
		{
			this.src = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "type")
		{
			this.type = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <float>
 **/
org.xml3d.classInfo.float = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._name = org.xml3d.initString(node.getAttribute("name"), "");
	node.value = org.xml3d.initFloatArray(node.getTextContent(), null);

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("name", function (value)
	{
		var oldValue = this._name;

		if(org.xml3d.isString(value))
		{
			this._name = value;
		}
		else
		{
			this._name = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.name))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "name", oldValue, this._name));
		}
	});

	node.__defineGetter__("name", function (value)
	{
		return this._name;
	});

	// TODO: Setter for mixed value
	node.setValue = function(e)
	{
		var oldValue = this.value;
		this.value = org.xml3d.initFloatArray(e.newValue, null);

		if (this.parentNode.notificationRequired() && ! isEqual(oldValue,this.value))
		{
	    	this.parentNode.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "value", oldValue, this.value));
		}
	};

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "name")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.name = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "name")
		{
			this.name = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <float2>
 **/
org.xml3d.classInfo.float2 = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._name = org.xml3d.initString(node.getAttribute("name"), "");
	node.value = org.xml3d.initFloat2Array(node.getTextContent(), null);

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("name", function (value)
	{
		var oldValue = this._name;

		if(org.xml3d.isString(value))
		{
			this._name = value;
		}
		else
		{
			this._name = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.name))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "name", oldValue, this._name));
		}
	});

	node.__defineGetter__("name", function (value)
	{
		return this._name;
	});

	// TODO: Setter for mixed value
	node.setValue = function(e)
	{
		var oldValue = this.value;
		this.value = org.xml3d.initFloat2Array(e.newValue, null);

		if (this.parentNode.notificationRequired() && ! isEqual(oldValue,this.value))
		{
	    	this.parentNode.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "value", oldValue, this.value));
		}
	};

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "name")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.name = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "name")
		{
			this.name = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <float3>
 **/
org.xml3d.classInfo.float3 = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._name = org.xml3d.initString(node.getAttribute("name"), "");
	node.value = org.xml3d.initFloat3Array(node.getTextContent(), null);

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("name", function (value)
	{
		var oldValue = this._name;

		if(org.xml3d.isString(value))
		{
			this._name = value;
		}
		else
		{
			this._name = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.name))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "name", oldValue, this._name));
		}
	});

	node.__defineGetter__("name", function (value)
	{
		return this._name;
	});

	// TODO: Setter for mixed value
	node.setValue = function(e)
	{
		var oldValue = this.value;
		this.value = org.xml3d.initFloat3Array(e.newValue, null);

		if (this.parentNode.notificationRequired() && ! isEqual(oldValue,this.value))
		{
	    	this.parentNode.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "value", oldValue, this.value));
		}
	};

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "name")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.name = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "name")
		{
			this.name = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <float4>
 **/
org.xml3d.classInfo.float4 = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._name = org.xml3d.initString(node.getAttribute("name"), "");
	node.value = org.xml3d.initFloat4Array(node.getTextContent(), null);

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("name", function (value)
	{
		var oldValue = this._name;

		if(org.xml3d.isString(value))
		{
			this._name = value;
		}
		else
		{
			this._name = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.name))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "name", oldValue, this._name));
		}
	});

	node.__defineGetter__("name", function (value)
	{
		return this._name;
	});

	// TODO: Setter for mixed value
	node.setValue = function(e)
	{
		var oldValue = this.value;
		this.value = org.xml3d.initFloat4Array(e.newValue, null);

		if (this.parentNode.notificationRequired() && ! isEqual(oldValue,this.value))
		{
	    	this.parentNode.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "value", oldValue, this.value));
		}
	};

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "name")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.name = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "name")
		{
			this.name = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <float4x4>
 **/
org.xml3d.classInfo.float4x4 = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._name = org.xml3d.initString(node.getAttribute("name"), "");
	node.value = org.xml3d.initFloat4x4Array(node.getTextContent(), []);

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("name", function (value)
	{
		var oldValue = this._name;

		if(org.xml3d.isString(value))
		{
			this._name = value;
		}
		else
		{
			this._name = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.name))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "name", oldValue, this._name));
		}
	});

	node.__defineGetter__("name", function (value)
	{
		return this._name;
	});

	// TODO: Setter for mixed value
	node.setValue = function(e)
	{
		var oldValue = this.value;
		this.value = org.xml3d.initFloat4x4Array(e.newValue, []);

		if (this.parentNode.notificationRequired() && ! isEqual(oldValue,this.value))
		{
	    	this.parentNode.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "value", oldValue, this.value));
		}
	};

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "name")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.name = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "name")
		{
			this.name = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <int>
 **/
org.xml3d.classInfo.int = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._name = org.xml3d.initString(node.getAttribute("name"), "");
	node.value = org.xml3d.initIntArray(node.getTextContent(), null);

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("name", function (value)
	{
		var oldValue = this._name;

		if(org.xml3d.isString(value))
		{
			this._name = value;
		}
		else
		{
			this._name = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.name))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "name", oldValue, this._name));
		}
	});

	node.__defineGetter__("name", function (value)
	{
		return this._name;
	});

	// TODO: Setter for mixed value
	node.setValue = function(e)
	{
		var oldValue = this.value;
		this.value = org.xml3d.initIntArray(e.newValue, null);

		if (this.parentNode.notificationRequired() && ! isEqual(oldValue,this.value))
		{
	    	this.parentNode.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "value", oldValue, this.value));
		}
	};

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "name")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.name = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "name")
		{
			this.name = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <bool>
 **/
org.xml3d.classInfo.bool = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._name = org.xml3d.initString(node.getAttribute("name"), "");
	node.value = org.xml3d.initBoolArray(node.getTextContent(), null);

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("name", function (value)
	{
		var oldValue = this._name;

		if(org.xml3d.isString(value))
		{
			this._name = value;
		}
		else
		{
			this._name = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.name))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "name", oldValue, this._name));
		}
	});

	node.__defineGetter__("name", function (value)
	{
		return this._name;
	});

	// TODO: Setter for mixed value
	node.setValue = function(e)
	{
		var oldValue = this.value;
		this.value = org.xml3d.initBoolArray(e.newValue, null);

		if (this.parentNode.notificationRequired() && ! isEqual(oldValue,this.value))
		{
	    	this.parentNode.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "value", oldValue, this.value));
		}
	};

	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "name")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.name = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "name")
		{
			this.name = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <texture>
 **/
org.xml3d.classInfo.texture = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._name = org.xml3d.initString(node.getAttribute("name"), "");
	node._type = org.xml3d.initEnum(node.getAttribute("type"), 0, org.xml3d.TextureTypes);
	node._filterMin = org.xml3d.initEnum(node.getAttribute("filterMin"), 2, org.xml3d.FilterTypes);
	node._filterMag = org.xml3d.initEnum(node.getAttribute("filterMag"), 2, org.xml3d.FilterTypes);
	node._filterMip = org.xml3d.initEnum(node.getAttribute("filterMip"), 1, org.xml3d.FilterTypes);
	node._wrapS = org.xml3d.initEnum(node.getAttribute("wrapS"), 0, org.xml3d.WrapTypes);
	node._wrapT = org.xml3d.initEnum(node.getAttribute("wrapT"), 0, org.xml3d.WrapTypes);
	node._wrapU = org.xml3d.initEnum(node.getAttribute("wrapU"), 0, org.xml3d.WrapTypes);
	node._borderColor = org.xml3d.initString(node.getAttribute("borderColor"), "");

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("name", function (value)
	{
		var oldValue = this._name;

		if(org.xml3d.isString(value))
		{
			this._name = value;
		}
		else
		{
			this._name = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.name))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "name", oldValue, this._name));
		}
	});

	node.__defineGetter__("name", function (value)
	{
		return this._name;
	});

	// Bla:false
	node.__defineSetter__("type", function (value)
	{
		var oldValue = this._type;

		if(org.xml3d.isEnum(value, org.xml3d.TextureTypes))
		{
			this._type = value;
		}
		else
		{
			this._type = org.xml3d.initEnum(value, 0, org.xml3d.TextureTypes);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.type))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "type", oldValue, this._type));
		}
	});

	node.__defineGetter__("type", function (value)
	{
		return this._type;
	});

	// Bla:false
	node.__defineSetter__("filterMin", function (value)
	{
		var oldValue = this._filterMin;

		if(org.xml3d.isEnum(value, org.xml3d.FilterTypes))
		{
			this._filterMin = value;
		}
		else
		{
			this._filterMin = org.xml3d.initEnum(value, 2, org.xml3d.FilterTypes);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.filterMin))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "filterMin", oldValue, this._filterMin));
		}
	});

	node.__defineGetter__("filterMin", function (value)
	{
		return this._filterMin;
	});

	// Bla:false
	node.__defineSetter__("filterMag", function (value)
	{
		var oldValue = this._filterMag;

		if(org.xml3d.isEnum(value, org.xml3d.FilterTypes))
		{
			this._filterMag = value;
		}
		else
		{
			this._filterMag = org.xml3d.initEnum(value, 2, org.xml3d.FilterTypes);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.filterMag))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "filterMag", oldValue, this._filterMag));
		}
	});

	node.__defineGetter__("filterMag", function (value)
	{
		return this._filterMag;
	});

	// Bla:false
	node.__defineSetter__("filterMip", function (value)
	{
		var oldValue = this._filterMip;

		if(org.xml3d.isEnum(value, org.xml3d.FilterTypes))
		{
			this._filterMip = value;
		}
		else
		{
			this._filterMip = org.xml3d.initEnum(value, 1, org.xml3d.FilterTypes);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.filterMip))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "filterMip", oldValue, this._filterMip));
		}
	});

	node.__defineGetter__("filterMip", function (value)
	{
		return this._filterMip;
	});

	// Bla:false
	node.__defineSetter__("wrapS", function (value)
	{
		var oldValue = this._wrapS;

		if(org.xml3d.isEnum(value, org.xml3d.WrapTypes))
		{
			this._wrapS = value;
		}
		else
		{
			this._wrapS = org.xml3d.initEnum(value, 0, org.xml3d.WrapTypes);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.wrapS))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "wrapS", oldValue, this._wrapS));
		}
	});

	node.__defineGetter__("wrapS", function (value)
	{
		return this._wrapS;
	});

	// Bla:false
	node.__defineSetter__("wrapT", function (value)
	{
		var oldValue = this._wrapT;

		if(org.xml3d.isEnum(value, org.xml3d.WrapTypes))
		{
			this._wrapT = value;
		}
		else
		{
			this._wrapT = org.xml3d.initEnum(value, 0, org.xml3d.WrapTypes);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.wrapT))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "wrapT", oldValue, this._wrapT));
		}
	});

	node.__defineGetter__("wrapT", function (value)
	{
		return this._wrapT;
	});

	// Bla:false
	node.__defineSetter__("wrapU", function (value)
	{
		var oldValue = this._wrapU;

		if(org.xml3d.isEnum(value, org.xml3d.WrapTypes))
		{
			this._wrapU = value;
		}
		else
		{
			this._wrapU = org.xml3d.initEnum(value, 0, org.xml3d.WrapTypes);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.wrapU))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "wrapU", oldValue, this._wrapU));
		}
	});

	node.__defineGetter__("wrapU", function (value)
	{
		return this._wrapU;
	});

	// Bla:false
	node.__defineSetter__("borderColor", function (value)
	{
		var oldValue = this._borderColor;

		if(org.xml3d.isString(value))
		{
			this._borderColor = value;
		}
		else
		{
			this._borderColor = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.borderColor))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "borderColor", oldValue, this._borderColor));
		}
	});

	node.__defineGetter__("borderColor", function (value)
	{
		return this._borderColor;
	});


	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "name")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.name = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "type")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.type = org.xml3d.initEnum("", 0, org.xml3d.TextureTypes);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "filterMin")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.filterMin = org.xml3d.initEnum("", 2, org.xml3d.FilterTypes);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "filterMag")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.filterMag = org.xml3d.initEnum("", 2, org.xml3d.FilterTypes);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "filterMip")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.filterMip = org.xml3d.initEnum("", 1, org.xml3d.FilterTypes);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "wrapS")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.wrapS = org.xml3d.initEnum("", 0, org.xml3d.WrapTypes);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "wrapT")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.wrapT = org.xml3d.initEnum("", 0, org.xml3d.WrapTypes);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "wrapU")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.wrapU = org.xml3d.initEnum("", 0, org.xml3d.WrapTypes);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "borderColor")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.borderColor = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "name")
		{
			this.name = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "type")
		{
			this.type = org.xml3d.initEnum(event.newValue, 0, org.xml3d.TextureTypes);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "filterMin")
		{
			this.filterMin = org.xml3d.initEnum(event.newValue, 2, org.xml3d.FilterTypes);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "filterMag")
		{
			this.filterMag = org.xml3d.initEnum(event.newValue, 2, org.xml3d.FilterTypes);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "filterMip")
		{
			this.filterMip = org.xml3d.initEnum(event.newValue, 1, org.xml3d.FilterTypes);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "wrapS")
		{
			this.wrapS = org.xml3d.initEnum(event.newValue, 0, org.xml3d.WrapTypes);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "wrapT")
		{
			this.wrapT = org.xml3d.initEnum(event.newValue, 0, org.xml3d.WrapTypes);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "wrapU")
		{
			this.wrapU = org.xml3d.initEnum(event.newValue, 0, org.xml3d.WrapTypes);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "borderColor")
		{
			this.borderColor = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <img>
 **/
org.xml3d.classInfo.img = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._src = org.xml3d.initString(node.getAttribute("src"), "");

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("src", function (value)
	{
		var oldValue = this._src;

		if(org.xml3d.isString(value))
		{
			this._src = value;
		}
		else
		{
			this._src = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.src))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "src", oldValue, this._src));
		}
	});

	node.__defineGetter__("src", function (value)
	{
		return this._src;
	});


	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "src")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.src = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "src")
		{
			this.src = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <video>
 **/
org.xml3d.classInfo.video = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._src = org.xml3d.initString(node.getAttribute("src"), "");

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("src", function (value)
	{
		var oldValue = this._src;

		if(org.xml3d.isString(value))
		{
			this._src = value;
		}
		else
		{
			this._src = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.src))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "src", oldValue, this._src));
		}
	});

	node.__defineGetter__("src", function (value)
	{
		return this._src;
	});


	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "src")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.src = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "src")
		{
			this.src = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};


};
/**
 * Parameters and Methods for <view>
 **/
org.xml3d.classInfo.view = function(node, context)
{
	org.xml3d.classInfo.Xml3dNode(node, context);

	node._id = org.xml3d.initString(node.getAttribute("id"), null);
	node._class = org.xml3d.initString(node.getAttribute("class"), null);
	node._style = org.xml3d.initString(node.getAttribute("style"), "");
	node._onclick = org.xml3d.initString(node.getAttribute("onclick"), "");
	node._ondblclick = org.xml3d.initString(node.getAttribute("ondblclick"), "");
	node._onmousedown = org.xml3d.initString(node.getAttribute("onmousedown"), "");
	node._onmouseup = org.xml3d.initString(node.getAttribute("onmouseup"), "");
	node._onmouseover = org.xml3d.initString(node.getAttribute("onmouseover"), "");
	node._onmousemove = org.xml3d.initString(node.getAttribute("onmousemove"), "");
	node._onmouseout = org.xml3d.initString(node.getAttribute("onmouseout"), "");
	node._onkeypress = org.xml3d.initString(node.getAttribute("onkeypress"), "");
	node._onkeydown = org.xml3d.initString(node.getAttribute("onkeydown"), "");
	node._onkeyup = org.xml3d.initString(node.getAttribute("onkeyup"), "");
	node._visible = org.xml3d.initBoolean(node.getAttribute("visible"), true);
	node._position = org.xml3d.initXML3DVec3(node.getAttribute("position"), 0, 0, 0);
	if(node._position != null)
	{
		node._position.setOwnerNode("position", node);
	}
	node._orientation = org.xml3d.initXML3DRotation(node.getAttribute("orientation"), 0, 0, 1, 0);
	if(node._orientation != null)
	{
		node._orientation.setOwnerNode("orientation", node);
	}
	node._fieldOfView = org.xml3d.initFloat(node.getAttribute("fieldOfView"), 0.785398);

	
	
	
	// Bla:false
	node.__defineSetter__("id", function (value)
	{
		var oldValue = this._id;

		if(org.xml3d.isString(value))
		{
			this._id = value;
		}
		else
		{
			this._id = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.id))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "id", oldValue, this._id));
		}
	});

	node.__defineGetter__("id", function (value)
	{
		return this._id;
	});

	// Bla:false
	node.__defineSetter__("class", function (value)
	{
		var oldValue = this._class;

		if(org.xml3d.isString(value))
		{
			this._class = value;
		}
		else
		{
			this._class = org.xml3d.initString(value, null);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.class))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "class", oldValue, this._class));
		}
	});

	node.__defineGetter__("class", function (value)
	{
		return this._class;
	});

	// Bla:false
	node.__defineSetter__("style", function (value)
	{
		var oldValue = this._style;

		if(org.xml3d.isString(value))
		{
			this._style = value;
		}
		else
		{
			this._style = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.style))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "style", oldValue, this._style));
		}
	});

	node.__defineGetter__("style", function (value)
	{
		return this._style;
	});

	// Bla:false
	node.__defineSetter__("onclick", function (value)
	{
		var oldValue = this._onclick;

		if(org.xml3d.isString(value))
		{
			this._onclick = value;
		}
		else
		{
			this._onclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onclick", oldValue, this._onclick));
		}
	});

	node.__defineGetter__("onclick", function (value)
	{
		return this._onclick;
	});

	// Bla:false
	node.__defineSetter__("ondblclick", function (value)
	{
		var oldValue = this._ondblclick;

		if(org.xml3d.isString(value))
		{
			this._ondblclick = value;
		}
		else
		{
			this._ondblclick = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.ondblclick))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "ondblclick", oldValue, this._ondblclick));
		}
	});

	node.__defineGetter__("ondblclick", function (value)
	{
		return this._ondblclick;
	});

	// Bla:false
	node.__defineSetter__("onmousedown", function (value)
	{
		var oldValue = this._onmousedown;

		if(org.xml3d.isString(value))
		{
			this._onmousedown = value;
		}
		else
		{
			this._onmousedown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousedown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousedown", oldValue, this._onmousedown));
		}
	});

	node.__defineGetter__("onmousedown", function (value)
	{
		return this._onmousedown;
	});

	// Bla:false
	node.__defineSetter__("onmouseup", function (value)
	{
		var oldValue = this._onmouseup;

		if(org.xml3d.isString(value))
		{
			this._onmouseup = value;
		}
		else
		{
			this._onmouseup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseup", oldValue, this._onmouseup));
		}
	});

	node.__defineGetter__("onmouseup", function (value)
	{
		return this._onmouseup;
	});

	// Bla:false
	node.__defineSetter__("onmouseover", function (value)
	{
		var oldValue = this._onmouseover;

		if(org.xml3d.isString(value))
		{
			this._onmouseover = value;
		}
		else
		{
			this._onmouseover = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseover))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseover", oldValue, this._onmouseover));
		}
	});

	node.__defineGetter__("onmouseover", function (value)
	{
		return this._onmouseover;
	});

	// Bla:false
	node.__defineSetter__("onmousemove", function (value)
	{
		var oldValue = this._onmousemove;

		if(org.xml3d.isString(value))
		{
			this._onmousemove = value;
		}
		else
		{
			this._onmousemove = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmousemove))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmousemove", oldValue, this._onmousemove));
		}
	});

	node.__defineGetter__("onmousemove", function (value)
	{
		return this._onmousemove;
	});

	// Bla:false
	node.__defineSetter__("onmouseout", function (value)
	{
		var oldValue = this._onmouseout;

		if(org.xml3d.isString(value))
		{
			this._onmouseout = value;
		}
		else
		{
			this._onmouseout = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onmouseout))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onmouseout", oldValue, this._onmouseout));
		}
	});

	node.__defineGetter__("onmouseout", function (value)
	{
		return this._onmouseout;
	});

	// Bla:false
	node.__defineSetter__("onkeypress", function (value)
	{
		var oldValue = this._onkeypress;

		if(org.xml3d.isString(value))
		{
			this._onkeypress = value;
		}
		else
		{
			this._onkeypress = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeypress))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeypress", oldValue, this._onkeypress));
		}
	});

	node.__defineGetter__("onkeypress", function (value)
	{
		return this._onkeypress;
	});

	// Bla:false
	node.__defineSetter__("onkeydown", function (value)
	{
		var oldValue = this._onkeydown;

		if(org.xml3d.isString(value))
		{
			this._onkeydown = value;
		}
		else
		{
			this._onkeydown = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeydown))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeydown", oldValue, this._onkeydown));
		}
	});

	node.__defineGetter__("onkeydown", function (value)
	{
		return this._onkeydown;
	});

	// Bla:false
	node.__defineSetter__("onkeyup", function (value)
	{
		var oldValue = this._onkeyup;

		if(org.xml3d.isString(value))
		{
			this._onkeyup = value;
		}
		else
		{
			this._onkeyup = org.xml3d.initString(value, "");
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.onkeyup))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "onkeyup", oldValue, this._onkeyup));
		}
	});

	node.__defineGetter__("onkeyup", function (value)
	{
		return this._onkeyup;
	});

	// Bla:false
	node.__defineSetter__("visible", function (value)
	{
		var oldValue = this._visible;

		if(org.xml3d.isBoolean(value))
		{
			this._visible = value;
		}
		else
		{
			this._visible = org.xml3d.initBoolean(value, true);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.visible))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "visible", oldValue, this._visible));
		}
	});

	node.__defineGetter__("visible", function (value)
	{
		return this._visible;
	});

	// Bla:false
	node.__defineSetter__("position", function (value)
	{
		var oldValue = this._position;

		if(org.xml3d.isXML3DVec3(value))
		{
			this._position = value;
		}
		else
		{
			this._position = org.xml3d.initXML3DVec3(value, 0, 0, 0);
		}

	    if(this._position != null)
		{
			this._position.setOwnerNode("position", this);
		}		

		if (this.notificationRequired() && ! isEqual(oldValue,this.position))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "position", oldValue, this._position));
		}
	});

	node.__defineGetter__("position", function (value)
	{
		return this._position;
	});

	// Bla:false
	node.__defineSetter__("orientation", function (value)
	{
		var oldValue = this._orientation;

		if(org.xml3d.isXML3DRotation(value))
		{
			this._orientation = value;
		}
		else
		{
			this._orientation = org.xml3d.initXML3DRotation(value, 0, 0, 1, 0);
		}

	    if(this._orientation != null)
		{
			this._orientation.setOwnerNode("orientation", this);
		}		

		if (this.notificationRequired() && ! isEqual(oldValue,this.orientation))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "orientation", oldValue, this._orientation));
		}
	});

	node.__defineGetter__("orientation", function (value)
	{
		return this._orientation;
	});

	// Bla:false
	node.__defineSetter__("fieldOfView", function (value)
	{
		var oldValue = this._fieldOfView;

		if(org.xml3d.isFloat(value))
		{
			this._fieldOfView = value;
		}
		else
		{
			this._fieldOfView = org.xml3d.initFloat(value, 0.785398);
		}


		if (this.notificationRequired() && ! isEqual(oldValue,this.fieldOfView))
		{
			this.notify(new org.xml3d.Notification(this, MutationEvent.MODIFICATION, "fieldOfView", oldValue, this._fieldOfView));
		}
	});

	node.__defineGetter__("fieldOfView", function (value)
	{
		return this._fieldOfView;
	});


	node.resetAttribute = function(attrName)
	{
		if(attrName == "id")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.id = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "class")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.class = org.xml3d.initString("", null);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "style")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.style = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "ondblclick")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.ondblclick = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousedown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousedown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseover")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseover = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmousemove")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmousemove = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onmouseout")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onmouseout = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeypress")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeypress = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeydown")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeydown = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "onkeyup")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.onkeyup = org.xml3d.initString("", "");
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "visible")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.visible = org.xml3d.initBoolean("", true);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "position")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.position = org.xml3d.initXML3DVec3("", 0, 0, 0);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "orientation")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.orientation = org.xml3d.initXML3DRotation("", 0, 0, 1, 0);
			return org.xml3d.event.HANDLED;
		}
		if(attrName == "fieldOfView")
		{
			// An event is triggered through the corresponding setter. Therefore,
			// no further notification is required.
			this.fieldOfView = org.xml3d.initFloat("", 0.785398);
			return org.xml3d.event.HANDLED;
		}


		return org.xml3d.event.UNHANDLED;
	};


	// Node::setField
	node.setField = function(event)
	{
		if (event.attrName == "id")
		{
			this.id = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "class")
		{
			this.class = org.xml3d.initString(event.newValue, null);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "style")
		{
			this.style = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onclick")
		{
			this.onclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "ondblclick")
		{
			this.ondblclick = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousedown")
		{
			this.onmousedown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseup")
		{
			this.onmouseup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseover")
		{
			this.onmouseover = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmousemove")
		{
			this.onmousemove = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onmouseout")
		{
			this.onmouseout = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeypress")
		{
			this.onkeypress = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeydown")
		{
			this.onkeydown = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "onkeyup")
		{
			this.onkeyup = org.xml3d.initString(event.newValue, "");
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "visible")
		{
			this.visible = org.xml3d.initBoolean(event.newValue, true);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "position")
		{
			this.position = org.xml3d.initXML3DVec3(event.newValue, 0, 0, 0);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "orientation")
		{
			this.orientation = org.xml3d.initXML3DRotation(event.newValue, 0, 0, 1, 0);
			return org.xml3d.event.HANDLED;
		}
		if (event.attrName == "fieldOfView")
		{
			this.fieldOfView = org.xml3d.initFloat(event.newValue, 0.785398);
			return org.xml3d.event.HANDLED;
		}

	
		return org.xml3d.event.UNHANDLED;
	};

		node.getWorldMatrix = org.xml3d.methods.XML3DGraphTypeGetWorldMatrix;
		node.setDirection = org.xml3d.methods.viewSetDirection;
		node.setUpVector = org.xml3d.methods.viewSetUpVector;
		node.lookAt = org.xml3d.methods.viewLookAt;
		node.getDirection = org.xml3d.methods.viewGetDirection;
		node.getUpVector = org.xml3d.methods.viewGetUpVector;
		node.getViewMatrix = org.xml3d.methods.viewGetViewMatrix;

};

/**
 * Properties and methods for <xml3d>
 **/
org.xml3d.classInfo.xml3d.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	onclick : {c: org.xml3d.EventAttributeHandler},
	ondblclick : {c: org.xml3d.EventAttributeHandler},
	onmousedown : {c: org.xml3d.EventAttributeHandler},
	onmouseup : {c: org.xml3d.EventAttributeHandler},
	onmouseover : {c: org.xml3d.EventAttributeHandler},
	onmousemove : {c: org.xml3d.EventAttributeHandler},
	onmouseout : {c: org.xml3d.EventAttributeHandler},
	onkeypress : {c: org.xml3d.EventAttributeHandler},
	onkeydown : {c: org.xml3d.EventAttributeHandler},
	onkeyup : {c: org.xml3d.EventAttributeHandler},
	height : {c: org.xml3d.IntAttributeHandler, params: 600},
	width : {c: org.xml3d.IntAttributeHandler, params: 800},
	_term: undefined
};
/**
 * Properties and methods for <data>
 **/
org.xml3d.classInfo.data.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	map : {c: org.xml3d.StringAttributeHandler},
	expose : {c: org.xml3d.StringAttributeHandler},
	_term: undefined
};
/**
 * Properties and methods for <defs>
 **/
org.xml3d.classInfo.defs.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	_term: undefined
};
/**
 * Properties and methods for <group>
 **/
org.xml3d.classInfo.group.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	onclick : {c: org.xml3d.EventAttributeHandler},
	ondblclick : {c: org.xml3d.EventAttributeHandler},
	onmousedown : {c: org.xml3d.EventAttributeHandler},
	onmouseup : {c: org.xml3d.EventAttributeHandler},
	onmouseover : {c: org.xml3d.EventAttributeHandler},
	onmousemove : {c: org.xml3d.EventAttributeHandler},
	onmouseout : {c: org.xml3d.EventAttributeHandler},
	onkeypress : {c: org.xml3d.EventAttributeHandler},
	onkeydown : {c: org.xml3d.EventAttributeHandler},
	onkeyup : {c: org.xml3d.EventAttributeHandler},
	visible : {c: org.xml3d.BoolAttributeHandler, params: true},
	_term: undefined
};
/**
 * Properties and methods for <mesh>
 **/
org.xml3d.classInfo.mesh.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	onclick : {c: org.xml3d.EventAttributeHandler},
	ondblclick : {c: org.xml3d.EventAttributeHandler},
	onmousedown : {c: org.xml3d.EventAttributeHandler},
	onmouseup : {c: org.xml3d.EventAttributeHandler},
	onmouseover : {c: org.xml3d.EventAttributeHandler},
	onmousemove : {c: org.xml3d.EventAttributeHandler},
	onmouseout : {c: org.xml3d.EventAttributeHandler},
	onkeypress : {c: org.xml3d.EventAttributeHandler},
	onkeydown : {c: org.xml3d.EventAttributeHandler},
	onkeyup : {c: org.xml3d.EventAttributeHandler},
	visible : {c: org.xml3d.BoolAttributeHandler, params: true},
	type : {c: org.xml3d.EnumAttributeHandler, params: {e: org.xml3d.MeshTypes, d: 0}},
	_term: undefined
};
/**
 * Properties and methods for <transform>
 **/
org.xml3d.classInfo.transform.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	translation : {c: org.xml3d.XML3DVec3AttributeHandler, params: [0, 0, 0]},
	scale : {c: org.xml3d.XML3DVec3AttributeHandler, params: [1, 1, 1]},
	rotation : {c: org.xml3d.XML3DRotationAttributeHandler, params: [0, 0, 1, 0]},
	center : {c: org.xml3d.XML3DVec3AttributeHandler, params: [0, 0, 0]},
	scaleOrientation : {c: org.xml3d.XML3DRotationAttributeHandler, params: [0, 0, 1, 0]},
	_term: undefined
};
/**
 * Properties and methods for <shader>
 **/
org.xml3d.classInfo.shader.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	_term: undefined
};
/**
 * Properties and methods for <light>
 **/
org.xml3d.classInfo.light.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	onclick : {c: org.xml3d.EventAttributeHandler},
	ondblclick : {c: org.xml3d.EventAttributeHandler},
	onmousedown : {c: org.xml3d.EventAttributeHandler},
	onmouseup : {c: org.xml3d.EventAttributeHandler},
	onmouseover : {c: org.xml3d.EventAttributeHandler},
	onmousemove : {c: org.xml3d.EventAttributeHandler},
	onmouseout : {c: org.xml3d.EventAttributeHandler},
	onkeypress : {c: org.xml3d.EventAttributeHandler},
	onkeydown : {c: org.xml3d.EventAttributeHandler},
	onkeyup : {c: org.xml3d.EventAttributeHandler},
	visible : {c: org.xml3d.BoolAttributeHandler, params: true},
	global : {c: org.xml3d.BoolAttributeHandler, params: false},
	intensity : {c: org.xml3d.FloatAttributeHandler, params: 1},
	_term: undefined
};
/**
 * Properties and methods for <lightshader>
 **/
org.xml3d.classInfo.lightshader.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	_term: undefined
};
/**
 * Properties and methods for <script>
 **/
org.xml3d.classInfo.script.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	value : {c: org.xml3d.StringAttributeHandler},
	src : {c: org.xml3d.StringAttributeHandler},
	type : {c: org.xml3d.StringAttributeHandler},
	_term: undefined
};
/**
 * Properties and methods for <float>
 **/
org.xml3d.classInfo.float.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	name : {c: org.xml3d.StringAttributeHandler},
	value : {c: org.xml3d.FloatArrayValueHandler},
	_term: undefined
};
/**
 * Properties and methods for <float2>
 **/
org.xml3d.classInfo.float2.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	name : {c: org.xml3d.StringAttributeHandler},
	value : {c: org.xml3d.Float2ArrayValueHandler},
	_term: undefined
};
/**
 * Properties and methods for <float3>
 **/
org.xml3d.classInfo.float3.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	name : {c: org.xml3d.StringAttributeHandler},
	value : {c: org.xml3d.Float3ArrayValueHandler},
	_term: undefined
};
/**
 * Properties and methods for <float4>
 **/
org.xml3d.classInfo.float4.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	name : {c: org.xml3d.StringAttributeHandler},
	value : {c: org.xml3d.Float4ArrayValueHandler},
	_term: undefined
};
/**
 * Properties and methods for <float4x4>
 **/
org.xml3d.classInfo.float4x4.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	name : {c: org.xml3d.StringAttributeHandler},
	value : {c: org.xml3d.Float4x4ArrayValueHandler},
	_term: undefined
};
/**
 * Properties and methods for <int>
 **/
org.xml3d.classInfo.int.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	name : {c: org.xml3d.StringAttributeHandler},
	value : {c: org.xml3d.IntArrayValueHandler},
	_term: undefined
};
/**
 * Properties and methods for <bool>
 **/
org.xml3d.classInfo.bool.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	name : {c: org.xml3d.StringAttributeHandler},
	value : {c: org.xml3d.BoolArrayValueHandler},
	_term: undefined
};
/**
 * Properties and methods for <texture>
 **/
org.xml3d.classInfo.texture.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	name : {c: org.xml3d.StringAttributeHandler},
	type : {c: org.xml3d.EnumAttributeHandler, params: {e: org.xml3d.TextureTypes, d: 0}},
	filterMin : {c: org.xml3d.EnumAttributeHandler, params: {e: org.xml3d.FilterTypes, d: 2}},
	filterMag : {c: org.xml3d.EnumAttributeHandler, params: {e: org.xml3d.FilterTypes, d: 2}},
	filterMip : {c: org.xml3d.EnumAttributeHandler, params: {e: org.xml3d.FilterTypes, d: 1}},
	wrapS : {c: org.xml3d.EnumAttributeHandler, params: {e: org.xml3d.WrapTypes, d: 0}},
	wrapT : {c: org.xml3d.EnumAttributeHandler, params: {e: org.xml3d.WrapTypes, d: 0}},
	wrapU : {c: org.xml3d.EnumAttributeHandler, params: {e: org.xml3d.WrapTypes, d: 0}},
	borderColor : {c: org.xml3d.StringAttributeHandler},
	_term: undefined
};
/**
 * Properties and methods for <img>
 **/
org.xml3d.classInfo.img.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	src : {c: org.xml3d.StringAttributeHandler},
	_term: undefined
};
/**
 * Properties and methods for <video>
 **/
org.xml3d.classInfo.video.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	src : {c: org.xml3d.StringAttributeHandler},
	_term: undefined
};
/**
 * Properties and methods for <view>
 **/
org.xml3d.classInfo.view.props = {
	id : {c: org.xml3d.StringAttributeHandler},
	className : {c: org.xml3d.StringAttributeHandler, id: 'class'},
	// TODO: Handle style
	onclick : {c: org.xml3d.EventAttributeHandler},
	ondblclick : {c: org.xml3d.EventAttributeHandler},
	onmousedown : {c: org.xml3d.EventAttributeHandler},
	onmouseup : {c: org.xml3d.EventAttributeHandler},
	onmouseover : {c: org.xml3d.EventAttributeHandler},
	onmousemove : {c: org.xml3d.EventAttributeHandler},
	onmouseout : {c: org.xml3d.EventAttributeHandler},
	onkeypress : {c: org.xml3d.EventAttributeHandler},
	onkeydown : {c: org.xml3d.EventAttributeHandler},
	onkeyup : {c: org.xml3d.EventAttributeHandler},
	visible : {c: org.xml3d.BoolAttributeHandler, params: true},
	position : {c: org.xml3d.XML3DVec3AttributeHandler, params: [0, 0, 0]},
	orientation : {c: org.xml3d.XML3DRotationAttributeHandler, params: [0, 0, 1, 0]},
	fieldOfView : {c: org.xml3d.FloatAttributeHandler, params: 0.785398},
	_term: undefined
};
org.xml3d.methods.xml3dCreateXML3DVec3 = function() {
	return new XML3DVec3();
};

org.xml3d.methods.xml3dCreateXML3DMatrix = function () {
	return new XML3DMatrix();
};

org.xml3d.methods.xml3dCreateXML3DRotation = function() {
	return new XML3DRotation();
};

org.xml3d.methods.viewGetDirection = function() {
	return this.orientation.rotateVec3(new XML3DVec3(0,0,-1));
};

org.xml3d.methods.viewSetPosition = function(pos) {
	this.position = pos;
};

org.xml3d.methods.viewSetDirection = function(vec) {
	var dir = vec.negate().normalize();
	if (this._upVector)
		var up = this._upVector;
	else
		var up = new XML3DVec3(0,1,0);
	var right = up.cross(dir).normalize();
	up = dir.cross(right).normalize();
	this.orientation = XML3DRotation.fromBasis(right, up, dir);

};

org.xml3d.methods.viewSetUpVector = function(up) {
	this._upVector = up.normalize();
};

org.xml3d.methods.viewGetUpVector = function() {
	return this.orientation.rotateVec3(new XML3DVec3(0, 1, 0));
};

org.xml3d.methods.viewLookAt = function(point) {
	var vector = point.subtract(this.position);
	vector = vector.normalize();
	this.setDirection(vector);
};

org.xml3d.methods.viewGetViewMatrix = function() {

	for (i = 0; i < this.adapters.length; i++) {
		if (this.adapters[i].getViewMatrix) {
			return this.adapters[i].getViewMatrix();
		}
	}

	return new XML3DMatrix();
};

org.xml3d.methods.xml3dGetElementByPoint = function(x, y, hitPoint, hitNormal) {
	for (i = 0; i < this.adapters.length; i++) {
		if (this.adapters[i].getElementByPoint) {
			return this.adapters[i].getElementByPoint(x, y, hitPoint, hitNormal);
		}
	}

	return null;
};

org.xml3d.methods.xml3dGenerateRay = function(x, y) {
    for (i = 0; i < this.adapters.length; i++) {
        if (this.adapters[i].generateRay) {
            return this.adapters[i].generateRay(x, y);
        }
    }

    return new XML3DRay();
};

org.xml3d.methods.xml3dGetBoundingBox = org.xml3d.methods.groupGetBoundingBox;

org.xml3d.methods.groupGetLocalMatrix = function() { 
    
    var xfmNode = this.getTransformNode();  
    if(xfmNode)
    {
        for (i = 0; i < xfmNode.adapters.length; i++) {
            if (xfmNode.adapters[i].getMatrix) {
                return xfmNode.adapters[i].getMatrix();
            }
        }
    }
    
    return new XML3DMatrix(); 
}; 

/** return the bounding box that is the bounding box of all children. 
 */
org.xml3d.methods.groupGetBoundingBox = function() { 

    var bbox = new XML3DBox(); 
    var locMat = this.getLocalMatrix();

    var child = this.firstElementChild; 
    while(child !== null)
    {
        if(child.getBoundingBox)
        {
            var chBBox = child.getBoundingBox();

            chBBox.min = locMat.mulVec3(chBBox.min);
            chBBox.max = locMat.mulVec3(chBBox.max);

            bbox.extend(chBBox);
        }
        
        child = child.nextElementSibling;
    }
    
    return bbox; 
}; 

/** returns the bounding box of this mesh in world space.
 */
org.xml3d.methods.meshGetBoundingBox = function() {

    for (i = 0; i < this.adapters.length; i++) {
        if (this.adapters[i].getBoundingBox)
            return this.adapters[i].getBoundingBox();
    }
    
    return new XML3DBox(); 
};

org.xml3d.methods.XML3DGraphTypeGetWorldMatrix = function() {
    
    var node = this; 
    
    var mat = new XML3DMatrix(); 
    
    // accumulate matrix until xml3d tag is reached 
    while(node.nodeName !== "xml3d")
    {
        if(node.nodeName === "group")
            mat = node.getLocalMatrix().multiply(mat); 
        
        node = node.parentNode; 
    }
    
    return mat; 
};
