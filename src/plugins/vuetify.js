import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        // dark: true,
        options: { customProperties: true },
        themes: {
            light: {
                anchor: '#000',
                backdrop: '#B2DFDB',
                card: '#F5F5F5',
                accent: '#3F51B5',
                menuFooter: '#F5F5F5',
            },
            dark: {
                anchor: '#FFF',
                backdrop: '#00695C',
                card: '#1E1E1E',
                accent: '#5C6BC0',
                menuFooter: '#424242',
            },
        },
      },
});
