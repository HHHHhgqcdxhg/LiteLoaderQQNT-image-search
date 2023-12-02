// 运行在 Electron 渲染进程 下的页面脚本
// const { ipcRenderer } = require('electron');

const searchImageMenuItemTemplate = document.createElement("div");
searchImageMenuItemTemplate.innerHTML = `
<a 
 id="qrcode"
 class="q-context-menu-item q-context-menu-item--normal" 
 aria-disabled="false" 
 role="menuitem" 
 tabindex="-1">
  <div class="q-context-menu-item__icon q-context-menu-item__head">
    <i class="q-icon" data-v-717ec976="" style="--b4589f60: inherit; --6ef2e80d: 16px;">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 80C0 53.5 21.5 32 48 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80zM64 96v64h64V96H64zM0 336c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V336zm64 16v64h64V352H64zM304 32h96c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H304c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48zm80 64H320v64h64V96zM256 304c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16v96c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16v64c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V304zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z"/></svg>
    </i>
  </div>
  <!---->
  <span class="q-context-menu-item__text">搜图</span>
  <!---->
</a>
`
// copy from sauceNAO
const sauceNaoFormInnerText = `
<form id="searchForm" action="search.php" method="post" enctype="multipart/form-data" autocomplete="off" onsubmit="return(isSearchReady());">
\t<div id="fileRowContainer">
\t\t<div id="fileInputButton"><input id="fileInput" type="file" name="file" onchange="checkImageFile(this);" title="Browse to select an image to search with"><span id="fileInputLabel">Select Image</span></div>
\t\t<label for="safe-cb" class="searchCB" title="Mask potentially explicit images, some may slip through..."><input type="checkbox" name="hide" value="3" id="safe-cb" onclick="saveCheckbox(this,&quot;safe-cb&quot;)"> Safe<sup>ish</sup> Search</label>
\t<label for="auto-cb" class="searchCB minHide" title="Start search automaticly once file is selected"><input type="checkbox" id="auto-cb" onclick="saveCheckbox(this,&quot;auto-cb&quot;)"> Auto</label>
\t</div>
\t<input id="urlInput" name="url" type="text" value="Paste Image URL" onfocus="clearValue(this)" onblur="getURLInput(this);" title="Supply a URL linking to an image to search with">
\t<div id="searchRowContainer">
\t<div class="multi-select-container minHide">
\t\t<div class="multi-select-button" id="database-dropdown-button" title="Databases to search" onclick="toggleClassActive(&quot;database-dropdown&quot;);"><span class="multiLabel">All DBs</span></div>
\t\t<div class="multi-select-dropdown database-dropdown">
\t\t\t<div class="multi-select-dropdown-header" onclick="multiSelectToggle(&quot;db-cb&quot;);">Invert Selection</div>
\t\t\t<label for="db0"><div id="db0-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db0" value="0">H-Magazines</div></label>
\t\t\t<label for="db2"><div id="db2-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db2" value="2">H-Game CG</div></label>
\t\t\t<label for="db3"><div id="db3-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db3" value="3">DoujinshiDB</div></label>
\t\t\t<label for="db5"><div id="db5-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db5" value="5">pixiv Images</div></label>
\t\t\t<label for="db8"><div id="db8-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db8" value="8">Nico Nico Seiga</div></label>
\t\t\t<label for="db9"><div id="db9-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db9" value="9">Danbooru</div></label>
\t\t\t<label for="db10"><div id="db10-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db10" value="10">drawr Images</div></label>
\t\t\t<label for="db11"><div id="db11-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db11" value="11">Nijie Images</div></label>
\t\t\t<label for="db12"><div id="db12-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db12" value="12">Yande.re</div></label>
\t\t\t<label for="db15"><div id="db15-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db15" value="15">Shutterstock</div></label>
\t\t\t<label for="db16"><div id="db16-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db16" value="16">FAKKU</div></label>
\t\t\t<label for="db18"><div id="db18-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db18" value="18">H-Misc (nH)</div></label>
\t\t\t<label for="db19"><div id="db19-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db19" value="19">2D-Market</div></label>
\t\t\t<label for="db20"><div id="db20-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db20" value="20">MediBang</div></label>
\t\t\t<label for="db21"><div id="db21-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db21" value="21">Anime</div></label>
\t\t\t<label for="db22"><div id="db22-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db22" value="22">H-Anime</div></label>
\t\t\t<label for="db23"><div id="db23-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db23" value="23">Movies</div></label>
\t\t\t<label for="db24"><div id="db24-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db24" value="24">Shows</div></label>
\t\t\t<label for="db25"><div id="db25-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db25" value="25">Gelbooru</div></label>
\t\t\t<label for="db26"><div id="db26-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db26" value="26">Konachan</div></label>
\t\t\t<label for="db27"><div id="db27-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db27" value="27">Sankaku Channel</div></label>
\t\t\t<label for="db28"><div id="db28-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db28" value="28">Anime-Pictures.net</div></label>
\t\t\t<label for="db29"><div id="db29-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db29" value="29">e621.net</div></label>
\t\t\t<label for="db30"><div id="db30-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db30" value="30">Idol Complex</div></label>
\t\t\t<label for="db31"><div id="db31-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db31" value="31">bcy.net Illust</div></label>
\t\t\t<label for="db32"><div id="db32-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db32" value="32">bcy.net Cosplay</div></label>
\t\t\t<label for="db33"><div id="db33-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db33" value="33">PortalGraphics.net</div></label>
\t\t\t<label for="db34"><div id="db34-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db34" value="34">deviantArt</div></label>
\t\t\t<label for="db35"><div id="db35-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db35" value="35">Pawoo.net</div></label>
\t\t\t<label for="db36"><div id="db36-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db36" value="36">Madokami (Manga)</div></label>
\t\t\t<label for="db37"><div id="db37-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db37" value="37">MangaDex</div></label>
\t\t\t<label for="db38"><div id="db38-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db38" value="38">H-Misc (eH)</div></label>
\t\t\t<label for="db39"><div id="db39-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db39" value="39">ArtStation</div></label>
\t\t\t<label for="db40"><div id="db40-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db40" value="40">FurAffinity</div></label>
\t\t\t<label for="db41"><div id="db41-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db41" value="41">Twitter</div></label>
\t\t\t<label for="db42"><div id="db42-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db42" value="42">Furry Network</div></label>
\t\t\t<label for="db43"><div id="db43-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db43" value="43">Kemono</div></label>
\t\t\t<label for="db44"><div id="db44-row"><input type="checkbox" name="dbs[]" class="db-cb" id="db44" value="44">Skeb</div></label>
\t\t</div>
\t\t<div class="multi-select-dropdown-closer database-dropdown" onclick="toggleClassActive(&quot;database-dropdown&quot;);"></div>
\t</div>
\t<input type="submit" value="SEARCH" id="searchButton" title="Start search for image source information">
\t
\t</div></form>`
const sauceNaoFormElTemplate = document.createElement("div");
sauceNaoFormElTemplate.innerHTML = sauceNaoFormInnerText
sauceNaoFormElTemplate.querySelector("#searchForm").action = 'https://saucenao.com/search.php'
sauceNaoFormElTemplate.querySelector("#searchForm").target = '_blank'

async function addSearchImageMenu(qContextMenu, message_element) {
    const {classList} = message_element

    if (classList?.[0] === "image-content") {
        const searchImageMenuItem = searchImageMenuItemTemplate.cloneNode(true);
        qContextMenu.insertBefore(searchImageMenuItem, qContextMenu.firstChild);
        searchImageMenuItem.addEventListener('click', async () => {
            ipcBridge.searchImg({imgSrc: message_element.src})
            // 调用main, 打开默认浏览器
            // console.log("点击咯!", qContextMenu, message_element)
            // // ipcRenderer.send("trigger-open", "http://baidu.com")
            // const blob = await imgEl2Blob(message_element)
            // submit(blob)
            // 关闭右键菜单
            qContextMenu.remove()
        })
    }
}

function submit(blob) {
    const formWrapper = sauceNaoFormElTemplate.cloneNode(true)

    // 创建一个 File 对象
    const file = new File([blob], 'image.jpg', {type: blob.type});

    // 创建一个 DataTransfer 对象，并将文件添加到其中
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    const inputEl = formWrapper.querySelector("#fileInput")
    // 将 DataTransfer 对象中的文件赋值给文件输入元素的 files 属性
    inputEl.files = dataTransfer.files;
    const formNode = sauceNaoFormElTemplate.querySelector("#searchForm")
    window.formNode = formNode
    window.inputEl = inputEl
    const submitRes = formNode.submit()
    console.log(submitRes)
}

async function canvasToBlob(canvas) {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        });
    });
}

async function imgEl2Blob(imgEl) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // 设置 Canvas 的尺寸与图片一致
    canvas.width = imgEl.width;
    canvas.height = imgEl.height;

    // 将图片绘制到 Canvas 中
    context.drawImage(imgEl, 0, 0);

    const blob = await canvasToBlob(canvas)
    return blob
}

// 页面加载完成时触发
function onLoad() {
    LLAPI.add_qmenu(addSearchImageMenu)
}


// 打开设置界面时触发
function onConfigView(view) {

}


// 这两个函数都是可选的
export {
    onLoad,
    onConfigView
}
