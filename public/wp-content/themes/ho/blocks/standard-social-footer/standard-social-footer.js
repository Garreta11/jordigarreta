
  


function openMobileAppIfExists(obj, e){
    setTimeout(function () { window.open(obj.getAttribute('href'), '_blank').focus(); }, 25);
    window.location = obj.dataset.scheme;

    e.preventDefault();
}
