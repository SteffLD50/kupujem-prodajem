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
    description:
        "HDMI kabl V1.4, High Speed with Ethernet, 1.5m\n\nDužina kabla: 1.5m\nKonektori: Muški na oba kraja\nPodržana rezolucija: 1080p rezolucija na 60Hz, 4K rezolucija na 30Hz\n\nCena je po komadu.\n\nThe High Speed HDMI Cable is designed and tested to handle video resolutions of 1080p and beyond with support up to 10.2Gbps bandwidth, including advanced display technologies such as 4K@30Hz, 3D, and Deep Color.\nHDMI Ethernet Channel functionality is only available if both linked devices are HDMI Ethernet Channel-enabled.",
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
    description:
        "Miš Scorpion M207 - Marvo\n\nSensor: Optical\nDPI: 800-1200-2400-3200\nButtons: 6\nSwitch rating: 3 million clicks\nBacklight: 7 colors\nInterface: USB 2.0\nCable length: 1.5m\nOS support: Windows 7, 8, 10, or newer...\n\nMiš nije korišćen.\n\n(mouse, kompjuter, gaming, gejming)",
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
        "Procesor Intel Core i7-6700\n\nSocket: LGA 1151\nClockspeed: 3.4 GHZ\nTurbo Speed: 4.0 GHZ\nCores: 4 Threads: 8\nTypical TDP: 65 W\n\n6th Generation Intel® Core™ i7 Processors",
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
    description:
        "Suvenir / Slika - Paukova školjka (Lambis Scorpius)\n\nDimenzije uključujući ram: 13 x 18cm\n\nMože i uplata na račun radi jeftinije poštarine.",
    imageFiles: ["cypress/fixtures/Suvenir - Lambis Scorpius/1.jpg"],
};
