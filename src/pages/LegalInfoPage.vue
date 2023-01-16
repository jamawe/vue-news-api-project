<template>
    <div class="impressum">
        <h1 class="impressum__title sans">Impressum</h1>
        <h2 class="impressum__heading sans">Angaben gem&auml;&szlig; &sect;5 TMG</h2>
        <p class="impressum__paragraph monospace">
            Jana Wernick <br>
            Brauereiweg 2 <br>
            27751 Delmenhorst
        </p>
        <h2 class="impressum__heading sans">Kontakt</h2>
        <p class="impressum__paragraph monospace">
            E-Mail: jana.wernick@gmail.com
        </p>
        <h2 class="impressum__heading sans">Redaktionell verantwortlich</h2>
        <p class="impressum__paragraph monospace">
            Jana Wernick <br>
            Brauereiweg 2 <br>
            27751 Delmenhorst
        </p>
    </div>
</template>

<script>
export default {
    name: 'LegalInfoPage',
}
</script>

<style lang="scss" scoped>
.impressum {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;

    font-family: var(--monospace);

    padding-bottom: 20%;
    padding-left: 10%;

    &__title {
        font-family: 'Roboto Medium';
        text-transform: lowercase;
        margin-bottom: 2rem;
    }

    &__heading {
        font-family: 'Roboto Medium';
        margin-bottom: 1rem;
    }

    &__paragraph {
        padding-left: 1rem;
        margin-bottom: 2rem;
    }
}
</style>