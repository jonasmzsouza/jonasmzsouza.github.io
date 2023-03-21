import * as data from "./data.js";

const language = "#language";
const defaultLanguage = $(language).attr("lang");
const navBarHeightDiscount = 0;
const btnBackToTop = "#btnBackToTop";
const navbarToggler = "#navbarToggler";
const navbarContent = "#navbarContent";
const btnLanguage = "#btnLanguage";
const btnLight = "#btnLight";
const dataTheme = "#dataTheme";
const initialContent = "profile";
const element = "aboutItem";

/*
 * Performs function to fetch initial content of session About
 */
getAbouItem(initialContent);
getIndexData();

/*
 * Function that calls the function to close the expanded navigation menu
 * and the function to scroll the page to the navBar element
 * @param navItem
 */
function navItem(navItem) {
  navCollapsed();
  goTo(navItem);
}

/*
 * Function that closes the expanded navigation menu (hamburger)
 */
function navCollapsed() {
  $(navbarToggler).attr("aria-expanded", "false");
  $(navbarToggler).addClass("collapsed");
  $(navbarContent).removeClass("show");
}

/*
 * Function that calls function to fetch content
 * and page scroll based on value received by parameter
 * @param aboutItem
 */
function loadAboutContent(aboutItem) {
  getAbouItem(aboutItem);
  goTo(element);
}

/*
 * Function that fetches general content based on current language
 * and calls active page function
 * @param aboutItem
 */
function getIndexData() {
  $("#portfolioContent").html("");
  data.getGeneralData();
  data.getPortfolioData();
}

/*
 * Function that fetches the content of the "about me" session
 * based on the current language and calls the active page function
 * @param aboutItem
 */
function getAbouItem(aboutItem) {
  $("#aboutContent").html("");
  $("#aboutContent").attr("class", aboutItem);
  data.getPageData(aboutItem);
  activePage(aboutItem);
}

/*
 * Active page function
 * @param page
 */
function activePage(aboutItem) {
  const activePages = document.querySelectorAll(".active-page");
  let page = "#" + aboutItem;
  for (let i = 0; i < activePages.length; i++) {
    $(activePages[i]).removeClass("active-page");
  }
  sessionStorage.setItem("activePage", aboutItem);
  $(page).addClass("active-page");
}

/*
 * Function that scrolls the page to the element received by parameter
 * @param element
 */
function goTo(element) {
  let elementPosition = $("#" + element).position().top;
  let position = element == "home" ? 0 : elementPosition - navBarHeightDiscount;
  $("html,body").animate(
    {
      scrollTop: position,
    },
    "slow"
  );
}

/*
 * Function that calls the function to check the current language
 * and calls the function to toggle the language
 */
$(btnLanguage).click(() => {
  let currentLanguage = getCurrentLanguage();
  currentLanguage == defaultLanguage
    ? updateLanguage("en")
    : updateLanguage(defaultLanguage);
});

/*
 * Function that checks and returns the current language
 * @return currentLanguage
 */
function getCurrentLanguage() {
  let currentLanguage = $(language).attr("lang");
  return currentLanguage == null ||
    currentLanguage == undefined ||
    currentLanguage == ""
    ? defaultLanguage
    : currentLanguage;
}

/*
 * Function that checks if the current language is the default language
 * @return currentLanguage
 */
function isDefaultLanguage() {
  let currentLanguage = getCurrentLanguage();
  return currentLanguage == defaultLanguage;
}

/*
 * Function that switches to the language received by parameter,
 * calls the function to change flag and to search the content
 * of the active page for the new language
 * @param newLangague
 */
function updateLanguage(newLangague) {
  $(language).attr("lang", newLangague);
  changeFlag(newLangague);
  getIndexData();
  getAbouItem(sessionStorage.getItem("activePage"));
  navCollapsed();
}

/*
 * Function that switches the flag based on the language received by parameter
 * and updates texts for accessibility
 * @param newLangague
 */
function changeFlag(newLangague) {
  let txtSmall =
    newLangague == defaultLanguage
      ? defaultLanguage.substring(0, 2)
      : newLangague;
  let img = $(btnLanguage).find("img");
  let small = $(btnLanguage).find("small");
  img.attr("src", "/assets/images/" + newLangague + ".png");
  small.html(txtSmall);
}

/*
 * Theme switching function
 */
$(btnLight).click(() => {
  let moon = "fa-moon";
  let sun = "fa-sun";
  const span = $(btnLight).find("span");
  span.toggleClass("active-light");
  let activeLight = span.hasClass("active-light");
  activeLight ? toggleIcon(span, moon, sun) : toggleIcon(span, sun, moon);
  let theme = activeLight ? "light" : "dark";
  $(dataTheme).attr("href", "css/" + theme + ".css");
  navCollapsed();
});

/*
 * Function that switches icon according to parameters
 * @param component
 * @param removeIcon
 * @param addIcon
 */
function toggleIcon(component, removeIcon, addIcon) {
  $(component).removeClass(removeIcon);
  $(component).addClass(addIcon);
}

/*
 * Function that checks the scrolling of the scroll
 * and shows/hides the button to return to the top
 */
$(window).scroll(() => {
  let currentScroll = window.pageYOffset;
  let className = "d-none";
  currentScroll > 160
    ? $(btnBackToTop).removeClass(className)
    : $(btnBackToTop).addClass(className);
});

/*
 * Triggered by back to top button
 */
$(btnBackToTop).click(() => {
  goTo("home");
});

$(window).on("load", () => {

  /**
   * Listens for the click event to open the modal
   */
  $("a.app-modal").click(function () {
    var appUrl = $(this).attr("data-src");
    const body = document.body;

    if (appUrl) {
      $("#modalAppContainer").css("display", "block");
      $("#modalAppIframe").attr("src", appUrl);
      $("body").css("overflowY", "hidden");
      return false;
    }
  });

  /**
   * Close modal image
   */
  $(".modal-app-close").click(function () {
    $("#modalAppContainer").css("display", "none");
    $("#modalAppIframe").attr("src", "");
    $("body").css("overflowY", "");
  });

  
  /**
   * Date in footer
   */
  let year = $.datepicker.formatDate("yy", new Date());
  $("#year").html(year);
});

export { getCurrentLanguage, navItem, loadAboutContent, isDefaultLanguage };
