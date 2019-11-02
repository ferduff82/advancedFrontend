
export const tos  = 
[
    {
    "id": "29d7fe1d-7e10-414b-83e5-449f4ec4ca5c",
    "required": "",
    "question": "¿Está con tos?",
    "answers": [
        {"Si": "Tos"},
        {"No": ""} ]
    },
    {
    "id": "cafcdb9b-6c85-4347-96f3-3baf4c0ba518",
    "required": "29d7fe1d-7e10-414b-83e5-449f4ec4ca5c",
    "question": "¿Cómo es la tos?",
    "answers": [
        {"Seca": "Tos seca"},
        {"Con Moco": "Tos con moco"} ],
    },
    {
    "id": "fa0cb5a8-87b2-469d-a1da-07e2fb40782d",
    "required": "29d7fe1d-7e10-414b-83e5-449f4ec4ca5c",
    "question": "¿Hace cuánto tiempo que está con tos?",
    "answers": [
        {"Menos de 2 semanas": "Tos hace menos de 2 semanas"},
        {"Mas de 2 semanas pero menos que 2 meses": "Tos hace más de 2 semanas pero menos que 2 meses"},
        {"Mas de 2 meses": "Tos hace más de 2 meses"} ]
    }
]