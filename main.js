function run() {
    let htmlcode = document.getElementById("html-code").value;
    let csscode = document.getElementById("css-code").value;
    let jscode = document.getElementById("js-code").value;
    let ccode = document.getElementById("c-code").value;
    let cppcode = document.getElementById("cpp-code").value;
    let pythoncode = document.getElementById("python-code").value;
    let output = document.getElementById("output");

    output.contentDocument.body.innerHTML = htmlcode + "<style>" + csscode + "</style>";
    output.contentWindow.eval(jscode);

    // For C, C++, and Python, we will just display the code in the iframe as plain text
    if (ccode) {
        output.contentDocument.body.innerHTML = `<pre>${ccode}</pre>`;
    } else if (cppcode) {
        output.contentDocument.body.innerHTML = `<pre>${cppcode}</pre>`;
    } else if (pythoncode) {
        output.contentDocument.body.innerHTML = `<pre>${pythoncode}</pre>`;
    }
}

function downloadFile() {
    let htmlcode = document.getElementById("html-code").value;
    let csscode = document.getElementById("css-code").value;
    let jscode = document.getElementById("js-code").value;
    let ccode = document.getElementById("c-code").value;
    let cppcode = document.getElementById("cpp-code").value;
    let pythoncode = document.getElementById("python-code").value;
    let fileType = document.getElementById("file-type").value;

    let combinedCode = "";
    if (fileType === "html") {
        combinedCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live code Output</title>
</head>
<body>
    ${htmlcode}
</body>
</html>`;
    } else if (fileType === "html-css") {
        combinedCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live code Output</title>
    <style>${csscode}</style>
</head>
<body>
    ${htmlcode}
</body>
</html>`;
    } else if (fileType === "html-css-js") {
        combinedCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live code Output</title>
    <style>${csscode}</style>
</head>
<body>
    ${htmlcode}
    <script>${jscode}<\/script>
</body>
</html>`;
    } else if (fileType === "c") {
        combinedCode = ccode;
    } else if (fileType === "cpp") {
        combinedCode = cppcode;
    } else if (fileType === "python") {
        combinedCode = pythoncode;
    }

    let blob = new Blob([combinedCode], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function showHideTextareas() {
    const codeType = document.getElementById('code-type').value;
    const htmlContainer = document.getElementById('html-container');
    const cssContainer = document.getElementById('css-container');
    const jsContainer = document.getElementById('js-container');
    const cContainer = document.getElementById('c-container');
    const cppContainer = document.getElementById('cpp-container');
    const pythonContainer = document.getElementById('python-container');

    htmlContainer.style.display = 'none';
    cssContainer.style.display = 'none';
    jsContainer.style.display = 'none';
    cContainer.style.display = 'none';
    cppContainer.style.display = 'none';
    pythonContainer.style.display = 'none';

    if (codeType === 'html') {
        htmlContainer.style.display = 'block';
    } else if (codeType === 'html-css') {
        htmlContainer.style.display = 'block';
        cssContainer.style.display = 'block';
    } else if (codeType === 'html-css-js') {
        htmlContainer.style.display = 'block';
        cssContainer.style.display = 'block';
        jsContainer.style.display = 'block';
    } else if (codeType === 'c') {
        cContainer.style.display = 'block';
    } else if (codeType === 'cpp') {
        cppContainer.style.display = 'block';
    } else if (codeType === 'python') {
        pythonContainer.style.display = 'block';
    }
}

document.getElementById("run-button").addEventListener("click", run);
document.getElementById("download-button").addEventListener("click", downloadFile);
document.addEventListener("DOMContentLoaded", showHideTextareas);
