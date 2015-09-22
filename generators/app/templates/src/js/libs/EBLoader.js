function loadServingSysScript(relativeUrl) {
    document.write("<script src='" + (document.location.protocol === "https:" ? "https://secure-" : "http://") + "ds.serving-sys.com/BurstingScript/" + relativeUrl + "'><\/script>");
}

//Load secure or insecure version of EBLoader
loadServingSysScript("EBLoader.js");
