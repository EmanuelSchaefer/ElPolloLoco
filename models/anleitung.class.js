/**
 * OpenInfo Function watch or not.
 */
function openInfo() {
    if (document.getElementById("anleitung").classList.contains("p-none")) {
      document.getElementById("anleitung").classList.remove("p-none");
    } else {
      document.getElementById("anleitung").classList.add("p-none");
    }
}

/**
 * SpielInfo Function watch or not.
 */
function spielInfo() {
  if (document.getElementById("textDiv").classList.contains("p-none")) {
    document.getElementById("textDiv").classList.remove("p-none");
  } else {
    document.getElementById("textDiv").classList.add("p-none");
  }
}