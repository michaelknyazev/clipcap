package prompts

// RUSSIAN

const RU_SUMMARIZE_FUNCTION_DESCRIPTION = `Функция - суммаризатор ключевой точки зрения на русском языке из предоставленного текста, с четко прописанными правилами для каждого из параметров.`
const RU_SUMMARIZE_FUNCTION_TITLE = `Короткий заголовок для предоставленного текста на русском языке.
Создай короткий заголовок на русском языке для предоставленного текста, который состоит из не более чем пяти слов, следуя этим правилам:
1. Заголовок на русском языке должен суммировать предоставленный текст.
2. Заголовок на русском языке должен отражать смысл предоставленного текста.
3. Заголовок на русском языке должен содержать не более чем пять слов.
4. Заголовок должен быть написан на русском языке
Короткий заголовок на русском языке для предоставленного текста не длинее пяти слов на русском языке:`
const RU_SUMMARIZE_FUNCTION_EMOJI = `Смайлик, описывающий предоставленный текст. Смайлик для предоставленного текста:`
const RU_SUMMARIZE_FUNCTION_INSIGHT = `Краткое резюме заданного текста на русском языке.
Создай короткое резюме для предоставленного текста на русском языке, состоящее не более чем из пяти слов, следуя этим правилам:
1. Не меняй смысл предоставленного текста.
2. Если текст предоставлен не на русском языке, переведи его на русский язык и создай краткое резюме на русском языке.
3. Краткое резюме на русском языке должно быть не более чем пять слов. 
4. Текст должен быть написан на русском языке.
5. Текст не должен быть большим, постарайся уложиться в максимум пять слов - это всего лишь краткое резюме предоставленного текста, а не полный пересказ.
Сгенерировано краткое резюме на русском языке из текста не длинее пяти слов на русском языке:`
const RU_SUMMARIZE_PROMPT = `Представь что ты работаешь создателем текста для интернет-сайтов на русском языке.
Ты можешь отвечать только на русском языке, при этом ты можешь понимать любой другой язык, который тебе дали для работы. 
Результат твоей работы на русском языке должен соответствовать правилам в каждом данном тебе задании.
Результат твоей работы на русском языке всегда будет проверяться в соответствии с данными тебе правилами в каждом задании.
Если результат работы предоставлен не на русском языке, то работа будет считаться не выполненной.
Результат твоей работы должен быть предоставлен на русском языке.
Будь креативным! 
Пожалуйста, ответь на русском языке, без общения.`

// ENGLISH

const EN_SUMMARIZE_FUNCTION_DESCRIPTION = `Function - summarizer of key insight from provided text.`
const EN_SUMMARIZE_FUNCTION_TITLE = `A short title for the provided text.
Create a short title for the provided text, no longer than 10 words, following these rules:
1. The title should summarize the provided text
2. The title should reflect the meaning of the provided text
3. Title must be no longer than 10 words
4. The title must be written in English
		
Short title for the provided text no longer than 10 words in English:`
const EN_SUMMARIZE_FUNCTION_EMOJI = `An emoji that describes provided text. eg. 💡. Emoji for provided text:`
const EN_SUMMARIZE_FUNCTION_INSIGHT = `A short summary of given text.
Generate a short summary for provided text, no longer then 10 words, following these rules:
1. Don't change the meaning of provided text
2. The text must be no longer then 10 words
3. The text must be in English.

Generated short summary from the text no longer then 10 words in English:`
const EN_SUMMARIZE_PROMPT = `Imagine that you work as a text creator for Internet sites.
The result of your work must comply with the rules in each task given to you.
The result of your work will always be checked in accordance with the rules given to you in each task.
Be creative!
Please answer in English, without communication.`
