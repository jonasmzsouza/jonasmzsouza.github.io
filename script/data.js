import * as script from "./script.js";

/*
 * Function that renders content index
 * It is called by script.js
 */
function getGeneralData() {
  let isDefaultLanguage = script.isDefaultLanguage();

  let home = isDefaultLanguage ? "Home" : "Home";
  let about = isDefaultLanguage ? "Sobre" : "About";
  let portfolio = isDefaultLanguage ? "Portfólio" : "Portfolio";

  $("title").html(
    isDefaultLanguage ? "Jonas Souza | Currículo" : "Jonas Souza | Curriculum"
  );

  // NAVBAR / FOOTER
  $("#navItemHome").html(home);
  $("#navItemAbout").html(about);
  $("#navItemPortfolio").html(portfolio);
  $("#footerItemHome").html(home);
  $("#footerItemAbout").html(about);
  $("#footerItemPortfolio").html(portfolio);
  $("nav").attr(
    "aria-label",
    isDefaultLanguage ? "Menu de Navegação" : "Navigation Menu"
  );
  $(".brand").attr(
    "aria-label",
    isDefaultLanguage ? "Logotipo do Jonas Souza" : "Jonas Souza Logo"
  );
  $("#navbarToggler").attr(
    "aria-label",
    isDefaultLanguage ? "Botão Menu de Navegação" : "Navigation Menu Button"
  );
  $("#btnLanguage")
    .find("img")
    .attr(
      "alt",
      isDefaultLanguage ? "Versão em Português" : "Version in English"
    );

  // APRESENTATION
  $(".box").attr(
    "aria-label",
    isDefaultLanguage
      ? "Imagem de fundo de tecnologia nas cores laranja, preto e roxo"
      : "Technology background image in orange, black and purple"
  );
  $(".apresentation")
    .find("img")
    .attr(
      "alt",
      isDefaultLanguage ? "Imagem de Jonas Souza" : "Image of Jonas Souza"
    );
  $(".apresentation-title").html(
    isDefaultLanguage ? "Desenvolvedor Web" : "Web Developer"
  );

  // ABOUT MENU
  let profile = isDefaultLanguage ? "Perfil" : "Profile";
  let education = isDefaultLanguage ? "Educação" : "Education";
  let experience = isDefaultLanguage ? "Experiência" : "Experience";
  let skills = isDefaultLanguage ? "Habilidades" : "Skills";
  let certificaiton = isDefaultLanguage ? "Certificação" : "Certification";

  $(".about-menu")
    .find(".card-header")
    .find("div")
    .html(isDefaultLanguage ? "Sobre mim" : "About me");
  $("#profile").find(".item-title").html(profile);
  $("#education").find(".item-title").html(education);
  $("#experience").find(".item-title").html(experience);
  $("#skills").find(".item-title").html(skills);
  $("#certification").find(".item-title").html(certificaiton);
  $("#portfolio").html(portfolio);

  $("#btnBackToTop").attr(
    "aria-label",
    isDefaultLanguage ? "Voltar para o topo" : "Back to the top"
  );
}

/*
 * Function that returns the file path based on language
 * @return fileJSON
 */
function fileJSON() {
  let currentLanguage = script.getCurrentLanguage();
  let fileJSON = "./assets/json/data-" + currentLanguage + ".json";
  return fileJSON;
}

/*
 * Function that fetches portfolio content from a JSON file
 * It is called by script.js
 */
function getPortfolioData() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", fileJSON());
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let JSONData = xmlHttp.responseText;
      let objJSONData = JSON.parse(JSONData);
      let objJSONDataPage = objJSONData["portfolio"];
      getPortfolio(objJSONDataPage);
    }
    if (xmlHttp.readyState == 4 && xmlHttp.status == 404) {
      //...
    }
  };
  xmlHttp.send();
}

/*
 * Function that renders the portfolio content
 * It is called by the getPortfolioData function.
 * @param objJSONDataPage
 */
function getPortfolio(objJSONDataPage) {
  let isDefaultLanguage = script.isDefaultLanguage();

  objJSONDataPage.forEach((pageItem) => {
    let cardTitle = elementData("h4", pageItem.title, "card-title");

    let cardImgTop = document.createElement("img");
    cardImgTop.setAttribute("src", pageItem.imageSrc);
    cardImgTop.setAttribute("loading", "lazy");
    cardImgTop.setAttribute("alt", pageItem.title + " screenshot");

    let cardLanguages = elementData("div", "", "project-languages");
    pageItem.languages.forEach((language) => {
      let languageIcon = elementData("span", "", language.icon);
			let languageItem = elementData("div", "", "project-language-item");
			languageItem.appendChild(languageIcon)
			languageItem.setAttribute("title", language.name);
      cardLanguages.appendChild(languageItem);
    });

    let cardText = elementData("p", pageItem.description, "card-text");

    let cardBody = elementData("div", "", "card-body");
    cardBody.appendChild(cardText);

    let repo = elementData("span", "<b>repo</b>", "fab fa-git-alt");
    let codeHosting = elementData("a", "", "link-item");
    codeHosting.setAttribute("href", pageItem.codeHostingUrl);
    codeHosting.setAttribute("rel", "noopener noreferrer");
    codeHosting.setAttribute("target", "_blank");
    codeHosting.appendChild(repo);

    let app = elementData("span", "<b>app</b>", pageItem.isMobileApp ? "fas fa-mobile-alt" : "fas fa-globe");
    let appUrl;
    if (pageItem.isMobileApp) {
      appUrl = elementData("a", "", "link-item app-modal");
      appUrl.setAttribute("data-src", pageItem.appUrl);
      appUrl.appendChild(app);
    } else {
      appUrl = elementData("a", "", "link-item web");
      appUrl.setAttribute("href", pageItem.appUrl);
      appUrl.setAttribute("rel", "noopener noreferrer");
      appUrl.setAttribute("target", "_blank");
      appUrl.appendChild(app);
    }

    let projectDate = elementData("div", "", "project-links");
    projectDate.appendChild(codeHosting);
    projectDate.appendChild(appUrl);

    let cardFooter = elementData("div", "", "card-footer");
    cardFooter.appendChild(cardLanguages);
    cardFooter.appendChild(projectDate);

    let card = elementData("div", "", "card h-100");
    card.appendChild(cardTitle);
    card.appendChild(cardImgTop);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    let col = elementData("div", "", "col");
    col.appendChild(card);

    $("#portfolioContent").append(col);
  });
}

/*
 * Function that fetches the about me menu content page from a JSON file
 * It is called by script.js
 * @param page
 */
function getPageData(page) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", fileJSON());
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let JSONData = xmlHttp.responseText;
      let objJSONData = JSON.parse(JSONData);
      let objJSONDataPage = objJSONData[page];

      switch (page) {
        case "profile":
          getProfile(objJSONDataPage, page);
          break;
        case "education":
          getEducation(objJSONDataPage, page);
          break;
        case "experience":
          getExperience(objJSONDataPage, page);
          break;
        case "skills":
          getSkills(objJSONDataPage, page);
          break;
        case "certification":
          getCertification(objJSONDataPage, page);
          break;
      }
    }

    if (xmlHttp.readyState == 4 && xmlHttp.status == 404) {
      //...
    }
  };

  xmlHttp.send();
}

const classTitle1 = "content-title-1";
const classTitle2 = "content-title-2";
const classTitle3 = "content-title-3";
const classDescription = "content-description";

/*
 * Function that creates an HTML element and assigns a content and class
 * @param element
 * @param data
 * @param classe
 */
function elementData(element, data, classe) {
  let e = document.createElement(element);
  e.setAttribute("class", classe ? classe : "");
  e.innerHTML = data ? data : "";
  return e;
}

/*
 * Function that assigns the title of the content page based on the active page
 * @param page
 */
function getTitle(page) {
  let title = $("#" + page)
    .find(".item-title")
    .html();
  let hr = document.createElement("hr");
  aboutContent.appendChild(elementData("h4", title));
  aboutContent.appendChild(hr);
}

/*
 * Function that renders the portfolio content
 * It is called by the getPortfolioData function
 * @param objJSONDataPage
 * @param page
 */
function getProfile(objJSONDataPage, page) {
  getTitle(page);
  for (let i in objJSONDataPage) {
    let pageItem = objJSONDataPage[i];

    let aEmail = document.createElement("a");
    aEmail.setAttribute("href", "mailto:" + pageItem.email);
    aEmail.classList.add(classTitle3, "content-link");
    aEmail.textContent = pageItem.email;

    aboutContent.appendChild(elementData("p", pageItem.name, classTitle1));
    aboutContent.appendChild(elementData("p", pageItem.location, classTitle2));
    aboutContent.appendChild(aEmail);
    aboutContent.appendChild(elementData("br"));
    aboutContent.appendChild(elementData("br"));

    let str = pageItem.description;
    let description = str.split("\n");
    for (let p in description) {
      aboutContent.appendChild(elementData("p", description[p]));
    }
  }
}

/*
 * Function that renders the education content
 * It is called by the getPageData function.
 * @param objJSONDataPage
 * @param page
 */
function getEducation(objJSONDataPage, page) {
  getTitle(page);
  for (let i in objJSONDataPage) {
    let pageItem = objJSONDataPage[i];
    aboutContent.appendChild(elementData("p", pageItem.school, classTitle1));
    aboutContent.appendChild(
      elementData(
        "p",
        pageItem.degree + ", " + pageItem.fieldOfStudy,
        classTitle2
      )
    );
    aboutContent.appendChild(elementData("p", pageItem.location, classTitle3));
    aboutContent.appendChild(
      elementData(
        "p",
        pageItem.timeCourse.startDate + " - " + pageItem.timeCourse.endDate,
        classTitle3
      )
    );
    aboutContent.appendChild(
      elementData("p", pageItem.description, classDescription)
    );
  }
}

/*
 * Function that renders the experience content
 * It is called by the getPageData function.
 * @param objJSONDataPage
 * @param page
 */
function getExperience(objJSONDataPage, page) {
  getTitle(page);
  for (let i in objJSONDataPage) {
    let pageItem = objJSONDataPage[i];
    aboutContent.appendChild(elementData("p", pageItem.title, classTitle1));
    aboutContent.appendChild(elementData("p", pageItem.company, classTitle2));
    aboutContent.appendChild(elementData("p", pageItem.location, classTitle3));
    aboutContent.appendChild(
      elementData(
        "p",
        pageItem.timeCourse.startDate + " - " + pageItem.timeCourse.endDate,
        classTitle3
      )
    );
    let str = pageItem.description;
    let description = str.split("\n");
    let ul = document.createElement("ul");
    for (let p in description) {
      let li = document.createElement("li");
      li.innerHTML = description[p];
      ul.appendChild(li);
    }
    aboutContent.appendChild(ul);
  }
}

/*
 * Function that renders the hard skills content
 * It is called by the getPageData function.
 * @param objJSONDataPage
 * @param page
 */
function getSkills(objJSONDataPage, page) {
  getTitle(page);
  let isDefaultLanguage = script.isDefaultLanguage();
  let languages = isDefaultLanguage ? "Idiomas" : "Languages";
  let markupProgramming = isDefaultLanguage
    ? "Marcação e Programação"
    : "Markut and Programming";
  let tools = isDefaultLanguage ? "Ferramentas" : "Tools";
  for (let i in objJSONDataPage) {
    let pageItem = objJSONDataPage[i];

    let divLanguages = elementData("div", "", "languages-box");
    for (let l in pageItem.languages) {
      let languages = pageItem.languages[l];
      let p = elementData(
        "p",
        languages.language + ": " + languages.proficiency,
        classTitle2
      );
      divLanguages.appendChild(p);
    }

    let divMarkupProgramming = elementData("div", "", "devicon-box");
    for (let c in pageItem.markupProgramming) {
      divMarkupProgramming.appendChild(
        skillsIcon(pageItem.markupProgramming[c])
      );
    }

    let divTools = elementData("div", "", "devicon-box");
    for (let c in pageItem.tools) {
      divTools.appendChild(skillsIcon(pageItem.tools[c]));
    }

    aboutContent.appendChild(elementData("p", languages, classTitle1));
    aboutContent.appendChild(divLanguages);
    aboutContent.appendChild(elementData("p", markupProgramming, classTitle1));
    aboutContent.appendChild(divMarkupProgramming);
    aboutContent.appendChild(elementData("p", tools, classTitle1));
    aboutContent.appendChild(divTools);
  }
}

/*
 * Function that hard skill icons
 * It is called by the getSkills function
 * @param skillsItem
 */
function skillsIcon(skillsItem) {
  let span = elementData("span", "", skillsItem.icon);
  let p = elementData("p", skillsItem.skill);
  let devicon = elementData("div", "", "devicon");
  devicon.appendChild(span);
  devicon.appendChild(p);
  return devicon;
}

/*
 * Function that renders the certification content
 * It is called by the getPageData function
 * @param objJSONDataPage
 * @param page
 */
function getCertification(objJSONDataPage, page) {
  getTitle(page);
  let isDefaultLanguage = script.isDefaultLanguage();
  let certification = isDefaultLanguage ? "Certificação" : "Certification";
  let graduation = isDefaultLanguage ? "Graduação" : "Graduation";
  let course = isDefaultLanguage ? "Curso" : "Course";

  let div = elementData(
    "div",
    "",
    "d-flex justify-content-around certificationLegend"
  );
  let certificationDiv = elementData("div", "", "d-flex align-items-center");
  certificationDiv.appendChild(elementData("span", "", "fas fa-award"));
  certificationDiv.appendChild(elementData("p", certification, classTitle3));
  let graduationDiv = elementData("div", "", "d-flex align-items-center");
  graduationDiv.appendChild(elementData("span", "", "fas fa-graduation-cap"));
  graduationDiv.appendChild(elementData("p", graduation, classTitle3));
  let courseDiv = elementData("div", "", "d-flex align-items-center");
  courseDiv.appendChild(elementData("span", "", "fas fa-certificate"));
  courseDiv.appendChild(elementData("p", course, classTitle3));

  div.appendChild(certificationDiv);
  div.appendChild(graduationDiv);
  div.appendChild(courseDiv);
  aboutContent.appendChild(div);

  for (let i in objJSONDataPage) {
    let pageItem = objJSONDataPage[i];

    let link = document.createElement("a");
    link.setAttribute("href", pageItem.degreeUrl);
    link.setAttribute("rel", "noopener noreferrer");
    link.setAttribute("target", "_blank");
    link.setAttribute("data-school", pageItem.school);
    link.classList.add(classTitle3, "content-link");
    link.textContent = " " + pageItem.fieldOfStudy + " - " + pageItem.school;

    let icon =
      pageItem.degreeType == "certification"
        ? "fas fa-award"
        : pageItem.degreeType == "graduation"
        ? "fas fa-graduation-cap"
        : "fas fa-certificate";
    let certificationItemDiv = elementData(
      "div",
      "",
      "d-flex align-items-center certificationItem"
    );
    certificationItemDiv.appendChild(elementData("span", "", icon));
    certificationItemDiv.appendChild(link);
    aboutContent.appendChild(certificationItemDiv);
  }
}

export { getGeneralData, getPageData, getPortfolioData };
