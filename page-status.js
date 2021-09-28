/*  
* Page Statuses
*/
var $html = jQuery('html');

//Test Device
window.isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { window.isMobile = true; }

//Detect Mobile
if(window.isMobile){$html.addClass('mobile');}else{$html.addClass('desktop');}

//Detect Browser
window.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
window.isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
window.isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()); 
window.isChromeiOS = navigator.userAgent.match('CriOS'); 
window.isMSIE = navigator.userAgent.match('MSIE');
window.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
window.isiPad = navigator.userAgent.match(/iPad/i) !== null;

//Detect OS
window.isWindows = navigator.platform.toUpperCase().indexOf('WIN')!==-1;
window.isOSX = navigator.platform.toUpperCase().indexOf('MAC')!==-1;
window.isLinux = navigator.platform.toUpperCase().indexOf('LINUX')!==-1;

//Prepare for CSS Fixes
if (window.isSafari){$html.addClass('safari');}
if (window.isFirefox){$html.addClass('firefox');}
if (window.isChrome){$html.addClass('chrome');}
if (window.isMSIE){$html.addClass('msie');}
if (window.isAndroid){$html.addClass('android');}
if (window.isWindows){$html.addClass('windows');}
if (window.isOSX){$html.addClass('osx');}
if (window.isLinux){$html.addClass('linux');}

//Retina
window.isRetina = ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));

if (window.isRetina){$html.addClass('retina');}

//On page load 
jQuery(window).on('load', function() {
  $html.addClass('page-loaded');
  window.loaded = 1;
  jQuery(window).trigger('loaded');
});
