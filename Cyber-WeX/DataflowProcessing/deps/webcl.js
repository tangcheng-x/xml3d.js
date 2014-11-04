(function () {

    //TODO: This file is work in progress! Helpful API methods concerning WebCL will be added when needed.

    // First check if the WebCL extension is installed at all
    if (window.WebCL === undefined) {
        alert("Unfortunately your system does not support WebCL. " +
            "Make sure that you have both the OpenCL driver " +
            "and the WebCL browser extension installed.");
        console.error("Error: No WebCL available", (new Error()).stack);
        return;
    }

    /*
     * Selecting device platform and initialising WebCL context
     *
     */

    var platforms = WebCL.getPlatforms(),
        platform,
        devices,
        ctx,
        cmdQueue,
        DEFAULT_PLATFORM = "CUDA", // IF CUDA crashes in some point, use "Intel"
        namespace;

    console.log("WebCL: Available platforms:");

    /*
    platforms.forEach(function (p) {
        var name = p.getInfo(WebCL.CL_PLATFORM_NAME);
        console.log(name);

        if (name.indexOf(DEFAULT_PLATFORM) !== -1) {
            platform = p;
        }
    });*/
    for (var i = 0; i < platforms.length; ++i) {
        var p = platforms[i];
        var name = p.getInfo(WebCL.PLATFORM_NAME);
        console.log(name);
        if (name.indexOf(DEFAULT_PLATFORM) !== -1) {
            platform = p;
        }
    }

    // Selecting CPU as default platform if DEFAULT_PLATFORM is not available
    if (!platform) {
        platform = platforms[0];
    }

    console.log("WebCL: Setting platform to: " + platform.getInfo(WebCL.PLATFORM_NAME));

    ctx = WebCL.createContext([WebCL.CONTEXT_PLATFORM, platform]);
    devices = ctx.getInfo(WebCL.CONTEXT_DEVICES);

    console.log("WebCL: Available devices on " + platform.getInfo(WebCL.PLATFORM_NAME) + ":");

    /*
    devices.forEach(function (device) {
        console.log(device.getInfo(WebCL.DEVICE_NAME));
    });*/
    for (var i = 0; i < devices.length; ++i) {
        console.log(devices[i].getInfo(WebCL.DEVICE_NAME));
    }

    // Create command queue using the first available device
    cmdQueue = ctx.createCommandQueue(devices[0], 0);


    function KernelManager() {
        this.kernels = {};

    }

    KernelManager.prototype = {
        register: function (name, codeStr) {
            if (this.kernels.hasOwnProperty(name)) {
                console.warn("WebCL: Kernel with a same name is already defined.");
                return;
            }

            if (typeof name !== "string" || typeof codeStr !== "string") {
                console.error("WebCL: Error: Kernel name and code must be a string!");
                return;
            }

            var program, kernel;

            program = ctx.createProgram(codeStr /* loadKernel("clProgramDesaturate")*/);


            try {
                program.build([devices[0]], "");
            } catch (e) {
                console.error("WebCL: Failed to build WebCL program: "
                    + program.getProgramBuildInfo(devices[0], WebCL.CL_PROGRAM_BUILD_STATUS)
                    + ":  " + program.getProgramBuildInfo(devices[0], WebCL.CL_PROGRAM_BUILD_LOG));
            }

            // Create kernel
            try {
                kernel = program.createKernel(name);
            } catch (e) {
                console.error("WebCL: Failed to build WebCL program. Error "
                    + program.getProgramBuildInfo(devices[0], WebCL.CL_PROGRAM_BUILD_STATUS)
                    + ":  " + program.getProgramBuildInfo(devices[0], WebCL.CL_PROGRAM_BUILD_LOG));
            }

            this.kernels[name] = kernel;

        },
        getKernel: function (name) {
            if (typeof name !== "string") {
                return false;
            }

            if (this.kernels.hasOwnProperty(name)) {
                return this.kernels[name];
            }

            return false;
        }
    };

    namespace = {
        platforms: platforms,
        devices: devices,
        ctx: ctx,
        cmdQueue: cmdQueue,
        kernels: new KernelManager()
    };

    if (XML3D) {
        XML3D.webcl = XML3D.webcl || namespace;
    } else {
        window.webclUtil = namespace;
    }

}());
