const closeButton = document.getElementById("close");
const minimizeButton = document.getElementById("minimize");
const scanButton = document.getElementById("scan");
closeButton.addEventListener("click", () => {
  console.log("close");
  window.electronAPI.closeWindow();
});

minimizeButton.addEventListener("click", () => {
  console.log("minimize");
  window.electronAPI.minimizeWindow();
});


function selectDisk(volume) {
  document.getElementById("Recover").style.display = "none";
  document.getElementById("Scan").style.display = "block";
  window.electronAPI.scan(volume).then((records) => {
    console.log(records);
    console.info(records);
    if (records) {
      window.location.href = "Result.html";
    }
  })
}


function formatBytes(bytes) {
  if (bytes < 1024) {
    return bytes + " bytes";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  } else if (bytes < 1024 * 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
  } else {
    return (bytes / (1024 * 1024 * 1024 * 1024)).toFixed(1) + " TB";
  }
}

function classifyFile(fileName) {
  // Get the file extension
  const extension = fileName.split(".").pop().toLowerCase();

  // Define a list of known file extensions
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
  const videoExtensions = ["mp4", "mkv", "mov", "avi", "wmv"];
  const audioExtensions = ["mp3", "wav", "aac", "flac", "ogg"];
  const documentExtensions = ["doc", "docx", "pdf", "txt", "rtf"];
  const programExtensions = ["exe", "msi", "dmg", "deb"];
  const compressedExtensions = ["zip", "rar", "7z", "tar", "gz"];

  // Check if the file extension is in the list of known image extensions
  if (programExtensions.includes(extension)) {
    return { type: "program", color: "#5f5af6" };
  }
  if (imageExtensions.includes(extension)) {
    return { type: "image", color: "#f000b9" };
  }
  if (videoExtensions.includes(extension)) {
    return { type: "video", color: "#ff9800" };
  }
  if (audioExtensions.includes(extension)) {
    return { type: "audio", color: "#0ea5e9" };
  }
  if (documentExtensions.includes(extension)) {
    return { type: "document", color: "#10b981" };
  }
  if (compressedExtensions.includes(extension)) {
    return { type: "compressed", color: "#ff5724" };
  } else {
    return { type: "unknown", color: "#313e59" };
  }
}

function recover(index,name,path,size,date,type,volume)
{
  console.log(index,name,path,size,date,type);
  console.log(r);
  var l =`<div class="card">
              <div class="flex grow flex-col items-center px-4 pb-5 sm:px-5">
                <div class="avatar h-20 w-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:svgjs="http://svgjs.com/svgjs"
                    width="80"
                    height="80"
                    x="0"
                    y="0"
                    viewBox="0 0 512 512"
                    style="enable-background: new 0 0 512 512"
                    xml:space="preserve"
                    class=""
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="m107.355 322.931h-54.237c-13.682 0-28.344-7.493-28.344-33.899 0-13.682 11.092-24.774 24.774-24.774h57.806z"
                            fill="#313e59"
                            data-original="#313e59"
                          ></path>
                          <path
                            d="m470.71 0h-338.581c-4.561 0-8.258 3.697-8.258 8.258v462.256h355.097v-462.256z"
                            fill="#313e59"
                            opacity="0.5"
                            data-original="#ff5f7a"
                            class=""
                          ></path>
                          <path
                            d="m478.968 0h-8.258v412.903c0 27.365-22.183 49.548-49.548 49.548v16.516h57.806c4.561 0 8.258-3.698 8.258-8.258v-462.451c0-4.561-3.697-8.258-8.258-8.258z"
                            fill="#313e59"
                            data-original="#313e59"
                          ></path>
                          <path
                            d="m363.355 33.032h-264.258c-4.561 0-8.258 3.697-8.258 8.258v405.441l7.89 15.747-7.89 16.49v24.774c0 4.561 3.697 8.258 8.258 8.258h8.258l16.459-7.49h322.859v-382.056z"
                            fill="#eceaec"
                            data-original="#eceaec"
                            class=""
                          ></path>
                          <path
                            d="m371.613 478.968h-280.774v-148.645h280.774c9.122 0 16.516 7.395 16.516 16.516v115.613c0 9.121-7.395 16.516-16.516 16.516z"
                            fill="#dbd8db"
                            data-original="#dbd8db"
                            class=""
                          ></path>
                          <path
                            d="m355.097 313.806h-305.549c-13.682 0-24.774-11.092-24.774-24.774v148.645c0 13.682 11.092 24.774 24.774 24.774l17.904-8.326h296.47v-130.76z"
                            fill="#313e59"
                            data-original="#ff5f7a"
                            class=""
                          ></path>
                          <path
                            d="m449.356 110.775-72.905-72.905c-3.098-3.097-7.298-4.837-11.679-4.837h-1.417v74.323c0 9.122 7.395 16.516 16.516 16.516h49.548c4.561 0 8.258 3.697 8.258 8.258v313.806c0 27.365-22.184 49.548-49.548 49.548h-264.258c-9.122 0-16.516 7.395-16.516 16.516h338.581c4.561 0 8.258-3.697 8.258-8.258v-381.288c0-4.381-1.741-8.582-4.838-11.679z"
                            fill="#dbd8db"
                            data-original="#dbd8db"
                            class=""
                          ></path>
                          <path
                            d="m355.097 313.806v99.097c0 18.243-14.789 33.032-33.032 33.032h-256c-9.122 0-16.516 7.395-16.516 16.516h305.548c9.122 0 16.516-7.395 16.516-16.516v-115.612c0-9.122-7.395-16.517-16.516-16.517z"
                            fill="#313e59"
                            data-original="#313e59"
                          ></path>
                          <g fill="#fff">
                            <text
                              x="80"
                              y="430"
                              style="
                                font-weight: bolder;
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana,
                                  sans-serif;
                              "
                              font-size="100px"
                            >
                              ${name.split(".").pop().toUpperCase()}
                            </text>
                          </g>
                        </g>
                        <path
                          d="m320.129 272.032h-96.194c-4.427 0-8.016-3.589-8.016-8.016v-120.242c0-4.427 3.589-8.016 8.016-8.016h68.825c2.126 0 4.165.845 5.668 2.348l27.369 27.369c1.503 1.503 2.348 3.542 2.348 5.668v92.873c0 4.427-3.589 8.016-8.016 8.016z"
                          fill="#dbd8db"
                          data-original="#dbd8db"
                          class=""
                        ></path>
                        <path
                          d="m328.145 171.143c0-2.126-.845-4.165-2.348-5.668l-27.369-27.369c-1.503-1.503-3.542-2.348-5.668-2.348h-4.696v32.065c0 4.427 3.589 8.016 8.016 8.016h32.065z"
                          fill="#b8b2b8"
                          data-original="#b8b2b8"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <h3
                  class="pt-3 text-lg font-medium text-slate-700 dark:text-navy-100"
                >
                ${name}

                </h3>
                <p class="text-xs+">  ${path}</p>
                <div class="inline-space mt-3 flex grow flex-wrap items-start">
                  <a
                    href="#"
                    class="tag rounded-full bg-warning/10 text-warning hover:bg-warning/20 focus:bg-warning/20 active:bg-warning/25"
                  >
                  ${size}
                  </a>
                  <a
                    href="#"
                    class="tag rounded-full bg-warning/10 text-warning hover:bg-warning/20 focus:bg-warning/20 active:bg-warning/25"
                  >
                  ${type}
                  </a>
                </div>
                <div class="relative w-full flex -space-x-px">
                  <input
                    id="filePathInput"
                    class="form-input peer w-full rounded-l-lg border border-slate-300 bg-transparent px-1 py-2 pl-3 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                    value=""
                    type="text"
                  />
                  <button
                    id="changePath"
                    class="btn rounded-l-none bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                  >
                    Change
                  </button>
                </div>
                <div class="mt-6 grid w-full grid-cols-2 gap-2">
                  <button
                    id="startRecover"
                    class="btn space-x-2 bg-primary px-0 font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                  >
                    <span>Recover</span>
                  </button>
                  <button
                    onclick="window.location.href='index.html'"
                    class="btn space-x-2 bg-slate-150 px-0 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
                  >
                    <span> Cancel </span>
                  </button>
                </div>
              </div>
            </div>`;
   var f= document.getElementById("final");
   f.innerHTML=l;
  t=document.getElementById("filePathInput");
  t.value=window.localStorage.getItem("path")+"\\Digital Healer\\Recovered\\"+name;
   const c = document.getElementById("changePath");
   c.addEventListener("click", async () => {
  const filePath = await window.electronAPI.fileOpen();
  t=document.getElementById("filePathInput");
  t.value = filePath + "\\" + name;
});
sr=document.getElementById("startRecover");
sr.addEventListener("click",() => {
  console.log(volume,index,document.getElementById("filePathInput").value);
  window.electronAPI.recoverFile(volume,index,document.getElementById("filePathInput").value).then((records) => {
    if (records) {
      success(name,size,document.getElementById("filePathInput").value);
    }
  })
      
});
   var r= document.getElementById("Recover");
   r.style.display="block";
   var p= document.getElementById("preview");
   p.style.display="none";    
}
function success(name,size,path) {
  var t = {
    name:name,
    size:size,
    file:name,
    path:path,
  };
  Swal.fire({
    title: "🩺Recovered🏥 Successfully",
    icon: "success",
    confirmButtonText: "Ok",
  }).then((isConfirm) => {
    if (isConfirm) {
      try {
        var s = JSON.parse(localStorage.getItem("recovered"));
        s.push(t);
      } catch (e) {
        s = [t];
      }
      console.log(t);
      console.log(s);
      localStorage.setItem("recovered", JSON.stringify(s));
      console.log(localStorage.getItem("recovered"));
      window.location.href = "Recovered.html";

    }
  });
}