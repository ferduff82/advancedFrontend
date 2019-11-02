export const dolor_de_pecho = 
[
    {
    "id": "2708c005-6794-4d3d-8b57-f168e96971b5",
    "required": "",
    "question": "¿Tiene o tuvo dolor de pecho?",
    "answers": [
        {"Sí": "Dolor de pecho"},
        {"No": ""} ]
    },
    {
    "id": "76c548c3-63be-4b6b-9bb0-dff74b6e97c4",
    "required": "2708c005-6794-4d3d-8b57-f168e96971b5",
    "question": "¿Ha tenido antecedentes de infarto, tiene stents o le han hecho una cirugía de By Pass",
    "answers": [
        {"Sí": "Tiene antecedentes de infarto/stents/bypass"},
        {"No": ""} ]
    },
    {
    "id": "aa682a43-a5dd-4218-8f1e-d3d7e2d9b523",
    "required": "76c548c3-63be-4b6b-9bb0-dff74b6e97c4",
    "question": "El dolor de pecho que siente es similar a cuando tuvieron que internarlo por problemas cardíacos",
    "answers": [
        {"Sí": "El dolor es similar al de los antecedentes de pecho"},
        {"No": ""} ]
    },
    {       
    "id": "4ac8e250-3b09-4029-968d-f9123b529969",
    "required": "2708c005-6794-4d3d-8b57-f168e96971b5",
    "question": "¿Desde hace cuánto tiempo está sintiendo este síntoma?",
    "answers": [
        {"Menos de 72hs": "Hace menos de 72 horas tiene dolor de pecho"},
        {"Menos de 1 mes": "Hace menos de un mes tiene dolor de pecho"},
        {"Menos de 3 meses": "Hace menos de 3 meses tiene dolor de pecho"},
        {"Más de 3 meses": "Hace más de tres meses tiene dolor de pecho"} ]
    },
    {
    "id": "8651654e-2983-4776-b951-6937302f7f5f",
    "required": "2708c005-6794-4d3d-8b57-f168e96971b5",
    "question": "¿El episodio mas largo de dolor cuando duró aproximandamente?",
    "answers": [
        {"Algunos segundos": "Episodios de dolor de pecho de algunos segundos"},
        {"Menos de 20 minutos": "Episodios de dolor de pecho de menos de 20 segundos"},
        {"Más de 20 minutos": "Episodios de dolor de pecho de más de 20 segundos"} ]
    },
    {
        "id": "0eae796d-5416-4f8d-99a3-74fdf3ef7662",
        "required": "2708c005-6794-4d3d-8b57-f168e96971b5",
        "question": "¿Cuando le ocurre?",
        "answers": [
            {"Cuando realizo actividades": "Dolor de pecho al realizar actividades"},
            {"En el reposo": "Dolor de pecho en reposo"},
            {"Es indistinto": "Dolor de pecho al permanente"} ]
    },
    {
        "id": "81273007-6cbb-4756-8533-ef308b11abc4",
        "required": "2708c005-6794-4d3d-8b57-f168e96971b5",
        "question": "¿El dolor lo referiría como...",
        "answers": [
           { "Como una puntada": "Puntada en el pecho"},
           { "Una sensación de opresión en el pecho": "Opresión en el pecho"},
           { "Como una sensación de ardor o quemazón en el pecho": "Ardor o quemazón en el pecho"},
           { "No puedo describirlo": ""} ]
    },
    {
        "id": "ed4e76cb-d15c-44bb-8ed2-50c20c9ee5fc",
        "required": "2708c005-6794-4d3d-8b57-f168e96971b5",
        "question": "¿Siente que el dolor se irradia hacia algunos de los brazos, mandíbula o garganta?",
        "answers": [
            {"Sí": "Dolor de pecho irradia a los brazos, mandíbula o garganta"},
            {"No": ""} ]
    },
    {
    "id": "33bde53c-c0ef-4a92-8119-f2bc74ecbcbe",
    "required": "2708c005-6794-4d3d-8b57-f168e96971b5",
    "question": "¿Siente que el dolor se irradia a la espalda?",
    "answers": [
        {"Sí": "Dolor de pecho irradia a la espalda"},
        {"No": ""} ]
    },
    {
        "id": "450e02fb-f6cd-4802-a9a2-d06082548cca",
        "required": "33bde53c-c0ef-4a92-8119-f2bc74ecbcbe",
        "question": "¿El dolor mejora cuando esta sentado/a?",
        "answers": [
            {"Sí": "Dolor de pecho mejora al sentarse"},
            {"No": "Dolor de pecho no mejora al sentarse"} ]
    },
    {
        "id": "0874b37d-e35f-4226-9643-c86bac5644c0",
        "required": "33bde53c-c0ef-4a92-8119-f2bc74ecbcbe",
        "question": "¿Ha tenido fiebe o ha cursado recientemente con diarrea o tos?",
        "answers": [
            {"Sí": "Tuvo fiebre, diarrea o tos"},
            {"No": ""} ]
    },
    {
        "id": "7c680e7a-e1ce-40a6-a64c-e4010d5310a7",
        "required": "2708c005-6794-4d3d-8b57-f168e96971b5",
        "question": "¿Siente que el dolor aparece o aumenta cuando se presiona alguna región del torax",
        "answers": [
            {"Sí": "Dolor de pecho aumenta al presionar torax"},
            {"No": ""} ]
    },
    {
        "id": "e0aa43ca-b55f-47ff-8f24-79fd6f195d3e",
        "required": "2708c005-6794-4d3d-8b57-f168e96971b5",
        "question": "¿Siente que el dolor de pecho aumenta cuando respira hondo?",
        "answers": [
            {"Sí": "Dolor de pecho al respirar hondo"},
            {"No": ""} ]
    }
]