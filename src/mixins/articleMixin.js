export default {
  data() {
    return {
      sources: [
        'Spiegel Online', 'BUNTE.de', 'watson', 'tagesschau.de', 'Derwesten.de', 'N-tv.de', 'STERN.de', 'Faz.net', 'Bild', 'Www.rnd.de', 'Süddeutsche Zeitung', 'Rollingstone.de', 'Die Zeit', 'Handelsblatt', 'wallstreet-online', 'DIE WELT', 'T3n', 'merkur.de', 'Abendblatt.de', 'Wirtschafts Woche', 'Berliner Zeitung', 'Www.ndr.de', 'Www.hna.de', 'B.Z. Berlin', 'Thueringer-allgemeine.de', 'Augsburger Allgemeine', 'Www.swr.de', 'Www.waz.de', 'Berliner Morgenpost', 'heise online', 'Der Tagesspiegel', 'RP ONLINE', 'Stuttgarter Zeitung', 'Aerzteblatt.de', 'Focus', 'Spektrum.de', 'SPORT1', 'deichstube.de', 'Transfermarkt', 'Formel1.de', 'Eurosport.de', 'sportschau.de', 'DW (English)', '11freunde.de', 'PC-WELT', 'netzwelt', 'CHIP Online Deutschland', 'COMPUTER BILD', 'DER AKTIONÄR', 'Finanzen.net',
      ],
    }
  },
  methods: {
    makePrettyTitle(title) {
      // Ersten Teil des Titels (vor " - ") als Titel anzeigen (mit articel.prettyTitle[1]), zweiten Teile (Name der Source) mit articel.prettyTitle[2]
      let prettyTitle = title.match(/(.*)\s-\s(.*)/)

      return prettyTitle;
    },
    makeSlug(prettyTitle) {
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
    },
    makePrettyDate(publishedAt) {
      // Datumformat der Response ersetzen durch eigenes DE
      let prettyDate = publishedAt.replace(/T.*/,'').split('-').reverse().join('.');

      return prettyDate;
    },
    makePrettyContent(content) {
      // / : start/ end of the regex
      // * : 0 or more occurrences of the preceding item

      let prettyContent = content.replace(/ *\[[^\]]*]/, '');

      return prettyContent;
    }
  }
};