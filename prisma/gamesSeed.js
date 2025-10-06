/**
 * Script de Inserción Completo para la Shell de MongoDB (Corregido para JS/Node.js Runtime).
 *
 * NOTA: Se ha añadido la palabra clave 'new' a todos los ObjectIds para resolver el error
 * "Class constructor r cannot be invoked without 'new'".
 * Se recomienda encarecidamente usar un script de seeding de Prisma con Node.js
 * para manejar estas dependencias de ID de forma dinámica.
 */

// 1. Inserción de la colección 'Game' con ObjectIds fijos para permitir la referencia.
// Nota: En Node.js, necesitarías importar la función ObjectId o usar el driver de MongoDB.
db('God-Of-War-Weapon-API').collection('Game').insertMany([
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a1"), // CORREGIDO: Añadido 'new'
    "name": "God of War (2005)",
    "releaseYear": new Date("2005-03-22T00:00:00Z"), // Cambiado a 'new Date()' para mayor compatibilidad
    "summary": "El primer juego de la saga, Kratos busca venganza contra Ares para librarse de las pesadillas de su pasado."
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a2"), // CORREGIDO: Añadido 'new'
    "name": "God of War II",
    "releaseYear": new Date("2007-03-13T00:00:00Z"),
    "summary": "Kratos desafía a los Dioses del Olimpo y busca a las Hermanas del Destino para cambiar su destino."
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a3"), // CORREGIDO: Añadido 'new'
    "name": "God of War III",
    "releaseYear": new Date("2010-03-16T00:00:00Z"),
    "summary": "La guerra final contra los Dioses del Olimpo. Kratos desata su furia para destruir a todos los que se interponen en su camino."
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a4"), // CORREGIDO: Añadido 'new'
    "name": "God of War: Ascension",
    "releaseYear": new Date("2013-03-12T00:00:00Z"),
    "summary": "Una precuela que explora los primeros días de Kratos como sirviente de Ares y su posterior traición a los Furies."
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a5"), // CORREGIDO: Añadido 'new'
    "name": "God of War (2018)",
    "releaseYear": new Date("2018-04-20T00:00:00Z"),
    "summary": "Kratos, ahora con un hijo llamado Atreus, viaja por los reinos nórdicos para cumplir la última voluntad de su esposa."
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a6"), // CORREGIDO: Añadido 'new'
    "name": "God of War Ragnarök",
    "releaseYear": new Date("2022-11-09T00:00:00Z"),
    "summary": "Kratos y Atreus se enfrentan al inminente Ragnarök y a los dioses nórdicos en una épica conclusión a la saga nórdica."
  }
]);

// 2. Inserción de la colección 'Weapon', referenciando los ObjectIds creados arriba.
db('God-Of-War-Weapon-API').collection('Weapon').insertMany([
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b1"), // CORREGIDO: Añadido 'new'
    "name": "Blades of Chaos",
    "description": "Las icónicas espadas encadenadas que Kratos obtiene de Ares. Son su arma principal durante la saga griega.",
    "archives": [
      "https://example.com/gow2005/blades_of_chaos_img.jpg",
      "https://example.com/gow2005/blades_of_chaos_3d.gltf"
    ],
    "maxLevel": 5,
    "gameId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a1") // Referencia a "God of War (2005)"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b2"), // CORREGIDO: Añadido 'new'
    "name": "Blade of Artemis",
    "description": "Una espada gigante imbuida de magia, otorgada a Kratos por la Diosa Artemisa.",
    "archives": [
      "https://example.com/gow2005/blade_of_artemis_img.jpg"
    ],
    "maxLevel": 3,
    "gameId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a1") // Referencia a "God of War (2005)"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b3"), // CORREGIDO: Añadido 'new'
    "name": "Blade of Olympus",
    "description": "Una poderosa espada que Zeus usó para derrotar a los Titanes. Kratos la usa en God of War II y III.",
    "archives": [
      "https://example.com/gow2/blade_of_olympus_img.jpg",
      "https://example.com/gow2/blade_of_olympus_3d.gltf"
    ],
    "maxLevel": 5,
    "gameId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a2") // Referencia a "God of War II"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b4"), // CORREGIDO: Añadido 'new'
    "name": "Claws of Hades",
    "description": "Garras que canalizan el poder del inframundo, obtenidas de Hades en God of War III.",
    "archives": [
      "https://example.com/gow3/claws_of_hades_img.jpg"
    ],
    "maxLevel": 4,
    "gameId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a3") // Referencia a "God of War III"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b5"), // CORREGIDO: Añadido 'new'
    "name": "Nemean Cestus",
    "description": "Guanteletes con forma de cabezas de león, obtenidos de Hércules en God of War III.",
    "archives": [
      "https://example.com/gow3/nemean_cestus_img.jpg",
      "https://example.com/gow3/nemean_cestus_3d.gltf"
    ],
    "maxLevel": 4,
    "gameId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a3") // Referencia a "God of War III"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b6"), // CORREGIDO: Añadido 'new'
    "name": "Leviathan Axe",
    "description": "Un hacha mágica que Kratos hereda de su esposa Faye en la saga nórdica.",
    "archives": [
      "https://example.com/gow2018/leviathan_axe_img.jpg",
      "https://example.com/gow2018/leviathan_axe_3d.gltf"
    ],
    "maxLevel": 9,
    "gameId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a5") // Referencia a "God of War (2018)"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b7"), // CORREGIDO: Añadido 'new'
    "name": "Draupnir Spear",
    "description": "Una lanza mágica creada a partir del anillo Draupnir, introducida en God of War Ragnarök.",
    "archives": [
      "https://example.com/gowragnarok/draupnir_spear_img.jpg",
      "https://example.com/gowragnarok/draupnir_spear_3d.gltf"
    ],
    "maxLevel": 9,
    "gameId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a6") // Referencia a "God of War Ragnarök"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b8"), // CORREGIDO: Añadido 'new'
    "name": "Blades of Sparta",
    "description": "Versión alternativa de las Blades of Chaos para God of War: Ascension, antes de la maldición de Ares.",
    "archives": [
      "https://example.com/gowascension/blades_of_sparta_img.jpg"
    ],
    "maxLevel": 5,
    "gameId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6a4") // Referencia a "God of War: Ascension"
  }
]);

// 3. Inserción de la colección 'Movement', referenciando los ObjectIds de las armas.
db('God-Of-War-Weapon-API').collection('Movement').insertMany([
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6c1"),
    "unlockLevel": 1,
    "combination": "Cuadrado, Cuadrado, Triángulo",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b1") // Referencia a "Blades of Chaos"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6c2"),
    "unlockLevel": 2,
    "combination": "L1 + Cuadrado",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b1") // Referencia a "Blades of Chaos"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6c3"),
    "unlockLevel": 1,
    "combination": "R1 + Círculo",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b2") // Referencia a "Blade of Artemis"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6c4"),
    "unlockLevel": 1,
    "combination": "L3 + R3",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b3") // Referencia a "Blade of Olympus"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6c5"),
    "unlockLevel": 2,
    "combination": "Cuadrado (sostenido)",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b3") // Referencia a "Blade of Olympus"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6c6"),
    "unlockLevel": 1,
    "combination": "R1, R1, R1",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b4") // Referencia a "Claws of Hades"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6c7"),
    "unlockLevel": 1,
    "combination": "L1 + R1",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b5") // Referencia a "Nemean Cestus"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6c8"),
    "unlockLevel": 1,
    "combination": "R2 (Throw)",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b6") // Referencia a "Leviathan Axe"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6c9"),
    "unlockLevel": 3,
    "combination": "L2 + Triángulo (Permafrost)",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b6") // Referencia a "Leviathan Axe"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6ca"),
    "unlockLevel": 1,
    "combination": "R1 (Tap)",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b7") // Referencia a "Draupnir Spear"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6cb"),
    "unlockLevel": 2,
    "combination": "L1 + R2 (Explosive Might)",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b7") // Referencia a "Draupnir Spear"
  },
  {
    "_id": new ObjectId("65b9a7c3e7f8c0a2d4e5f6cc"),
    "unlockLevel": 1,
    "combination": "Cuadrado, Cuadrado, Cuadrado",
    "weaponId": new ObjectId("65b9a7c3e7f8c0a2d4e5f6b8") // Referencia a "Blades of Sparta"
  }
]);
