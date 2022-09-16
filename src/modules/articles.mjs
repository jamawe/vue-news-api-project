import axios from "axios";

// REQUEST HELPERS
// To formulate request
function modifyDateForApiRequest(date) {
    let year = '' + date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}

function getPreviousDate(oldDate) {
    const previousDate = new Date(oldDate.getTime());
    previousDate.setDate(oldDate.getDate() - 1);
    return previousDate;
}

function getNewsDesk(categorySlug) {
    // Since slug is unique filter will return only one item and destructuring assignment can be used
    const [newsDesk] = categories.filter(object => object.slug === categorySlug);
    if (newsDesk !== undefined) return newsDesk.name;

    return categorySlug;
}

function createApiRequest(fqTerm, isSection = false, page = 0) {
    if (isSection) return `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:("${fqTerm}")&page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}`;

    if (fqTerm === '') {
        return `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}`;
    }
    return `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:("${fqTerm}")&page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}`;
}

function createQueryRequest(queryString, newsDesk = '', page = 0) {
    if (newsDesk === '') return `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${queryString}&page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}`;

    return `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${queryString}&fq=news_desk:(${newsDesk})&page=${page}&sort=newest&api-key=${process.env.VUE_APP_NYT_API_KEY}`;
}

// To process response

function modifyArticlesForDisplay(articles) {
    let articlesForDisplay = [];

    articles.forEach(element => {
        const article = {
            abstract: element.abstract,
            byline: element.byline.original,
            content: element.lead_paragraph,
            headline: element.headline.main,
            pubDate: makePrettyDate(element.pub_date),
            slug: makeSlug(element.headline.main),
            source: element.source,
            url: element.web_url,
            wordCount: element.word_count
        };

        // Handle empty image
        article.image = element.multimedia.length ? `https://www.nytimes.com/${element.multimedia[0].url}` : '';

        article.newsDesk = element.news_desk ? termForFilterQuery(element.news_desk) : '';
        article.newsDeskSlug = article.newsDesk !== '' ? makeSlug(article.newsDesk) : '';

        // Handle duplicate values of news_desk, section_name and subsection_name
        article.section = element.section_name && (element.section_name !== element.news_desk) ? termForFilterQuery(element.section_name) : '';
        article.sectionSlug = article.section !== '' ? makeSlug(article.section) : '';
        
        article.subSection = element.subsection_name && (element.subsection_name !== element.section_name && element.subsection_name !== element.news_desk) ? termForFilterQuery(element.subsection_name) : '';
        article.subSectionSlug = article.subSection !== '' ? makeSlug(article.subSection) : '';

        articlesForDisplay.push(article);
    });

    return articlesForDisplay;
}

function createArrayForNavPills(articles) {
    const navPillFilters = [];

    articles.forEach(element => {
        // Create objects that contain info about the request that is potentially being sent
        if (element.newsDesk) navPillFilters.push({ 
            category: element.newsDeskSlug,
            fqTerm: element.newsDesk,
            isSection: false,
            disabled: false,
        });
        if (element.section) navPillFilters.push({
            category: element.sectionSlug,
            fqTerm:element.section,
            isSection: true,
            disabled: false
        });
    });

    // Form array where category is unique
    const uniqueFilters = [...new Map(navPillFilters.map(item => [item['category'], item])).values()];

    // Section + subsection can be combined since only section can be requested
    return uniqueFilters;
}

function termForFilterQuery(displayTerm) {
    const fqTerm = displayTerm.replace(/&/g, ' and ');
    return fqTerm;
}

function makeSlug(prettyTitle) {
    // Create slug from article.prettyTitle[1]
    // Remove any whitespace at beginning or end
    let slug = prettyTitle.replace(/^\s+|\s+$/g, '');

    // Convert to lower case
    slug = slug.toLowerCase();

    // remove accents, swap ñ for n, etc
    let from = ['ä', 'ö', 'ü', 'ß'];
    let to   = ['ae', 'oe', 'ue', 'ss'];

    for (let key in from) {
      slug = slug.replace(new RegExp(from[key], 'g'), to[key]);
    }

    slug = slug.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

    return slug
}

function makePrettyDate(date) {
    // Datumformat der Response ersetzen durch eigenes DE
    let dateForDisplay = date.replace(/T.*/,'').split('-').reverse().join('.');

    return dateForDisplay;
}

// REQUEST

async function getArticles(url) {
    const res = await axios.get(url);
    const { docs, meta } = res.data.response;
    return { docs, meta };
}

export { modifyDateForApiRequest, getPreviousDate, getNewsDesk, createApiRequest, createQueryRequest, modifyArticlesForDisplay, createArrayForNavPills, makePrettyDate, makeSlug, getArticles };