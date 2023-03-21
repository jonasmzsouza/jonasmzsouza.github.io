import * as script from "./script.js";

$(".navbar-brand").click(() => {
  script.navItem("home");
});

$("#navItemHome").click(() => {
  script.navItem("home");
});

$("#navItemAbout").click(() => {
  script.navItem("about");
});

$("#navItemPortfolio").click(() => {
  script.navItem("portfolio");
});

$("#footerItemHome").click(() => {
  script.navItem("home");
});

$("#footerItemAbout").click(() => {
  script.navItem("about");
});

$("#footerItemPortfolio").click(() => {
  script.navItem("portfolio");
});

$("#profile").click(() => {
  script.loadAboutContent("profile");
});

$("#contact").click(() => {
  script.loadAboutContent("contact");
});

$("#education").click(() => {
  script.loadAboutContent("education");
});

$("#experience").click(() => {
  script.loadAboutContent("experience");
});

$("#skills").click(() => {
  script.loadAboutContent("skills");
});

$("#certification").click(() => {
  script.loadAboutContent("certification");
});
