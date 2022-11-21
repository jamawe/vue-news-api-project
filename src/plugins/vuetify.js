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
                accent: '#2962FF',
                accentToned: '#85A5FF',
                textInverted: '#FFF',
            },
            dark: {
                anchor: '#FFF',
                backdrop: '#00695C',
                card: '#1E1E1E',
                accent: '#82B1FF',
                accentToned: '#ADCDFF',
                textInverted: '#000',
            },
        },
      },
});
