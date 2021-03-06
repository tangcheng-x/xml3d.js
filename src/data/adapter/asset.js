(function() {


XML3D.data.AssetAdapter = function(factory, node) {
    XML3D.base.NodeAdapter.call(this, factory, node);

    // Node handles for src and proto
    this.asset = null;
};
XML3D.createClass(XML3D.data.AssetAdapter, XML3D.base.NodeAdapter);

XML3D.data.AssetAdapter.prototype.init = function() {
    //var xflow = this.resolveScript();
    //if (xflow)
    //    this.scriptInstance = new XML3D.data.ScriptInstance(this, xflow);

    this.asset = new XML3D.base.Asset(this.node);
    updateAdapterHandle(this, "src", this.node.getAttribute("src"));
    updatePickFilter(this);
    updateChildren(this);
};

XML3D.data.AssetAdapter.prototype.getAsset = function(){
    return this.asset;
}

function updateChildren(adapter){
    adapter.asset.clearChildren();
    for ( var child = adapter.node.firstElementChild; child !== null; child = child.nextElementSibling) {
        var subadapter = adapter.factory.getAdapter(child);
        if(subadapter && subadapter.assetEntry){
            adapter.asset.appendChild(subadapter.assetEntry);
        }
    }
}

function updateAdapterHandle(adapter, key, url) {
    var adapterHandle = adapter.getAdapterHandle(url),
        status = (adapterHandle && adapterHandle.status);

    if (status === XML3D.base.AdapterHandle.STATUS.NOT_FOUND) {
        XML3D.debug.logError("Could not find element of url '" + adapterHandle.url + "' for " + key, adapter.node);
    }
    adapter.connectAdapterHandle(key, adapterHandle);
    adapter.connectedAdapterChanged(key, adapterHandle ? adapterHandle.getAdapter() : null, status);
}

function updateAssetLoadState(dataAdapter){
    var loading = false, handle;

    handle = dataAdapter.getConnectedAdapterHandle("src");
    if (handle && handle.status === XML3D.base.AdapterHandle.STATUS.LOADING) {
        loading = true;
    }
    dataAdapter.asset.setLoading(loading);
}

function updatePickFilter(adapter){
    if(!adapter.node.hasAttribute("pick"))
        adapter.asset.setPickFilter(null);
    else{
        var value = adapter.node.getAttribute("pick");
        adapter.asset.setPickFilter(value.split(/\s+/))
    }
}

XML3D.data.AssetAdapter.prototype.connectedAdapterChanged = function(attributeName, adapter){
    if(attributeName == "src")
        this.asset.setSrcAsset(adapter && adapter.getAsset() || null);
    updateAssetLoadState(this);
}


XML3D.data.AssetAdapter.prototype.notifyChanged = function(evt) {
    if(evt.type == XML3D.events.ADAPTER_HANDLE_CHANGED){
        this.connectedAdapterChanged(evt.key, evt.adapter);
        if(evt.handleStatus == XML3D.base.AdapterHandle.STATUS.NOT_FOUND){
            XML3D.debug.logError("Could not find <asset> element of url '" + evt.url + "' for " + evt.key);
        }
        return;
    }
    else if (evt.type == XML3D.events.NODE_INSERTED) {
        updateChildren(this);
        return;
    }
    else if (evt.type == XML3D.events.NODE_REMOVED) {
        updateChildren(this);
        return;
    } else if (evt.type == XML3D.events.VALUE_MODIFIED) {
        var attr = evt.wrapped.attrName;
        if(attr == "src" )
            updateAdapterHandle(this, "src", this.node.getAttribute("src"));
        if(attr == "pick" )
            updatePickFilter(this);
        return;
    } else if (evt.type == XML3D.events.THIS_REMOVED) {
        this.clearAdapterHandles();
    }
};

XML3D.data.AssetDataAdapter = function(factory, node) {
    this.assetData = true;
    XML3D.data.DataAdapter.call(this, factory, node);

    // Node handles for src and proto
    this.assetEntry = null;
    this.outputXflowNode = null;
};
XML3D.createClass(XML3D.data.AssetDataAdapter, XML3D.data.DataAdapter);

XML3D.data.AssetDataAdapter.prototype.init = function() {
    //var xflow = this.resolveScript();
    //if (xflow)
    //    this.scriptInstance = new XML3D.data.ScriptInstance(this, xflow);
    XML3D.data.DataAdapter.prototype.init.call(this);
    this.outputXflowNode = XML3D.data.xflowGraph.createDataNode(false);
    this.assetEntry = new XML3D.base.SubData(this.outputXflowNode, this.getXflowNode(), this.node);
    this.assetEntry.setName(this.node.getAttribute("name"));
    updatePostCompute(this);
    this.assetEntry.setPostFilter(this.node.getAttribute("filter"));
    updateIncludes(this.assetEntry, this.node.getAttribute("includes"));
};

XML3D.data.AssetDataAdapter.prototype.connectedAdapterChanged = function(attributeName, adapter){
    if(attributeName == "postDataflow"){
        this.assetEntry.setPostDataflow(adapter && adapter.getXflowNode() || null);
        updateSubDataLoadState(this);
    }
    else{
        XML3D.data.DataAdapter.prototype.connectedAdapterChanged.call(this, attributeName, adapter);
    }
}

XML3D.data.AssetDataAdapter.prototype.notifyChanged = function(evt) {
    XML3D.data.DataAdapter.prototype.notifyChanged.call(this, evt);
    if (evt.type == XML3D.events.VALUE_MODIFIED) {
        var attr = evt.wrapped.attrName;
        switch(attr){
            case "name": this.assetEntry.setName(this.node.getAttribute("name")); break;
            case "compute": updatePostCompute(this); break;
            case "filter": this.assetEntry.setPostFilter(this.node.getAttribute("filter")); break;
            case "includes": updateIncludes(this.node.getAttribute("includes")); break;
        }
        return;
    }
};

XML3D.data.AssetDataAdapter.prototype.onTransformChange = function(attrName, matrix){
    this.assetEntry.setTransform(matrix);
}

function updateIncludes(assetEntry, includeString){
    if(!includeString)
        assetEntry.setIncludes([]);
    else
        assetEntry.setIncludes(includeString.split(/\s+/));
}

function updatePostCompute(adapter){
    var computeString = adapter.node.getAttribute("compute");
    var dataflowUrl = Xflow.getComputeDataflowUrl(computeString);
    if (dataflowUrl) {
        updateAdapterHandle(adapter, "postDataflow", dataflowUrl);
    }
    else {
        adapter.disconnectAdapterHandle("postDataflow");
        updateSubDataLoadState(adapter);
    }
    adapter.assetEntry.setPostCompute(computeString);
}

function updateSubDataLoadState(dataAdapter) {
    var loading = false, handle;

    handle = dataAdapter.getConnectedAdapterHandle("postDataflow");
    if (handle && handle.status === XML3D.base.AdapterHandle.STATUS.LOADING) {
        loading = true;
    }
    dataAdapter.assetEntry.setLoading(loading);
}


function setShaderUrl(adapter){
    var node = adapter.node;
    var shaderUrl = node.getAttribute("shader");
    if(shaderUrl){
        var shaderId = XML3D.base.resourceManager.getAbsoluteURI(node.ownerDocument, shaderUrl);
        adapter.assetEntry.setShader(shaderId.toString());
    }
    else{
        adapter.assetEntry.setShader(null);
    }
}

XML3D.data.AssetMeshAdapter = function(factory, node) {
    XML3D.data.AssetDataAdapter.call(this, factory, node);
    this.transformFetcher = new XML3D.data.DOMTransformFetcher(this, "transform", "transform");
};
XML3D.createClass(XML3D.data.AssetMeshAdapter, XML3D.data.AssetDataAdapter);

XML3D.data.AssetMeshAdapter.prototype.init = function() {
    XML3D.data.AssetDataAdapter.prototype.init.call(this);
    setShaderUrl(this);
    this.assetEntry.setMeshType(this.node.getAttribute("type") || "triangles");
    this.transformFetcher.update();
};
XML3D.data.AssetMeshAdapter.prototype.notifyChanged = function(evt) {
    XML3D.data.AssetDataAdapter.prototype.notifyChanged.call(this, evt);
    if (evt.type == XML3D.events.VALUE_MODIFIED) {
        var attr = evt.wrapped.attrName;
        switch(attr){
            case "shader": setShaderUrl(this); break;
            case "style":
            case "transform": this.transformFetcher.update(); break;
            case "type": this.assetEntry.setMeshType(this.node.getAttribute("type") || "triangles")
        }
        return;
    }
};

}());
