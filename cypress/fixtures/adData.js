const TYPE = {
    stvar: 0,
    usluga: 1,
    posao: 2,
};

const CURRENCY = {
    rsd: "rsd",
    eur: "eur",
};

const CONDITION = {
    kaoNovo: 0,
    korisceno: 1,
    osteceno: 2,
    novo: 3,
};

export const HDMI_KABL = {
    title: "HDMI Kabl 1.5m",
    type: TYPE.stvar,
    category: "TV i Video",
    group: "Kablovi",
    price: "200",
    currency: CURRENCY.rsd,
    condition: CONDITION.kaoNovo,
    description: "cypress/fixtures/HDMI Kabl 1.5m/text.txt",
    imageFiles: [
        "cypress/fixtures/HDMI Kabl 1.5m/1.jpg",
        "cypress/fixtures/HDMI Kabl 1.5m/2.jpg",
    ],
};

export const MIS_SCORPION = {
    title: "Miš Scorpion M207 - Marvo",
    type: TYPE.stvar,
    category: "Kompjuteri | Desktop",
    group: "Miševi i podloge",
    price: "800",
    currency: CURRENCY.rsd,
    condition: CONDITION.kaoNovo,
    description: "cypress/fixtures/Miš Scorpion M207 - Marvo/text.txt",
    imageFiles: [
        "cypress/fixtures/Miš Scorpion M207 - Marvo/1.jpg",
        "cypress/fixtures/Miš Scorpion M207 - Marvo/2.jpg",
    ],
};

export const PROCESSOR_INTEL = {
    title: "Procesor Intel Core i7-6700 - 3.40 GHz",
    type: TYPE.stvar,
    category: "Kompjuteri | Desktop",
    group: "Procesori",
    price: "90",
    currency: CURRENCY.eur,
    condition: CONDITION.korisceno,
    description:
        "cypress/fixtures/Procesor Intel Core i7-6700 - 3.40 GHz/text.txt",
    imageFiles: [
        "cypress/fixtures/Procesor Intel Core i7-6700 - 3.40 GHz/1.jpg",
        "cypress/fixtures/Procesor Intel Core i7-6700 - 3.40 GHz/2.jpg",
        "cypress/fixtures/Procesor Intel Core i7-6700 - 3.40 GHz/3.jpg",
    ],
};

export const SUVENIR_LAMBIS_SCORPIUS = {
    title: "Suvenir - Lambis Scorpius",
    type: TYPE.stvar,
    category: "Kolekcionarstvo",
    group: "Suveniri",
    price: "700",
    currency: CURRENCY.rsd,
    condition: undefined,
    description: "cypress/fixtures/Suvenir - Lambis Scorpius/text.txt",
    imageFiles: ["cypress/fixtures/Suvenir - Lambis Scorpius/1.jpg"],
};
