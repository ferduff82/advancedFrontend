export const symptoms =
    [
        {
            symptom: 'Tos',
            questions: [
                {
                    id: "29d7fe1d-7e10-414b-83e5-449f4ec4ca5c",
                    required: "",
                    question: "¿Está con tos?",
                    answers: [
                        { answer: "Si", tag: "Tos" },
                        { answer: "No", tag: "No tiene tos" }]
                },
                {
                    id: "cafcdb9b-6c85-4347-96f3-3baf4c0ba518",
                    required: "29d7fe1d-7e10-414b-83e5-449f4ec4ca5c",
                    question: "¿Cómo es la tos?",
                    answers: [
                        { answer: "Seca", tag: "Tos seca" },
                        { answer: "Con Moco", tag: "Tos con moco" }],
                },
                {
                    id: "fa0cb5a8-87b2-469d-a1da-07e2fb40782d",
                    required: "29d7fe1d-7e10-414b-83e5-449f4ec4ca5c",
                    question: "¿Hace cuánto tiempo que está con tos?",
                    answers: [
                        { answer: "Menos de 2 semanas", tag: "Tos hace menos de 2 semanas" },
                        { answer: "Mas de 2 semanas pero menos que 2 meses", tag: "Tos hace más de 2 semanas pero menos que 2 meses" },
                        { answer: "Mas de 2 meses", tag: "Tos hace más de 2 meses" }]
                }
            ]
        },
        {
            symptom: 'Fiebre',
            questions: [
                {
                    id: "d3d5fa93-4308-4e12-b30c-5e7534d61072",
                    required: "",
                    question: "¿Tuvo fiebre o escalofríos?",
                    answers: [
                        { answer: "Si", tag: "Fiebre o escalofríos" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "5ac2f2f6-302a-4222-8650-9478328d970e",
                    required: "d3d5fa93-4308-4e12-b30c-5e7534d61072",
                    question: "¿Se ha tomado la temperatura?",
                    answers: [
                        { answer: "Si", tag: "" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "5ebf5760-5786-4eee-8756-d9d32601d5ba",
                    required: "5ac2f2f6-302a-4222-8650-9478328d970e",
                    question: "¿Que valor de fiebre ha registrado?",
                    answers: [
                        { answer: "input", tag: " grados de fiebre" },
                    ]
                },
                {
                    id: "1fd8f6ae-0594-407c-a63a-19c600ad981c",
                    required: "5ac2f2f6-302a-4222-8650-9478328d970e",
                    question: "¿Hace cuanto tiempo tiene fiebre?",
                    answers: [
                        { answer: "Menos de 48hs", tag: "Menos de 48 horas" },
                        { answer: "Mas de 48hs y menos de 2 semanas", tag: "Entre 48 horas y 2 semanas" },
                        { answer: "Mas de 2 semanas", tag: "Más de 2 semanas" }
                    ]
                },
                {
                    id: "f89b00e9-8fc9-4512-bd95-25721ab11b77",
                    required: "5ac2f2f6-302a-4222-8650-9478328d970e",
                    question: "¿Le duele mucho la cabeza o se encuentra confuso?",
                    answers: [
                        { answer: "Si", tag: "Si" },
                        { answer: "No", tag: "No" },
                        { answer: "No se", tag: "" }
                    ]
                }
            ]
        },
        {
            symptom: 'Dolor de garganta',
            questions: [
                {
                    id: "b62f7ae5-384f-43a8-bca1-075b666037b7",
                    required: "",
                    question: "",
                    answers: [
                        { answer: "Si", tag: "Dolor de garganta" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "8cbf328d-b666-4f4d-8390-cab7cdafd9d9",
                    required: "b62f7ae5-384f-43a8-bca1-075b666037b7",
                    question: "¿Le duele la garganta cuando traga?",
                    answers: [
                        { answer: "Si", tag: "Dolor de garganta al tragar" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "55175423-a2bb-4dfb-8383-e96c066f653d",
                    required: "b62f7ae5-384f-43a8-bca1-075b666037b7",
                    question: "¿Le ha cambiado la voz?",
                    answers: [
                        { answer: "Si", tag: "Cambio en la voz" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "74551317-0a9d-49a0-8170-7bd6bf461c3b",
                    required: "b62f7ae5-384f-43a8-bca1-075b666037b7",
                    question: "¿saliva mas que lo normal?",
                    answers: [
                        { answer: "Si", tag: "Sialorrea" },
                        { answer: "No", tag: "Sin sialorrea" }
                    ]
                },
                {
                    id: "24f1254b-9ca9-4bbf-9a23-2bef5d6687ec",
                    required: "74551317-0a9d-49a0-8170-7bd6bf461c3b",
                    question: "¿Hay posibilidad que se haya tragado un cuerpo extraño? ",
                    answers: [
                        { answer: "Si", tag: "Tragó un cuerpo extraño" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "787d73a4-17d0-43ed-a44c-0dc0ddf02ec0",
                    required: "",
                    question: "¿Le duele o molesta la garganta?",
                    answers: [
                        { answer: "Si", tag: "Tiene masa dolorosa en el cuello" },
                        { answer: "No", tag: "" }
                    ]
                },

                {
                    id: "e7fed081-02b6-4b85-b05e-ec12a552cec3",
                    required: "787d73a4-17d0-43ed-a44c-0dc0ddf02ec0",
                    question: "¿Desde hace cuanto tiene esta molestia? ",
                    answers: [
                        { answer: "Menos de 12hs", tag: "Tiene molestia desde hace Menos dr 12 horas" },
                        { answer: "Entre 12 y 24hs", tag: "Tiene molestia Entre 12 y 24 hs" },
                        { answer: "Entre 24 y 48hs", tag: "Tiene molestia Entre 24 y 48hs" },
                        { answer: "Mas de 48hs y menos de 1 semana", tag: "Tiene molestia desde hace Mas de 48hs y menos de 1 semana" },
                        { answer: "Mas de 1 semana y menos de 1 mes", tag: "Tiene molestia desde hace  Mas de 1 semana y menos de 1 mes" },
                        { answer: "Mas de 1 mes", tag: "Tiene molestia desde hace Mas de 1 mes" }

                    ]
                },
                {
                    id: "ec30ce87-8ba3-4e1a-9efb-548b256b3a11",
                    required: "",
                    question: "Tiene lesiones blancuzcas en la boca parecidos a restos de yogurt",
                    answers: [
                        { answer: "Si", tag: "Candidiasis oral" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "8df86dfe-d57b-4bd5-9f59-89c1d3010642",
                    required: "ec30ce87-8ba3-4e1a-9efb-548b256b3a11",
                    question: "¿Es diabético o tiene alguna enfermedad crónica?",
                    answers: [
                        { answer: "Si", tag: "Es diabético o tiene enfermedad crónica" },
                        { answer: "No", tag: "" }
                    ]
                },

            ]
        },
        {
            symptom: 'Dolor de cabeza',
            questions: [
                {
                    id: "2dd5eed5-3845-42c6-94b7-da16e48964de",
                    required: "",
                    question: "¿Le duele la cabeza?",
                    answers: [
                        { answer: "Si", tag: "Dolor de cabeza" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "8cbe980e-6bf6-4ed9-9cf3-939d296dcdd0",
                    required: "2dd5eed5-3845-42c6-94b7-da16e48964de",
                    question: "¿Cuanto hace que comenzó el dolor? ",
                    answers: [
                        { answer: "Menos de 6hs", tag: "Dolor de cabeza hace menos de 6hs" },
                        { answer: "Menos de 24hs", tag: "Dolor de cabeza hace menos de 24hs" },
                        { answer: "Menos de 48hs", tag: "Dolor de cabeza hace menos de 48hs" },
                        { answer: "Mas de 48hs", tag: "Dolor de cabeza hace mas de 48hs" }

                    ]
                },
                {
                    id: "df85de95-e77c-4933-be42-03b825454370",
                    required: "2dd5eed5-3845-42c6-94b7-da16e48964de",
                    question: "¿Podría describirlo como el peor dolor que tuvo en su vida?",
                    answers: [
                        { answer: "Si", tag: "Describe como el peor dolor de su vida" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "b5408338-d193-4c87-aa84-52a8d88e7327",
                    required: "2dd5eed5-3845-42c6-94b7-da16e48964de",
                    question: "¿El dolor lo despertó por la noche? ",
                    answers: [
                        { answer: "Si", tag: "El dolor lo despierta por la noche" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "0920926f-ad78-43bb-b017-f109670a3ceb",
                    required: "2dd5eed5-3845-42c6-94b7-da16e48964de",
                    question: "¿Le molesta la luz?",
                    answers: [
                        { answer: "Si", tag: "Le molesta la luz?" },
                        { answer: "No", tag: "" }
                    ]
                },

                {
                    id: "6865fb99-f524-4e9f-9960-8fd085bf66d7",
                    required: "2dd5eed5-3845-42c6-94b7-da16e48964de",
                    question: "¿El dolor ocurrió después de un golpe?",
                    answers: [
                        { answer: "Si", tag: "Dolor de cabeza después de un golpe " },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "dc406f03-3ee6-44d0-ad3e-60531fea92a9",
                    required: "2dd5eed5-3845-42c6-94b7-da16e48964de",
                    question: "¿El dolor es en la mitad de la cabeza? ",
                    answers: [
                        { answer: "Si", tag: "Dolor en la mitad de la cabeza" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "05d30ddc-bf58-43b5-961b-1950562c667e",
                    required: "dc406f03-3ee6-44d0-ad3e-60531fea92a9",
                    question: "Siente que la cabeza le late?",
                    answers: [
                        { answer: "Si", tag: "Latidos en la cabeza" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "5a5b04fd-ba69-4a5b-8a2b-c70dd500c3b3",
                    required: "2dd5eed5-3845-42c6-94b7-da16e48964de",
                    question: "¿Ha tenido fiebre? ",
                    answers: [
                        { answer: "Si", tag: "Fiebre" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "f7189de1-1481-43aa-a74a-db78dcb52fc8",
                    required: "5a5b04fd-ba69-4a5b-8a2b-c70dd500c3b3",
                    question: "¿Se ha tomado la temperatura? ",
                    answers: [
                        { answer: "Si", tag: "" },
                        { answer: "No", tag: "No se tomó la temperatura" }
                    ]
                },
                {
                    id: "117127ee-b2ee-441b-a6a7-54144e6ca6f4",
                    required: "f7189de1-1481-43aa-a74a-db78dcb52fc8",
                    question: "Que valor ha registrado ",
                    answers: [
                        { answer: "input", tag: " grados de fiebre" }

                    ]
                },

            ]
        },
        {
            symptom: 'Vómitos',
            questions: [
                {
                    id: "478f41f1-11b6-4122-953b-ae2a6c38e7b4",
                    required: "",
                    question: "¿Está con nauseas o vómitos?",
                    answers: [
                        { answer: "Si", tag: "tiene nauseas o vómitos" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "54f5062b-0fad-43be-93e0-a9d3a79678a6",
                    required: "478f41f1-11b6-4122-953b-ae2a6c38e7b4",
                    question: "¿Desde hace cuánto tiempo esta nauseas o vómitos? ",
                    answers: [
                        { answer: "Menos de 1 día", tag: "Tiene nauseas o vómitos de 1 dia" },
                        { answer: "Menos de 1 semana", tag: "Tiene nauseas o vómitos desede hace menos de 1 semana" },
                        { answer: "Menos de 1 mes", tag: "Tiene nauseas o vómitos desede hace menos de 1 mes" },
                        { answer: "Menos de 3 meses", tag: "Tiene nauseas o vómitos desede hace menos de 3 meses" },
                        { answer: "Más de 3 meses", tag: "Tiene nauseas o vómitos desede hace más de 3 meses" }
                    ]
                },
                {
                    id: "bb1b714d-87d1-46d2-bdf1-070d03b28e5c",
                    required: "478f41f1-11b6-4122-953b-ae2a6c38e7b4",
                    question: "¿Cuando intenta tomar sorbos de agua los tolera o termina vomitándolo?",
                    answers: [
                        { answer: "Si", tag: "tolera liquidos" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "44b5fa5a-dc9f-441e-80e6-9a4fed00f8cd",
                    required: "bb1b714d-87d1-46d2-bdf1-070d03b28e5c",
                    question: "¿Se siente mareado o inestable?",
                    answers: [
                        { answer: "Si", tag: "se siente mareado" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "d7a5117d-4e61-49c5-af9b-c03645e05d24",
                    required: "478f41f1-11b6-4122-953b-ae2a6c38e7b4",
                    question: "¿Alguna persona de su entorno laboral o familiar está con síntomas similares?",
                    answers: [
                        { answer: "Si", tag: "su entorno tiene síntomas similares" },
                        { answer: "No", tag: "" }
                    ]
                },
            ]

        },
        {
            symptom: 'Diarrea',
            questions: [
                {
                    id: "4d9c4f38-6f25-4ce7-8355-6e4222706530",
                    required: "",
                    question: "¿Está con diarrea?",
                    answers: [
                        { answer: "Si", tag: "Tiene diarrea" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "17f154f8-467e-4d8e-b933-e7cc078f6279",
                    required: "4d9c4f38-6f25-4ce7-8355-6e4222706530",
                    question: "¿Desde hace cuanto tiempo esta diarrea?",
                    answers: [
                        { answer: "Menos de 1 día", tag: "Diarrea hace un 1 dia" },
                        { answer: "Menos de 1 semana", tag: "Diarrea hace Menos de 1 semana" },
                        { answer: "Menos de 1 mes", tag: "Diarrea desede hace Menos de 1 mes" },
                        { answer: "Menos de 3 meses", tag: "Diarrea desede hace Menos de 3 meses" },
                        { answer: "Más de 3 meses", tag: "Diarrea desede hace Más de 3 meses" }
                    ]
                },
                {
                    id: "4a7ec543-381f-499a-926c-96997aaf6e1c",
                    required: "4d9c4f38-6f25-4ce7-8355-6e4222706530",
                    question: "Cuantas deposiciones ha tenido en las últimas 24hs",
                    answers: [
                        { answer: "menos de 6 deposiciones", tag: "Menos de 6 deposiciones diarias" },
                        { answer: "entre 6 y 10 deposiciones diarias", tag: "Entre 6 y 10 deposiciones diarias" },
                        { answer: "más de 10 deposiciones diarias", tag: "Más de 10 deposiciones diarias" }
                    ]
                },
                {
                    id: "5ad725ac-5a57-46aa-afa2-a1967faae7cd",
                    required: "4d9c4f38-6f25-4ce7-8355-6e4222706530",
                    question: "¿Vió sangre con la materia fecal",
                    answers: [
                        { answer: "Sí", tag: "Sangre con la materia fecal" },
                        { answer: "No", tag: "Sin sangre en materia fecal" }
                    ]
                },
                {
                    id: "a9682170-2a47-4ef6-9fc3-cc0c719ac76e",
                    required: "4d9c4f38-6f25-4ce7-8355-6e4222706530",
                    question: "¿Las deposiciones son predominantemente líquidas",
                    answers: [
                        { answer: "Si", tag: "Deposiciones líquidas" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "fdb27530-bdb2-401a-922a-ebf98de712d4",
                    required: "4d9c4f38-6f25-4ce7-8355-6e4222706530",
                    question: "¿Ha podido tomar líquidos para mantenerse hidratado?",
                    answers: [
                        { answer: "Si", tag: "Tolera líquidos" },
                        { answer: "No", tag: "No tolera líquidos" }
                    ]
                }
            ]
        },
        {
            symptom: 'Dolor de abdomen',
            questions: [
                {
                    id: "6a984415-be51-454b-a9b5-c54832f1d4ec",
                    required: "",
                    question: "¿Le duele la panza?",
                    answers: [
                        { answer: "Si", tag: "Le duele la panza" },
                        { answer: "No", tag: "No le duele la panza" }
                    ]
                },
                {
                    id: "e46b2313-a11e-4d02-ba40-60ddc037aebf",
                    required: "6a984415-be51-454b-a9b5-c54832f1d4ec",
                    question: "Desde hace cuando tiempo siente este dolor de Panza?",
                    answers: [
                        { answer: "Menos de 6hs", tag: "Tiene dolor desde hace menos de 6hs" },
                        { answer: "Menos de 24hs", tag: "Tiene dolor desde hace menos de 24hs" },
                        { answer: "Menos de 48hs", tag: "Tiene dolor desde hace menos de 48hs" },
                        { answer: "Mas de 48hs", tag: "Tiene dolor desde hace mas de 48hs" }
                    ]
                },
                {
                    id: "f78950d1-3537-4d97-ade2-c7212ce20e60",
                    required: "e46b2313-a11e-4d02-ba40-60ddc037aebf",
                    question: "¿En que región tiene mas dolor de Panza?",
                    answers: [
                        { answer: "Es en todo el abdomen por igual", tag: "Dolor de Panza en todo el abdomen por igual " },
                        { answer: "alrededor del ombligo", tag: "Dolor de Panza alrededor del ombligo" },
                        { answer: "en la región cercana a la pierna derecha", tag: "Dolor de Panza cercana a la pierna derecha" },
                        { answer: "en la región cercana a la pierna izquierda", tag: "Dolor de Panza cercana a la pierna izquierda" }
                    ]
                },
                {
                    id: "20ad2ace-be1b-45ac-afdc-72f826ea1e13",
                    required: "f78950d1-3537-4d97-ade2-c7212ce20e60",
                    question: "¿Tuvo alguna cirugía abdominal? ",
                    answers: [
                        { answer: "Si", tag: "Tuvo alguna cirugía abdominal" },
                        { answer: "No", tag: "No tuvo cirugía abdominal" }
                    ]
                },
                {
                    id: "0ca1c9ed-6b6d-4337-a837-e17110e5f0c6",
                    required: "20ad2ace-be1b-45ac-afdc-72f826ea1e13",
                    question: "¿Lo operaron de apéndice?",
                    answers: [
                        { answer: "Si", tag: "Fue operado de apéndice" },
                        { answer: "No", tag: "No fue operado del apéndice" }
                    ]
                },
                {
                    id: "38b55824-0792-4d34-98bc-c2f4fb853f74",
                    required: "20ad2ace-be1b-45ac-afdc-72f826ea1e13",
                    question: "¿Lo operaron de vesícula?",
                    answers: [
                        { answer: "Si", tag: "Fue operado de la vesícula" },
                        { answer: "No", tag: "No fue operado de la vesícula" }
                    ]
                },
                {
                    id: "3bbcb728-d367-43a2-bb35-28c61d86b4a8",
                    required: "",
                    question: "¿Este dolor de abdomen ya le había ocurrido otras veces?",
                    answers: [
                        { answer: "Si", tag: "El dolor de abdomen ya le había ocurrido otras veces" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "b64bb0e9-37b4-4681-a05a-5e9195f32e7a",
                    required: "3bbcb728-d367-43a2-bb35-28c61d86b4a8",
                    question: "Tiene antecedentes de gastritis? ",
                    answers: [
                        { answer: "Si", tag: "Antecedentes de gastritis" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "6b210729-310b-4a30-8b04-bb6cefa8bf54",
                    required: "3bbcb728-d367-43a2-bb35-28c61d86b4a8",
                    question: "¿Tiene antecedentes de divertículos? ",
                    answers: [
                        { answer: "Si", tag: "Antecedentes de divertículos" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "7ae1e260-bb61-4abc-9b9a-bfcd15820c3c",
                    required: "3bbcb728-d367-43a2-bb35-28c61d86b4a8",
                    question: "¿Tiene antecedentes de colon irritable? ",
                    answers: [
                        { answer: "Si", tag: "Antecedentes de colon irritable" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "c5881ef8-ca64-413b-bb7d-a2b45783772f",
                    required: "3bbcb728-d367-43a2-bb35-28c61d86b4a8",
                    question: "¿Tiene antecedentes de problemas de vesícula?",
                    answers: [
                        { answer: "Si", tag: "Antecedentes de problemas de vesícula?" },
                        { answer: "No", tag: "" }
                    ]
                }
            ]
        },
        {
            symptom: 'Dolor de espalda',
            questions: [
                {
                    id: "0d67cbe2-3888-4a62-a2c1-dc7647a6729c",
                    required: "",
                    question: "¿Le duele la espalda?",
                    answers: [
                        { answer: "Si", tag: "Le duele la espalda" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "b9caa54e-e57b-4736-a465-6a3b378aa1be",
                    required: "0d67cbe2-3888-4a62-a2c1-dc7647a6729c",
                    question: "¿Desde hace cuando tiempo siente este dolor de espalda?",
                    answers: [
                        { answer: "Menos de 24hs", tag: "Tiene dolor de espalda desde hace menos de 24hs" },
                        { answer: "Menos de 1 semana y mas de 24hs", tag: "Tiene dolor de espalda desde hace menos de 1 semana y mas de 24hs" },
                        { answer: "Más de 1 semana y menos de 3 meses", tag: "Tiene dolor de espalda desde hace más de 1 semana y menos de 3 meses" },
                        { answer: "Más de 3 meses", tag: "Tiene dolor de espalda desde hace más de 3 meses" }
                    ]
                },
                {
                    id: "ae433d4e-4d92-4a6f-8c22-d3fe4795837a",
                    required: "67cbe2-3888-4a62-a2c1-dc7647a6729c",
                    question: "¿El dolor empeora con el movimiento o cambio de posición? ",
                    answers: [
                        { answer: "Si", tag: "empeora con el movimiento o cambio de posición" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "054ed7ad-b5f5-4046-9a40-ef712ef924ef",
                    required: "67cbe2-3888-4a62-a2c1-dc7647a6729c",
                    question: "¿Siente hormigueos o debilidad en las piernas? ",
                    answers: [
                        { answer: "Si", tag: "Tiene hormigueos o debilidad en las piernas" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "f61ac4b1-cfdb-4bc9-84af-2a62437af5fd",
                    required: "67cbe2-3888-4a62-a2c1-dc7647a6729c",
                    question: "¿Probó tomar algún analgésico o desinflamatorio?",
                    answers: [
                        { answer: "Si", tag: "tomo algún analgésico o desinflamatorio" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "4cdad2c2-64c7-430b-a33e-be1ed234a12a",
                    required: "f61ac4b1-cfdb-4bc9-84af-2a62437af5fd",
                    question: "¿Alivió o cedió el dolor con la medicación? ",
                    answers: [
                        { answer: "Si", tag: "cedió el dolor con la medicación" },
                        { answer: "No", tag: "" }
                    ]
                }
            ]
        },
        {
            symptom: 'Congestión Nasal',
            questions: [
                {
                    id: "03a68a5d-224c-4e00-885d-9e1df39ae883",
                    required: "",
                    question: "¿Tiene moco?",
                    answers: [
                        { answer: "Si", tag: "Tiene moco" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "e9ee6fea-1c2c-4c96-bf1c-de5a21a49948",
                    required: "03a68a5d-224c-4e00-885d-9e1df39ae883",
                    question: "¿Como es el moco?",
                    answers: [
                        { answer: "transparente", tag: "moco transparente" },
                        { answer: "amarillento o verdoso", tag: "moco amarillento o verdoso" },
                        { answer: "rojizo", tag: "moco rojizo" },
                        { answer: "oscuro", tag: "moco oscuro" }
                    ]
                },
                {
                    id: "d504f57c-cd8a-404a-8c05-2dec6430b088",
                    required: "03a68a5d-224c-4e00-885d-9e1df39ae883",
                    question: "¿Tiene los ojos congestionados o llorosos? ",
                    answers: [
                        { answer: "Si", tag: "ojos congestionados o llorosos" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "49bc7622-ef27-411a-bc0e-0df2e850daa9",
                    required: "d504f57c-cd8a-404a-8c05-2dec6430b088",
                    question: "¿Es alérgico o ha tenido episodios de rinitis alérgica? ",
                    answers: [
                        { answer: "Si", tag: "ha tenido episodios de rinitis alérgica" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "2eadad73-72a1-4529-bfd6-0f811bc6f791",
                    required: "03a68a5d-224c-4e00-885d-9e1df39ae883",
                    question: "¿Desde hace cuanto Tiene moco ? ",
                    answers: [
                        { answer: "Menos de 48hs", tag: "tiene moco desde hace Menos desde hace 48hs" },
                        { answer: "Menos de 2 semanas", tag: "tiene moco desde hace Menos de 2 semana" },
                        { answer: "Más de 2 semanas pero menos que 1 mes", tag: "tiene moco desde hace Menos de 1 mes" },
                        { answer: "Más de 1 mes", tag: "tiene moco desde hace Más de 1 mes" }
                    ]
                },
            ]
        },
        {
            symptom: 'Nauseas',
            questions: [
                {
                    id: "1b63b8b5-8f84-47f5-b148-913ef769f801",
                    required: "",
                    question: "¿Está con nauseas o vómitos?",
                    answers: [
                        { answer: "Si", tag: "con nauseas o vómitos" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "52c04a7d-2ea2-45ec-aa1b-dc7cd6bcc270",
                    required: "1b63b8b5-8f84-47f5-b148-913ef769f801",
                    question: "¿Desde hace cuánto tiempo Está con nauseas o vómitos? ",
                    answers: [
                        { answer: "Menos de 48hs", tag: "Está con nauseas o vómitos desde hace Menos desde hace 48hs" },
                        { answer: "Menos de 2 semanas", tag: "Está con nauseas o vómitos desde hace Menos de 2 semana" },
                        { answer: "Más de 2 semanas pero menos que 1 mes", tag: "Está con nauseas o vómitos desde hace Menos de 1 mes" },
                        { answer: "Más de 1 mes", tag: "Está con nauseas o vómitos desde hace Más de 1 mes" }
                    ]
                },
                {
                    id: "fe731f74-e07f-42b5-9a5d-71468a7e3c13",
                    required: "1b63b8b5-8f84-47f5-b148-913ef769f801",
                    question: "¿Sospecha que vomitó sangre? ",
                    answers: [
                        { answer: "Si", tag: "vomitó sangre" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "8f649ea8-8b47-4477-b7f4-ce3d2f19cffe",
                    required: "1b63b8b5-8f84-47f5-b148-913ef769f801",
                    question: "¿Cuando intenta tomar sorbos de agua los tolera o termina vomitándolo",
                    answers: [
                        { answer: "Si", tag: "termina vomitándolo" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "8b42ae6a-f00c-42f8-9065-3b3e3e203309",
                    required: "8f649ea8-8b47-4477-b7f4-ce3d2f19cffe",
                    question: "¿Se siente mareado o inestable? ",
                    answers: [
                        { answer: "Si", tag: "Se siente mareado o inestable" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "ee23b39a-c3ce-4d9c-9c0c-a25fe6f6d996",
                    required: "1b63b8b5-8f84-47f5-b148-913ef769f801",
                    question: "Alguna persona de su entorno laboral o familiar está con síntomas similares",
                    answers: [
                        { answer: "Si", tag: "entorno laboral o familiar está con síntomas similares" },
                        { answer: "No", tag: "" }
                    ]
                },
            ]
        },
        {
            symptom: 'Dolor de pecho',
            questions: [
                {
                    id: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    required: "",
                    question: "¿Tiene o tuvo dolor de pecho?",
                    answers: [
                        {
                            answer: "Sí",
                            tag: "Dolor de pecho",
                            uid: "f78c7b34-c4c9-4192-9207-1bd3aaaf90fc"
                        },
                        {
                            answer: "No",
                            tag: "No tiene dolor de pecho"
                        }]
                },
                {
                    id: "76c548c3-63be-4b6b-9bb0-dff74b6e97c4",
                    required: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    question: "¿Ha tenido antecedentes de infarto, tiene stents o le han hecho una cirugía de By Pass?",
                    answers: [
                        {
                            answer: "Sí",
                            tag: "Antecedentes coronarios",
                            uid: 'a8060bdd-f024-4891-bd99-71cc329f64e3'
                        },
                        { answer: "No", tag: "Sin antecedentes coronarios" }]
                },
                {
                    id: "aa682a43-a5dd-4218-8f1e-d3d7e2d9b523",
                    required: "76c548c3-63be-4b6b-9bb0-dff74b6e97c4",
                    question: "El dolor de pecho que siente es similar a cuando tuvieron que internarlo por problemas cardíacos",
                    answers: [
                        {
                            answer: "Sí",
                            tag: "El dolor es similar al de los antecedentes de pecho"
                        },
                        { answer: "No", tag: "" }]
                },
                {
                    id: "4ac8e250-3b09-4029-968d-f9123b529969",
                    required: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    question: "¿Desde hace cuánto tiempo está sintiendo este síntoma?",
                    answers: [
                        { answer: "Menos de 72hs", tag: "Hace menos de 72 horas tiene dolor de pecho" },
                        { answer: "Menos de 1 mes", tag: "Hace menos de un mes tiene dolor de pecho" },
                        { answer: "Menos de 3 meses", tag: "Hace menos de 3 meses tiene dolor de pecho" },
                        { answer: "Más de 3 meses", tag: "Hace más de tres meses tiene dolor de pecho" }]
                },
                {
                    id: "8651654e-2983-4776-b951-6937302f7f5f",
                    required: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    question: "¿El episodio mas largo de dolor cuanto duró aproximandamente?",
                    answers: [
                        { answer: "Algunos segundos", tag: "Episodios de dolor de pecho de algunos segundos" },
                        { answer: "Menos de 20 minutos", tag: "Episodios de dolor de pecho de menos de 20 segundos" },
                        { answer: "Más de 20 minutos", tag: "Episodios de dolor de pecho de más de 20 segundos" }]
                },
                {
                    id: "0eae796d-5416-4f8d-99a3-74fdf3ef7662",
                    required: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    question: "¿Cuando le duele el pecho?",
                    answers: [
                        { answer: "Cuando realizo actividades", tag: "Dolor de pecho al realizar actividades" },
                        { answer: "En el reposo", tag: "Dolor de pecho en reposo" },
                        { answer: "Es indistinto", tag: "Dolor de pecho al permanente" }]
                },
                {
                    id: "81273007-6cbb-4756-8533-ef308b11abc4",
                    required: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    question: "El dolor lo referiría como...",
                    answers: [
                        { answer: "Como una puntada", tag: "Puntada en el pecho" },
                        { answer: "Una sensación de opresión en el pecho", tag: "Opresión en el pecho" },
                        { answer: "Como una sensación de ardor o quemazón en el pecho", tag: "Ardor o quemazón en el pecho" },
                        { answer: "No puedo describirlo", tag: "" }]
                },
                {
                    id: "ed4e76cb-d15c-44bb-8ed2-50c20c9ee5fc",
                    required: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    question: "¿Siente que el dolor se irradia hacia algunos de los brazos, mandíbula o garganta?",
                    answers: [
                        { answer: "Sí", tag: "Dolor de pecho irradia a los brazos, mandíbula o garganta" },
                        { answer: "No", tag: "" }]
                },
                {
                    id: "33bde53c-c0ef-4a92-8119-f2bc74ecbcbe",
                    required: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    question: "¿Siente que el dolor se irradia a la espalda?",
                    answers: [
                        { answer: "Sí", tag: "Dolor de pecho irradia a la espalda" },
                        { answer: "No", tag: "" }]
                },
                {
                    id: "450e02fb-f6cd-4802-a9a2-d06082548cca",
                    required: "33bde53c-c0ef-4a92-8119-f2bc74ecbcbe",
                    question: "¿El dolor mejora cuando esta sentado/a?",
                    answers: [
                        { answer: "Sí", tag: "Dolor de pecho mejora al sentarse" },
                        { answer: "No", tag: "Dolor de pecho no mejora al sentarse" }]
                },
                {
                    id: "0874b37d-e35f-4226-9643-c86bac5644c0",
                    required: "33bde53c-c0ef-4a92-8119-f2bc74ecbcbe",
                    question: "¿Ha tenido fiebe o ha tenido recientemente diarrea o tos?",
                    answers: [
                        { answer: "Sí", tag: "Probable pericarditis" },
                        { answer: "No", tag: "" }]
                },
                {
                    id: "7c680e7a-e1ce-40a6-a64c-e4010d5310a7",
                    required: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    question: "¿Siente que el dolor aparece o aumenta cuando se presiona alguna región del torax",
                    answers: [
                        { answer: "Sí", tag: "Dolor de pecho aumenta al presionar torax" },
                        { answer: "No", tag: "" }]
                },
                {
                    id: "e0aa43ca-b55f-47ff-8f24-79fd6f195d3e",
                    required: "2708c005-6794-4d3d-8b57-f168e96971b5",
                    question: "¿Siente que el dolor de pecho aumenta cuando respira hondo?",
                    answers: [
                        { answer: "Sí", tag: "Dolor de pecho al respirar hondo" },
                        { answer: "No", tag: "" }]
                }]
        },
        {
            symptom: 'Problemas urinarios',
            questions: [
                {
                    id: "34fc9338-f941-402e-9c4c-192ed98d6272",
                    required: "",
                    question: "¿Está con un problema urinario?",
                    answers: [
                        { answer: "Si", tag: "Problemas urinarios" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "794dc938-750a-4e8b-a01c-efce5b15434f",
                    required: "34fc9338-f941-402e-9c4c-192ed98d6272",
                    question: "¿Desde hace cuanto está con estos síntomas urinarios?",
                    answers: [
                        { answer: "Menos de 24hs", tag: "Problemas urinarios desde hace menos de 24hs" },
                        { answer: "Menos de 1 semana y mas de 24hs", tag: "Problemas urinarios desde hace Menos de 1 semana y mas de 24hs" },
                        { answer: "Más de 1 semana y menos de 3 meses", tag: "Problemas urinarios desde hace Más de 1 semana y menos de 3 meses" },
                        { answer: "Más de 3 meses", tag: "Problemas urinarios desde hace Más de 3 meses" }
                    ]
                },
                {
                    id: "17842195-8e9c-476e-8c04-348810991ec2",
                    required: "34fc9338-f941-402e-9c4c-192ed98d6272",
                    question: "¿Está orinando con más frecuencia que de costumbre?",
                    answers: [
                        { answer: "Si", tag: "Orinando con más frecuencia que de costumbre" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "47752b5c-d4b3-4afc-9a81-36b18bef6120",
                    required: "34fc9338-f941-402e-9c4c-192ed98d6272",
                    question: "¿Siente ganas de orinar todo el tiempo? ",
                    answers: [
                        { answer: "Si", tag: "Ganas de  orinar todo el tiempo" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "1e7e78ba-acd8-4601-bfaf-7fca24e0618d",
                    required: "34fc9338-f941-402e-9c4c-192ed98d6272",
                    question: "¿Tiene ardor o molestias cuando orina? ",
                    answers: [
                        { answer: "Si", tag: "Ardor o molestias cuando orina" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "ceb9e2ba-7293-4af1-bec4-a9c340f47d21",
                    required: "34fc9338-f941-402e-9c4c-192ed98d6272",
                    question: "¿Orina sangre? ",
                    answers: [
                        { answer: "Si", tag: "Hematuria" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "9e5fb36c-27f0-4af3-b12c-dfba3aa928fb",
                    required: "34fc9338-f941-402e-9c4c-192ed98d6272",
                    question: "¿Está con dolor de espalda?",
                    answers: [
                        { answer: "Si", tag: "Dolor de espalda" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "84a69ef2-3e98-4386-a143-b98224c15e63",
                    required: "9e5fb36c-27f0-4af3-b12c-dfba3aa928fb",
                    question: "¿Alguna vez tuvo cálculos renales o un cólico renal?",
                    answers: [
                        { answer: "Si", tag: "Tuvo cálculos renales o un cólico renal" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "37ead0a3-6c61-4d2f-8a49-3e187647b82c",
                    required: "34fc9338-f941-402e-9c4c-192ed98d6272",
                    question: "¿No puede orinar u orina muy poco?",
                    answers: [
                        { answer: "Si", tag: "Oliguria" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "885a280a-ea98-4cee-a8f9-d1876d1a7bb3",
                    required: "37ead0a3-6c61-4d2f-8a49-3e187647b82c",
                    question: "¿Estuvo con diarrea o vómitos abundantes?",
                    answers: [
                        { answer: "Si", tag: "Diarrea o vómitos abundantes" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "474498c0-c6a1-4fc5-95f1-5de2a78977b1",
                    required: "37ead0a3-6c61-4d2f-8a49-3e187647b82c",
                    question: "¿Toma diuréticos?",
                    answers: [
                        { answer: "Si", tag: "Toma diuréticos" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "dcc7649f-89b1-4fea-bcf8-f7490437b2e3",
                    required: "37ead0a3-6c61-4d2f-8a49-3e187647b82c",
                    question: "Tiene antecedentes de problemas prostáticos o toma mediación para la próstata",
                    answers: [
                        { answer: "Si", tag: "Antecedentes de problemas prostáticos o toma mediación para la próstata" },
                        { answer: "No", tag: "" }
                    ]
                },
                {
                    id: "37ead0a3-6c61-4d2f-8a49-3e187647b82c",
                    required: "37ead0a3-6c61-4d2f-8a49-3e187647b82c",
                    question: "¿Tiene antecedentes de insuficiencia renal o alguna vez ha tenido problemas de los riñones?",
                    answers: [
                        { answer: "Si", tag: "Antecedentes de insuficiencia renal o alguna vez ha tenido problemas de los riñones" },
                        { answer: "No", tag: "" }
                    ]
                }
            ]
        }
    ]