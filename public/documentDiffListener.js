importScripts("./diff.js")

const diff = new diff_match_patch()

let previousDocState = ""

class MyRegExp extends RegExp {
    [Symbol.matchAll](str) {
      const result = RegExp.prototype[Symbol.matchAll].call(this, str);
      if (!result) {
        return null;
      }
      return Array.from(result);
    }
}

onmessage = function(event) {
    const diffs = diff.diff_main(previousDocState, event.data)
    runDeletedImagesCheck(diffs)
    previousDocState = event.data
}


runDeletedImagesCheck = (diffs) => {
    let deletedImageUrls = []
    diffs.forEach(d => {
        if (d["0"] === -1) {
            const urls = checkDeletedImage(d["1"])
            deletedImageUrls = [...deletedImageUrls, ...urls]
        }
    });
    if (deletedImageUrls.length > 0) {
        postMessage({ action: "DELETE_IMAGES", deletedImageUrls })
    }
}

checkDeletedImage = (change) => {
    const imageRegex = new MyRegExp('!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)', "g")
    const occurances = change.matchAll(imageRegex)
    const uniqueImageUrls = {}
    occurances.forEach((o) => {
        const urls = getURLsFromString(o.input)
        urls.forEach((url) => {
            uniqueImageUrls[url] = url
        })
    })
    return Object.keys(uniqueImageUrls)
}

getURLsFromString = (str) => {
    var re = /\[(.+)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig
    var m;
    var arr = [];
    while ((m = re.exec(str)) !== null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        arr.push(m[0].slice(0, -1));
    }
    return arr;
}