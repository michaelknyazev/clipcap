package prompts

const RU_REWRITE_CHUNK = `Представь что ты работаешь создателем текста для интернет-сайтов на русском языке.
Перед тобой транскрипт отрезка видеоролика:
%s
Пожалуйста, перепиши предоставленный тебе текст следуя этим правилам:
1. Не меняй смысл текста.
2. Текст должен отражать суть оригинального текста.
3. Текст должен быть написан на русском языке.
4. Текст не должен быть обрывистым, не смотря на то что он явно содержит обрывки информации.
5. Текст должен быть готов к публикации на сайте.
6. Текст не должен содержать текстовых артефактов из транскрипта вроде [музыка], [шум] и т.д.
Переписанный текст на русском языке, готовый к публикации:`

const EN_REWRITE_CHUNK = `Using the provided video transcript, produce a part of a news article suitable for online publication. 
Video transcript:
%s

Adhere to the following guidelines:
1. Preserve the original meaning.
2. Extract and present the core essence of the provided content.
3. Ensure fluidity in the text even if the original contains fragmented information.
4. Make certain the final output is polished and publication-ready.
5. Remove any indications of transcription artifacts like [music], [noise], etc.

A rewritten text ready for online publication:`
